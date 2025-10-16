"use client";

import HostingListingCard from "@/components/listing_list_card";
import { useState, useEffect, ChangeEvent } from "react";
import { createClient } from "../../../../lib/supabase/client";
import { useSession } from "@/context/SessionContext";
import { HostingListingCardShimmer } from "@/components/listing_shimmer";
import clsx from "clsx";
import { useRouter, useParams } from "next/navigation";

type Listing = {
  listing_id: string;
  title: string;
  description?: string;
  price?: number;
  location: string;
  country?: string;
  image?: string;
};

export default function Sidebar() {
  const supabase = createClient();
  const [listings, setListings] = useState<Listing[]>([]);
  const [currentListing, setCurrentListing] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { profile } = useSession();
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const listingId = params.listingId;
    setCurrentListing(listingId as string);
  }, [params.listingId]);

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
        location: `${l.municipality?.name ?? ""}, ${l.province?.name ?? ""}, ${
          l.countries?.name ?? ""
        }`,
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

  return (

      <div className="flex lg:block md:block sm:hidden lg:sticky lg:top-16 h-fit flex flex-col w-[400px] border-r border-gray-200 px-4 pt-4 bg-white min-h-calc(100vh - 64px)">
        <h2 className="font-semibold text-xl">{listings?.length || 0} Anúncios</h2>

        {/* Search */}
        <form className="mt-2">
          <input
            type="text"
            placeholder="Procurar anúncios"
            value={searchQuery}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value)
            }
            className="w-full p-2 rounded-lg bg-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </form>

        {/* Listings */}
        {loading ? (
          <div className="flex flex-col w-[400px] px-4 pt-4">
            {[...Array(6)].map((_, i) => (
              <HostingListingCardShimmer key={i} />
            ))}
          </div>
        ) : (
          <div className="overflow-y-auto max-h-[calc(100vh-180px)]">
            <ul className="mt-4 space-y-2 mb-8">
              {filteredListings.map((listing) => (
                <li key={listing.listing_id}>
                  <HostingListingCard
                    listing={listing}
                    selected={listing.listing_id === currentListing}
                    onClick={() =>
                      router.push(
                        `/hosting/listings/edit/${listing.listing_id}/details`
                      )
                    }
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
        )}
      </div>
  );
}
