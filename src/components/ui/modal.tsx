"use client";

import { useState, useEffect, useRef, MouseEvent } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const [render, setRender] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRender(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: globalThis.MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        onClose();
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    function handlerKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    if (isOpen) {
      document.addEventListener("keydown", handlerKey);
    }

    return () => {
      document.removeEventListener("keydown", handlerKey);
      setRender(false);
    };
  }, [isOpen, onClose]);

  if (!render || !isOpen) return null;

  return createPortal(
    <div className="isolate fixed inset-0 bg-black/40 backdrop-blur-sm backdrop-brightness-75 z-50 flex items-center justify-center transition-all duration-700">
      <div className="bg-white w-full max-w-lg mx-auto p-8 rounded shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-8 right-8 justify-right text-black font-bold cursor-pointer hover:font-normal hover:text-gray-500 transition-all duration-300"
        >
          ✕
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
