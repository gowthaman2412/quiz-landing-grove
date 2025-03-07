
import { useState, useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';
import { useToast } from './use-toast';
import { useQuizStore } from '@/store/quizStore';

interface FaceDetectionOptions {
  minDetectionInterval?: number;
  maxNoFaceTime?: number;
  checkFrequency?: number;
}

export const useFaceDetection = ({
  minDetectionInterval = 1000,
  maxNoFaceTime = 10000,
  checkFrequency = 1000,
}: FaceDetectionOptions = {}) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isFaceDetected, setIsFaceDetected] = useState(false);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [isCheckingFace, setIsCheckingFace] = useState(false);
  const [noFaceTime, setNoFaceTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const { toast } = useToast();
  const submitTest = useQuizStore((state) => state.submitTest);
  const lastDetectionTime = useRef(0);
  const noFaceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Load face-api models
  const loadModels = async () => {
    try {
      // Set path to models
      const MODEL_URL = '/models';
      
      // Load models
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      ]);
      
      setIsInitialized(true);
      return true;
    } catch (error) {
      console.error('Failed to load face detection models:', error);
      toast({
        title: "Face detection error",
        description: "Failed to load face detection models. Please ensure you have a stable internet connection.",
        variant: "destructive",
      });
      return false;
    }
  };

  // Start camera
  const startCamera = async () => {
    if (!isInitialized) {
      const initialized = await loadModels();
      if (!initialized) return false;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setCameraEnabled(true);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Failed to start camera:', error);
      toast({
        title: "Camera access error",
        description: "Failed to access your camera. Please ensure camera permissions are granted and try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setCameraEnabled(false);
    setIsFaceDetected(false);
  };

  // Detect face
  const detectFace = async () => {
    if (!videoRef.current || !cameraEnabled || !isInitialized || !videoRef.current.readyState === 4) {
      return false;
    }
    
    // Only run detection at specific intervals
    const now = Date.now();
    if (now - lastDetectionTime.current < minDetectionInterval) {
      return isFaceDetected;
    }
    
    lastDetectionTime.current = now;
    
    try {
      setIsCheckingFace(true);
      const detection = await faceapi.detectSingleFace(
        videoRef.current,
        new faceapi.TinyFaceDetectorOptions()
      );
      
      const faceDetected = !!detection;
      setIsFaceDetected(faceDetected);
      setIsCheckingFace(false);
      
      return faceDetected;
    } catch (error) {
      console.error('Face detection error:', error);
      setIsCheckingFace(false);
      return false;
    }
  };

  // Monitor face presence
  useEffect(() => {
    if (!cameraEnabled || !isInitialized) return;
    
    // Set up timer to check for face presence
    const checkFaceInterval = setInterval(async () => {
      const faceDetected = await detectFace();
      
      if (!faceDetected) {
        setNoFaceTime(prev => prev + checkFrequency);
      } else {
        setNoFaceTime(0);
      }
    }, checkFrequency);
    
    return () => {
      clearInterval(checkFaceInterval);
    };
  }, [cameraEnabled, isInitialized, checkFrequency]);

  // Handle no face detection
  useEffect(() => {
    if (noFaceTime >= maxNoFaceTime) {
      toast({
        title: "No face detected",
        description: `No face has been detected for ${maxNoFaceTime / 1000} seconds. The test will be submitted if a face is not detected soon.`,
        variant: "destructive",
      });
      
      // Set a timer to submit the test if face still not detected
      if (noFaceTimerRef.current) {
        clearTimeout(noFaceTimerRef.current);
      }
      
      noFaceTimerRef.current = setTimeout(() => {
        if (noFaceTime >= maxNoFaceTime) {
          toast({
            title: "Test terminated",
            description: "No face detected for an extended period. The test has been submitted.",
            variant: "destructive",
          });
          
          submitTest();
        }
      }, 5000); // Give 5 more seconds before terminating
    }
    
    return () => {
      if (noFaceTimerRef.current) {
        clearTimeout(noFaceTimerRef.current);
      }
    };
  }, [noFaceTime, maxNoFaceTime, toast, submitTest]);

  return {
    videoRef,
    isFaceDetected,
    isCheckingFace,
    cameraEnabled,
    noFaceTime,
    isInitialized,
    loadModels,
    startCamera,
    stopCamera,
    detectFace,
  };
};
