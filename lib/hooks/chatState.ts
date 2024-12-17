'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

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
  initializeTimeAgoUpdates: () => void;
}

const MINUTE = 60 * 1000;
const ONLINE_THRESHOLD = 5 * MINUTE;

const createStorage = () => {
  if (typeof window !== 'undefined') {
    return window.localStorage;
  }
  return {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
  };
};

const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      // Chat UI states
      chatEnabled: false,
      setChatEnabled: (enabled: boolean) => {
        set({ chatEnabled: enabled });
      },
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
        const isOnline = timeDiff < ONLINE_THRESHOLD;

        set({
          isAuthorOnline: isOnline,
          lastActiveTime: time,
          lastOnlineTimeAgo: timeAgo(time),
        });
      },
      initializeTimeAgoUpdates: () => {
        setInterval(() => {
          const state = get();
          set({ lastOnlineTimeAgo: timeAgo(state.lastActiveTime) });
        }, MINUTE);
      },
    }),
    {
      name: 'chat-storage', // unique name for localStorage key
      storage: createJSONStorage(createStorage),
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

if (typeof window !== 'undefined' && useChatStore.getState().chatEnabled) {
  useChatStore.getState().initializeTimeAgoUpdates();
}

export default useChatStore;
