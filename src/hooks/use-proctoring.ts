
import { useState, useEffect, useRef } from 'react';
import { useToast } from './use-toast';
import { useQuizStore } from '@/store/quizStore';

interface ProctoringOptions {
  enableFullScreen?: boolean;
  detectTabSwitching?: boolean;
  maxWarnings?: number;
}

export const useProctoring = ({
  enableFullScreen = true,
  detectTabSwitching = true,
  maxWarnings = 3,
}: ProctoringOptions = {}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [warningCount, setWarningCount] = useState(0);
  const { toast } = useToast();
  const warningCountRef = useRef(0);
  const submitTest = useQuizStore((state) => state.submitTest);

  // Enter full screen
  const enterFullScreen = async () => {
    try {
      const docElement = document.documentElement;
      if (docElement.requestFullscreen) {
        await docElement.requestFullscreen();
        setIsFullScreen(true);
        return true;
      } else {
        toast({
          title: "Fullscreen not supported",
          description: "Your browser doesn't support fullscreen mode, which is required for this test.",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error("Fullscreen error:", error);
      toast({
        title: "Fullscreen error",
        description: "Failed to enter fullscreen mode. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  // Exit full screen
  const exitFullScreen = async () => {
    try {
      if (document.fullscreenElement && document.exitFullscreen) {
        await document.exitFullscreen();
        setIsFullScreen(false);
      }
    } catch (error) {
      console.error("Exit fullscreen error:", error);
    }
  };

  // Handle tab/window visibility change
  useEffect(() => {
    if (!detectTabSwitching) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        warningCountRef.current += 1;
        setWarningCount(warningCountRef.current);
        
        if (warningCountRef.current <= maxWarnings) {
          toast({
            title: `Warning ${warningCountRef.current} of ${maxWarnings}`,
            description: `You have switched tabs or windows. This is against the test policy. ${maxWarnings - warningCountRef.current} warnings remaining before the test is terminated.`,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Test terminated",
            description: "You have exceeded the maximum number of tab switching warnings. The test will now be submitted.",
            variant: "destructive",
          });
          
          // Auto-submit the test
          submitTest();
          
          // Exit fullscreen if enabled
          if (enableFullScreen) {
            exitFullScreen();
          }
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [detectTabSwitching, maxWarnings, toast, submitTest, enableFullScreen]);

  // Handle exit from fullscreen
  useEffect(() => {
    if (!enableFullScreen) return;

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && isFullScreen) {
        setIsFullScreen(false);
        warningCountRef.current += 1;
        setWarningCount(warningCountRef.current);
        
        if (warningCountRef.current <= maxWarnings) {
          toast({
            title: `Warning ${warningCountRef.current} of ${maxWarnings}`,
            description: `You have exited fullscreen mode. This is against the test policy. ${maxWarnings - warningCountRef.current} warnings remaining before the test is terminated.`,
            variant: "destructive",
          });
          
          // Try to re-enter fullscreen
          setTimeout(() => {
            enterFullScreen();
          }, 1000);
        } else {
          toast({
            title: "Test terminated",
            description: "You have exceeded the maximum number of fullscreen exit warnings. The test will now be submitted.",
            variant: "destructive",
          });
          
          // Auto-submit the test
          submitTest();
        }
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [enableFullScreen, isFullScreen, maxWarnings, toast, submitTest]);

  // Prevent keyboard shortcuts
  useEffect(() => {
    if (!isFullScreen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent most keyboard shortcuts
      const isFunctionKey = e.key.startsWith('F') && e.key.length > 1;
      const isCtrlKey = e.ctrlKey || e.metaKey;
      const isAltKey = e.altKey;
      
      if (isFunctionKey || isCtrlKey || isAltKey) {
        e.preventDefault();
        e.stopPropagation();
        
        toast({
          title: "Keyboard shortcuts disabled",
          description: "Keyboard shortcuts are disabled during the test.",
        });
        
        return false;
      }
    };

    window.addEventListener("keydown", handleKeyDown, true);

    return () => {
      window.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [isFullScreen, toast]);

  return { 
    isFullScreen, 
    enterFullScreen, 
    exitFullScreen, 
    warningCount
  };
};
