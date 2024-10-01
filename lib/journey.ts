import { JourneyEvent } from '@/types/journey';
import { supabase } from '@/utils/supabase/client';

export const getJourneyEvents = async (): Promise<JourneyEvent[]> => {
  const { data, error } = await supabase
    .from('journey_events')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching journey events:', error);
    return [];
  }

  return data as JourneyEvent[];
};

export const insertJourneyEvent = async (
  event: Omit<JourneyEvent, 'id'>
): Promise<JourneyEvent | null> => {
  const { data, error } = await supabase.from('journey_events').insert([event]);

  if (error) {
    console.error('Error inserting journey event:', error);
    return null;
  }

  return data;
};
