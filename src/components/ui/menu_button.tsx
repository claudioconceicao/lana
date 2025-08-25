import {
  Bars3Icon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";

import { useState } from "react";


const MenuButton = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenuBtn = () => {
        setIsMenuOpen(!isMenuOpen); 
    }
    return (
        <div>
                 <button
              className={"bg-transparent w-lg h-9 hover:shadow- border p-2 gap-2 rounded-md inline-flex justify-evenly items-center"}
              onClick={toggleMenuBtn}
            >
              <Bars3Icon className="w-5 h-5" />
              <UserCircleIcon className="w-5 h-5" />
            </button>
        </div>
      );
}

export default MenuButton;