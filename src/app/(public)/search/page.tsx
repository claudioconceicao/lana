"use client";

import SearchBox from "@/components/search_box";
import SearchCard from "@/components/search_card";
import { dummy } from "@/database/dummy_data";
import { useState, useRef, useEffect } from "react";

export default function SearchPage() {
  const [listings, setListings] = useState(dummy.listings);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const mapRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Pagination logic
  const totalPages = Math.ceil(listings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedListings = listings.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
    if (listRef.current) listRef.current.scrollTop = 0;
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    if (listRef.current) listRef.current.scrollTop = 0;
  };

  return (
    <div className="h-screen px-8 flex flex-col">
      <div className="z-50 w-full">
        <SearchBox />
      </div>
      <div className="flex flex-1 gap-8 mt-2 min-h-0">
        {/* Listings */}
        <div
          ref={listRef}
          className="flex-1 overflow-y-auto scrollbar-none scroll-smooth flex flex-col min-h-0"
        >
          <p className="p-2 font-sans text-lg mt-4 mb-4">
            {listings.length} casas encontradas
          </p>
          <hr className="border-gray-200" />

          <ul className="p-4 space-y-4 flex-1 flex flex-col min-h-0">
            {paginatedListings.map((listing, index) => (
              <li key={listing.id} className="space-y-4 flex-1">
                <SearchCard listing={listing} />
                {index !== paginatedListings.length - 1 && (
                  <hr className="border-gray-200" />
                )}
              </li>
            ))}
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
          </ul>
        </div>

        {/* Map */}
        <div
          ref={mapRef}
          className="flex justify-center items-center w-[590px] h-[580px] rounded-2xl overflow-hidden mx-auto md:mx-0"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.671057212929!2d-79.38318468519957!3d43.64306242217024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b34d3b8b3b3d3%3A0x7e4b8f4f3e5a1b1b!2sCN%20Tower!5e0!3m2!1sen!2sca!4v1631025940134!5m2!1sen!2sca"
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
