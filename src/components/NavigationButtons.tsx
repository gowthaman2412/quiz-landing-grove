
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Flag, Check } from "lucide-react";
import { useQuizStore } from "@/store/quizStore";
import { useToast } from "@/hooks/use-toast";
import { useProctoring } from "@/hooks/use-proctoring";
import { useFaceDetection } from "@/hooks/use-face-detection";
import { useState } from "react";
import FaceDetectionWarning from "./FaceDetectionWarning";

interface NavigationButtonsProps {
  type: 'landing' | 'question';
  animate?: boolean;
}

const NavigationButtons = ({ type, animate = true }: NavigationButtonsProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [verifyingFace, setVerifyingFace] = useState(false);
  
  const startTest = useQuizStore(state => state.startTest);
  const submitTest = useQuizStore(state => state.submitTest);
  const submitSection = useQuizStore(state => state.submitSection);
  const goToNextQuestion = useQuizStore(state => state.goToNextQuestion);
  const goToPreviousQuestion = useQuizStore(state => state.goToPreviousQuestion);
  const markForReview = useQuizStore(state => state.markForReview);
  const currentQuestionId = useQuizStore(state => state.currentQuestionId);
  const currentSectionId = useQuizStore(state => state.currentSectionId);
  const getCurrentSection = useQuizStore(state => state.getCurrentSection);
  const getSectionQuestions = useQuizStore(state => state.getSectionQuestions);
  const questions = useQuizStore(state => state.questions);
  const sections = useQuizStore(state => state.sections);
  
  // Add proctoring hooks
  const { enterFullScreen } = useProctoring();
  const {
    videoRef,
    isFaceDetected,
    cameraEnabled,
    noFaceTime,
    loadModels,
    startCamera,
    stopCamera,
  } = useFaceDetection({ maxNoFaceTime: 10000 });
  
  const currentSection = getCurrentSection();
  const sectionQuestions = currentSection ? getSectionQuestions(currentSection.id) : [];
  
  const animateClass = animate ? "animate-fade-in stagger-4" : "";
  
  const handleStartTest = async () => {
    // First load face api models and initialize
    toast({
      title: "Initializing...",
      description: "Preparing security measures for the test. Please wait.",
    });
    
    await loadModels();
    
    // Request camera access and verify face
    toast({
      title: "Camera Access Required",
      description: "Please allow access to your camera for proctoring purposes.",
    });
    
    const cameraStarted = await startCamera();
    if (!cameraStarted) {
      toast({
        title: "Camera Access Denied",
        description: "Camera access is required to proceed with the test.",
        variant: "destructive",
      });
      return;
    }
    
    // Verify face is present
    setVerifyingFace(true);
    
    // Wait for face detection before proceeding
    let faceDetectionSuccess = false;
    let attemptsRemaining = 10;
    
    while (attemptsRemaining > 0 && !faceDetectionSuccess) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      faceDetectionSuccess = isFaceDetected;
      attemptsRemaining--;
    }
    
    if (!faceDetectionSuccess) {
      toast({
        title: "Face Not Detected",
        description: "We couldn't detect your face. Please ensure proper lighting and position your face in the camera view.",
        variant: "destructive",
      });
      stopCamera();
      setVerifyingFace(false);
      return;
    }
    
    setVerifyingFace(false);
    
    // Enter fullscreen
    const fullscreenSuccess = await enterFullScreen();
    if (!fullscreenSuccess) {
      toast({
        title: "Fullscreen Required",
        description: "Fullscreen mode is required to proceed with the test.",
        variant: "destructive",
      });
      stopCamera();
      return;
    }
    
    startTest();
    navigate("/question");
  };
  
  const handleSubmitTest = () => {
    submitTest();
    navigate("/");
    document.exitFullscreen().catch(err => console.error("Exit fullscreen error:", err));
    stopCamera();
    toast({
      title: "Test Submitted",
      description: "Your responses have been recorded successfully.",
    });
  };
  
  const handleSubmitSection = () => {
    const sectionName = currentSection?.title || `Section ${currentSectionId}`;
    const isLastSection = currentSectionId === sections.length;
    
    if (isLastSection) {
      handleSubmitTest();
      return;
    }
    
    submitSection();
    toast({
      title: `${sectionName} Completed`,
      description: `Moving to the next section.`,
    });
  };
  
  const handleMarkForReview = () => {
    markForReview(currentQuestionId);
    toast({
      title: "Marked for Review",
      description: "This question has been marked for review.",
    });
  };
  
  if (type === 'landing') {
    return (
      <>
        <div className={`flex justify-center ${animateClass}`}>
          <Button 
            onClick={handleStartTest}
            size="lg"
            className="bg-blue-700 hover:bg-blue-800 text-white px-10 h-12 rounded-full shadow-soft transition-all duration-300 hover:shadow-medium"
            disabled={verifyingFace}
          >
            {verifyingFace ? "Verifying Face..." : "Start Test"}
          </Button>
        </div>
        
        {/* Hidden video element for face detection */}
        <div className="hidden">
          <video ref={videoRef} autoPlay playsInline muted />
        </div>
        
        {/* Face detection warning */}
        <FaceDetectionWarning 
          show={verifyingFace && !isFaceDetected} 
          timeRemaining={10000 - noFaceTime} 
          maxTime={10000}
        />
      </>
    );
  }
  
  // For question navigation
  const isFirstQuestion = sectionQuestions.length > 0 && currentQuestionId === sectionQuestions[0].id;
  const isLastQuestion = sectionQuestions.length > 0 && currentQuestionId === sectionQuestions[sectionQuestions.length - 1].id;
  
  return (
    <div className={`flex justify-between items-center gap-3 ${animateClass}`}>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={isFirstQuestion}
          onClick={goToPreviousQuestion}
          className="flex items-center gap-1 h-9 px-3 border-gray-200 hover:bg-gray-50 hover:text-blue-700 font-medium transition-all"
        >
          <ArrowLeft size={16} />
          <span className="hidden sm:inline">Previous</span>
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleMarkForReview}
          className="flex items-center gap-1 h-9 px-3 border-gray-200 hover:bg-gray-50 hover:text-blue-700 font-medium transition-all"
        >
          <Flag size={16} />
          <span className="hidden sm:inline">Mark for Review</span>
        </Button>
      </div>
      
      <div className="flex items-center gap-2">
        {isLastQuestion ? (
          <Button
            size="sm"
            onClick={handleSubmitSection}
            className="flex items-center gap-1 h-9 px-4 bg-green-600 hover:bg-green-700 text-white font-medium transition-all"
          >
            <Check size={16} />
            <span>{currentSectionId === sections.length ? "Submit Test" : `Submit Part ${currentSectionId}`}</span>
          </Button>
        ) : (
          <Button
            size="sm"
            onClick={goToNextQuestion}
            className="flex items-center gap-1 h-9 px-3 bg-blue-700 hover:bg-blue-800 text-white font-medium transition-all"
          >
            <span className="hidden sm:inline">Next</span>
            <ArrowRight size={16} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default NavigationButtons;
