import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { timeAgo } from '@/utils/timeAgo';

interface ChatState {
  chatEnabled: boolean;
  setChatEnabled: (enabled: boolean) => void;
  toggleChat: () => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  email: string;
  setEmail: (email: string) => void;
  isEmailSubmitted: boolean;
  setIsEmailSubmitted: (submitted: boolean) => void;
  // Author status
  isAuthorOnline: boolean;
  lastActiveTime: Date;
  lastOnlineTimeAgo: string;
  updateAuthorStatus: (time: Date) => void;
}

const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      // Chat UI states
      chatEnabled: true,
      setChatEnabled: (enabled: boolean) => set({ chatEnabled: enabled }),
      toggleChat: () => set((state) => ({ chatEnabled: !state.chatEnabled })),
      isCollapsed: true,
      setIsCollapsed: (collapsed: boolean) => set({ isCollapsed: collapsed }),

      // Email states
      email: '',
      setEmail: (email: string) => set({ email }),
      isEmailSubmitted: false,
      setIsEmailSubmitted: (submitted: boolean) =>
        set({ isEmailSubmitted: submitted }),

      // Author status states
      isAuthorOnline: false,
      lastActiveTime: new Date(),
      lastOnlineTimeAgo: 'never',
      updateAuthorStatus: (time: Date) => {
        const now = Date.now();
        const timeDiff = now - time.getTime();
        const isOnline = timeDiff < 5 * 60 * 1000; // 5 minutes threshold

        set({
          isAuthorOnline: isOnline,
          lastActiveTime: time,
          lastOnlineTimeAgo: timeAgo(time),
        });
      },
    }),
    {
      name: 'chat-storage', // unique name for localStorage key
      partialize: (state) => ({
        // Only persist these fields
        chatEnabled: state.chatEnabled,
        isCollapsed: state.isCollapsed,
        email: state.email,
        isEmailSubmitted: state.isEmailSubmitted,
      }),
    }
  )
);

export default useChatStore;
