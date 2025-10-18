"use client";

import { ImageCarousel } from "./image_carousel";
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "../lib/supabase/client";
import { useSession } from "@/context/SessionContext";

interface ListingCardProps {
  listing: {
    listing_id: string | null;
    title?: string | null;
    base_price?: number | null;
    location?: string | null;
    province?: { name: string | null };
    max_guests?: number | null;
    no_of_beds?: number | null;
    accommodation_type?: { name: string };
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
  const [supabase, setSupabase] = useState<any>(null);
  const { profile } = useSession();
  const [liked, setLiked] = useState(initiallyLiked);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSupabase(createClient());
  }, []);

  useEffect(() => {
    setLiked(initiallyLiked);
  }, [initiallyLiked]);

  if (!supabase) return null;

  const toggleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (loading || !profile?.profile_id) return;
    const user_id = profile.profile_id;

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
      setLiked(!newLiked);
    } finally {
      setLoading(false);
    }
  };

  const reviews = listing.bookings?.flatMap((b) => b.reviews ?? []) ?? [];
  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((s, r) => s + (r.rating ?? 0), 0) / reviews.length
        ).toFixed(1)
      : "N/A";

  const handleCardClick = () => {
    router.push(`/homes/${listing?.listing_id}`);
  };

  return (
    <div
      className="w-full sm:max-w-sm rounded-tr-xl rounded-tl-xl space-y-2 pb-2 bg-white overflow-hidden shadow-sm hover:shadow-md transition"
      onClick={handleCardClick}
    >
      <div className="w-full h-64 cursor-pointer">
        <ImageCarousel
          images={
            listing?.listing_images?.map((i) => i.image_url) ?? [
              "/images/image.png",
              "/images/image1.png",
              "/images/image3.png",
            ]
          }
        />
      </div>

      <div className="px-2 flex flex-col gap-2 cursor-pointer">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1 max-w-[70%]">
            <h2 className="font-heading text-lg font-semibold text-gray-900 text-nowrap subpixel-antialiased text-ellipsis overflow-hidden">
              {listing?.accommodation_type?.name} em{" "}
              {listing?.province?.name || "Título do Imóvel"}
            </h2>
            <p className="text-sm text-gray-500">
              {listing?.no_of_beds} quartos • {listing?.max_guests} hóspedes
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
            <span>{avgRating}</span>
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
