
import { useState } from 'react';

export const useProctoring = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Mock function that always succeeds
  const enterFullScreen = async () => {
    setIsFullScreen(true);
    return true;
  };

  const exitFullScreen = async () => {
    setIsFullScreen(false);
  };

  return { 
    isFullScreen, 
    enterFullScreen, 
    exitFullScreen, 
    warningCount: 0
  };
};
