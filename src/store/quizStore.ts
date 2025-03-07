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
}

interface QuizState {
  // Assessment data
  currentQuestionId: number;
  sections: Section[];
  questions: Question[];
  testStarted: boolean;
  testSubmitted: boolean;
  testStartTime?: Date;
  
  // Navigation actions
  startTest: () => void;
  submitTest: () => void;
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
  getCompletionStatus: () => {
    totalQuestions: number;
    answeredQuestions: number;
    markedQuestions: number;
    notVisitedQuestions: number;
  };
}

const TOTAL_TEST_TIME = 60 * 60 * 1000; // 60 minutes in milliseconds

// Create initial sections
const initialSections: Section[] = [
  { id: 1, title: 'Science', description: 'Testing knowledge of scientific principles', questionCount: 20 },
  { id: 2, title: 'Technology', description: 'Testing knowledge of technological concepts', questionCount: 20 },
  { id: 3, title: 'Engineering Awareness', description: 'Testing awareness of engineering principles', questionCount: 20 },
  { id: 4, title: 'Mathematics', description: 'Testing mathematical problem-solving skills', questionCount: 20 },
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
      sections: initialSections,
      questions: createInitialQuestions(),
      testStarted: false,
      testSubmitted: false,
      testStartTime: undefined,
      
      // Actions
      startTest: () => set({ 
        testStarted: true, 
        testStartTime: new Date() 
      }),
      
      submitTest: () => set({ 
        testSubmitted: true 
      }),
      
      goToNextQuestion: () => {
        const { currentQuestionId, questions } = get();
        const currentIndex = questions.findIndex(q => q.id === currentQuestionId);
        
        // If not the last question, go to next
        if (currentIndex < questions.length - 1) {
          const nextQuestion = questions[currentIndex + 1];
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
        const { currentQuestionId, questions } = get();
        const currentIndex = questions.findIndex(q => q.id === currentQuestionId);
        
        // If not the first question, go to previous
        if (currentIndex > 0) {
          const prevQuestion = questions[currentIndex - 1];
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
        const { sections, getCurrentQuestion } = get();
        const currentQuestion = getCurrentQuestion();
        if (!currentQuestion) return undefined;
        return sections.find(s => s.id === currentQuestion.sectionId);
      },
      
      getRemainingTime: () => {
        const { testStartTime } = get();
        if (!testStartTime) return TOTAL_TEST_TIME;
        
        const elapsedTime = new Date().getTime() - testStartTime.getTime();
        const remainingTime = Math.max(0, TOTAL_TEST_TIME - elapsedTime);
        return remainingTime;
      },
      
      getCompletionStatus: () => {
        const { questions } = get();
        
        return {
          totalQuestions: questions.length,
          answeredQuestions: questions.filter(q => 
            q.status === 'answered' || q.status === 'answered-and-marked'
          ).length,
          markedQuestions: questions.filter(q => 
            q.status === 'marked-for-review' || q.status === 'answered-and-marked'
          ).length,
          notVisitedQuestions: questions.filter(q => 
            q.status === 'not-visited'
          ).length,
        };
      },
    }),
    {
      name: 'quiz-storage',
      partialize: (state) => ({
        questions: state.questions,
        currentQuestionId: state.currentQuestionId,
        testStarted: state.testStarted,
        testSubmitted: state.testSubmitted,
        testStartTime: state.testStartTime ? state.testStartTime.toISOString() : undefined,
      }),
      onRehydrateStorage: () => (state) => {
        // Convert ISO string date back to Date object
        if (state && state.testStartTime) {
          state.testStartTime = new Date(state.testStartTime);
        }
      }
    }
  )
);
