"use client";

import { ImageCarousel } from "./image_carousel";
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "../lib/supabase/client";
import { useSession } from "@/context/SessionContext";

interface ListingCardProps {
  listing: {
    listing_id: string;
    title?: string;
    base_price?: number;
    location?: string;
    listing_images?: { image_url: string }[];
    bookings?: { reviews?: { rating: number }[] }[];
  };
  initiallyLiked?: boolean;
}

export default function ListingCard({
  listing,
  initiallyLiked = false,
}: ListingCardProps) {
  const router = useRouter();
  const supabase = createClient();
  const { profile } = useSession();
  const [liked, setLiked] = useState(initiallyLiked);
  const [loading, setLoading] = useState(false);

  const images = listing?.listing_images?.map((img) => img.image_url) ?? [
    "/images/image.png",
    "/images/image1.png",
    "/images/image3.png",
  ];

  useEffect(() => {
    setLiked(initiallyLiked);
  }, [initiallyLiked]);

  const toggleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const user_id = profile?.profile_id;
    if (!user_id) return;

    const newLiked = !liked;
    setLiked(newLiked);
    setLoading(true);

    try {
      if (newLiked) {
        const { error } = await supabase
          .from("wishlists")
          .insert([{ listing_id: listing.listing_id, user_id }]);
        if (error) throw error;

        await supabase.from("notifications").insert([
          {
            user_id,
            type: "wishlist",
            message: `Você adicionou ${listing.title} à sua lista de desejos.`,
            listing_id: listing.listing_id,
          },
        ]);
      } else {
        const { error } = await supabase
          .from("wishlists")
          .delete()
          .match({ listing_id: listing.listing_id, user_id });
        if (error) throw error;
      }
    } catch (err) {
      console.error("Error toggling wishlist:", err);
      setLiked(!newLiked); // revert like state
    } finally {
      setLoading(false);
    }
  };

  const reviews = listing.bookings?.flatMap((b) => b.reviews ?? []) ?? [];
  const avgRating = reviews.length
    ? (
        reviews.reduce((s, r) => s + (r.rating ?? 0), 0) / reviews.length
      ).toFixed(1)
    : null;

  const handleCardClick = () => {
    router.push(`/homes/${listing?.listing_id}`);
  };

  return (
    <div
      className="w-full sm:max-w-sm rounded-xl bg-white overflow-hidden shadow-sm hover:shadow-md transition"
      onClick={handleCardClick}
    >
      {/* Image Carousel */}
      <div className="w-full h-64 cursor-pointer">
        <ImageCarousel images={images} />
      </div>

      {/* Card Content */}
      <div className="px-2 py-3 flex flex-col gap-2 cursor-pointer">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="font-heading text-lg font-semibold text-gray-900">
              {listing?.title || "Título do Imóvel"}
            </h2>
            <p className="text-sm text-gray-500">
              {listing?.location || "Localização"}
            </p>
          </div>

          <button
            onClick={(e) => toggleLike(e)}
            disabled={loading}
            className={`rounded-full p-2 hover:bg-gray-100 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {liked ? (
              <FaHeart className="text-red-500 w-5 h-5" />
            ) : (
              <FaRegHeart className="text-gray-700 w-5 h-5" />
            )}
          </button>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1 text-yellow-500 text-sm">
            <FaStar className="w-4 h-4" />
            <span>{avgRating ?? "N/A"}</span>
          </div>

          <p className="font-medium text-gray-900 text-sm">
            {listing?.base_price ?? "5000"}{" "}
            <span className="text-gray-500">Kz / noite</span>
          </p>
        </div>
      </div>
    </div>
  );
}
