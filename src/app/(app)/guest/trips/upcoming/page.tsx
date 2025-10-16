"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../../../../../utils/supabase/client";
import { Database } from "../../../../../../utils/supabase/models";

type Bookings = {
  booking_id: string;
  start_date: string;
  end_date: string;
  status: string;
  total_price: number;
  guest_count: number;
  listing: {
    title: string;
    location: string;
  } | null;
};

type Booking = Database["public"]["Tables"]["bookings"]["Row"];

export default function UpcomingTrips() {
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
        .select(
          `
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
        `
        )
        .eq("guest_id", session.user.id)
        .eq("status", "Confirmed")
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
      <div className="flex justify-center">
        <div className="w-full py-16">
           <div className="flex flex-col justify-center text-center items-center py-20 text-gray-500">
          Carregando suas viagens...
          </div>
        </div>
       
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="w-full py-16">
        {bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500">
            <p className="text-lg font-medium mb-2">
              Você ainda não tem viagens agendadas.
            </p>
            <p className="text-sm">
              Reserve um local incrível e ele aparecerá aqui.
            </p>
            <button className="mt-6 px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition">
              Explorar Destinos
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {bookings.map((booking) => (
              <div
                key={booking?.booking_id}
                className="p-6 border border-gray-200 rounded-xl shadow-sm bg-white"
              >
                <h2 className="text-xl font-semibold text-gray-900">
                  {booking?.listing?.title || "Reserva"}
                </h2>
                <p className="text-sm text-gray-500">
                  {booking?.listing?.location}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(booking?.start_date).toLocaleDateString()} –{" "}
                  {new Date(booking?.end_date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
