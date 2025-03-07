
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";

interface UserAvatarProps {
  size?: 'small' | 'medium' | 'large';
}

const UserAvatar = ({ size = 'medium' }: UserAvatarProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const sizeClasses = {
    small: 'h-8 w-8',
    medium: 'h-10 w-10',
    large: 'h-12 w-12'
  };

  return (
    <div className={`relative ${isLoaded ? 'animate-scale-in' : 'opacity-0'}`}>
      <Avatar className={`${sizeClasses[size]} border-2 border-white shadow-soft transition-all duration-300 hover:shadow-medium`}>
        <AvatarImage src="/lovable-uploads/f2bdb198-4d32-4ce0-b3c5-a60901f84d13.png" alt="User" />
        <AvatarFallback className="bg-blue-100 text-blue-800">U</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default UserAvatar;
