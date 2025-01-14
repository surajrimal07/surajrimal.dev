import { useCallback, useEffect, useState } from 'react';

import type { User } from '@supabase/supabase-js';

import useChatStore from '@/lib/store/chatStore';
import { updateAuthorStatus } from '@/lib/telegram';
import { createClient } from '@/utils/supabase/client';

interface SuperadminStatus {
  isSuperadmin: boolean;
  isLoading: boolean;
}

export function useSuperadminStatus(user: User | null): SuperadminStatus {
  const [state, setState] = useState<SuperadminStatus>({
    isSuperadmin: false,
    isLoading: true,
  });
  const { setChatEnabled } = useChatStore();
  const supabase = createClient();

  const checkSuperadminStatus = useCallback(async () => {
    if (!user?.email) {
      setState({ isSuperadmin: false, isLoading: false });
      return;
    }

    try {
      const { data: userProfile } = await supabase
        .from('users_admin')
        .select('is_superadmin')
        .eq('email', user.email)
        .single();

      if (userProfile) {
        await updateAuthorStatus();
        setChatEnabled(false);
        setState({
          isSuperadmin: userProfile.is_superadmin,
          isLoading: false,
        });
      }
    } catch (error) {
      console.error('Error checking superadmin status:', error);
      setState({ isSuperadmin: false, isLoading: false });
    }
  }, [user?.email, supabase, setChatEnabled]);

  useEffect(() => {
    checkSuperadminStatus();
  }, [checkSuperadminStatus]);

  return state;
}
