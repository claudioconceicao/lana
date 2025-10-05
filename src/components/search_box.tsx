"use client";

import {
  DateRange,
  DayPicker,
  CaptionProps,
} from "react-day-picker";
import { format } from "date-fns";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import "react-day-picker/dist/style.css";

export default function SearchBox() {
  const router = useRouter();

  const [showGuest, setShowGuest] = useState(false);
  const [children, setChildren] = useState(0);
  const [adults, setAdults] = useState(0);
  const [babies, setBabies] = useState(0);
  const totalGuests = adults + children + babies;

  const [location, setLocation] = useState("");
  const [date, setDate] = useState<DateRange | undefined>();
  const [showCalendar, setShowCalendar] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const calendarButtonRef = useRef<HTMLButtonElement>(null);
  const guestRef = useRef<HTMLDivElement>(null);

  const toggleShowGuest = () => setShowGuest(!showGuest);

  const [guestPosition, setGuestPosition] = useState({
  top: 0,
  left: 0,
  width: 0,
});

const updateGuestPosition = () => {
  if (guestRef.current) {
    const rect = guestRef.current.getBoundingClientRect();
    setGuestPosition({
      top: rect.bottom + window.scrollY + 8, // below the button
      left: rect.left + window.scrollX,
      width: rect.width,
    });
  }
};

useEffect(() => {
  if (showGuest) updateGuestPosition();
  window.addEventListener("resize", updateGuestPosition);
  window.addEventListener("scroll", updateGuestPosition);
  return () => {
    window.removeEventListener("resize", updateGuestPosition);
    window.removeEventListener("scroll", updateGuestPosition);
  };
}, [showGuest]);


  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (guestRef.current && !guestRef.current.contains(e.target as Node)) {
        setShowGuest(false);
      }
      if (
        calendarButtonRef.current &&
        calendarRef.current &&
        !calendarButtonRef.current.contains(e.target as Node) &&
        !calendarRef.current.contains(e.target as Node)
      ) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (date?.from) params.set("from", format(date.from, "yyyy-MM-dd"));
    if (date?.to) params.set("to", format(date.to, "yyyy-MM-dd"));
    if (totalGuests > 0) params.set("guests", totalGuests.toString());

    router.push(`/search?${params.toString()}`);
  };

  const [calendarPosition, setCalendarPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  const updateCalendarPosition = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setCalendarPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  };

  useEffect(() => {
    if (showCalendar) updateCalendarPosition();
    window.addEventListener("resize", updateCalendarPosition);
    window.addEventListener("scroll", updateCalendarPosition);
    return () => {
      window.removeEventListener("resize", updateCalendarPosition);
      window.removeEventListener("scroll", updateCalendarPosition);
    };
  }, [showCalendar]);

  // Custom Caption showing two months with chevrons
  function CustomCaption({
    displayMonth,
    onPreviousClick,
    onNextClick,
  }: CaptionProps) {
    if (!displayMonth) return null;

    const rightMonth = new Date(displayMonth);
    rightMonth.setMonth(displayMonth.getMonth() + 1);

    return (
      <div className="flex justify-between items-center px-4 py-2 bg-orange-50 rounded-t-lg">
        {/* Left Month */}
        <div className="flex items-center gap-2">
          <button
            onClick={onPreviousClick}
            className="text-orange-500 hover:bg-orange-100 rounded px-2 py-1"
          >
            ←
          </button>
          <span className="font-semibold text-orange-700">
            {format(displayMonth, "MMMM yyyy")}
          </span>
        </div>

        {/* Spacer */}
        <div className="flex-1 border-t border-gray-300 mx-2" />

        {/* Right Month */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-orange-700">
            {format(rightMonth, "MMMM yyyy")}
          </span>
          <button
            onClick={onNextClick}
            className="text-orange-500 hover:bg-orange-100 rounded px-2 py-1"
          >
            →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full border border-gray-200 rounded-xl shadow-md bg-white relative z-10"
      ref={containerRef}
    >
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 md:gap-0 p-4 md:p-2 bg-white rounded-lg shadow-lg relative z-10">
        {/* Location */}
        <div className="flex flex-col items-start flex-1 px-2 min-w-0">
          <p className="text-xs text-gray-500">Destino</p>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
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
          <button
            ref={calendarButtonRef}
            onClick={() => setShowCalendar((prev) => !prev)}
            className="text-md border-none w-full text-gray-400 text-start cursor-pointer"
          >
            {date?.from && date?.to
              ? `${format(date.from, "dd/MM/yyyy")} - ${format(
                  date.to,
                  "dd/MM/yyyy"
                )}`
              : "Adicionar datas"}
          </button>

          {showCalendar &&
            createPortal(
              <div
                ref={calendarRef}
                className="absolute bg-white rounded-lg shadow-xl p-4 z-50"
                style={{
                  top: calendarPosition.top,
                  left: calendarPosition.left,
                  width: calendarPosition.width,
                }}
              >
                <DayPicker
                  mode="range"
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                  pagedNavigation
                  components={{ Caption: CustomCaption }}
                  modifiersClassNames={{
                    selected: "bg-orange-300 text-black",
                    range_start: "bg-orange-400 text-white rounded-full",
                    range_end: "bg-orange-400 text-white rounded-full",
                    today: "text-blue-500 font-bold",
                  }}
                />
              </div>,
              document.body
            )}
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
            className={`absolute left-0 top-[53.5px] mt-2 flex flex-col gap-4 p-4 rounded-lg bg-white shadow-xl w-[min(374px,90vw)] transform transition-all duration-300 ease-out
              ${
                showGuest
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
          >
            {[{ label: "Adultos", value: adults, setValue: setAdults },
              { label: "Crianças", value: children, setValue: setChildren },
              { label: "Bebés", value: babies, setValue: setBabies },
            ].map(({ label, value, setValue }) => (
              <div key={label} className="flex items-center justify-between top-32">
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
        <button
          onClick={handleSearch}
          className="flex justify-center items-center mt-2 md:mt-0 rounded bg-black px-6 py-3 text-sm font-medium text-white hover:bg-orange-300 md:ml-2 shrink-0"
        >
          Procurar
        </button>
      </div>
    </div>
  );
}
