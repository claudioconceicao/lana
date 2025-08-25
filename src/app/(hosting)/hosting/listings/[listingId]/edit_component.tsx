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
};

function Section({
  id,
  title,
  description,
  children,
  onSave,
  isOpen,
  onToggle,
}: SectionProps) {
  const borderClass = isOpen ? "border border-gray-300 px-6 py-4" : "";

  return (
    <div className={`rounded-xl ${borderClass} mb-4 `}>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h3 className="text-gray-900 font-normal font-heading text-md">{title}</h3>
          <p className="text-gray-500 text-sm">{description}</p>
        </div>
        <button
          onClick={() => onToggle(id)}
          className={`${isOpen?"":"underline"} text-gray-500 text-sm hover:text-black`}
        >
          {isOpen ? <XMarkIcon className="w-6 h-6"/>: "Editar"}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="overflow-hidden mt-2"
          >
            <div className="py-4">
              {children}
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => onToggle(id)}
                className="px-4 py-2 hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                onClick={onSave}
                className="px-4 py-1 bg-black text-white rounded hover:shadow-md"
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

export default function EditAccordion({
  sections,
}: {
  sections: {
    id: string;
    title: string;
    description: string;
    content: ReactNode;
    onSave: () => void;
  }[];
}) {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenSection((prev) => (prev === id ? null : id));
  };

  return (
    <div>
      {sections.map((section) => (
        <Section
          key={section.id}
          id={section.id}
          title={section.title}
          description={section.description}
          onSave={section.onSave}
          isOpen={openSection === section.id}
          onToggle={handleToggle}
        >
          {section.content}
        </Section>
      ))}
    </div>
  );
}
