"use client";

import { MoveLeft, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoginModal from "./login_modal";
import RegisterModal from "./register_modal";

export default function AuthModal({ onClose }: { onClose: () => void }) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState<string | undefined>(undefined);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Variants for sliding
  const slideVariants = {
    hiddenLeft: { opacity: 0, x: -50 },
    hiddenRight: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exitLeft: { opacity: 0, x: -50 },
    exitRight: { opacity: 0, x: 50 },
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-xl w-[600px] p-8 shadow-lg relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            {mode === "register" ? (
              <button
                onClick={() => setMode("login")}
                className="text-gray-600 hover:text-black"
              >
                <MoveLeft className="w-6 h-6 text-black" />
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={onClose}
              className="text-gray-600 hover:text-black"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Animated Body */}
          <div className="relative min-h-[400px] flex items-center justify-center ">
            <AnimatePresence mode="wait">
              {mode === "login" ? (
                <motion.div
                  key="login"
                  variants={slideVariants}
                  initial="hiddenLeft"
                  animate="visible"
                  exit="exitRight"
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="absolute w-full"
                >
                  <LoginModal
                    setRegEmail={(e) => setEmail(e)}
                    onSwitch={() => setMode("register")}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="register"
                  variants={slideVariants}
                  initial="hiddenRight"
                  animate="visible"
                  exit="exitLeft"
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="absolute w-full"
                >
                  <RegisterModal
                    email={email}
                    onSwitch={() => setMode("login")}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
