import { useState, useEffect } from "react";

export default function StepSix({
  value,
  onChange,
}: {
  value: number;
  onChange: (val: number) => void;
}) {
  const [displayValue, setDisplayValue] = useState("");

  // Format number: thousands with '.', decimals with ','
  const formatNumber = (num: number | string) => {
    if (num === "" || num === 0) return "";
    let [intPart, decPart] = num.toString().split(".");
    intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    if (decPart) decPart = decPart.slice(0, 2); // max 2 decimals
    return decPart ? `${intPart},${decPart}` : intPart;
  };

  // Sync displayValue when parent value changes
  useEffect(() => {
    setDisplayValue(formatNumber(value));
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;

    // Remove everything except digits and comma
    input = input.replace(/[^0-9,]/g, "");

    // Replace comma with dot for numeric parsing
    const numericValue = parseFloat(input.replace(",", ".")) || 0;

    onChange(numericValue);
    setDisplayValue(formatNumber(numericValue));
  };

  return (
    <div className="flex flex-col justify-center items-center w-full max-w-2xl mx-auto">
      <div className="flex flex-col items-start gap-2">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Determine o preço por noite
        </h1>
        <div className="flex flex-row items-center gap-2">
          <span className="text-black font-semibold text-4xl">AOA</span>
          <input
            type="text"
            value={displayValue}
            onChange={handleChange}
            placeholder="0"
            className="w-64 text-4xl outline-none bg-transparent"
          />
        </div>
      </div>
    </div>
  );
}