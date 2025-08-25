"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useRef, useState } from "react";
import { useSession } from "@/context/SessionContext";
import { dummy } from "@/database/dummy_data";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type Listing = {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  availableDates: { title: string; date: string }[];
};

function capitalize(str: string) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export default function CustomCalendar() {
  const calendarRef = useRef<FullCalendar | null>(null);
  const { loading } = useSession();
  const [listings, setListings] = useState<Listing[]>([]);
  const [currentListing, setCurrentListing] = useState<number | null>(0);
  const api = calendarRef.current?.getApi();
  const date = new Date(Date.now());
  const [monthName, setMonthName] = useState(
    date.toLocaleString("pt-br", { month: "long", year: "numeric" })
  );

  const handlePrev = () => {
    api?.prev();
    setMonthName(api?.view.title as string);
  };

  const handleNext = () => {
    api?.next();
    setMonthName(api?.view.title as string);
  };

  const handleToday = () => {
    api?.today();
    setMonthName(api?.view.title as string);
  };

  useEffect(() => {
    // Convert dummy.availableDates from string[] to { title, date }[]
    const mapped = dummy.listings.map((l) => ({
      ...l,
      availableDates: l.availableDates.map((date: string) => ({
        title: l.title,
        date,
      })),
    }));
    setListings(mapped);
  }, []);

  return (
    <div>
      {/* 🔹 Custom Headbar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            className="px-3 py-1 rounded bg-orange-500 text-white hover:bg-orange-600"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={handleNext}
            className="px-3 py-1 rounded bg-orange-500 text-white hover:bg-orange-600"
          >
            <FaChevronRight />
          </button>
          <button
            onClick={handleToday}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
          >
            Today
          </button>
        </div>
        <h2 className="font-medium text-xl">{capitalize(monthName)}</h2>
      </div>

      {/* 🔹 Calendar without default header */}
      <FullCalendar
        ref={calendarRef}
        plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={false} // hide default
        selectable={true}
        locale="pt-br"
        themeSystem="standard"
        editable={true}
        height="auto"
        dateClick={(info) => alert(`Clicked on date: ${info.dateStr}`)}
        events={listings
          .flatMap((l) => l.availableDates)
          .map((d) => ({ title: d.title, date: d.date }))}
      />
    </div>
  );
}
