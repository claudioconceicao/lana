'use client';

import { useEffect } from 'react';
import { createClient } from '../utils/supabase/client';
import { useRouter, usePathname } from 'next/navigation';

export default function AuthWatcher() {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth event:', event);

        if (event === 'SIGNED_IN') {
          if (pathname === '/login' || pathname === '/register') {
            router.push('/');
          }
        } else if (event === 'SIGNED_OUT') {
          router.push('/login');
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [router, pathname, supabase.auth]);

  return null;
}
