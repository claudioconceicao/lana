"use client";

import { useState, useRef, useEffect } from "react";
import ListingCard from "@/components/listing_card";
import SearchBox from "@/components/search_box";
import { createClient } from "../../../lib/supabase/client";
import { Database } from "../../../lib/supabase/models";
import { sanitizeNulls } from "@/utils/sanitize";

type Listing = Database["public"]["Tables"]["listings"]["Row"];
type ListingWithRelations = Listing & {
  listing_images?: Database["public"]["Tables"]["listing_images"]["Row"][];
  accommodation_type?: Database["public"]["Tables"]["accommodation_types"]["Row"];
  province?: Database["public"]["Tables"]["provinces"]["Row"];
  bookings?: (Database["public"]["Tables"]["bookings"]["Row"] & {
    reviews?: Database["public"]["Tables"]["reviews"]["Row"][];
  })[];
  amenities?: Database["public"]["Tables"]["amenities"]["Row"][];
};

export default function SearchPage() {
  const supabase = createClient();

  const [listings, setListings] = useState<ListingWithRelations[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(8);
  const [totalListings, setTotalListings] = useState<number>(0);

  const listRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);

  // 📏 Handle responsive item count
  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      setItemsPerPage(width < 640 ? 4 : width < 1024 ? 6 : 8);
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  // 🧠 Fetch listings from Supabase (with pagination)
  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        setError(null);

        const from = (currentPage - 1) * itemsPerPage;
        const to = from + itemsPerPage - 1;

        const { data, error, count } = await supabase
          .from("listings")
          .select("*", { count: "exact" })
          .order("created_at", { ascending: false })
          .range(from, to);

        if (error) throw error;

        setListings(data.map(sanitizeNulls));
        setTotalListings(count || 0);
      } catch (err: any) {
        setError(err.message || "Erro ao carregar listagens.");
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [currentPage, itemsPerPage]);

  const totalPages = Math.ceil(totalListings / itemsPerPage);

  // 🔁 Scroll top when page changes
  const scrollToTop = () => {
    listRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((p) => p - 1);
      scrollToTop();
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((p) => p + 1);
      scrollToTop();
    }
  };

  return (
    <div className="h-screen px-8 flex flex-col">
      {/* 🔍 Search box */}
      <div className="z-50 w-full">
        <SearchBox />
      </div>

      <div className="flex flex-1 gap-8 mt-2 min-h-0">
        {/* 🏠 Listings */}
        <div
          ref={listRef}
          className="flex-1 overflow-y-auto scroll-smooth flex flex-col min-h-0 pb-28"
        >
          <p className="p-2 font-sans text-lg mt-4 mb-4">
            {loading
              ? "Carregando casas..."
              : `${totalListings} casa${totalListings !== 1 ? "s" : ""} encontrada${totalListings !== 1 ? "s" : ""}`}
          </p>
          <hr className="border-gray-200" />

          {/* Loading / Error / Data States */}
          {loading ? (
            <p className="text-center text-gray-500 py-10">A carregar...</p>
          ) : error ? (
            <p className="text-center text-red-500 py-10">{error}</p>
          ) : listings.length === 0 ? (
            <p className="text-center text-gray-500 py-10">
              Nenhuma casa encontrada.
            </p>
          ) : (
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {listings.map((listing) => (
                <ListingCard key={listing.listing_id} listing={listing} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && totalListings > 0 && (
            <div className="flex justify-center items-center mt-4 p-4 gap-4">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg disabled:opacity-50"
              >
                ← Anterior
              </button>
              <span className="text-sm text-gray-600">
                Página {currentPage} de {totalPages || 1}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages || totalPages === 0}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg disabled:opacity-50"
              >
                Próxima →
              </button>
            </div>
          )}
        </div>

        {/* 🗺️ Map */}
        <div
          ref={mapRef}
          className="hidden lg:flex justify-center items-center w-[40%] max-w-[600px] h-[580px] rounded-xl mx-auto md:mx-0"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!...your_map..."
            width="100%"
            height="100%"
            title="Map"
            className="rounded-2xl"
            style={{ border: 0 }}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
