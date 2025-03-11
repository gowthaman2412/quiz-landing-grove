
import React from 'react';

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
    <div className="bg-white mt-6 pb-6 border-b">
        <div className="mb-3">
          <h2 className="font-semibold text-lg">{title}</h2>
        </div>
        
        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={index} className="flex items-start text-sm md:text-base">
              <div className="mt-2.5 mr-2.5 h-1.5 w-1.5 bg-[#696a6f] font-normal rounded-full flex-shrink-0" />
              <p className="text-[#696a6f]">{item}</p>
            </div>
          ))}
        </div>
    </div>
  );
};

export default InstructionItem;
