"use client";

import { useState, useEffect } from "react";
import { createClient } from "../../../../../utils/supabase/client";
import { Database } from "../../../../../utils/supabase/models";
import ListingCard from "@/components/listing_card";

type ListingRow = Database["public"]["Tables"]["listings"]["Row"];
type WishlistRow = Database["public"]["Tables"]["wishlists"]["Row"];

interface WishlistItem extends WishlistRow {
  listing: ListingRow | null;
}

const Wishlist = () => {
  const [loading, setLoading] = useState(false);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

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

      // ✅ Correct join syntax
      const { data, error } = await supabase
        .from("wishlists")
        .select(
          `
          wishlist_id,
          user_id,
          listing_id,
          created_at,
          listings (*)
        `
        )
        .eq("user_id", session.user.id);

      if (error) {
        console.error("Error fetching wishlist:", error);
        setWishlist([]);
      } else {
        // Supabase returns "listings" (not "listing") as a nested object
        const formatted = (data || []).map((item: any) => ({
          ...item,
          listing: item.listings ?? null,
        }));
        setWishlist(formatted);
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
      <div className="w-full h-full border border-gray-300 mx-[50px] mt-[30px] px-[50px] py-8">
        <h1 className="text-3xl font-semibold mb-6">Favoritos</h1>

        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500">
            <p className="text-lg font-medium mb-2">
              A sua lista de favoritos está vazia.
            </p>
            <p className="text-sm">
              Adicione casas, apartamentos ou locais aos favoritos para vê-los
              aqui.
            </p>
            <button className="mt-6 px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition">
              Explorar Acomodações
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {wishlist.map(
              (item) =>
                item.listing && (
                  <ListingCard key={item.listing.listing_id} listing={item.listing} initiallyLiked />
                )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
