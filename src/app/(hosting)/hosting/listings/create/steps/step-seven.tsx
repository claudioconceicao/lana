
import { useState } from "react";
import { IoCheckmarkOutline } from "react-icons/io5";

export default function StepSeven({
  value,
  onChange,
}: {
  value: string[];
  onChange: (val: string[]) => void;
}) {
  const amenities = [
    "wifi",
    "tv",
    "cozinha",
    "maquina de lavar",
    "estacionamento",
    "ar-condicionado",
    "essencial para wc",
    "secador de cabelo",
    "água quente",
    "jacuzzi",
    "piscina",
    "talheires",
    "churrasqueira",
  ];

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(
    value || []
  );

  const toggleAmenity = (amenity: string) => {
    let updated: string[];
    if (selectedAmenities.includes(amenity)) {
      updated = selectedAmenities.filter((a) => a !== amenity);
    } else {
      updated = [...selectedAmenities, amenity];
    }
    setSelectedAmenities(updated);
    onChange(updated);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 text-left">
        Informe aos hóspedes o que o seu lar tem para oferecer
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full">
        {amenities.map((amenity) => (
          <button
            key={amenity}
            type="button"
            onClick={() => toggleAmenity(amenity)}
            className={`w-full p-4 border rounded-lg flex flex-row justify-between items-center transition-all mb-2 ${
              selectedAmenities.includes(amenity)
                ? "border-black bg-gray-50"
                : "border-gray-200"
            }`}
          >
            <h4 className="text-md font-medium text-gray-900">{amenity}</h4>
            {selectedAmenities.includes(amenity) && (
              <IoCheckmarkOutline className="text-black text-xl" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}