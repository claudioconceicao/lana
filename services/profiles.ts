import { createClient } from "../utils/supabase/client";

const supabase = createClient();

export async function getProfile(userId: string) {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single();
  if (error) throw error;
  return data;
}

export async function isHost(userId: string) {
  const { data, error } = await supabase
    .from("profile_roles")
    .select("*")
    .eq("profile_id", userId)
    .eq("role_id", 2) // 2 = host
    .single();

  if (error) return false;
  return !!data;
}
