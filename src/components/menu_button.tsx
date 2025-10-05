import { Bars3Icon } from "@heroicons/react/24/solid";
import { UserRound } from "lucide-react";
import { useSession } from "@/context/SessionContext";
import { TbMenu3 } from "react-icons/tb";

const MenuButton = ({ isScrolled, onClick }: { isScrolled: boolean, onClick: ()=> void }) => {
    const { profile } = useSession();

    const initial = profile?.first_name?.[0]?.toUpperCase();
    return (
   <button
           onClick={onClick}
           className={`
             flex items-center gap-3 h-[43px] px-2 rounded-md border border-gray-200 shadow
             transition-all duration-200 hover:shadow-lg
             ${isScrolled ? "text-black" : "text-white hover:bg-white/10"}
           `}
         >
           <TbMenu3 className="w-5 h-5" />
           {profile ? (
             <div
               className={`
                 flex items-center justify-center w-7 h-7 rounded-full font-medium text-sm
                 ${
                   isScrolled ? "bg-black text-white" : "bg-transparent text-white"
                 }
               `}
             >
               {initial}
             </div>
           ) : (
             <UserRound className="w-5 h-5" />
           )}
         </button>
    );
};

export default MenuButton;
