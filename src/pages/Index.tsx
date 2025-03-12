
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import AssessmentHeader from "../components/AssessmentHeader";
import AssessmentInfo from "../components/AssessmentInfo";
import InstructionItem from "../components/InstructionItem";
import NavigationButtons from "../components/NavigationButtons";
import { useQuizStore } from "../store/quizStore";
import { Checkbox } from "../components/ui/radix-checkbox";
import { Label } from "../components/ui/radix-label";
import TestNavigation from "../components/NavigationLegends";
import StemBreadCrumb from "../components/StemBreadCrumb";

const generalInstructions = [
  "Each question is timed",
  "Do not use search engines or get help from others",
  "Once you've submitted an answer, you cannot go back",
  "You may exit the test, but the timer will continue to run",
  "You can retake the assessment every 60 days"
];

const procedureInstructions = [
  "Read the type of question mentioned above the question carefully before answering the question",
  "To deselect your chosen answer, click on the bubble of the chosen option again.",
  "To change your chosen answer, click on the bubble of another option.",
  "To save your answer, you MUST click on the any one of the options.",
  "If an answer is selected for a question that is Marked for Review, that answer will be considered in the evaluation unless the deselected by the candidate.",
  "To change your answer to a question that has already been answered, first select that question for answering and then follow the procedure for answering that type of question.",
  "Note that ONLY Questions for which answers are saved or marked for review after answering will be considered for evaluation."
];

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const testStarted = useQuizStore((state:any) => state.testStarted);
  const testSubmitted = useQuizStore((state:any) => state.testSubmitted);

  useEffect(() => {
    // Simulate loading to show animations
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <StemBreadCrumb/>
      <main className="flex-1 container max-w-6xl md:py-8">
        <div className="space-y-5 md:space-y-5">
          <AssessmentHeader animate={!loading} />
          
          <div className="px-8 py-8 mt-15 border-[0.1px] bg-white rounded-xl">
            <AssessmentInfo animate={!loading} />
            
            <InstructionItem 
              title="General Instructions" 
              items={generalInstructions}
              animate={!loading}
              staggerIndex={3}
            />
            
            <InstructionItem 
              title="Procedure For Answering A Question" 
              items={procedureInstructions}
              animate={!loading}
              staggerIndex={4}
            />
            <TestNavigation />
          </div>
          
          <div className="flex items-start gap-2">
            <Checkbox 
              id="terms" 
              checked={agreeTerms}
              onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
              className="mt-1"
            />
            <Label htmlFor="terms" className="self-stretch relative justify-start text-[#696a6f] text-xs font-normal font-['Inter'] leading-5">
              I have read all the instructions carefully and have understood them. I agree not to cheat or use unfair means in this examination. I understand that using unfair means of any sort for my own or someone else's advantage will lead to my immediate disqualification. The decision of TeamCollar.com will be final in these matters and cannot be appealed.
            </Label>
          </div>          
          <div className="">
            <NavigationButtons 
              type="landing" 
              animate={!loading}
              disabled={!agreeTerms}
            />
          </div>
          
          {testSubmitted && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-5 text-center animate-fade-in">
              <h3 className="text-green-800 font-medium text-lg mb-2">Test Submitted Successfully</h3>
              <p className="text-green-700">Thank you for completing the STEM Assessment.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
