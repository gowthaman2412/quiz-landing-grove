import React from 'react'

interface InstructionContentProps {
    htmlContent?: string;
    About?: string;
    generalInstructions?: string;
    procedureInstructions?: string;
    animate?: boolean;
    staggerIndex?: number;
}

function InstructionContent({ htmlContent, About, generalInstructions, procedureInstructions,  animate = true,staggerIndex = 3 }: InstructionContentProps) {
    const animateClass = animate 
    ? `animate-fade-in stagger-${staggerIndex}` 
    : "";
    return (
        <div id="instruction-content" className={`pt-8 pl-8 pr-8 pb-6 ${animateClass}`}>
            {/* Case 1: Use htmlContent if provided */}
            {htmlContent && !About && !generalInstructions && !procedureInstructions && (
                <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
            )}

            {/* Case 2: Use About, generalInstructions, procedureInstructions if provided */}
            {!htmlContent && (
                <>
                    {About && <div className='border-b' dangerouslySetInnerHTML={{ __html: About }} />}
                    {generalInstructions && <div className='border-b' dangerouslySetInnerHTML={{ __html: generalInstructions }} />}
                    {procedureInstructions && <div className='border-b' dangerouslySetInnerHTML={{ __html: procedureInstructions }} />}
                </>
            )}

            {/* Case 3: No content provided */}
            {!htmlContent && !About && !generalInstructions && !procedureInstructions && (
                <div className="text-gray-400">No instruction content available</div>
            )}
             
             {/* Case 4: Use necessary only even if all are provided */}
            {htmlContent && About && generalInstructions && procedureInstructions && (
                <>
                <div dangerouslySetInnerHTML={{ __html: About }} />
                <div dangerouslySetInnerHTML={{ __html: generalInstructions }} />
                <div dangerouslySetInnerHTML={{ __html: procedureInstructions }} />
                </>
            )}
            
        </div>
    )
}

export default InstructionContent