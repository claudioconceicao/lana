"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useSession } from "@/context/SessionContext";
import { usePathname, useSearchParams } from "next/navigation";
import MenuButton from "./menu_button";
import AuthModal from "./auth_modal";

export default function CustomDrawer({
  children,
  isScrolled = false,
}: {
  children: React.ReactNode;
  isScrolled: boolean;
}) {
  const pathname = usePathname();
  const { profile } = useSession();

  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // Trigger action
  const handleTriggerClick = () => {
    profile ? setIsOpen(true) : setShowLogin(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setShowLogin(false);
  };

  useEffect(() => {
    setIsOpen(false);
    setShowLogin(false);
  }, [pathname]);

  return (
    <>
      {/* Trigger button */}
      <MenuButton isScrolled={isScrolled} onClick={handleTriggerClick} />

      {/* Drawer backdrop */}
      {profile && (
        <div
          onClick={() => setIsOpen(false)}
          className={`
            fixed inset-0 bg-black/50 z-40 transition-opacity duration-300
            ${
              isOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }
          `}
        />
      )}

      {/* Drawer */}
      {profile && (
        <div
          className={`
            fixed top-0 right-0 h-full w-[500px] bg-white shadow-lg z-50
            transform transition-transform duration-500 smooth ease-in-out
            ${isOpen ? "translate-x-0" : "translate-x-full"}
          `}
        >
          <div className="flex items-center p-4 border-b text-black">
            <button onClick={handleClose}>
              <X className="w-6 h-6 cursor-pointer" />
            </button>
            <div className="flex-1 flex justify-center">
              <h2 className="text-lg">
                {profile?.first_name} {profile.last_name}
              </h2>
            </div>
          </div>
          <div className="p-8 text-black">{children}</div>
        </div>
      )}

      {/* Login modal */}
      {!profile && showLogin && <AuthModal onClose={handleClose} />}
    </>
  );
}
