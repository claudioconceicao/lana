import { createServerSupabaseClient } from "../utils/supabase/server";
import { headers } from "next/headers";

export async function getSessionAndProfile() {
  const supabase = await createServerSupabaseClient();

  // ✅ Use secure user fetch
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
      // Fetch profile from DB
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user?.id)
      .single();

    const headerStore = await headers();
    const pathname = headerStore.get("x-pathname") || "/";
    return {
      user,
      profile: profileError ? null : profile,
      pathname
    };

} catch (userError) {
  console.error("Supabase error:", userError);
  const headerStore = await headers();
  const pathname = headerStore.get("x-pathname") || "/";
  return { user: null, profile: null, pathname };
}

}
