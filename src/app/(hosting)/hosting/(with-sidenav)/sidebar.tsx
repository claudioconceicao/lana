"use client";

import { dummy } from "@/database/dummy_data";
import { useState, useEffect } from "react";

type Listing = {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  availableDates: { title: string; date: string }[];
};

export default function Sidebar() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [currentListing, setCurrentListing] = useState<number | null>(0);

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
    <div className="lg:block md:block sm:hidden flex flex-col w-[350px] h-full border-r-1 border-gray-300 p-6 bg-white overflow-y-auto">
      <h2 className="font-semibold text-xl">{listings.length} Anúncios</h2>
      <form className="mt-4">
        <input
          type="text"
          placeholder="Procurar anúncios"
          className="w-full p-2 rounded-lg bg-gray-100"
        />
      </form>
      <ul className="mt-4 space-y-2">
        {listings.map((listing) => (
          <li
            key={listing.id}
            className={`p-2 rounded-lg cursor-pointer transition-colors duration-200 ${
              listing.id === currentListing
                ? "bg-gray-300 font-semibold"
                : "hover:bg-gray-200 font-normal"
            }`}
            onClick={() => setCurrentListing(listing.id)}
          >
            {listing.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
