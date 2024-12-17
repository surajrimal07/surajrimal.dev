import { localCache } from '@/lib/cache';
import type { Tables } from '@/types/database';
import { supabase } from '@/utils/supabase/client';

const CACHE_KEY = 'journey_events';

export const getJourneyEvents = async (): Promise<
  Tables<'journey_events'>[]
> => {
  const cached = localCache.get(CACHE_KEY);
  if (cached) {
    return cached as Tables<'journey_events'>[];
  }

  const { data, error } = await supabase
    .from('journey_events')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    throw new Error('Error fetching journey events');
  }

  localCache.set(CACHE_KEY, data);
  return data;
};

export const insertJourneyEvent = async (
  event: Omit<Tables<'journey_events'>, 'id'>
): Promise<Tables<'journey_events'> | null> => {
  const { data, error } = await supabase.from('journey_events').insert([event]);

  if (error) {
    throw new Error('Error inserting journey event');
  }

  localCache.delete(CACHE_KEY);

  return data;
};

export const deleteJourneyEvent = async (id: number): Promise<void> => {
  const { error } = await supabase.from('journey_events').delete().eq('id', id);

  if (error) {
    throw new Error('Error deleting journey event');
  }

  localCache.delete(CACHE_KEY);
};

export const updateJourneyEvent = async (
  id: number,
  updates: Partial<Omit<Tables<'journey_events'>, 'id'>>
): Promise<Tables<'journey_events'> | null> => {
  const { data, error } = await supabase
    .from('journey_events')
    .update(updates)
    .eq('id', id)
    .select();

  if (error) {
    throw new Error('Error updating journey event');
  }

  localCache.delete(CACHE_KEY);
  return data ? data[0] : null;
};
