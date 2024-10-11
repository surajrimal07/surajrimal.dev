import { create } from 'zustand';

interface ChatState {
  chatEnabled: boolean;
  setChatEnabled: (enabled: boolean) => void;
  toggleChat: () => void;
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
}));

if (typeof window !== 'undefined') {
  const storedValue = localStorage.getItem('chatboxHidden');
  const initialState = storedValue === null || storedValue === 'false';
  useChatStore.setState({ chatEnabled: initialState });
}

export default useChatStore;
