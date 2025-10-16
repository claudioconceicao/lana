"use client";

import { useState, useEffect, ChangeEvent, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import HostingListingCard from "@/components/listing_list_card";
import { dummy } from "@/database/dummy_data";
import { CalendarApi } from "@fullcalendar/core";
import { useParams } from "next/navigation";
import { createClient } from "../../../../lib/supabase/client";
import { useSession } from "@/context/SessionContext";
import { HostingListingCardShimmer } from "@/components/listing_shimmer";

function capitalize(str: string) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

type Listing = {
  listing_id: string;
  title: string;
  description?: string;
  price?: number;
  location: string;
  country?: string;
  image?: string;
};

export default function Calendar() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [currentListing, setCurrentListing] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [monthName, setMonthName] = useState("");
  const calendarRef = useRef<FullCalendar | null>(null);
  const params = useParams();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const {profile} = useSession();

  const getApi = (): CalendarApi | null =>
    calendarRef.current ? calendarRef.current.getApi() : null;

  const updateMonthName = () => {
    const api = getApi();
    if (api) setMonthName(api.view.title);
  };

  const handlePrev = () => {
    getApi()?.prev();
    updateMonthName();
  };

  const handleNext = () => {
    getApi()?.next();
    updateMonthName();
  };

  const handleToday = () => {
    getApi()?.today();
    updateMonthName();
  };

  useEffect(() => {
    const listingId = params.listingId;
    setCurrentListing(listingId as string);
  }, [params.listingId])

  useEffect(() => {
    const fetchListings = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("listings")
        .select(
          `
          listing_id,
          title,
          city,
          status,
          municipality:municipality_id(name),
          province:province_id(name),
          countries:country_code(name, iso_code)
        `
        )
        .eq("host_id", user?.id);

      if (error) {
        console.error("Error fetching listings:", error.message, error);
        setLoading(false);
        return;
      }

      if (!data || !Array.isArray(data)) {
        setListings([]);
        setLoading(false);
        return;
      }

      const mapped = data.map((l: any) => ({
        listing_id: l.listing_id,
        title: l.title,
        status: l.status ?? "Inactivo",
        location: `${l.municipality?.name ?? ""}, ${l.province?.name ?? ""}, ${l.countries?.name ?? ""}`,
        country: l.countries?.iso_code ?? null,
        image: "/images/luanda_sky.jpg",
      }));

      setListings(mapped);
      setLoading(false);
    };
    fetchListings();
  }, [profile?.profile_id, supabase]);

  // Filter
  const filteredListings = listings.filter(
    (listing) =>
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-col w-[400px] px-4 pt-4">
        {[...Array(3)].map((_, i) => (
          <HostingListingCardShimmer key={i} />
        ))}
      </div>
    );
  }

  const selectedListing = listings.find((l) => l.listing_id === currentListing) || null;

  return (
    <div className="flex h-[calc(100vh-60px)] overflow-hidden">
      {/* Sidebar */}
      <div className="hidden sm:flex md:block lg:block w-[400px] border-r border-gray-200 bg-white h-full flex flex-col">
        {/* Search (sticky) */}
        <div className="p-4 border-b bg-white sticky top-0 z-10">
          <h2 className="font-semibold text-xl mb-2">
            {listings.length} Anúncios
          </h2>
          <input
            type="text"
            placeholder="Procurar anúncios"
            value={searchQuery}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value)
            }
            className="w-full p-2 rounded-lg bg-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Listings (scrollable only here) */}
        <div className="flex-1 h-[84%] overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-300">
          <ul className="space-y-2">
            {filteredListings.map((listing) => (
              <li key={listing.listing_id}>
                <HostingListingCard
                  listing={listing}
                  selected={listing.listing_id === currentListing}
                  onClick={() => setCurrentListing(listing.listing_id)}
                />
              </li>
            ))}
            {filteredListings.length === 0 && (
              <li className="text-gray-500 text-sm text-center py-4">
                Nenhum anúncio encontrado
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Calendar (fixed, never scrolls) */}
      <div className="flex-1 flex flex-col h-full px-6 pb-6 overflow-hidden">
        {selectedListing ? (
          <div className="flex flex-col h-full p-4 overflow-hidden">
            <h1 className="text-xl font-semibold w-max mb-2">
              {selectedListing.title}
            </h1>

            {/* Calendar controls */}
            <div className="flex items-center justify-between mb-4 shrink-0">
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
                  Hoje
                </button>
              </div>
              <h2 className="font-medium text-xl">{capitalize(monthName)}</h2>
            </div>

            {/* Calendar fills remaining space */}
            <div className="flex-1 min-h-0">
              <FullCalendar
                ref={calendarRef}
                plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={false}
                selectable={true}
                locale="pt-br"
                editable={true}
                contentHeight="100%"
                height="100%"
                eventBackgroundColor="orange"
              />
            </div>
          </div>
        ) : (
          <p className="text-gray-500 self-center m-auto">
            Selecione um anúncio para ver o calendário
          </p>
        )}
      </div>
    </div>
  );
}
