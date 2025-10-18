"use client";

import { useState, useRef, useEffect } from "react";
import ListingCard from "@/components/listing_card";
import SearchBox from "@/components/search_box";
import { dummy } from "@/database/dummy_data";
import { Database } from "../../../lib/supabase/models";
import { sanitizeNulls } from "@/utils/sanitize";

// ✅ Add minimal typing for clarity
type Listing = Database["public"]["Tables"]["listings"]["Row"];

export default function SearchPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  const mapRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(4); // mobile
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(6); // tablet
      } else {
        setItemsPerPage(8); // desktop
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(listings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedListings = listings.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    if (listRef.current) listRef.current.scrollTop = 0;
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    if (listRef.current) listRef.current.scrollTop = 0;
  };

  return (
    <div className="h-screen px-8 flex flex-col">
      {/* Search bar */}
      <div className="z-50 w-full">
        <SearchBox />
      </div>

      <div className="flex flex-1 gap-8 mt-2 min-h-0">
        {/* Listings */}
        <div
          ref={listRef}
          className="flex-1 overflow-y-auto scroll-smooth flex flex-col min-h-0 pb-28"
        >
          <p className="p-2 font-sans text-lg mt-4 mb-4">
            {listings.length} casas encontradas
          </p>
          <hr className="border-gray-200" />

          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {paginatedListings.map((listing) => (
              <ListingCard key={listing.listing_id} listing={sanitizeNulls(listing)} />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-4 p-2 gap-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        {/* Map */}
        <div
          ref={mapRef}
          className="flex justify-center items-center w-[590px] h-[580px] rounded-xl mx-auto md:mx-0"
        >
          <iframe
            src="https://www.google.com/maps/embed?..."
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
