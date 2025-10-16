import { createClient } from "../src/lib/supabase/server";
import { cookies } from "next/headers";


export async function getSessionAndProfile() {
  // Server-side Supabase client
  const supabase = await createClient(cookies());

  try {
    // Get logged-in user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return { user: null, profile: null, isHost: false };
    }

    // Fetch profile from DB
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("profile_id", user.id)
      .single();

    if (profileError) {
      console.warn("Profile not found:", profileError.message);
    }

    // Check if user has host role
    const { data: hostRole, error: hostError } = await supabase
      .from("profile_roles")
      .select("*")
      .eq("profile_id", user.id)
      .eq("role_id", 2)
      .maybeSingle();

    if (hostError) {
      console.warn("Error fetching host role:", hostError.message);
    }

    return {
      user,
      profile: profile || null,
      isHost: Boolean(hostRole),
    };
  } catch (err) {
    console.error("Supabase error:", err);
    return { user: null, profile: null, isHost: false };
  }
}
