import { createClient } from "../src/lib/supabase/client";
import { Database } from "../src/lib/supabase/models";

export type Listing = Database["public"]["Tables"]["listings"]["Row"];
export type NewListing = Database["public"]["Tables"]["listings"]["Insert"];

/**
 * Fetch all listings
 */
export async function getListings(): Promise<Listing[]> {
  
  const supabase = createClient();

  const { data, error } = await supabase.from("listings").select("*");

  if (error) throw new Error(`Error fetching listings: ${error.message}`);

  return data ?? [];
}

/**
 * Fetch listing by ID
 */
export async function getListingById(id: string): Promise<Listing | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null; // not found
    throw new Error(`Error fetching listing: ${error.message}`);
  }

  return data;
}

/**
 * Create new listing
 */
export async function createListing(listing: NewListing): Promise<Listing> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("listings")
    .insert([listing])
    .select()
    .single();

  if (error) throw new Error(`Error creating listing: ${error.message}`);

  return data;
}
