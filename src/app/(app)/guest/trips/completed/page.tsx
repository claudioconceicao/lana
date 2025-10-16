"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createClient } from "../../../../../../utils/supabase/client";
import { Database } from "../../../../../../utils/supabase/models";

export default function CompletedTrips() {
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const supabase = createClient();

    async function loadBookings() {
      setLoading(true);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        setBookings([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("bookings")
        .select(`
          booking_id,
          start_date,
          end_date,
          status,
          listing:listings (
            title,
            street_line1,
            street_line2,
            province:province_id(name),
            district:district_id(name),
            municipality:municipality_id(name),
            country:country_code(name)
          )
        `)
        .eq("guest_id", session.user.id)
        .eq("status", "Completed")
        .lte("end_date", new Date().toISOString())
        .order("end_date", { ascending: false });

      if (error) {
        console.error("Error fetching bookings:", JSON.stringify(error, null, 2));
        setBookings([]);
      } else {
        console.log("Bookings fetched:", data);
        setBookings(data || []);
      }

      setLoading(false);
    }

    loadBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 text-gray-500">
        Carregando suas viagens...
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500">
        <p className="text-lg font-medium mb-2">
          Você ainda não tem viagens concluídas.
        </p>
        <p className="text-sm">
          Assim que terminar uma reserva, ela aparecerá aqui.
        </p>
        <button className="mt-6 px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition">
          Reservar uma Viagem
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 py-16">
      {bookings.map((trip, idx) => (
        <div
          key={trip.id ?? idx}
          className="border rounded-lg shadow-sm bg-white p-4 hover:shadow-md transition"
        >
          <Image
            src={trip.listing?.image || "/images/placeholder.jpg"}
            alt={trip.listing?.title ?? "Viagem"}
            className="w-full h-40 object-cover rounded-md mb-4"
            width={400}
            height={200}
          />
          <h2 className="text-xl font-semibold">
            {trip.listing?.title ?? "Sem título"}
          </h2>
          <p className="text-gray-500 text-sm">
            {trip.listing?.street_line_1 || trip.listing?.province?.name}
          </p>
          <p className="mt-2 text-gray-700 text-sm">
            Viagem concluída de{" "}
            {new Date(trip.start_date).toLocaleDateString()} até{" "}
            {new Date(trip.end_date).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
