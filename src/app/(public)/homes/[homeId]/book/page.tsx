"use client";

import Image from "next/image";
import BookingSummary from "./booking_summary";
import PaymentDetails from "./payment_details";
import ConfirmButton from "./confirmation_button";
import { Database } from "@/lib/supabase/models";
import { useParams, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { LoaderCircle } from "lucide-react";

type Listing = Database["public"]["Tables"]["listings"]["Row"];
interface BookingPageProps {
  params: { listing: Listing };
  searchParams?: { startDate?: string; endDate?: string; guests?: string };
}
export default function BookingPage({
  params,
  searchParams,
}: BookingPageProps) {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  const { homeId } = useParams<{ homeId: string }>();
  const startDate = useSearchParams().get("startDate") ?? "";
  const endDate = useSearchParams().get("endDate") ?? "";
  const dates = { startDate, endDate };
  const guests = useSearchParams().get("guests") ?? "1";

  const [listing, setListing] = useState<Listing | null>(null);

  console.log("homeId:", homeId);

  useEffect(() => {
    setLoading(true);
    const fetchListing = async (id: string) => {
      // fetch listing details if needed
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .eq("listing_id", homeId)
        .single();

      if (error) {
        console.error("Error fetching listing:", error);
        setLoading(false);
      } else {
        setListing(data);
        setLoading(false);
      }
    };

    if (homeId) {
      fetchListing(homeId);
    }
  }, [homeId, supabase]);


   if (loading) {
    return (
      <div className="flex h-screen">
        <div className="absolute h-screen w-full inset-0 flex justify-center items-center bg-white/60 z-50">
          <LoaderCircle className="animate-spin w-12 h-12" />
        </div>
      </div>
    );
  }
  return (
    <div className="mx-[150px] p-8">
      <h1 className="font-heading text-3xl mb-6 font-semibold">Reservar</h1>

      <div className="flex h-full flex-row justify-between gap-8">
        {/* Left side → Payment & Booking details */}
        <div className="flex flex-col flex-1 space-y-6">
          <BookingSummary dates={dates} guests={guests} />
          <PaymentDetails />
          <CancelPolicy />
          <HouseRules />
          <ConfirmButton />
        </div>

        {/* Right side → Listing info */}
        <div className="w-[450px] sticky top-[80px] max-h-[20vh] overflow-y-auto">
          <ListingSummary listing={listing} />
        </div>
      </div>
    </div>
  );
}

function CancelPolicy() {
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <h2 className="font-semibold mb-3 text-xl">Política de cancelamento</h2>
      <p className="text-sm text-gray-600">
        Cancelamentos feitos até <strong>48h antes</strong> do check-in recebem
        reembolso total. Após esse prazo, pode haver taxa de cancelamento.
      </p>
    </div>
  );
}

function HouseRules() {
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <h2 className="font-semibold mb-3 text-xl">Regras da casa</h2>
      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
        <li>Proibido fumar dentro da propriedade</li>
        <li>Check-in a partir das 15h</li>
        <li>Check-out até às 11h</li>
        <li>Animais de estimação sob consulta</li>
      </ul>
    </div>
  );
}

function ListingSummary({ listing }: { listing: Listing | null }) {
  return (
    <div className="border w-full rounded-lg p-4 shadow-sm">
      <div className="flex flex-row gap-4 items-center">
        <Image
          src={"/images/luanda_sky.png"}
          width={80}
          height={80}
          alt={"cover image"}
          className="rounded-lg object-cover"
        />
        <div>
          <h2 className="font-semibold">{listing?.title}</h2>
          <p className="text-sm text-gray-500">
            Listing ID: {listing?.listing_id}
          </p>
        </div>
      </div>
    </div>
  );
}
