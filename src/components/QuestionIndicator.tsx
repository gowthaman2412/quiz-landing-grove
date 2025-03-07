
import { QuestionStatus } from "@/store/quizStore";

interface QuestionIndicatorProps {
  status: QuestionStatus;
  number: number;
  onClick: () => void;
  isCurrent: boolean;
}

const QuestionIndicator = ({ status, number, onClick, isCurrent }: QuestionIndicatorProps) => {
  // Define status-based styling
  const getStatusStyles = () => {
    const baseClasses = "h-8 w-8 md:h-10 md:w-10 flex items-center justify-center text-sm md:text-base rounded-full transition-all duration-300 cursor-pointer border";
    
    if (isCurrent) {
      return `${baseClasses} border-2 border-blue-700 text-blue-700 font-bold animate-pulse-subtle`;
    }
    
    switch (status) {
      case 'answered':
        return `${baseClasses} bg-blue-600 text-white border-blue-600 hover:bg-blue-700`;
      case 'marked-for-review':
        return `${baseClasses} bg-orange-500 text-white border-orange-500 hover:bg-orange-600`;
      case 'answered-and-marked':
        return `${baseClasses} bg-orange-500 text-white border-orange-500 hover:bg-orange-600 ring-1 ring-offset-2 ring-orange-300`;
      case 'not-visited':
        return `${baseClasses} bg-white text-gray-600 border-gray-200 hover:border-blue-300`;
      default:
        return baseClasses;
    }
  };

  return (
    <div className={getStatusStyles()} onClick={onClick}>
      {number}
    </div>
  );
};

export default QuestionIndicator;
