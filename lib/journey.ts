import { JourneyEvent } from '@/types/journey';
import { supabase } from '@/utils/supabase/client';

export const getJourneyEvents = async (): Promise<JourneyEvent[]> => {
  const { data, error } = await supabase
    .from('journey_events')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    throw new Error('Error fetching journey events');
  }

  return data as JourneyEvent[];
};

export const insertJourneyEvent = async (
  event: Omit<JourneyEvent, 'id'>
): Promise<JourneyEvent | null> => {
  const { data, error } = await supabase.from('journey_events').insert([event]);

  if (error) {
    throw new Error('Error inserting journey event');
  }

  return data;
};

export const deleteJourneyEvent = async (id: number): Promise<void> => {
  const { error } = await supabase.from('journey_events').delete().eq('id', id);

  if (error) {
    throw new Error('Error deleting journey event');
  }
};

export const updateJourneyEvent = async (
  id: number,
  updates: Partial<Omit<JourneyEvent, 'id'>>
): Promise<JourneyEvent | null> => {
  const { data, error } = await supabase
    .from('journey_events')
    .update(updates)
    .eq('id', id)
    .select();

  if (error) {
    throw new Error('Error updating journey event');
  }

  return data ? data[0] : null;
};
