"use client";
import { useState } from "react";

export default function CreateHouseModal({
  onClose,
  onFinish,
}: {
  onClose: () => void;
  onFinish: (newHouse: any) => void;
}) {
  const [title, setTitle] = useState("");

  const handleSave = () => {
    const newHouse = {
      id: Date.now(),
      title,
      status: "Activo",
      location: "Luanda / Angola",
      image: "/images/image.png",
    };
    onFinish(newHouse);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[500px]">
        <h2 className="text-lg font-semibold mb-4">Criar novo anúncio</h2>
        <input
          type="text"
          className="w-full border rounded p-2 mb-4"
          placeholder="Título do anúncio"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 bg-gray-200 rounded" onClick={onClose}>
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={handleSave}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
