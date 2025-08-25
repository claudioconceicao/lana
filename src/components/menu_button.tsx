import { Bars3Icon } from "@heroicons/react/24/solid";
import { UserCircleIcon } from "lucide-react";
import { useSession } from "@/context/SessionContext";

const MenuButton = ({ isScrolled }: { isScrolled: boolean }) => {
    const { profile } = useSession();

    const initial = profile?.full_name?.[0]?.toUpperCase();
    return (
    <button
        className={`${
        isScrolled
            ? "border-1 text-black hover:bg-gray-100 hover:border-transparent"
            : "border-[0.6px] text-white hover:bg-white/10"
        } px-3 py-1 rounded-md inline-flex justify-between items-center gap-3
        transition-colors duration-200
        hover:shadow-lg hover:border-gray-200 cursor-pointer`}
    >
        <Bars3Icon className="w-5 h-5" />
        {profile?.full_name ? (
        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-orange-500 text-black font-medium text-sm">
            {initial}
        </div>
        ) : (
        <UserCircleIcon className="w-6 h-6" />
        )}
    </button>
    );
};

export default MenuButton;
