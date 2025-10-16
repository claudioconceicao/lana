"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  goToStep: (stepIndex: number) => void;
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

  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    setCollapsed({
      title: !!title,
      description: !!description,
      address: !!address,
      images: images.length > 0,
      info: !!price && !!guests,
    });
  }, [title, description, address, images, price, guests]);

  const toggleSection = (key: keyof typeof collapsed) => {
    setCollapsed((prev) => {
      const newState = { ...prev, [key]: !prev[key] };
      if (!prev[key]) {
        // Only scroll when opening
        setTimeout(() => {
          sectionRefs.current[key]?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100); // wait for animation
      }
      return newState;
    });
  };

  const contentVariants = {
    open: { height: "auto", opacity: 1, marginTop: 8 },
    collapsed: { height: 0, opacity: 0, marginTop: 0 },
  };

  return (
    <div className="max-w-5xl  mx-auto flex flex-col gap-4 pb-32 ">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Resumo da sua publicação</h1>

      {[
        { key: "title" as const, label: "Título", value: title || "Não informado", editStep: 1 },
        { key: "description" as const, label: "Descrição", value: description || "Não informado", editStep: 2 },
        { key: "address" as const, label: "Localização", value: address || "Não informado", editStep: 8, map: lat && lng ? { lat, lng } : null },
        { key: "images" as const, label: "Fotos", value: images.length > 0 ? images : null, editStep: 10 },
        { key: "info" as const, label: "Informações adicionais", value: { price, guests }, editStep: -1 },
      ].map((section) => (
        <section
          key={section.key}
          className="bg-white rounded-lg shadow overflow-hidden"
        >
          <button
            className="flex justify-between w-full items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 transition text-left"
            onClick={() => toggleSection(section.key)}
          >
            <h2 className="text-lg font-semibold">{section.label}</h2>
            <span className="text-xl">{collapsed[section.key] ? "+" : "-"}</span>
          </button>

          <AnimatePresence initial={false}>
            {!collapsed[section.key] && (
              <motion.div
                variants={contentVariants}
                initial="collapsed"
                animate="open"
                exit="collapsed"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="px-4 pb-4 max-h-[400px] overflow-y-auto"
              >
                {/* Content */}
                {section.key === "images" ? (
                  <div className="flex flex-col gap-2">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {images.map((img, idx) => (
                        <div key={idx} className="relative w-full h-32 md:h-40 rounded-lg overflow-hidden">
                          <Image src={img} alt={`uploaded-${idx}`} fill style={{ objectFit: "cover" }} />
                        </div>
                      ))}
                    </div>
                    <button onClick={() => goToStep(section.editStep)} className="text-sm text-blue-500 hover:underline mt-1">
                      Editar
                    </button>
                  </div>
                ) : section.key === "address" && section.map ? (
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <p className="text-gray-700">{section.value}</p>
                      <button onClick={() => goToStep(section.editStep)} className="text-sm text-blue-500 hover:underline">
                        Editar
                      </button>
                    </div>
                    <div className="h-48 overflow-hidden rounded-lg">
                      <iframe
                        src={`https://www.google.com/maps/embed/v1/view?key=YOUR_API_KEY&center=${section.map.lat},${section.map.lng}&zoom=15`}
                        width="100%"
                        height="100%"
                        title="Map"
                        style={{ border: 0 }}
                      />
                    </div>
                  </div>
                ) : section.key === "info" ? (
                  <div className="flex flex-col gap-1">
                    {price !== undefined && <p><span className="font-semibold">Preço: </span>${price}/noite</p>}
                    {guests !== undefined && <p><span className="font-semibold">Hóspedes: </span>{guests}</p>}
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <p className="text-gray-700">{section.value}</p>
                    <button onClick={() => goToStep(section.editStep)} className="text-sm text-blue-500 hover:underline">
                      Editar
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      ))}

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="sticky bottom-0 bg-white p-4 shadow-t"
      >
        <button onClick={onSubmit} className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition">
          Publicar
        </button>
      </motion.div>
    </div>
  );
}
