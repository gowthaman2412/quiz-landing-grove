
import { useIsMobile } from "@/hooks/use-mobile";
import ufo from '../assets/ufo.svg'
import lgRec from '../assets/bgLgRec.svg'
import smRec from '../assets/bgSmRec.svg'

interface AssessmentHeaderProps {
  animate?: boolean;
}

const AssessmentHeader = ({ animate = true }: AssessmentHeaderProps) => {
  const isMobile = useIsMobile();

  const animationClasses = animate
    ? "animate-fade-in stagger-1"
    : "";

  return (
    <div id="AssessmentHeader" className="mb-5 w-full h-56 bg-[#0049b5] text-white rounded-lg overflow-hidden shadow-medium">
      <div className={`px-5 py-6 md:px-8 md:py-8 relative ${animationClasses}`}>
        <div className="absolute right-0 top-0 bottom-0 pointer-events-none">
          <div className="h-full w-full max-w-[300px] opacity-20">
          {/* <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-96 w-96  relative top-10 rotate-[-45.71deg]">
            <rect className="w-[206.86px] h-[478.47px] " fill="#f9fffb" opacity="0.8"/>
          </svg> */}
          <div className="bg-[#f9fffb]/50 w-[33px] h-[330%] left-[0px] top-[-185%] absolute rotate-[38deg]" />
           <div className="bg-[#f9fffb]/50 w-[206.86px] h-[250%] left-[0px] top-[-90%] z-10 relative rotate-[38.71deg]"/>
          </div>
        </div>

        <div className="relative z-9">
          <div className="uppercase tracking-wide text-blue-100 text-xs font-medium mb-4">
            ASSESSMENT
          </div>
          <div className="relative mb-2 justify-start text-white text-[32px] font-bold font-['Inter'] leading-[35px]">STEM Assessment</div>
          <div className="w-[75%] mb-6 self-stretch justify-start text-white text-sm font-['Inter'] leading-[20px]">The intent of this awareness course is to help the students understand all that is needed to know about the industry in which they will work in the future and progress their career. </div>


          <div className="w-full h-5 inline-flex justify-start items-center gap-2">
            <div className="relative justify-start text-[#e2ebf3] text-sm font-normal font-['Inter'] leading-tight">4 Parts</div>
            <div className="w-1 h-1 relative bg-[#e2ebf3] rounded-full" />
            <div className="relative justify-start text-[#e2ebf3] text-sm font-normal font-['Inter'] leading-tight">10 Questions per part</div>
            <div className="w-1 h-1 relative bg-[#e2ebf3] rounded-full" />
            <div className="relative justify-start text-[#e2ebf3] text-sm font-normal font-['Inter'] leading-tight">2 Hours</div>
          </div>
        </div>

        {!isMobile && (
          <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
            <div className="w-24 h-24 md:w-28 md:h-28 relative">
              <div className="w-full right-9 h-full relative scale-[130%] bg-[#ffecf1] rounded-full" >
                {/* <img 
                src={ufo}
                alt="STEM" 
                className="w-48 h-52 object-contain mb"
              /> */}
                <img className="w-full h-full scale-[197%] pt-1 z-10 relative rotate-[0deg]" src={ufo} />              
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssessmentHeader;
