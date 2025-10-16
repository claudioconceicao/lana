"use client";
import { useState } from "react";

type City = "Luanda" | "Benguela" | "Lubango" | "Huambo" | string;

export default function EarningCalculator() {
  const [city, setCity] = useState("Luanda");
  const [nights, setNights] = useState(5);

  // Valores médios fictícios por cidade (Kz/noite)

  const cityRates: Record<City, number> = {
    Luanda: 97000,
    Benguela: 67000,
    Lubango: 54000,
    Huambo: 29000,
  };

  const pricePerNight = (city: City): number => cityRates[city] ?? 10000;

  const estimated = nights * pricePerNight(city);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md max-w-7xl w-full mx-auto flex flex-col md:flex-row gap-6 md:gap-12">
      <div className="flex-1 flex-col gap-6 col-span-2 md:col-span-1">
        {/* Inputs */}
        <h3 className="font-semibold text-xl mb-6 text-gray-900">
          Calcule seus ganhos
        </h3>
        <div>
          <label className="block text-sm text-gray-700 mb-2">Cidade</label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            {Object.keys(cityRates).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <label className="block text-sm text-gray-700 mb-2">
            Noites por mês
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={1}
              max={30}
              value={nights}
              onChange={(e) => setNights(Number(e.target.value))}
              className="w-full accent-orange-600 cursor-pointer"
            />
            <span className="font-semibold text-gray-800 w-10 text-right">
              {nights}
            </span>
          </div>
        </div>
      </div>

      {/* Resultado grande */}
      <div className="flex flex-1 flex-col w-full justify-center items-center text-center bg-orange-50 rounded-xl p-6">
        <span className="text-gray-600 text-sm">Ganhos estimados</span>
        <span className="text-3xl md:text-4xl font-bold text-orange-600 mt-2">
          {estimated.toLocaleString("pt-PT")} Kz
        </span>
        <span className="text-gray-500 text-xs mt-1">/mês</span>
      </div>
    </div>
  );
}
