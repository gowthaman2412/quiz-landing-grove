
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
}

const Logo = ({ size = 'medium' }: LogoProps) => {
  const sizeClasses = {
    small: 'h-6',
    medium: 'h-8',
    large: 'h-10'
  };

  return (
    <Link to="/" className="flex items-center space-x-1 transition-transform hover:scale-[1.02] active:scale-[0.98]">
      <div className="text-blue-700 font-bold flex items-center">
        <span className={`${sizeClasses[size]} flex items-center`}>
          <svg viewBox="0 0 24 24" fill="none" className="h-full w-auto" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#0052CC" fillOpacity="0.2" stroke="#0052CC" strokeWidth="1.5" />
            <path d="M8 12H16" stroke="#0052CC" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M12 16V8" stroke="#0052CC" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
        <span className={`ml-1.5 font-semibold ${size === 'small' ? 'text-lg' : 'text-xl'}`}>
          <span className="text-blue-600">Team</span>
          <span className="text-blue-800">Collar</span>
        </span>
      </div>
    </Link>
  );
};

export default Logo;
