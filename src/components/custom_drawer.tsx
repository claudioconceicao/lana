"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useSession } from "@/context/SessionContext";
import { usePathname } from "next/navigation";
import MenuButton from "./menu_button";
import AuthModal from "./auth_modal";
import { motion, AnimatePresence } from "framer-motion";

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

  const handleTriggerClick = () => {
    profile ? setIsOpen(true) : setShowLogin(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setShowLogin(false);
  };

  // Close drawer & modal on route change
  useEffect(() => {
    setIsOpen(false);
    setShowLogin(false);
  }, [pathname]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close drawer with ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      {/* Trigger button */}
      <MenuButton isScrolled={isScrolled} onClick={handleTriggerClick} />

      {/* Backdrop */}
      <div
        onClick={handleClose}
        className={`fixed inset-0 bg-black/50 z-40 transition-all duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        className={`fixed top-0 right-0 h-full bg-white shadow-lg z-50
          transform transition-transform duration-500 ease-in-out
          w-full sm:w-[400px] md:w-[500px]
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex items-center p-4 border-b text-black">
          <button
            onClick={handleClose}
            aria-label="Fechar menu"
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="flex-1 flex justify-center">
            <h2 id="drawer-title" className="text-lg font-semibold">
              {profile?.first_name} {profile?.last_name}
            </h2>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              className="p-8 text-black overflow-y-auto h-[calc(100%-64px)]"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Login Modal */}
      {!profile && showLogin && <AuthModal onClose={handleClose} />}
    </>
  );
}
