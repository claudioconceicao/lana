"use client";

import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";

type SectionProps = {
  id: string;
  title: string;
  description: string;
  children: ReactNode;
  onSave: () => void;
  isOpen: boolean;
  onToggle: (id: string) => void;
  disabled: boolean;
};

function Section({
  id,
  title,
  description,
  children,
  onSave,
  isOpen,
  onToggle,
  disabled,
}: SectionProps) {
  const containerClass = `
    mb-4 rounded-xl transition-all duration-300
    ${isOpen ? "border border-gray-200 bg-white shadow-sm p-4" : ""}
    ${
      disabled
        ? "opacity-50 cursor-not-allowed pointer-events-none"
        : ""
    }
  `;

  return (
    <div className={containerClass}>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h3 className="text-gray-900 text-md">{title}</h3>
          <p className="text-gray-500 text-sm">{description}</p>
        </div>
        {!disabled && (
          <button
            onClick={() => onToggle(id)}
            aria-expanded={isOpen}
            className={`${
              isOpen ? "" : ""
            } text-black text-sm font-base flex items-center gap-1 hover:underline`}
          >
            {isOpen ? <XMarkIcon className="w-6 h-6" /> : "Editar"}
          </button>
        )}
      </div>

      <AnimatePresence initial={true}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            layout
            className="overflow-hidden mt-2"
          >
            <div className="py-4">{children}</div>
            <div className="flex justify-between items-center w-full">
              <button
                onClick={() => onToggle(id)}
                className=" py-2 rounded hover:bg-gray-100 text-gray-600"
              >
                Cancelar
              </button>
              <button
                onClick={onSave}
                className="px-4 py-2 bg-black text-white rounded-lg hover:shadow-md"
              >
                Salvar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

