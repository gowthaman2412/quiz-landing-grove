
import React, { useEffect, useState } from "react";

interface CameraPreviewProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  isFaceDetected: boolean;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  size?: 'small' | 'medium' | 'large';
}

const CameraPreview = ({ 
  videoRef, 
  isFaceDetected,
  position = 'bottom-right',
  size = 'small'
}: CameraPreviewProps) => {
  const [showControls, setShowControls] = useState(false);
  
  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4'
  };
  
  const sizeClasses = {
    'small': 'w-32 h-24',
    'medium': 'w-48 h-36',
    'large': 'w-64 h-48'
  };
  
  return (
    <div 
      className={`fixed ${positionClasses[position]} z-50 overflow-hidden rounded-lg border-2 transition-all duration-300 ${isFaceDetected ? 'border-green-500' : 'border-red-500 animate-pulse'} shadow-lg`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={`${sizeClasses[size]} bg-black object-cover`}
      />
      
      {showControls && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/70 py-1 px-2 text-xs text-white">
          {isFaceDetected ? 'Face detected ✓' : 'No face detected ✗'}
        </div>
      )}
    </div>
  );
};

export default CameraPreview;
