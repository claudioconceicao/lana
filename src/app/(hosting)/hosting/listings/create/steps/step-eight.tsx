import { useState } from "react";

export default 
function StepEight({
  value,
  onChange,
}: {
  value: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  onChange: (val: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  }) => void;
}) {
  const [address, setAddress] = useState({
    street: value?.street || "",
    city: value?.city || "",
    postalCode: value?.postalCode || "",
    country: value?.country || "",
  });

  const handleChange = (key: keyof typeof address, val: string) => {
    const updated = { ...address, [key]: val };
    setAddress(updated);
    onChange(updated);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full max-w-2xl mx-auto gap-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 text-left">
        Onde fica a sua acomodação?
      </h1>
      <p className="text-gray-700 mb-4">
        O seu endereço é apenas partilhado com os hóspedes depois que a reserva
        é confirmada.
      </p>
      <div className="flex flex-col w-full gap-3">
        <input
          type="text"
          placeholder="Rua e número"
          value={address.street}
          onChange={(e) => handleChange("street", e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full"
        />
        <input
          type="text"
          placeholder="Cidade"
          value={address.city}
          onChange={(e) => handleChange("city", e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full"
        />
        <input
          type="text"
          placeholder="Código postal"
          value={address.postalCode}
          onChange={(e) => handleChange("postalCode", e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full"
        />
        <input
          type="text"
          placeholder="País"
          value={address.country}
          onChange={(e) => handleChange("country", e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full"
        />
      </div>
    </div>
  );
}