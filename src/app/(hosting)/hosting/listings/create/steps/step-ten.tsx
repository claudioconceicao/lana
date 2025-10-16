"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function StepTen({
  value,
  onChange,
}: {
  value: string; // stores image URLs or base64
  onChange: (val: string) => void;
}) {
  const [images, setImages] = useState<string[]>([]);
  const dropRef = useRef<HTMLDivElement>(null);

  const addImages = (files: FileList | File[]) => {
    const filesArray = Array.from(files);
    const urls = filesArray.map((file) => URL.createObjectURL(file));
    setImages((prev) => {
      const updated = [...prev, ...urls];
      onChange(JSON.stringify(updated));
      return updated;
    });
  };

  const removeImage = (index: number) => {
    setImages((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      onChange(JSON.stringify(updated));
      return updated;
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    addImages(e.target.files);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addImages(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const hasImage = images.length > 0;

  return (
    <div className="flex flex-col justify-center w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Vamos adicionar fotos
        </h1>
        <p className="text-gray-500">
          Adicione pelo menos 5 fotos. Poderás adicionar mais fotos depois de
          publicar
        </p>
      </div>

      {/* Upload / Drag area */}
      {!hasImage && (
        <div
          ref={dropRef}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed border-gray-300 flex items-center justify-center h-[400px] cursor-pointer rounded-lg relative"
        >
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="absolute opacity-0 w-full h-full cursor-pointer"
          />
          <p className="text-gray-500 text-center">
            Arraste e solte suas fotos aqui ou clique para adicionar
          </p>
        </div>
      )}

      {/* Image grid (scrollable vertically) */}
      {hasImage && (
        <div className="max-h-[500px] overflow-y-auto mt-4 grid grid-cols-3 gap-4">
          {images.map((img, index) => (
            <div
              key={index}
              className="relative w-full h-40 rounded-lg overflow-hidden group"
            >
              <Image
                src={img}
                alt={`uploaded-${index}`}
                fill
                style={{ objectFit: "cover" }}
              />
              {/* Delete button (appears on hover) */}
              <button
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-black/50 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                ×
              </button>
            </div>
          ))}

          {/* Additional upload slot */}
          <div
            ref={dropRef}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center h-40 cursor-pointer relative"
          >
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="absolute opacity-0 w-full h-full cursor-pointer"
            />
            <p className="text-gray-500 text-center">Adicionar mais</p>
          </div>
        </div>
      )}
    </div>
  );
}
