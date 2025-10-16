"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { addDays } from "date-fns";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";

type AdvancedSearchBarProps = {
  initialValues?: {
    location?: string;
    guests?: number;
    startDate?: string;
    endDate?: string;
    priceMin?: string;
    priceMax?: string;
    numbOfBeds?: string;
    numbOfRooms?: string;
    numbOfBath?: string;
    pets?: string;
    propertyType?: string;
    amenities?: string;
    type?: string;
  };
};

export default function AdvancedSearchBar({ initialValues = {} }: AdvancedSearchBarProps) {
  const router = useRouter();

  const [location, setLocation] = useState(initialValues.location || "");
  const [guests, setGuests] = useState(initialValues.guests || 1);

  const [date, setDate] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: initialValues.startDate ? new Date(initialValues.startDate) : new Date(),
    to: initialValues.endDate ? new Date(initialValues.endDate) : addDays(new Date(), 3),
  });

  const [filters, setFilters] = useState({
    priceMin: initialValues.priceMin || "",
    priceMax: initialValues.priceMax || "",
    numbOfBeds: initialValues.numbOfBeds || "",
    numbOfRooms: initialValues.numbOfRooms || "",
    numbOfBath: initialValues.numbOfBath || "",
    pets: initialValues.pets || "",
    propertyType: initialValues.propertyType || "",
    amenities: initialValues.amenities || "",
    type: initialValues.type || "",
  });

  const [showCalendar, setShowCalendar] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (location.trim()) params.set("location", location.trim());
    if (guests) params.set("guests", guests.toString());
    if (filters.priceMax) params.set("priceMax", filters.priceMax);
    if (filters.priceMin) params.set("priceMin", filters.priceMin);
    if (filters.type) params.set("type", filters.type);
    if (date.from) params.set("startDate", date.from.toISOString());
    if (date.to) params.set("endDate", date.to.toISOString());

    router.push(`/search?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-3 items-center">
      <input
        type="text"
        placeholder="Localização"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="flex-1 border rounded-lg p-2 outline-none"
      />

      <Popover open={showCalendar} onOpenChange={setShowCalendar}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="min-w-[200px] justify-start text-left font-normal"
          >
            {date.from && date.to
              ? `${date.from.toLocaleDateString()} - ${date.to.toLocaleDateString()}`
              : "Selecionar datas"}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={new Date()}
            selected={date}
            onSelect={(range) =>
              setDate({
                from: range?.from,
                to: range?.to ?? undefined,
              })
            }
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </form>
  );
}
