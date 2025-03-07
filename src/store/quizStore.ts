import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type QuestionStatus = 'not-visited' | 'current' | 'answered' | 'marked-for-review' | 'answered-and-marked';

export interface Question {
  id: number;
  sectionId: number;
  status: QuestionStatus;
  userAnswer?: string;
}

export interface Section {
  id: number;
  title: string;
  description: string;
  questionCount: number;
  completed: boolean;
}

interface QuizState {
  // Assessment data
  currentQuestionId: number;
  currentSectionId: number;
  sections: Section[];
  questions: Question[];
  testStarted: boolean;
  testSubmitted: boolean;
  testStartTime?: Date;
  sectionStartTime?: Date;
  
  // Navigation actions
  startTest: () => void;
  submitTest: () => void;
  submitSection: () => void;
  goToNextQuestion: () => void;
  goToPreviousQuestion: () => void;
  goToQuestion: (questionId: number) => void;
  
  // Question actions
  answerQuestion: (questionId: number, answer: string) => void;
  markForReview: (questionId: number) => void;
  unmarkForReview: (questionId: number) => void;
  
  // Selectors
  getCurrentQuestion: () => Question | undefined;
  getCurrentSection: () => Section | undefined;
  getRemainingTime: () => number;
  getSectionRemainingTime: () => number;
  getCompletionStatus: () => {
    totalQuestions: number;
    answeredQuestions: number;
    markedQuestions: number;
    notVisitedQuestions: number;
  };
  getSectionQuestions: (sectionId: number) => Question[];
  canSubmitSection: () => boolean;
}

const TOTAL_TEST_TIME = 60 * 60 * 1000; // 60 minutes in milliseconds
const SECTION_TIME = 15 * 60 * 1000; // 15 minutes per section in milliseconds

// Create initial sections
const initialSections: Section[] = [
  { id: 1, title: 'Science', description: 'Testing knowledge of scientific principles', questionCount: 20, completed: false },
  { id: 2, title: 'Technology', description: 'Testing knowledge of technological concepts', questionCount: 20, completed: false },
  { id: 3, title: 'Engineering Awareness', description: 'Testing awareness of engineering principles', questionCount: 20, completed: false },
  { id: 4, title: 'Mathematics', description: 'Testing mathematical problem-solving skills', questionCount: 20, completed: false },
];

// Create initial questions (20 for each section = 80 total)
const createInitialQuestions = (): Question[] => {
  const questions: Question[] = [];
  let questionId = 1;
  
  initialSections.forEach(section => {
    for (let i = 0; i < section.questionCount; i++) {
      questions.push({
        id: questionId,
        sectionId: section.id,
        status: questionId === 1 ? 'current' : 'not-visited',
      });
      questionId++;
    }
  });
  
  return questions;
};

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentQuestionId: 1,
      currentSectionId: 1,
      sections: initialSections,
      questions: createInitialQuestions(),
      testStarted: false,
      testSubmitted: false,
      testStartTime: undefined,
      sectionStartTime: undefined,
      
      // Actions
      startTest: () => set({ 
        testStarted: true, 
        testStartTime: new Date(),
        sectionStartTime: new Date()
      }),
      
      submitTest: () => set({ 
        testSubmitted: true 
      }),
      
      submitSection: () => {
        const { currentSectionId, sections } = get();
        
        // If this is the last section, submit the test
        if (currentSectionId === sections.length) {
          get().submitTest();
          return;
        }
        
        // Otherwise, move to the first question of the next section
        const nextSectionId = currentSectionId + 1;
        const nextSectionFirstQuestion = get().questions.find(q => q.sectionId === nextSectionId);
        
        if (nextSectionFirstQuestion) {
          set(state => ({
            currentSectionId: nextSectionId,
            currentQuestionId: nextSectionFirstQuestion.id,
            sectionStartTime: new Date(),
            sections: state.sections.map(s => 
              s.id === currentSectionId ? { ...s, completed: true } : s
            ),
            questions: state.questions.map(q => {
              if (q.id === nextSectionFirstQuestion.id) {
                return { ...q, status: 'current' };
              }
              return q;
            })
          }));
        }
      },
      
      goToNextQuestion: () => {
        const { currentQuestionId, currentSectionId, questions } = get();
        const sectionQuestions = questions.filter(q => q.sectionId === currentSectionId);
        const currentIndex = sectionQuestions.findIndex(q => q.id === currentQuestionId);
        
        // If not the last question in the section, go to next
        if (currentIndex < sectionQuestions.length - 1) {
          const nextQuestion = sectionQuestions[currentIndex + 1];
          set({ 
            currentQuestionId: nextQuestion.id,
            questions: questions.map(q => {
              if (q.id === currentQuestionId) {
                return { ...q, status: q.status === 'current' ? 'not-visited' : q.status };
              }
              if (q.id === nextQuestion.id) {
                return { ...q, status: 'current' };
              }
              return q;
            })
          });
        }
      },
      
      goToPreviousQuestion: () => {
        const { currentQuestionId, currentSectionId, questions } = get();
        const sectionQuestions = questions.filter(q => q.sectionId === currentSectionId);
        const currentIndex = sectionQuestions.findIndex(q => q.id === currentQuestionId);
        
        // If not the first question in the section, go to previous
        if (currentIndex > 0) {
          const prevQuestion = sectionQuestions[currentIndex - 1];
          set({ 
            currentQuestionId: prevQuestion.id,
            questions: questions.map(q => {
              if (q.id === currentQuestionId) {
                return { ...q, status: q.status === 'current' ? 'not-visited' : q.status };
              }
              if (q.id === prevQuestion.id) {
                return { ...q, status: 'current' };
              }
              return q;
            })
          });
        }
      },
      
      goToQuestion: (questionId: number) => {
        const { currentQuestionId, questions } = get();
        const targetQuestion = questions.find(q => q.id === questionId);
        
        // Only allow navigation to questions in the current section
        if (targetQuestion && targetQuestion.sectionId === get().currentSectionId) {
          set({ 
            currentQuestionId: questionId,
            questions: questions.map(q => {
              if (q.id === currentQuestionId) {
                return { ...q, status: q.status === 'current' ? 'not-visited' : q.status };
              }
              if (q.id === questionId) {
                return { ...q, status: 'current' };
              }
              return q;
            })
          });
        }
      },
      
      answerQuestion: (questionId: number, answer: string) => {
        const { questions } = get();
        set({
          questions: questions.map(q => {
            if (q.id === questionId) {
              // Keep the marked for review status if present
              const isMarked = q.status === 'marked-for-review' || q.status === 'answered-and-marked';
              return { 
                ...q, 
                userAnswer: answer,
                status: isMarked ? 'answered-and-marked' : 'answered' 
              };
            }
            return q;
          })
        });
      },
      
      markForReview: (questionId: number) => {
        const { questions } = get();
        set({
          questions: questions.map(q => {
            if (q.id === questionId) {
              const isAnswered = q.status === 'answered' || q.status === 'answered-and-marked';
              return { 
                ...q, 
                status: isAnswered ? 'answered-and-marked' : 'marked-for-review' 
              };
            }
            return q;
          })
        });
      },
      
      unmarkForReview: (questionId: number) => {
        const { questions } = get();
        set({
          questions: questions.map(q => {
            if (q.id === questionId) {
              const isAnswered = q.status === 'answered-and-marked' || q.status === 'answered';
              return { 
                ...q, 
                status: isAnswered ? 'answered' : 'not-visited' 
              };
            }
            return q;
          })
        });
      },
      
      // Selectors
      getCurrentQuestion: () => {
        const { questions, currentQuestionId } = get();
        return questions.find(q => q.id === currentQuestionId);
      },
      
      getCurrentSection: () => {
        const { sections, currentSectionId } = get();
        return sections.find(s => s.id === currentSectionId);
      },
      
      getRemainingTime: () => {
        const { testStartTime } = get();
        if (!testStartTime) return TOTAL_TEST_TIME;
        
        const elapsedTime = new Date().getTime() - testStartTime.getTime();
        const remainingTime = Math.max(0, TOTAL_TEST_TIME - elapsedTime);
        return remainingTime;
      },
      
      getSectionRemainingTime: () => {
        const { sectionStartTime } = get();
        if (!sectionStartTime) return SECTION_TIME;
        
        const elapsedTime = new Date().getTime() - sectionStartTime.getTime();
        const remainingTime = Math.max(0, SECTION_TIME - elapsedTime);
        return remainingTime;
      },
      
      getCompletionStatus: () => {
        const { questions, currentSectionId } = get();
        const sectionQuestions = questions.filter(q => q.sectionId === currentSectionId);
        
        return {
          totalQuestions: sectionQuestions.length,
          answeredQuestions: sectionQuestions.filter(q => 
            q.status === 'answered' || q.status === 'answered-and-marked'
          ).length,
          markedQuestions: sectionQuestions.filter(q => 
            q.status === 'marked-for-review' || q.status === 'answered-and-marked'
          ).length,
          notVisitedQuestions: sectionQuestions.filter(q => 
            q.status === 'not-visited'
          ).length,
        };
      },
      
      getSectionQuestions: (sectionId: number) => {
        return get().questions.filter(q => q.sectionId === sectionId);
      },
      
      canSubmitSection: () => {
        const { currentSectionId } = get();
        const sectionQuestions = get().getSectionQuestions(currentSectionId);
        // Consider a section ready to submit if all questions have been at least visited
        const allQuestionsVisited = sectionQuestions.every(q => q.status !== 'not-visited');
        return allQuestionsVisited;
      }
    }),
    {
      name: 'quiz-storage',
      partialize: (state) => ({
        questions: state.questions,
        currentQuestionId: state.currentQuestionId,
        currentSectionId: state.currentSectionId,
        sections: state.sections,
        testStarted: state.testStarted,
        testSubmitted: state.testSubmitted,
        testStartTime: state.testStartTime ? state.testStartTime.toISOString() : undefined,
        sectionStartTime: state.sectionStartTime ? state.sectionStartTime.toISOString() : undefined,
      }),
      onRehydrateStorage: () => (state) => {
        // Convert ISO string dates back to Date objects
        if (state) {
          if (state.testStartTime) {
            state.testStartTime = new Date(state.testStartTime);
          }
          if (state.sectionStartTime) {
            state.sectionStartTime = new Date(state.sectionStartTime);
          }
        }
      }
    }
  )
);
