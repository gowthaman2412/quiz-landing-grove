
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Flag, Check } from "lucide-react";
import { useQuizStore } from "@/store/quizStore";
import { useToast } from "@/hooks/use-toast";

interface NavigationButtonsProps {
  type: 'landing' | 'question';
  animate?: boolean;
}

const NavigationButtons = ({ type, animate = true }: NavigationButtonsProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const startTest = useQuizStore(state => state.startTest);
  const submitTest = useQuizStore(state => state.submitTest);
  const goToNextQuestion = useQuizStore(state => state.goToNextQuestion);
  const goToPreviousQuestion = useQuizStore(state => state.goToPreviousQuestion);
  const markForReview = useQuizStore(state => state.markForReview);
  const currentQuestionId = useQuizStore(state => state.currentQuestionId);
  const questions = useQuizStore(state => state.questions);
  
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
  
  const handleMarkForReview = () => {
    markForReview(currentQuestionId);
    toast({
      title: "Marked for Review",
      description: "This question has been marked for review.",
    });
  };
  
  if (type === 'landing') {
    return (
      <div className={`flex justify-center ${animateClass}`}>
        <Button 
          onClick={handleStartTest}
          size="lg"
          className="bg-blue-700 hover:bg-blue-800 text-white px-10 h-12 rounded-full shadow-soft transition-all duration-300 hover:shadow-medium"
        >
          Start Test
        </Button>
      </div>
    );
  }
  
  // For question navigation
  const isFirstQuestion = currentQuestionId === 1;
  const isLastQuestion = currentQuestionId === questions.length;
  
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
            onClick={handleSubmitTest}
            className="flex items-center gap-1 h-9 px-4 bg-green-600 hover:bg-green-700 text-white font-medium transition-all"
          >
            <Check size={16} />
            <span>Submit Test</span>
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
