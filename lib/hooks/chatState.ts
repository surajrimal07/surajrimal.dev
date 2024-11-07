import { create } from 'zustand';

import { timeAgo } from '@/utils/timeAgo';

interface ChatState {
  chatEnabled: boolean;
  setChatEnabled: (enabled: boolean) => void;
  toggleChat: () => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  // Author status
  isAuthorOnline: boolean;
  lastActiveTime: Date;
  lastOnlineTimeAgo: string;
  updateAuthorStatus: (time: Date) => void;
}

const useChatStore = create<ChatState>((set) => ({
  // Existing chat UI states
  chatEnabled: false,
  setChatEnabled: (enabled: boolean) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('chatboxHidden', (!enabled).toString());
    }
    set({ chatEnabled: enabled });
  },
  toggleChat: () => {
    set((state) => {
      const newValue = !state.chatEnabled;
      if (typeof window !== 'undefined') {
        localStorage.setItem('chatboxHidden', (!newValue).toString());
      }
      return { chatEnabled: newValue };
    });
  },
  isCollapsed: true,
  setIsCollapsed: (collapsed: boolean) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('chatboxCollapsed', collapsed.toString());
    }
    set({ isCollapsed: collapsed });
  },

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
}));

// Initialize from localStorage if in browser
if (typeof window !== 'undefined') {
  const storedChatboxHidden = localStorage.getItem('chatboxHidden');
  const storedCollapsed = localStorage.getItem('chatboxCollapsed');

  useChatStore.setState({
    chatEnabled:
      storedChatboxHidden === null || storedChatboxHidden === 'false',
    isCollapsed: storedCollapsed === 'true',
  });

  // if (useChatStore.getState().chatEnabled) {
  //   checkOnlineStatus();
  //   setInterval(checkOnlineStatus, 60000);
  // }
}

export default useChatStore;
