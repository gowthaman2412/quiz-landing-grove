
import Header from "@/components/Header";
import AssessmentHeader from "@/components/AssessmentHeader";
import AssessmentInfo from "@/components/AssessmentInfo";
import InstructionItem from "@/components/InstructionItem";
import NavigationButtons from "@/components/NavigationButtons";
import { useEffect, useState } from "react";
import { useQuizStore } from "@/store/quizStore";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

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
  const testStarted = useQuizStore((state) => state.testStarted);
  const testSubmitted = useQuizStore((state) => state.testSubmitted);

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
      
      <main className="flex-1 container max-w-5xl px-4 py-6 md:py-8">
        <div className="space-y-6 md:space-y-8">
          <AssessmentHeader animate={!loading} />
          
          <div className="grid md:grid-cols-1 gap-6">
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
          </div>
          
          <div className={`border rounded-lg bg-white p-5 shadow-soft ${loading ? "" : "animate-fade-in stagger-5"}`}>
            <div className="flex items-start gap-2">
              <Checkbox 
                id="terms" 
                checked={agreeTerms}
                onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                className="mt-1"
              />
              <Label htmlFor="terms" className="text-sm text-gray-700">
                I have read all the instructions carefully and have understood them. I agree not to cheat or use unfair means in this examination. I understand that using unfair means of any sort for my own or someone else's advantage will lead to my immediate disqualification. The decision of TeamCollar.com will be final in these matters and cannot be appealed.
              </Label>
            </div>
          </div>
          
          <div className="pt-2">
            <NavigationButtons 
              type="landing" 
              animate={!loading} 
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
