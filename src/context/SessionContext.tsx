"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "../lib/supabase/client";

type SessionContextType = {
  profile: any | null;
  loading: boolean;
  isHost: boolean;
};

enum Role {
  Guest = 1,
  Host = 2,
  Admin = 3,
}

const SessionContext = createContext<SessionContextType>({
  profile: null,
  loading: false,
  isHost: false,
});

export const SessionProvider = ({
  children,
  initialProfile = null,
  initIsHost = false,
}: {
  children: React.ReactNode;
  initialProfile?: any;
  initIsHost?: boolean;
}) => {
  const [profile, setProfile] = useState(initialProfile);
  const [loading, setLoading] = useState(false);
  const [isHost, setIsHost] = useState(initIsHost);
  const supabase = createClient();


  // Load profile
  const loadProfile = async () => {
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setProfile(null);
      setIsHost(false);
      setLoading(false);
      return;
    }

    // Get profile
    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("profile_id", user.id)
      .single();

    setProfile(profileData || null);

    // Get roles
    const { data: roles } = await supabase
      .from("profile_roles")
      .select("role_id")
      .eq("profile_id", user.id);

    const hasHostRole = roles?.some((r: any) => r.role_id === Role.Host);
    setIsHost(hasHostRole || false);

    setLoading(false);
  };

  useEffect(() => {
    loadProfile();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      async (event) => {
        if (event === "SIGNED_OUT") {
          setProfile(null);
          setIsHost(false);
        }
        if (event === "SIGNED_IN") {
          await loadProfile();
        }
      }
    );

    return () => {
      subscription.subscription.unsubscribe();
    };
  });

  return (
    <SessionContext.Provider value={{ profile, loading, isHost }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
