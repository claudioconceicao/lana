"use client";

import { useState, useEffect } from "react";
import { createClient } from "../../../../lib/supabase/client";
import { Database } from "../../../../lib/supabase/models";
import ListingCard from "@/components/listing_card";
import { sanitizeNulls } from "@/utils/sanitize"; // ✅ add this line

type Listing = Database["public"]["Tables"]["listings"]["Row"];
type WishlistRow = Database["public"]["Tables"]["wishlists"]["Row"];

interface WishlistItem extends WishlistRow {
  listing: Listing | null;
}

interface ListingProp {
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

  type ListingWithRelations = Listing & {
    listing_images?: Database["public"]["Tables"]["listing_images"]["Row"][];
    accommodation_type?: Database["public"]["Tables"]["accommodation_types"]["Row"];
    province?: Database["public"]["Tables"]["provinces"]["Row"];
    bookings?: (Database["public"]["Tables"]["bookings"]["Row"] & {
      reviews?: Database["public"]["Tables"]["reviews"]["Row"][];
    })[];
    amenities?: Database["public"]["Tables"]["amenities"]["Row"][];
  };

const Wishlist = () => {
  const [loading, setLoading] = useState(false);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [listings, setListings] = useState<ListingWithRelations[]>([]);
  useEffect(() => {
    const supabase = createClient();

    const fetchWishlist = async () => {
      setLoading(true);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        setWishlist([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("wishlists")
        .select(`
          wishlist_id,
          user_id,
          listing_id,
          created_at,
          listings (*)
        `)
        .eq("user_id", session.user.id);

      if (error) {
        console.error("Error fetching wishlist:", error);
        setWishlist([]);
      } else {
          const formatted = (data || []).map((item: any) => ({
          ...item,
          listing: item.listings ? sanitizeNulls(item.listings) : null,
        }));
        setWishlist(formatted);
        setListings(formatted.map(item => item.listing).filter(Boolean) as ListingWithRelations[]);
      }

      setLoading(false);
    };

    fetchWishlist();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 text-gray-500">
        Carregando sua lista de favoritos...
      </div>
    );
  }

  return (
    <div className="flex justify-center min-h-[calc(100vh-80px)]">
      <div className="w-full h-full  mx-[50px] mt-[30px] px-[50px] py-8">
        <h1 className="text-3xl font-semibold mb-6">Favoritos</h1>

        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500">
            <p className="text-lg font-medium mb-2">
              A sua lista de favoritos está vazia.
            </p>
            <p className="text-sm">
              Adicione casas, apartamentos ou locais aos favoritos para vê-los aqui.
            </p>
            <button className="mt-6 px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition">
              Explorar Acomodações
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {listings.map(
              (item) => (
                  <ListingCard
                    key={item.listing_id}
                    listing={item}
                    initiallyLiked
                  />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
