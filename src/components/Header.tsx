
import Logo from "./Logo";
import UserAvatar from "./UserAvatar";
import { Search } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const isMobile = useIsMobile();

  return (
    <header className="w-full bg-white border-b py-3 px-4 md:px-6 flex items-center justify-between sticky top-0 z-50 shadow-soft animate-fade-in">
      <div className="flex items-center">
        <Logo size={isMobile ? "small" : "medium"} />
      </div>
      
      <div className="flex items-center gap-2 md:gap-4">
        {!isMobile && (
          <div className="relative">
            <div className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Search size={16} />
            </div>
            <input
              type="text"
              placeholder="STEM Assessment"
              className="h-9 pl-8 pr-4 rounded-full bg-gray-100 border-0 text-sm focus:ring-1 focus:ring-blue-400 w-40 md:w-48"
            />
          </div>
        )}
        
        <UserAvatar size={isMobile ? "small" : "medium"} />
      </div>
    </header>
  );
};

export default Header;
