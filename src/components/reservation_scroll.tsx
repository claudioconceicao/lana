"use client";

import { useRef } from "react";
import ReservationCard from "@/components/reseveration-card";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { Database } from "../../utils/supabase/models";

type Booking = Database["public"]["Tables"]["bookings"]["Row"];
type ReservationScrollProps = {
  reservations: (Booking & { guest: string })[];
  loading?: boolean;
};

const ReservationScroll = ({ reservations, loading = false }: ReservationScrollProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.offsetWidth;
    scrollRef.current.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full flex flex-col gap-2">
      {/* Scroll Buttons */}
      <div className="flex justify-end gap-2 mb-2">
        <ScrollButton direction="left" onClick={() => handleScroll("left")} />
        <ScrollButton direction="right" onClick={() => handleScroll("right")} />
      </div>

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className="overflow-x-auto w-full py-4 bg-neutral-100 rounded-lg px-4 scroll-pl-4 scroll-pr-4 scroll-smooth scrollbar-hide"
      >
        {loading ? (
          <div className="flex gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 w-64 sm:w-72 md:w-80 lg:w-96 snap-start">
                <ReservationCardSkeleton />
              </div>
            ))}
          </div>
        ) : reservations.length > 0 ? (
          <div className="flex gap-4 snap-x snap-mandatory">
            {reservations.map((res, index) => (
              <div
                key={res.booking_id}
                className={`flex-shrink-0 w-64 sm:w-72 md:w-80 lg:w-96 snap-start ${
                  index === reservations.length - 1 ? "pr-4" : ""
                }`}
              >
                <ReservationCard
                  title={`Reserva ${res.booking_id + 1}`}
                  beeva="Beeva Name"
                  guest={res.guest}
                  date="2025-09-10"
                  photo="Foto"
                />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState message="Nenhuma reserva encontrada" />
        )}
      </div>
    </div>
  );
};

export default ReservationScroll;

/* ------------------ Scroll Button ------------------ */
const ScrollButton = ({ direction, onClick }: { direction: "left" | "right"; onClick: () => void }) => {
  const Icon = direction === "left" ? IoChevronBack : IoChevronForward;
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-full hover:bg-gray-100 transition"
    >
      <Icon className="w-4 h-4" />
    </button>
  );
};

/* ------------------ Skeleton ------------------ */
const ReservationCardSkeleton = () => (
  <div className="h-full w-full bg-white rounded-lg shadow-sm animate-pulse flex flex-col justify-between">
    {/* Content */}
    <div className="p-4 flex flex-col gap-2 flex-1">
      {/* Title */}
      <div className="h-5 w-32 bg-gray-300 rounded"></div>
      {/* Subtitle */}
      <div className="h-4 w-24 bg-gray-200 rounded"></div>

      {/* Guest + Date */}
      <div className="flex items-center justify-between mt-4 flex-1">
        <div className="flex flex-col gap-1">
          <div className="h-4 w-20 bg-gray-300 rounded"></div>
          <div className="h-3 w-16 bg-gray-200 rounded"></div>
        </div>
        {/* Circular Photo */}
        <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
      </div>
    </div>

    {/* Button */}
    <div className="h-[50px] bg-gray-200 rounded-b-lg w-full mt-2"></div>
  </div>
);



/* ------------------ Empty State ------------------ */
const EmptyState = ({ message }: { message: string }) => (
  <div className="w-full py-16 flex flex-col items-center bg-neutral-200 justify-center text-center text-gray-500">
    <p className="text-lg font-medium mb-2">{message}</p>
    <p className="text-sm max-w-xs">
      Não há reservas para esta categoria no momento. Verifique outra ou crie um anúncio.
    </p>
  </div>
);
