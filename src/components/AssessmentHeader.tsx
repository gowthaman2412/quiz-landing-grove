
import { useIsMobile } from "@/hooks/use-mobile";

interface AssessmentHeaderProps {
  animate?: boolean;
}

const AssessmentHeader = ({ animate = true }: AssessmentHeaderProps) => {
  const isMobile = useIsMobile();
  
  const animationClasses = animate 
    ? "animate-fade-in stagger-1" 
    : "";

  return (
    <div className="w-full bg-blue-700 text-white rounded-lg overflow-hidden shadow-medium">
      <div className={`px-5 py-6 md:px-8 md:py-8 relative ${animationClasses}`}>
        <div className="absolute right-0 top-0 bottom-0 pointer-events-none">
          <div className="h-full w-full max-w-[300px] opacity-20">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-full">
              <path fill="#FFFFFF" d="M40.9,-49.5C55.1,-39.3,70.2,-27.5,75.3,-12.2C80.4,3.1,75.6,21.9,65.5,35.6C55.4,49.4,40.1,58.2,23.4,64.8C6.8,71.4,-11.2,75.9,-28.2,71.6C-45.2,67.3,-61.2,54.1,-71.4,37.2C-81.7,20.3,-86.2,-0.3,-79.7,-16.6C-73.2,-32.9,-55.7,-44.9,-39.6,-54.8C-23.5,-64.7,-8.7,-72.4,3.4,-76.2C15.5,-80,31,-59.7,40.9,-49.5Z" transform="translate(100 100)" />
            </svg>
          </div>
        </div>
        
        <div className="relative z-10">
          <div className="uppercase tracking-wide text-blue-100 text-xs font-medium mb-1">
            ASSESSMENT
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">STEM Assessment</h1>
          <p className="text-sm md:text-base text-blue-50 mb-4 max-w-3xl">
            The intent of this awareness course is to help the students understand all that is needed to know about the industry in which they will work in the future and progress their career.
          </p>
          
          <div className="flex flex-wrap gap-2 md:gap-4 text-xs md:text-sm font-medium">
            <div className="flex items-center gap-1">
              <div className="h-1.5 w-1.5 bg-blue-300 rounded-full"></div>
              <span>4 Parts</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-1.5 w-1.5 bg-blue-300 rounded-full"></div>
              <span>10 Questions per part</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-1.5 w-1.5 bg-blue-300 rounded-full"></div>
              <span>2 Hours</span>
            </div>
          </div>
        </div>
        
        {!isMobile && (
          <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
            <div className="w-24 h-24 md:w-28 md:h-28 relative animate-pulse-subtle">
              <img 
                src="/lovable-uploads/2d0fe2e2-556c-4045-8fd8-bc689655e47b.png" 
                alt="STEM" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssessmentHeader;
