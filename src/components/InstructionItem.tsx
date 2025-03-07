
import { Card, CardContent } from "@/components/ui/card";

interface InstructionItemProps {
  title: string;
  items: string[];
  animate?: boolean;
  staggerIndex?: number;
}

const InstructionItem = ({ 
  title, 
  items, 
  animate = true,
  staggerIndex = 3
}: InstructionItemProps) => {
  const animateClass = animate 
    ? `animate-fade-in stagger-${staggerIndex}` 
    : "";
  
  return (
    <Card className={`border shadow-soft overflow-hidden ${animateClass}`}>
      <CardContent className="p-0">
        <div className="bg-gray-50 px-5 py-4 border-b">
          <h2 className="font-semibold text-lg">{title}</h2>
        </div>
        
        <div className="p-5 space-y-3">
          {items.map((item, index) => (
            <div key={index} className="flex items-start text-sm md:text-base">
              <div className="mt-1.5 mr-2.5 h-1.5 w-1.5 bg-blue-500 rounded-full flex-shrink-0" />
              <p className="text-gray-700">{item}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default InstructionItem;
