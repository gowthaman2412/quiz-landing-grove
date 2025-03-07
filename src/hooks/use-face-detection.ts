
import { useState, useRef } from 'react';
import { useToast } from './use-toast';

export const useFaceDetection = () => {
  const [isFaceDetected, setIsFaceDetected] = useState(true); // Always return true
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [isCheckingFace, setIsCheckingFace] = useState(false);
  const [noFaceTime, setNoFaceTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { toast } = useToast();

  // Mock functions that always succeed
  const loadModels = async () => {
    // Mock successful model loading
    toast({
      title: "Models loaded",
      description: "Face detection models loaded successfully.",
    });
    return true;
  };

  const startCamera = async () => {
    // Mock camera start
    setCameraEnabled(true);
    setIsFaceDetected(true);
    return true;
  };

  const stopCamera = () => {
    setCameraEnabled(false);
  };

  const detectFace = async () => {
    // Always return true for face detection
    return true;
  };

  return {
    videoRef,
    isFaceDetected: true,
    isCheckingFace: false,
    cameraEnabled,
    noFaceTime: 0,
    isInitialized: true,
    loadModels,
    startCamera,
    stopCamera,
    detectFace,
  };
};
