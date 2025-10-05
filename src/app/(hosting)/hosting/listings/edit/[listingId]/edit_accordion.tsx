"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  title: string;
  description: string;
  helper: string;
  children: ReactNode;
  onSave: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function EditAccordion({
  title,
  description,
  helper,
  children,
  onSave,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const contentId = `${title.replace(/\s+/g, "-").toLowerCase()}-content`;

  return (
    <div
      className={`transition-colors ${
        isOpen ? "border rounded-xl p-4 mb-4 bg-white shadow-sm" : "mb-4"
      }`}
    >
      {/* Header */}
      <div className="flex flex-col w-full">
        <div className="flex flex-row justify-between items-center w-full">
          <h3 className="text-gray-900 text-md">{title}</h3>
          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls={contentId}
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex items-center gap-1 text-gray-700 hover:text-black hover:underline underline-offset-3 text-sm"
          >
            {isOpen ? (
              <>
                <XMarkIcon className="w-4 h-4" />
              </>
            ) : (
              "Editar"
            )}
          </button>
        </div>
        <p className="text-gray-500 text-sm mt-1">
          {isOpen ? helper : description}
        </p>
      </div>

      {/* Animated Content with height animation */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            id={contentId}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden mt-4"
          >
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                onSave(e);
                setIsOpen(false); 
              }}
            >
              {children}

              {/* Actions */}
              <div className="flex justify-between items-center border-t border-gray-200 pt-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-lg border hover:bg-gray-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800"
                >
                  Salvar
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
