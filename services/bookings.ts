import { createClient } from "../src/lib/supabase/client";

const supabase = createClient();

export async function getUpcomingBookings(userId: string) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("user_id", userId)
    .gte("start_date", new Date().toISOString())
    .order("start_date", { ascending: true });

  if (error) throw error;
  return data;
}
