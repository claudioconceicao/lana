"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "../../../../../../utils/supabase/client";
import { HostingListingCardShimmer } from "@/components/listing_shimmer";
import Image from "next/image";
import HostingListingCard from "@/components/listing_list_card";
import EditNav from "./[listingId]/edit_nav";

type Listing = {
  listing_id: string;
  title: string;
  location: string;
  status?: string;
  country?: string | null;
  image?: string;
};

export default function EditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const params = useParams();
  const router = useRouter();

  const listingId = params.listingId as string;

  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("listings")
        .select(
          `
          listing_id,
          title,
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

      const mapped = (data ?? []).map((l: any) => ({
        listing_id: l.listing_id,
        title: l.title,
        status: l.status ?? "Inactivo",
        location: `${l.municipality?.name ?? ""}, ${l.province?.name ?? ""}, ${
          l.countries?.name ?? ""
        }`,
        country: l.countries?.iso_code ?? null,
        image: "/images/luanda_sky.jpg", // fallback image
      }));

      setListings(mapped);
      setLoading(false);
    };

    fetchListings();
  }, [supabase]);

    useEffect(() => {
    if (listingId && listings.length > 0) {
      const match = listings.find((l) => l.listing_id === listingId) || null;
      setSelectedListing(match);
    }
  }, [listingId, listings]);

  const filteredListings = listings.filter(
    (l) =>
      l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
  <div className="flex h-[calc(100vh-60px)]">
    {/* Sidebar */}
    <div className="w-[400px] border-r border-gray-200 bg-white flex flex-col">
      {/* Search */}
      <div className="p-4 border-b sticky top-0 bg-white z-10">
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

      {/* Listings */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {loading ? (
          [...Array(3)].map((_, i) => (
            <HostingListingCardShimmer key={i} />
          ))
        ) : filteredListings.length > 0 ? (
          filteredListings.map((l) => (
            <HostingListingCard
              key={l.listing_id}
              listing={l}
              selected={listingId === l.listing_id}
              onClick={() =>
                router.push(`/hosting/listings/edit/${l.listing_id}/details`)
              }
            />
          ))
        ) : (
          <p className="p-4 text-sm text-gray-500">
            Nenhum anúncio encontrado
          </p>
        )}
      </div>
    </div>

    {/* Main content */}
    <main className="flex-1 h-[calc(100vh-60px)] overflow-y-auto px-8">
      {selectedListing ? (
        <>
          <div className="py-4 text-lg font-medium">
            <h2 className="text-lg font-medium">{selectedListing.title}</h2>
          </div>
          <EditNav listingId={listingId} />
          <div className="py-4">{children}</div>
        </>
      ) : (
        <div className="h-full flex items-center justify-center text-gray-500">
          Selecione um anúncio na barra lateral
        </div>
      )}
    </main>
  </div>
);

}
