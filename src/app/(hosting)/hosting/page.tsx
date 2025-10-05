"use client";

import { IoMdAdd } from "react-icons/io";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaHeadset, FaStar } from "react-icons/fa";
import clsx from "clsx";
import ReservationScroll from "@/components/reservation_scroll";
import { useRouter, useSearchParams } from "next/navigation";
import CreateHouse from "./new-listing/page";
import { createClient } from "../../../../utils/supabase/client";
import { useSession } from "@/context/SessionContext";

/* ------------------ Theme ------------------ */
const themeColors = {
  host: {
    primary: "bg-orange-200",
    primaryHover: "hover:bg-orange-300",
    text: "text-black",
    border: "border-black/20",
  },
};

export default function HomeHosting() {
  const supabase = createClient();
  const { profile } = useSession();
  const [reservations, setReservations] = useState<Booking[]>([]);
  const [filteredReservations, setFilteredReservations] = useState<Booking[]>([]);
  const [listings, setListings] = useState<Listing[]>([]);
  const [activeFilter, setActiveFilter] = useState("Convidados actuais");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const isModalOpen = searchParams.get("new-listing") === "modal";

  const theme = themeColors.host;
  const filters = ["Convidados actuais", "Próximos hóspedes", "Pendentes"];

  /* ------------------ Fetch Reservations ------------------ */
  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("bookings")
        .select("booking_id, guest_id, status");

      if (error) {
        console.error("Error fetching reservations:", error.message);
        setReservations([]);
      } else if (data) {
        setReservations(data as Booking[]);
      }
      setIsLoading(false);
    };

    fetchBookings();
  }, [supabase]);

  /* ------------------ Fetch Listings ------------------ */
  useEffect(() => {
    const fetchListings = async () => {
      const { data, error } = await supabase
        .from("listings")
        .select("listing_id, title, status");

      if (error) {
        console.error("Error fetching listings:", error.message);
        setListings([]);
      } else if (data) {
        setListings(data);
      }
    };

    fetchListings();
  }, [supabase]);

  /* ------------------ Filter Reservations ------------------ */
  useEffect(() => {
    const filtered = reservations.filter((res) => {
      if (activeFilter === "Convidados actuais") return res.status === "Active";
      if (activeFilter === "Próximos hóspedes") return res.status === "Upcoming";
      if (activeFilter === "Pendentes") return res.status === "Pending";
      return true;
    });

    setFilteredReservations(filtered);
  }, [activeFilter, reservations]);

  /* ------------------ Insert New Listing ------------------ */
  const handleAddListing = async (newHouse: any) => {
    const { data, error } = await supabase.from("listings").insert({
      title: newHouse.title,
      status: "Inactivo",
      location: newHouse.street_line1 ?? "Luanda / Angola",
      image: newHouse.image ?? "/images/default.png",
      host_id: profile?.profile_id, // link listing to logged-in host
    }).select("*").single();

    if (error) {
      console.error("Error creating listing:", error.message);
      return;
    }

    setListings((prev) => [...prev, data as Listing]);
  };

  return (
    <div className="w-full flex flex-col items-start justify-center px-4 md:px-12 lg:px-36 my-12 space-y-8">
      {/* Greeting + Create Listing */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4">
        <h3 className="font-semibold text-3xl">Olá, {profile?.first_name}!</h3>
        <button
          onClick={() => router.push("?new-listing=modal")}
          className={clsx(
            "flex items-center gap-2 p-2 rounded-lg shadow transition",
            theme.primary,
            theme.primaryHover,
            theme.text
          )}
        >
          <IoMdAdd className="w-4 h-4" />
          <span>Criar Anúncio</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
        <StatCard
          title="Anúncios Ativos"
          value={listings.filter((l) => l.status === "Activo").length.toString()}
        />
        <StatCard
          title="Reservas Próximas"
          value={reservations.length.toString()}
        />
        <StatCard title="Ganhos do mês" value="AO 0,0" />
        <StatCard
          title="Avaliação Média"
          value="0"
          icon={<FaStar className="w-4 h-4" />}
        />
      </div>

      {/* Reservations Section */}
      <div className="w-full space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <h1 className="font-semibold text-3xl">Reservas</h1>
          <Link href="/hosting/reservations" className="underline text-md">
            Todas as reservas ({reservations.length})
          </Link>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={clsx(
                "px-4 py-2 rounded-full border transition font-medium",
                theme.border,
                activeFilter === filter
                  ? `${theme.primary} ${theme.text}`
                  : "bg-white text-black hover:bg-gray-100"
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Horizontal Scrollable Reservations */}
        <div className="overflow-x-auto w-full rounded-lg px-4 scroll-pl-4 scroll-pr-4 scroll-smooth">
          {filteredReservations.length > 0 ? (
            <ReservationScroll
              reservations={filteredReservations}
              loading={isLoading}
            />
          ) : (
            <EmptyState message="Nenhuma reserva encontrada" />
          )}
        </div>
      </div>

      {/* Help Section */}
      <div className="w-full h-60 rounded-lg flex flex-col items-center justify-center text-center px-6 bg-orange-200 space-y-2">
        <FaHeadset className="w-7 h-7 mb-3" />
        <p className="text-lg font-normal text-black">Precisa de ajuda?</p>
        <p className="text-base text-gray-600 max-w-lg">
          Estamos aqui para o ajudar. Entre em contacto com a nossa equipa — num
          click estaremos disponíveis para si.
        </p>
        <button
          className={clsx(
            "px-5 py-2 rounded-full mt-5 border border-transparent font-medium text-sm hover:border-black text-black"
          )}
        >
          Enviar mensagem
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <CreateHouse
          onClose={() => router.push("/hosting/listings/")}
          onFinish={handleAddListing}
        />
      )}
    </div>
  );
}

/* ------------------ Components ------------------ */
const StatCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon?: React.ReactNode;
}) => (
  <div className="p-6 border rounded-lg shadow-sm flex flex-col gap-2">
    <p className="text-sm text-gray-500">{title}</p>
    <h2 className="text-2xl font-semibold flex items-center gap-1">
      {icon && icon} {value}
    </h2>
  </div>
);

const EmptyState = ({ message }: { message: string }) => (
  <div className="w-full py-16 flex flex-col items-center justify-center text-center text-gray-500">
    <p className="text-lg font-medium mb-2">{message}</p>
    <p className="text-sm max-w-xs">
      Não há reservas para esta categoria no momento. Verifique outra ou crie um
      anúncio.
    </p>
  </div>
);
