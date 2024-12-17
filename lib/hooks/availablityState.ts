import { create } from 'zustand';

import { getAvailabilityData } from '@/lib/availablity';
import type { AvailabilityData } from '@/types/availablity';

interface AvailabilityStore {
  availabilityData: AvailabilityData | null;
  fetchAvailabilityData: () => Promise<void>;
}

export const useAvailabilityStore = create<AvailabilityStore>((set) => ({
  availabilityData: null,
  fetchAvailabilityData: async () => {
    const data = await getAvailabilityData();
    set({ availabilityData: data });
  },
}));
