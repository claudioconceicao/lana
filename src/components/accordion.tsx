"use client";

import { useState, useRef, useEffect } from "react";
import { PlusIcon, MinusIcon } from "lucide-react";

type AccordionItemProps = {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
};

const AccordionItem = ({ title, children, isOpen = false, onToggle }: AccordionItemProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<string>("0px");

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isOpen]);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onToggle}
        className="w-full  h-[80px] font-heading flex justify-between items-center px-4 py-4 text-left text-lg font-medium hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        aria-expanded={isOpen}
      >
        {title}
        {isOpen ? <MinusIcon className="w-5 h-5" /> : <PlusIcon className="w-5 h-5" />}
      </button>

      <div
        ref={contentRef}
        style={{ maxHeight: height }}
        className="overflow-hidden transition-max-height duration-300 ease-in-out"
      >
        <div className="px-4 py-2 text-gray-900">{children}</div>
      </div>
    </div>
  );
};

type AccordionProps = {
  items: { title: string; content: React.ReactNode }[];
  allowMultiple?: boolean;
};

export const Accordion = ({ items, allowMultiple = false }: AccordionProps) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const handleToggle = (index: number) => {
    if (allowMultiple) {
      setOpenIndexes((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndexes((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className="w-full rounded-lg bg-white gap-4">
      {items.map((item, idx) => (
        <AccordionItem
          key={idx}
          title={item.title}
          isOpen={openIndexes.includes(idx)}
          onToggle={() => handleToggle(idx)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
};
