"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IoMdAdd } from "react-icons/io";
import { useRouter, useSearchParams } from "next/navigation";
import CreateListing from "./create/page";
import { createClient } from "../../../../../utils/supabase/client";
import { useSession } from "@/context/SessionContext";
import { LoaderCircle } from "lucide-react";

type Listing = {
  listing_id: string;
  title: string;
  status: "Draft" | "Listed" | "Unlisted" | string;
  location: string;
  created_at: string;
  image?: string;
};

const ListingList = () => {
  const supabase = createClient();
  const { profile } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isModalOpen = searchParams.get("new-listing") === "modal";

  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "Draft" | "Listed" | "Unlisted"
  >("Draft");

  useEffect(() => {
    const fetchListings = async () => {
      if (!profile?.profile_id) return;
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data: listingsData, error } = await supabase
        .from("listings")
        .select(
          `
          listing_id,
          title,
          status,
          created_at,
          city,
          municipality:municipality_id(name),
          province:province_id(name),
          country:country_code(name)
        `
        )
        .eq("host_id", user?.id);

      if (error) {
        console.error("Error fetching listings:", error);
      } else {
        const mapped = (listingsData ?? [])
          .map((l: any) => ({
            listing_id: l.listing_id,
            title: l.title,
            status: l.status ?? "Unlisted",
            location: `${l.municipality?.name ?? ""}, ${
              l.province?.name ?? ""
            }, ${l.country?.name ?? ""}`,
            created_at: l.created_at,
            image: "/images/default.png",
          }))
          .sort(
            (a: Listing, b: Listing) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          ); // mais recentes primeiro

        setListings(mapped);
      }
      setLoading(false);
    };

    fetchListings();
  }, [profile?.profile_id, supabase]);

  const filteredListings = listings
    .filter((l) => l.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((l) =>
      statusFilter === "Draft" ? true : l.status === statusFilter
    );

  if (loading) {
    return (
      <div className="flex flex-1 justify-center items-center h-full">
        <LoaderCircle className="animate-spin w-10 h-10 text-orange-500" />
      </div>
    );
  }

  return (
    <div className="lg:mx-32 my-12 md:mx-6 sm:mx-4 px-4 overflow-y-auto">
      {/* Header */}
      <div className="flex flex-row items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold">Seus Anúncios</h1>
        <div className="flex flex-row justify-end items-center space-x-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Procurar anúncios"
            className="block pl-3 h-10 w-full md:w-64 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:bg-gray-100 mb-2 md:mb-0"
          />
          <button
            onClick={() => router.push("?new-listing=modal")}
            className="bg-gray-100/30 shadow border border-gray-200 hover:shadow-lg rounded-full w-12 h-12 flex items-center justify-center"
          >
            <IoMdAdd />
          </button>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto mt-6">
        <table className="table-auto w-full border-collapse">
          <thead className="h-12">
            <tr className="text-left text-sm font-semibold border-b border-gray-300">
              <th className="px-4 py-2">Anúncio</th>
              <th className="px-4 py-2">Estado</th>
              <th className="px-4 py-2">Localização</th>
              <th className="px-4 py-2">Criado em</th>
            </tr>
          </thead>
          <tbody>
            {filteredListings.map((listing) => (
              <ListingRow key={listing.listing_id} listing={listing} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-4 md:hidden mt-6">
        {filteredListings.map((listing) => (
          <ListingCard key={listing.listing_id} listing={listing} />
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && <CreateListing />}
    </div>
  );
};

export default ListingList;

/* ------------------- Components ------------------- */
const ListingRow = ({ listing }: { listing: Listing }) => {
  const router = useRouter();
  return (
    <tr
      onClick={() =>
        router.push(`/hosting/listings/edit/${listing.listing_id}/details`)
      }
      className="cursor-pointer hover:bg-gray-100 h-20"
    >
      <td className="border-b border-gray-200 py-2 px-4">
        <div className="flex flex-row items-center">
          <Image
            src={listing.image ?? "/images/default.png"}
            alt={listing.title}
            width={100}
            height={100}
            className="w-16 h-16 rounded-md object-cover mr-4"
          />
          <div className="text-sm font-semibold">{listing.title}</div>
        </div>
      </td>
      <td className="border-b border-gray-200 py-2 px-4">
        <div className="flex items-center">
          <div
            className={`h-2.5 w-2.5 rounded-full mr-2 ${
              listing.status === "Listed" ? "bg-green-500" : "bg-red-500"
            }`}
          ></div>
          {listing.status}
        </div>
      </td>
      <td className="border-b border-gray-200 py-2 px-4">{listing.location}</td>
      <td className="border-b border-gray-200 py-2 px-4">
        {new Date(listing.created_at).toLocaleDateString()}
      </td>
    </tr>
  );
};

const ListingCard = ({ listing }: { listing: Listing }) => {
  const router = useRouter();
  return (
    <div
      onClick={() =>
        router.push(`/hosting/listings/${listing.listing_id}/edit/details`)
      }
      className="bg-white border border-gray-200 rounded-lg p-4 flex items-start space-x-4 cursor-pointer hover:shadow"
    >
      <Image
        src={listing.image ?? "/images/default.png"}
        alt={listing.title}
        width={80}
        height={80}
        className="w-20 h-20 rounded-md object-cover"
      />
      <div className="flex-1">
        <h3 className="text-base font-semibold">{listing.title}</h3>
        <p className="text-sm text-gray-600">{listing.location}</p>
        <p className="text-sm text-gray-500 mt-1">
          Criado em: {new Date(listing.created_at).toLocaleDateString()}
        </p>
        <div className="flex items-center mt-2">
          <div
            className={`h-2.5 w-2.5 rounded-full mr-2 ${
              listing.status === "Active" ? "bg-green-500" : "bg-red-500"
            }`}
          ></div>
          <span className="text-sm">{listing.status}</span>
        </div>
      </div>
    </div>
  );
};
