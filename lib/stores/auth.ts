import { User } from '@supabase/supabase-js';
import { create } from 'zustand';

import { cacheAndServeImage } from '@/utils/cacheImage';
import { createClient } from '@/utils/supabase/client';

interface AuthState {
  user: User | null;
  avatarUrl: string | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setAvatarUrl: (url: string | null) => void;
  setIsLoading: (loading: boolean) => void;
  initialize: () => Promise<void>;
  signOut: () => Promise<void>;
}

const supabase = createClient();

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  avatarUrl: null,
  isLoading: true,

  setUser: (user) => set({ user }),
  setAvatarUrl: (url) => set({ avatarUrl: url }),
  setIsLoading: (loading) => set({ isLoading: loading }),

  initialize: async () => {
    try {
      set({ isLoading: true });
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) throw error;

      if (session?.user) {
        set({ user: session.user });
        if (session.user.user_metadata?.avatar_url) {
          const cachedUrl = await cacheAndServeImage(
            session.user.user_metadata.avatar_url
          );
          set({ avatarUrl: cachedUrl });
        }
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
      set({ user: null, avatarUrl: null });
    } finally {
      set({ isLoading: false });
    }
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    set({ user: null, avatarUrl: null });
  },
}));

export default useAuthStore;
