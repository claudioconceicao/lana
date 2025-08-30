"use client";

import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function SearchBox() {

  const [showGuest, setShowGuest] = useState(false);
  const [children, setChildren] = useState(0);
  const [adults, setAdults] = useState(0);
  const [babies, setBabies] = useState(0);
  const totalGuests = adults + children + babies;

  const guestRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const [locationWidth, setLocationWidth] = useState<number>(0);

  const [date, setDate] = useState<DateRange | undefined>();

  const toggleShowGuest = () => setShowGuest(!showGuest);

  // Close guest dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (guestRef.current && !guestRef.current.contains(e.target as Node)) {
        setShowGuest(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Measure location input width
  useEffect(() => {
    if (locationRef.current) {
      setLocationWidth(locationRef.current.offsetWidth);
    }
  }, []);

  return (
    <div className="w-full max-w-5xl border border-gray-200 rounded-xl shadow-md bg-white">
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 md:gap-0 p-4 md:p-2 bg-white rounded-lg shadow-lg">
        {/* Location */}
        <div
          className="flex flex-col items-start flex-1 px-2 min-w-0"
          ref={locationRef}
        >
          <p className="text-xs text-gray-500">Destino</p>
          <input
            placeholder="Digite a cidade"
            type="text"
            className="text-md border-none w-full focus:outline-none bg-transparent"
          />
        </div>

        {/* Divider */}
        <div className="hidden md:block h-[50px] w-[1px] bg-gray-200"></div>

        {/* Dates */}
        <div className="flex flex-col items-start flex-1 px-2 relative min-w-0">
          <p className="text-xs text-gray-500">Datas</p>
          <button className="text-md border-none w-full text-gray-400 text-start cursor-pointer">
            {date?.from && date?.to
              ? `${format(date.from, "dd/MM/yyyy")} - ${format(
                  date.to,
                  "dd/MM/yyyy"
                )}`
              : "Adicionar datas"}
          </button>
        </div>

        {/* Divider */}
        <div className="hidden md:block h-[50px] w-[1px] bg-gray-200"></div>

        {/* Guests */}
        <div
          ref={guestRef}
          className="relative flex flex-col items-start flex-1 px-2 min-w-0"
        >
          <p className="text-xs text-gray-500">Convidados</p>
          <button
            onClick={toggleShowGuest}
            className="text-md border-none text-gray-400 w-full focus:outline-none text-start cursor-pointer"
          >
            {totalGuests > 0
              ? `${totalGuests} Convidados`
              : "Adicionar convidados"}
          </button>
          <div
            className={`absolute left-0 top-full mt-2 flex flex-col gap-4 p-4 rounded-lg bg-white shadow-xl w-[min(280px,90vw)] transform transition-all duration-300 ease-out
                ${
                  showGuest
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
          >
            {[
              { label: "Adultos", value: adults, setValue: setAdults },
              { label: "Crianças", value: children, setValue: setChildren },
              { label: "Bebés", value: babies, setValue: setBabies },
            ].map(({ label, value, setValue }) => (
              <div key={label} className="flex items-center justify-between">
                <p className="text-sm">{label}</p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setValue(Math.max(value - 1, 0))}
                    className="w-8 h-8 flex items-center justify-center rounded-full border hover:bg-gray-100 text-lg"
                  >
                    -
                  </button>
                  <p className="text-lg">{value}</p>
                  <button
                    onClick={() => setValue(value + 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-full border hover:bg-gray-100 text-lg"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search Button */}
        <Link
          href="/search"
          className="flex justify-center items-center mt-2 md:mt-0 rounded bg-black px-6 py-3 text-sm font-medium text-white hover:bg-orange-300 md:ml-2 shrink-0"
        >
          Procurar
        </Link>
      </div>
    </div>
  );
}
