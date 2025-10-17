"use client";

import { Database } from "@/lib/supabase/models";
import { HeartIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Listing = Database["public"]["Tables"]["listings"]["Row"];

const BookingPanel = ({ listing}: {listing:Listing | null}) => {

  const [dates, setDates] = useState("Not selected");
  const [guests, setGuests] = useState("1");

  return (
    <div id="booking-panel" className="relative w-full">
      <section
        className="max-h-[calc(100vh-5rem)] overflow-y-auto sticky top-20 w-full flex flex-col gap-4 bg-white shadow-md p-4 border border-gray-200 rounded-lg z-20"
      >
        <div className="flex justify-between items-center">
          <h2 className="font-semibold">AOA {listing?.base_price}.00</h2>
          <div>
            <button type="button">
              <HeartIcon />
            </button>
          </div>
        </div>

        <div className="flex flex-row gap-2">
          <button
            className="flex-1 border border-gray-200 p-3 rounded-full"
          >
            Adicionar datas
          </button>
          <button
            className="flex-1 border border-gray-200 p-3 rounded-full"
          >
            1 Convidado
          </button>
        </div>

        {/* payment summary placeholder */}
        {/* add conditional UI when dates are set */}

        <Link
          href={`/homes/${listing?.listing_id}/book?dates=${dates}&guests=${guests}`}
          className="w-full flex-1 text-center font-semibold bg-orange-300 p-4 rounded-lg"
        >
          Verificar disponibilidade
        </Link>
      </section>
    </div>
  );
};

export default BookingPanel;
