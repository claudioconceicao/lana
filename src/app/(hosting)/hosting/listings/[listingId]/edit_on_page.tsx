"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react"; // or shadcn/ui's Dialog

export default function EditOnPage({
  title,
  description,
  children, // pass your edit form here
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`rounded-xl mb-2`}>
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <h3 className="font-medium text-lg text-gray-900">{title}</h3>
          <p className="text-gray-500 text-sm">{description}</p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="text-gray-500 underline w-max p-2 hover:text-black text-sm"
        >
          Editar
        </button>
      </div>

      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl">
            <Dialog.Title className="text-lg font-bold">{title}</Dialog.Title>
            <Dialog.Description>{description}</Dialog.Description>

            <div className="mt-4">{children}</div>

            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setOpen(false)} className="px-4 py-2 rounded-lg border">
                Cancelar
              </button>
              <button
                onClick={() => {
                  // handle save logic inside `children`
                  setOpen(false);
                }}
                className="px-4 py-2 rounded-lg bg-black text-white"
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
