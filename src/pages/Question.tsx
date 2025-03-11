
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import NavigationButtons from "@/components/NavigationButtons";
import QuestionIndicator from "@/components/QuestionIndicator";
import { useQuizStore } from "@/store/quizStore";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/radix-card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radix-radio-group";
import { Label } from "@/components/ui/radix-label";
import { Clock, Flag, CheckCircle } from "lucide-react";
import { Separator } from "@/components/ui/radix-separator";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/radix-button";
import { toast } from "@/hooks/use-radix-toast";

const getQuestionContent = (id: number, sectionId: number) => {
  const section = ["Science", "Technology", "Engineering", "Mathematics"][sectionId - 1];
  return {
    questionText: `This is a sample ${section} question #${id % 20 === 0 ? 20 : id % 20}. What would be the correct answer to this ${section.toLowerCase()} problem?`,
    options: [
      "Option A - This could be the answer",
      "Option B - This might be the answer",
      "Option C - This may be the answer",
      "Option D - This is probably the answer"
    ]
  };
};

const Question = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(true);
  
  const currentQuestionId = useQuizStore(state => state.currentQuestionId);
  const currentSectionId = useQuizStore(state => state.currentSectionId);
  const questions = useQuizStore(state => state.questions);
  const sections = useQuizStore(state => state.sections);
  const testStarted = useQuizStore(state => state.testStarted);
  const goToQuestion = useQuizStore(state => state.goToQuestion);
  const answerQuestion = useQuizStore(state => state.answerQuestion);
  const getRemainingTime = useQuizStore(state => state.getRemainingTime);
  const getSectionRemainingTime = useQuizStore(state => state.getSectionRemainingTime);
  const getCompletionStatus = useQuizStore(state => state.getCompletionStatus);
  const getSectionQuestions = useQuizStore(state => state.getSectionQuestions);
  const submitSection = useQuizStore(state => state.submitSection);
  
  const [remainingTime, setRemainingTime] = useState(getSectionRemainingTime());
  const currentQuestion = questions.find(q => q.id === currentQuestionId);
  const currentSection = sections.find(s => s.id === currentSectionId);
  
  const sectionQuestions = currentSection ? getSectionQuestions(currentSection.id) : [];
  
  const completionStatus = getCompletionStatus();
  
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  useEffect(() => {
    const timer = setInterval(() => {
      const time = getSectionRemainingTime();
      setRemainingTime(time);
      
      if (time <= 0) {
        toast({
          title: "Time's up!",
          description: `Moving to the next section.`,
        });
        submitSection();
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [getSectionRemainingTime, submitSection]);
  
  useEffect(() => {
    if (!testStarted) {
      navigate("/");
    }
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [testStarted, navigate]);
  
  if (!currentQuestion || !currentSection) return null;
  
  const questionContent = getQuestionContent(currentQuestion.id, currentQuestion.sectionId);
  
  const questionIndex = sectionQuestions.findIndex(q => q.id === currentQuestionId);
  const questionNumber = questionIndex + 1;
  
  const progress = (completionStatus.answeredQuestions / completionStatus.totalQuestions) * 100;
  
  const handleSelectOption = (value: string) => {
    answerQuestion(currentQuestion.id, value);
  };
  
  const handleSubmitSection = () => {
    submitSection();
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 container max-w-6xl px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-5">
            <div className="flex justify-between items-center">
              <div className={loading ? "" : "animate-fade-in"}>
                <h2 className="text-lg font-medium text-gray-900">
                  {currentSection.title}
                </h2>
                <p className="text-sm text-gray-500">
                  Part {currentSection.id} of {sections.length}
                </p>
              </div>
              
              <div className={`flex items-center gap-2 ${loading ? "" : "animate-fade-in"}`}>
                <div className="flex items-center gap-1 bg-blue-50 text-blue-800 px-3 py-1.5 rounded-full">
                  <Clock size={16} />
                  <span className="font-medium">{formatTime(remainingTime)}</span>
                </div>
              </div>
            </div>
            
            <Card className={`border shadow-sm ${loading ? "" : "animate-fade-in"}`}>
              <CardHeader className="bg-gray-50 py-4 border-b">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-xs uppercase text-gray-500 font-medium mb-1">PASSAGE SINGLE CHOICE QUESTION</div>
                    <h3 className="font-medium">
                      Question {questionNumber} of {currentSection.questionCount}
                    </h3>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {currentQuestion.status === 'marked-for-review' || 
                     currentQuestion.status === 'answered-and-marked' ? (
                      <div className="flex items-center gap-1 text-orange-600 text-sm">
                        <Flag size={14} />
                        <span>Marked for review</span>
                      </div>
                    ) : currentQuestion.status === 'answered' ? (
                      <div className="flex items-center gap-1 text-green-600 text-sm">
                        <CheckCircle size={14} />
                        <span>Answered</span>
                      </div>
                    ) : null}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="py-5">
                <div className="space-y-6">
                  <p className="text-gray-800 font-medium">{questionContent.questionText}</p>
                  
                  <RadioGroup 
                    onValueChange={handleSelectOption} 
                    value={currentQuestion.userAnswer || ""}
                    className="space-y-3"
                  >
                    {questionContent.options.map((option, index) => (
                      <div 
                        key={index} 
                        className="flex items-start space-x-2 rounded-md border p-3 hover:bg-gray-50 transition-colors"
                      >
                        <RadioGroupItem value={`option-${index}`} id={`option-${index}`} />
                        <Label 
                          htmlFor={`option-${index}`} 
                          className="flex-1 cursor-pointer text-gray-700"
                        >
                          {option}
                        </Label>
                        <div className="text-gray-400 font-medium">{index + 1}</div>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </CardContent>
              
              <CardFooter className="bg-gray-50 border-t py-4 px-6">
                <NavigationButtons type="question" animate={!loading} />
              </CardFooter>
            </Card>
          </div>
          
          <div className={`bg-white border rounded-lg shadow-sm p-5 h-fit ${loading ? "" : "animate-fade-in"}`}>
            <div className="space-y-5">
              <div>
                <div className="text-center mb-4">
                  <div className="text-xs uppercase tracking-wide text-gray-500 font-medium">STEM ASSESSMENT</div>
                  <h3 className="font-medium text-gray-800">Part {currentSection.id} of 4: {currentSection.title}</h3>
                </div>
                
                <div className="w-full bg-gray-200 h-2 rounded-full mb-3">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {sectionQuestions.slice(0, 20).map((question, idx) => (
                    <QuestionIndicator
                      key={question.id}
                      status={question.status}
                      number={idx + 1}
                      onClick={() => goToQuestion(question.id)}
                      isCurrent={question.id === currentQuestionId}
                    />
                  ))}
                </div>
                
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={handleSubmitSection}
                >
                  Submit Part {currentSection.id}
                </Button>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Question Legend</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full border border-gray-300 bg-white"></div>
                    <span>Not Attempted</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full bg-blue-600"></div>
                    <span>Answered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full bg-orange-500"></div>
                    <span>Marked for Review</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full bg-orange-500 ring-1 ring-offset-2 ring-orange-300"></div>
                    <span>Answered & Marked</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-3 mt-4">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Flag size={14} />
                  <span>Mark For Review</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Question;
