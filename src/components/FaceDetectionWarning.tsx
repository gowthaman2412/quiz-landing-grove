
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertCircle } from "lucide-react";

interface FaceDetectionWarningProps {
  show: boolean;
  timeRemaining: number;
  maxTime: number;
}

const FaceDetectionWarning = ({ 
  show, 
  timeRemaining, 
  maxTime 
}: FaceDetectionWarningProps) => {
  const [progress, setProgress] = useState(100);
  
  useEffect(() => {
    if (show) {
      const percentage = ((maxTime - timeRemaining) / maxTime) * 100;
      setProgress(100 - percentage);
    } else {
      setProgress(100);
    }
  }, [timeRemaining, show, maxTime]);
  
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-[90%] max-w-md shadow-lg">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-3 text-red-500">
            <AlertCircle size={24} className="animate-pulse" />
            <h3 className="text-lg font-semibold">Face Not Detected</h3>
          </div>
          
          <p className="text-gray-700">
            Please position your face properly in front of the camera. The test will be terminated if your face is not detected within {Math.ceil(timeRemaining / 1000)} seconds.
          </p>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Time remaining</span>
              <span>{Math.ceil(timeRemaining / 1000)}s</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FaceDetectionWarning;
