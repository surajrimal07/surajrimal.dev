'use client';

import { useRouter } from 'next/navigation';
// Use from 'next/navigation' in the App Router
import { useEffect, useState } from 'react';

import { User } from '@supabase/supabase-js';

import { createClient } from '@/utils/supabase/client';

export default function PrivatePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkUserSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error || !session) {
        router.push('/login'); // Redirect if no session is found
      } else {
        setUser(session.user); // Set user from session
      }
      setLoading(false);
    };

    checkUserSession();
  }, [router, supabase]);

  if (loading) return <p>Loading...</p>;

  return <p>Hello {user ? user.email : 'Guest'}</p>; // Handle case where user may be null
}
