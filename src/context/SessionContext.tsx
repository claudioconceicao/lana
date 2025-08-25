// context/SessionContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "../../utils/supabase/client";

type SessionContextType = {
  profile: any;
  loading: boolean;
};

const SessionContext = createContext<SessionContextType>({
  profile: null,
  loading: false,
});

export const SessionProvider = ({
  children,
  initialProfile = null,
}: {
  children: React.ReactNode;
  initialProfile?: any;
}) => {
  const [profile, setProfile] = useState(initialProfile);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    const loadProfile = async () => {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        setProfile(data || null);
      } else {
        setProfile(null);
      }
      setLoading(false);
    };

    // Load profile on first mount if not provided
    if (!initialProfile) {
      loadProfile();
    }

    // ✅ Listen to auth state changes (login / logout)
    const { data: subscription } = supabase.auth.onAuthStateChange(
      async (event) => {
        if (event === "SIGNED_OUT") {
          setProfile(null);
        }
        if (event === "SIGNED_IN") {
          await loadProfile();
        }
      }
    );

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, [initialProfile]);

  return (
    <SessionContext.Provider value={{ profile, loading }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
