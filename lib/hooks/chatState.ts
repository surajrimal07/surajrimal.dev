import { create } from 'zustand';

import { timeAgo } from '@/utils/timeAgo';

interface ChatState {
  chatEnabled: boolean;
  setChatEnabled: (enabled: boolean) => void;
  toggleChat: () => void;
  isAuthorOnline: boolean;
  setIsAuthorOnline: (status: boolean) => void;
  lastAuthorOnline: string;
  setLastOnline: () => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const useChatStore = create<ChatState>((set) => ({
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
  isAuthorOnline: false,
  setIsAuthorOnline: (status) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('isAuthorOnline', status.toString());
      if (status) {
        const currentTime = new Date().toISOString();
        localStorage.setItem('lastAuthorOnline', currentTime);
      }
    }
    set({ isAuthorOnline: status });
  },
  lastAuthorOnline: 'indefinite ago',
  setLastOnline: () => {
    const currentTime = new Date();
    if (typeof window !== 'undefined') {
      localStorage.setItem('lastAuthorOnline', currentTime.toISOString());
    }
    set({ lastAuthorOnline: timeAgo(currentTime) });
  },
  isCollapsed: true,
  setIsCollapsed: (collapsed: boolean) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('chatboxCollapsed', collapsed.toString());
    }
    set({ isCollapsed: collapsed });
  },
}));

const checkOnlineStatus = () => {
  if (typeof window !== 'undefined') {
    const storedOnlineValue = localStorage.getItem('isAuthorOnline');
    const storedLastOnline = localStorage.getItem('lastAuthorOnline');

    if (storedOnlineValue === 'true' && storedLastOnline) {
      const lastOnlineTime = new Date(storedLastOnline);
      const currentTime = new Date();
      const timeDifference =
        (currentTime.getTime() - lastOnlineTime.getTime()) / 1000;

      if (timeDifference > 60) {
        useChatStore.getState().setIsAuthorOnline(false);
      } else {
        useChatStore.getState().setIsAuthorOnline(true);
      }
    } else {
      useChatStore.getState().setIsAuthorOnline(false);
    }

    const lastOnlineTime = storedLastOnline
      ? timeAgo(new Date(storedLastOnline))
      : 'long time ago';
    useChatStore.setState({ lastAuthorOnline: lastOnlineTime });
  }
};

if (typeof window !== 'undefined') {
  const storedChatboxHidden = localStorage.getItem('chatboxHidden');
  const initialChatEnabled =
    storedChatboxHidden === null || storedChatboxHidden === 'false';

  const storedCollapsed = localStorage.getItem('chatboxCollapsed');
  const initialCollapsed = storedCollapsed === 'true';

  useChatStore.setState({
    chatEnabled: initialChatEnabled,
    isCollapsed: initialCollapsed,
  });

  checkOnlineStatus();

  setInterval(checkOnlineStatus, 60000);
}

export default useChatStore;
