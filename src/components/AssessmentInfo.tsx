
import { Card, CardContent } from "@/components/ui/card";

interface AssessmentInfoProps {
  animate?: boolean;
}

const AssessmentInfo = ({ animate = true }: AssessmentInfoProps) => {
  const animateClass = animate ? "animate-fade-in stagger-2" : "";
  
  return (
    <Card className={`border shadow-soft overflow-hidden ${animateClass}`}>
      <CardContent className="p-0">
        <div className="bg-gray-50 px-5 py-4 border-b">
          <h2 className="font-semibold text-lg">About The Assessment</h2>
        </div>
        
        <div className="p-5 space-y-3">
          <InfoPoint text="The total duration of this test is 60 minutes." />
          <InfoPoint text="This test is of 80 Questions each of 1 Marks." />
          <InfoPoint text="Total number of sections in this test is 4." />
          <InfoPoint text="Each section comprises a duration of 15 minutes." />
          
          <div className="pt-1">
            <InfoPoint text="There are following sections in the test:" isHeading />
            <div className="pl-5 space-y-1.5 mt-2">
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
      </CardContent>
    </Card>
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
        <div className="mt-1.5 mr-2.5 h-1.5 w-1.5 bg-blue-500 rounded-full flex-shrink-0" />
      )}
      <p className={isHeading ? "font-medium" : "text-gray-700"}>
        {text}
      </p>
    </div>
  );
};

export default AssessmentInfo;
