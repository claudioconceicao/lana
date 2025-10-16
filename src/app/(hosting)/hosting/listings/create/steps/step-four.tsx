import { useState } from "react";

export default function StepFour({
  value,
  onChange,
}: {
  value: { guests: number; bedrooms: number; beds: number; bathrooms: number };
  onChange: (val: {
    guests: number;
    bedrooms: number;
    beds: number;
    bathrooms: number;
  }) => void;
}) {
  // Local state synced with parent
  const [counts, setCounts] = useState(
    value || { guests: 0, bedrooms: 0, beds: 0, bathrooms: 0 }
  );

  const updateCount = (key: keyof typeof counts, delta: number) => {
    const updated = { ...counts, [key]: Math.max(0, counts[key] + delta) };
    setCounts(updated);
    onChange(updated);
  };
  const Counter = ({
    title,
    keyName,
  }: {
    title: string;
    keyName: keyof typeof counts;
  }) => (
    <div className="w-full flex flex-row justify-between items-center py-3">
      <h4 className="text-lg font-normal font-sans">{title}</h4>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => updateCount(keyName, -1)}
          className="rounded-full border border-gray-400 w-8 h-8 flex items-center justify-center text-lg font-bold hover:bg-gray-100"
        >
          –
        </button>
        <span className="w-8 text-center text-lg font-semibold">
          {counts[keyName]}
        </span>
        <button
          onClick={() => updateCount(keyName, 1)}
          className="rounded-full border border-gray-400 w-8 h-8 flex items-center justify-center text-lg font-bold hover:bg-gray-100"
        >
          +
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col justify-center w-full max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">
        Compartilhe algumas informações sobre a sua acomodação.
      </h1>

      <div className="">
        <Counter title="Número de hóspedes" keyName="guests" />
        <Counter title="Quartos" keyName="bedrooms" />
        <Counter title="Camas" keyName="beds" />
        <Counter title="Banheiros" keyName="bathrooms" />
      </div>
    </div>
  );
}