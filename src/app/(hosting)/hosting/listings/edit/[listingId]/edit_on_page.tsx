"use client";

import { useState, ReactNode } from "react";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface EditOnPageProps {
  title: string;
  description: string;
  children: ReactNode; // the form or editable content
  onSave?: () => void; // optional save callback
}

export default function EditOnPage({
  title,
  description,
  children,
  onSave,
}: EditOnPageProps) {
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    if (onSave) onSave(); // call parent's save handler
    setOpen(false);
  };

  return (
    <div className="rounded-xl mb-4">
      {/* Inline display */}
      <div className="flex flex-col w-full">
        <div className="flex flex-row justify-between items-center w-full">
          <h3 className="font-heading font-medium text-lg text-gray-900">{title}</h3>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            className="text-gray-700 hover:text-black hover:underline underline-offset-3 text-sm"
          >
            Editar
          </button>
        </div>
        <p className="text-gray-500 text-sm mt-1">
          {description}
        </p>
      </div>

      <div className="mt-4">{children}</div>

      {/* Modal */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl">
            <Dialog.Title className="text-lg font-bold">{title}</Dialog.Title>
            <Dialog.Description className="text-gray-500 mt-1">
              {description}
            </Dialog.Description>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-lg border hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800"
              >
                Salvar
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
