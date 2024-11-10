import { User } from '@supabase/supabase-js';
import { create } from 'zustand';

import { cacheAndServeImage } from '@/utils/cacheImage';
import { createClient } from '@/utils/supabase/client';

const PROTECTED_ROUTES = ['/profile', '/admin', '/dashboard'];

interface AuthState {
  user: User | null;
  avatarUrl: string | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setAvatarUrl: (url: string | null) => void;
  setIsLoading: (loading: boolean) => void;
  initialize: () => Promise<void>;
  signOut: (pathname: string) => Promise<{ shouldRedirect: boolean }>;
  isProtectedRoute: (pathname: string) => boolean;
}

const supabase = createClient();

const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  avatarUrl: null,
  isLoading: true,

  setUser: (user) => set({ user }),
  setAvatarUrl: (url) => set({ avatarUrl: url }),
  setIsLoading: (loading) => set({ isLoading: loading }),

  isProtectedRoute: (pathname: string) =>
    PROTECTED_ROUTES.some((route) => pathname.startsWith(route)),

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

  signOut: async (pathname: string) => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      set({ user: null, avatarUrl: null });

      // Check if current path is protected
      const shouldRedirect = get().isProtectedRoute(pathname);

      return { shouldRedirect };
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  },
}));

export default useAuthStore;
