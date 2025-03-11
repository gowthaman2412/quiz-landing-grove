
import React from "react";

interface AssessmentInfoProps {
  animate?: boolean;
}

const AssessmentInfo = ({ animate = true }: AssessmentInfoProps) => {
  const animateClass = animate ? "animate-fade-in stagger-2" : "";
  
  return (
    <div className="bg-white relative border-b pb-6">
      <div className="self-stretch relative justify-start text-[#00213d] text-base font-bold font-['Inter'] mb-3">About The Assessment</div>
      
      <div className="space-y-2 ">
        <InfoPoint text="The total duration of this test is 60 minutes." />
        <InfoPoint text="This test is of 80 Questions each of 1 Marks." />
        <InfoPoint text="Total number of sections in this test is 4." />
        <InfoPoint text="Each section comprises a duration of 15 minutes." />
        <InfoPoint text="There are following sections in the test:" />

        <div className="pl-3">
          <div className="pl-5 space-y-1">
            <InfoPoint text="Section 1 is Science consisting of 20 questions." indent />
            <InfoPoint text="Section 2 is Technology consisting of 20 questions." indent />
            <InfoPoint text="Section 3 is Engineering Awareness consisting of 20 questions." indent />
            <InfoPoint text="Section 4 is Mathematics consisting of 20 questions." indent />
          </div>
        </div>
        
        <InfoPoint text="There will be a sectional cutoff of ⅓ for each section and an overall cutoff of ⅓." />
        <InfoPoint text="No Marks will be deducted for un-attempted Questions" />
        <InfoPoint text="You are advised to not close the browser window before submitting the test." />
      </div>
    </div> 
  );  
};

interface InfoPointProps {
  text: string;
  isHeading?: boolean;
  indent?: boolean;
}

const InfoPoint = ({ text, isHeading = false, indent = false }: InfoPointProps) => {
  return (
    <div className={`flex ${indent ? '' : 'items-start'} text-sm md:text-base`}>
      {!isHeading && !indent && (
        <div className="mt-[8.5px] mr-3 h-1.5 w-1.5 bg-[#696a6f] rounded-full flex-shrink-0" />
      )}
      <p className="self-stretch relative justify-start text-[#696a6f] text-base font-normal font-['Inter'] leading-[25px]">
        {text}
      </p>
    </div>
  );
};

export default AssessmentInfo;
