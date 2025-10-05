"use client";

import { createClient } from "../../../../../../utils/supabase/client";
import {useState, useEffect} from "react";

export default function CancelledTrips() {
  const cancelledTrips: any[] = []; // Replace with your real data
  const [loading, setLoading] = useState(false);
  type Booking = {
    id: any;
    start_date: any;
    end_date: any;
    status:any
    listing: { title: any; location: any }[];
  };
  const [bookings, setBookings] = useState<Booking[]>([]);

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
            id,
            start_date,
            end_date,
            status,
            listing: listings ( title, location )
          `)
          .eq("user_id", session.user.id)
          .eq("status", "cancelled")
          .gte("start_date", new Date().toISOString())
          .order("start_date", { ascending: true });
  
        if (error) {
          console.error("Error fetching bookings:", error);
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
  return (
    <div className="flex justify-center">
      <div className="w-full py-16">
        {cancelledTrips.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500">
            <p className="text-lg font-medium mb-2">
              Você ainda não tem viagens canceladas.
            </p>
            <p className="text-sm">
              Se alguma reserva for cancelada, ela aparecerá aqui.
            </p>
            <button className="mt-6 px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition">
              Explorar Novos Destinos
            </button>
          </div>
        ) : (
          <div>
            {/* Map cancelled trips here */}
          </div>
        )}
      </div>
    </div>
  );
}
