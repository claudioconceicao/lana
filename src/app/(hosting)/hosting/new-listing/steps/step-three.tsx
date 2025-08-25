import { useState } from "react";
import { IoCheckmarkOutline } from "react-icons/io5";

export default function StepThree({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const houseTypes = [
    "Casa",
    "Apartamento",
    "Casa de praia",
    "Cubata",
    "Tenda",
  ];

  const [selected, setSelected] = useState<string>(value || "");

  const handleSelect = (houseType: string) => {
    setSelected(houseType);
    onChange(houseType);
  };

  return (
    <div className="flex flex-col justify-center w-full max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">
        Qual das seguintes opções descreve melhor o seu espaço?
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {houseTypes.map((houseType) => {
          const isActive = selected === houseType;

          return (
            <button
              key={houseType}
              type="button"
              onClick={() => handleSelect(houseType)}
              className={`flex items-center gap-2 border rounded-xl px-4 py-3 transition-all 
                ${
                  isActive
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-700 border-gray-300 hover:border-black"
                }
              `}
            >
              {isActive && <IoCheckmarkOutline className="text-lg" />}
              <span>{houseType}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}