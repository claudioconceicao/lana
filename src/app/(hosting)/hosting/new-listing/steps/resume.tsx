"use client";
import Image from "next/image";
import { useState } from "react";

type ResumeProps = {
  title: string;
  description: string;
  address?: string;
  lat?: number;
  lng?: number;
  images?: string[];
  price?: number;
  guests?: number;
  onSubmit: () => void;
  goToStep: (step: string) => void; // callback to edit any step
};

export default function Resume({
  title,
  description,
  address,
  lat,
  lng,
  images = [],
  price,
  guests,
  onSubmit,
  goToStep,
}: ResumeProps) {
  const [collapsed, setCollapsed] = useState({
    title: false,
    description: false,
    address: false,
    images: false,
    info: false,
  });

  const toggleSection = (key: keyof typeof collapsed) => {
    setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-5xl mx-auto p-6 flex flex-col gap-6 overflow-y-auto min-h-screen">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Resumo da sua publicação
      </h1>

      {/* Title */}
      <section className="bg-white rounded-lg shadow overflow-hidden">
        <button
          className="flex justify-between w-full items-center px-6 py-4 bg-gray-100 hover:bg-gray-200 transition"
          onClick={() => toggleSection("title")}
        >
          <h2 className="text-2xl font-semibold">Título</h2>
          <span>{collapsed.title ? "+" : "-"}</span>
        </button>
        {!collapsed.title && (
          <div className="p-6 flex justify-between items-center">
            <p className="text-gray-700">{title || "Não informado"}</p>
            <button
              onClick={() => goToStep("StepOne")}
              className="text-sm text-blue-500 hover:underline h-full flex items-center"
            >
              Editar
            </button>
          </div>
        )}
      </section>

      {/* Description */}
      <section className="bg-white rounded-lg shadow overflow-hidden">
        <button
          className="flex justify-between w-full items-center px-6 py-4 bg-gray-100 hover:bg-gray-200 transition"
          onClick={() => toggleSection("description")}
        >
          <h2 className="text-2xl font-semibold">Descrição</h2>
          <span>{collapsed.description ? "+" : "-"}</span>
        </button>
        {!collapsed.description && (
          <div className="p-6 flex justify-between items-center">
            <p className="text-gray-700">{description || "Não informado"}</p>
            <button
              onClick={() => goToStep("StepTwo")}
              className="text-sm text-blue-500 hover:underline h-full flex items-center"
            >
              Editar
            </button>
          </div>
        )}
      </section>

      {/* Address / Map */}
      {address && (
        <section className="bg-white rounded-lg shadow overflow-hidden">
          <button
            className="flex justify-between w-full items-center px-6 py-4 bg-gray-100 hover:bg-gray-200 transition"
            onClick={() => toggleSection("address")}
          >
            <h2 className="text-2xl font-semibold">Localização</h2>
            <span>{collapsed.address ? "+" : "-"}</span>
          </button>
          {!collapsed.address && (
            <div className="p-6 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <p className="text-gray-700">{address}</p>
                <button
                  onClick={() => goToStep("StepNine")}
                  className="text-sm text-blue-500 hover:underline h-full flex items-center"
                >
                  Editar
                </button>
              </div>
              {lat && lng && (
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18..."
                  width="100%"
                  height="350"
                  title="Map"
                  style={{ border: 0 }}
                ></iframe>
              )}
            </div>
          )}
        </section>
      )}

      {/* Images */}
      {images.length > 0 && (
        <section className="bg-white rounded-lg shadow overflow-hidden">
          <button
            className="flex justify-between w-full items-center px-6 py-4 bg-gray-100 hover:bg-gray-200 transition"
            onClick={() => toggleSection("images")}
          >
            <h2 className="text-2xl font-semibold">Fotos</h2>
            <span>{collapsed.images ? "+" : "-"}</span>
          </button>
          {!collapsed.images && (
            <div className="p-6 flex flex-col gap-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative w-full h-56 md:h-64 rounded-lg overflow-hidden"
                  >
                    <Image
                      src={img}
                      alt={`uploaded-${idx}`}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={() => goToStep("StepTen")}
                className="text-sm text-blue-500 hover:underline h-full flex items-center"
              >
                Editar
              </button>
            </div>
          )}
        </section>
      )}

      {/* Additional info */}
      {(price || guests) && (
        <section className="bg-white rounded-lg shadow overflow-hidden">
          <button
            className="flex justify-between w-full items-center px-6 py-4 bg-gray-100 hover:bg-gray-200 transition"
            onClick={() => toggleSection("info")}
          >
            <h2 className="text-2xl font-semibold">Informações adicionais</h2>
            <span>{collapsed.info ? "+" : "-"}</span>
          </button>
          {!collapsed.info && (
            <div className="p-6 flex flex-col gap-2">
              {price && (
                <p>
                  <span className="font-semibold">Preço: </span>${price}/noite
                </p>
              )}
              {guests && (
                <p>
                  <span className="font-semibold">Número de hóspedes: </span>
                  {guests}
                </p>
              )}
            </div>
          )}
        </section>
      )}

      {/* Submit Button */}
      <button
        onClick={onSubmit}
        className="sticky bottom-4 w-full bg-black text-white py-4 rounded-lg font-medium hover:bg-gray-800 transition"
      >
        Publicar
      </button>
    </div>
  );
}
