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
  isLoading: false,

  setUser: (user) => set({ user }),
  setAvatarUrl: (url) => set({ avatarUrl: url }),
  setIsLoading: (loading) => set({ isLoading: loading }),

  isProtectedRoute: (pathname: string) =>
    PROTECTED_ROUTES.some((route) => pathname.startsWith(route)),

  initialize: async () => {
    set({ isLoading: true });
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) throw error;

      if (!session?.user) {
        set({ user: null, avatarUrl: null, isLoading: false });
        return;
      }

      // Set user immediately
      set({ user: session.user });

      // Handle avatar caching in parallel if it exists
      if (session.user.user_metadata?.avatar_url) {
        // Don't await here - let it process in parallel
        cacheAndServeImage(session.user.user_metadata.avatar_url)
          .then((cachedUrl) => set({ avatarUrl: cachedUrl }))
          .catch((error) => console.error('Error caching avatar:', error));
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
      set({ user: null, avatarUrl: null });
    } finally {
      set({ isLoading: false });
    }
  },

  signOut: async (pathname: string) => {
    set({ isLoading: true });
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      set({ user: null, avatarUrl: null });

      const shouldRedirect = get().isProtectedRoute(pathname);

      return { shouldRedirect };
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  },
}));

export default useAuthStore;
