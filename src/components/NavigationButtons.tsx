
import React from "react";
import { Button } from "@/components/ui/radix-button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Flag, Check } from "lucide-react";
import { useQuizStore } from "@/store/quizStore";
import { useToast } from "@/hooks/use-radix-toast";

interface NavigationButtonsProps {
  type: 'landing' | 'question';
  animate?: boolean;
  disabled?: boolean;
}

const NavigationButtons = ({ type, animate = true, disabled = false }: NavigationButtonsProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const startTest = useQuizStore(state => state.startTest);
  const submitTest = useQuizStore(state => state.submitTest);
  const submitSection = useQuizStore(state => state.submitSection);
  const goToNextQuestion = useQuizStore(state => state.goToNextQuestion);
  const goToPreviousQuestion = useQuizStore(state => state.goToPreviousQuestion);
  const markForReview = useQuizStore(state => state.markForReview);
  const currentQuestionId = useQuizStore(state => state.currentQuestionId);
  const currentSectionId = useQuizStore(state => state.currentSectionId);
  const getCurrentSection = useQuizStore(state => state.getCurrentSection);
  const getSectionQuestions = useQuizStore(state => state.getSectionQuestions);
  const sections = useQuizStore(state => state.sections);
  
  const currentSection = getCurrentSection();
  const sectionQuestions = currentSection ? getSectionQuestions(currentSection.id) : [];
  
  const animateClass = animate ? "animate-fade-in stagger-4" : "";
  
  const handleStartTest = () => {
    startTest();
    navigate("/question");
  };
  
  const handleSubmitTest = () => {
    submitTest();
    navigate("/");
    toast({
      title: "Test Submitted",
      description: "Your responses have been recorded successfully.",
    });
  };
  
  const handleSubmitSection = () => {
    const sectionName = currentSection?.title || `Section ${currentSectionId}`;
    const isLastSection = currentSectionId === sections.length;
    
    if (isLastSection) {
      handleSubmitTest();
      return;
    }
    
    submitSection();
    toast({
      title: `${sectionName} Completed`,
      description: `Moving to the next section.`,
    });
  };
  
  const handleMarkForReview = () => {
    markForReview(currentQuestionId);
    toast({
      title: "Marked for Review",
      description: "This question has been marked for review.",
    });
  };
  
  if (type === 'landing') {
    let designClass = disabled
      ? "min-w-[140px] px-6 py-2.5 bg-[#ededed] text-[#71808b] rounded-lg inline-flex justify-center items-center gap-2"
      : "bg-blue-700 hover:bg-blue-800 text-white px-10 h-12 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md";
    
    return (
      <div className={`flex ${animateClass}`}>
        <Button 
          onClick={handleStartTest}
          size="lg"
          disabled={disabled}
          className={`relative text-center justify-start text-[#71808b] text-sm font-semibold font-['Inter'] leading-tight ${designClass} disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          Start Test
        </Button>
      </div>
    );
  }
  
  // For question navigation
  const isFirstQuestion = sectionQuestions.length > 0 && currentQuestionId === sectionQuestions[0].id;
  const isLastQuestion = sectionQuestions.length > 0 && currentQuestionId === sectionQuestions[sectionQuestions.length - 1].id;
  
  return (
    <div className={`flex justify-between items-center gap-3 ${animateClass}`}>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={isFirstQuestion}
          onClick={goToPreviousQuestion}
          className="flex items-center gap-1 h-9 px-3 border-gray-200 hover:bg-gray-50 hover:text-blue-700 font-medium transition-all"
        >
          <ArrowLeft size={16} />
          <span className="hidden sm:inline">Previous</span>
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleMarkForReview}
          className="flex items-center gap-1 h-9 px-3 border-gray-200 hover:bg-gray-50 hover:text-blue-700 font-medium transition-all"
        >
          <Flag size={16} />
          <span className="hidden sm:inline">Mark for Review</span>
        </Button>
      </div>
      
      <div className="flex items-center gap-2">
        {isLastQuestion ? (
          <Button
            size="sm"
            onClick={handleSubmitSection}
            className="flex items-center gap-1 h-9 px-4 bg-green-600 hover:bg-green-700 text-white font-medium transition-all"
          >
            <Check size={16} />
            <span>{currentSectionId === sections.length ? "Submit Test" : `Submit Part ${currentSectionId}`}</span>
          </Button>
        ) : (
          <Button
            size="sm"
            onClick={goToNextQuestion}
            className="flex items-center gap-1 h-9 px-3 bg-blue-700 hover:bg-blue-800 text-white font-medium transition-all"
          >
            <span className="hidden sm:inline">Next</span>
            <ArrowRight size={16} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default NavigationButtons;
