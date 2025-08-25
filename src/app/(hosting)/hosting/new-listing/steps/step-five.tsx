import { useState } from "react";
import { IoCheckmarkOutline } from "react-icons/io5";

export default function StepFive({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const [selected, setSelected] = useState(value);

  const customSelect = (title: string, description: string) => {
    const isActive = selected === title;

    return (
      <button
        onClick={() => {
          setSelected(title);
          onChange(title);
        }}
        className={`w-full p-4 border rounded-lg flex flex-row justify-between items-center transition-all ${
          isActive ? "border-black bg-gray-50" : "border-gray-200"
        }`}
      >
        <div className="flex flex-col text-left">
          <h4 className="text-md font-medium text-gray-900">{title}</h4>
          <p className="text-gray-500 text-sm">{description}</p>
        </div>
        {isActive && <IoCheckmarkOutline className="text-black text-xl" />}
      </button>
    );
  };

  return (
    <div className="flex flex-col justify-center w-full max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">
        Que tipo de acomodação você oferece aos hóspedes?
      </h1>

      <div className="space-y-4">
        {customSelect(
          "Espaço inteiro",
          "Os hóspedes têm o espaço todo só para eles."
        )}
        {customSelect(
          "Quarto privativo",
          "Os hóspedes têm seu próprio quarto em um espaço compartilhado."
        )}
        {customSelect(
          "Quarto compartilhado",
          "Os hóspedes dormem em um espaço que pode ser dividido com outros."
        )}
      </div>
    </div>
  );
}