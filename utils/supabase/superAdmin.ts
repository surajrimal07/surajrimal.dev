import { useEffect, useState } from 'react';

import { User } from '@supabase/supabase-js';

import { createClient } from '@/utils/supabase/client';

export function useSuperadminStatus(user: User | null) {
  const [isSuperadmin, setIsSuperadmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function checkSuperadminStatus() {
      if (user) {
        const { data: userProfile, error } = await supabase
          .from('users_admin')
          .select('is_superadmin')
          .eq('email', user.email)
          .single();

        if (!error && userProfile) {
          setIsSuperadmin(userProfile.is_superadmin);
        }
      }
      setIsLoading(false);
    }

    checkSuperadminStatus();
  }, [user, supabase]);

  return { isSuperadmin, isLoading };
}
