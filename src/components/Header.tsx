
import Logo from "./Logo";
import UserAvatar from "./UserAvatar";
import { Search } from "lucide-react";
import { useIsMobile } from "../hooks/use-mobile";

const Header = () => {
  const isMobile = useIsMobile();

  return (
    <header className="w-full h-16 bg-white border-b py-3 px-4 md:px-6 flex items-center justify-between sticky top-0 z-50 shadow-soft animate-fade-in">
      <div className="flex h-7 w-36 items-center">
        <Logo size={isMobile ? "small" : "medium"} />
      </div>
      
      <div className="flex items-center gap-2 md:gap-4">
        <UserAvatar size={isMobile ? "small" : "medium"} />
      </div>
    </header>
  );
};

export default Header;
