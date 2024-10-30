import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface SoundState {
  isSoundEnabled: boolean;
  toggleSound: () => void;
  enableSound: () => void;
  disableSound: () => void;
}

export const useSoundStore = create<SoundState>()(
  persist(
    (set) => ({
      isSoundEnabled: true,
      toggleSound: () =>
        set((state) => ({ isSoundEnabled: !state.isSoundEnabled })),
      enableSound: () => set({ isSoundEnabled: true }),
      disableSound: () => set({ isSoundEnabled: false }),
    }),
    {
      name: 'sound-settings',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
