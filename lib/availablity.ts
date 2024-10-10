import { AvailabilityData } from '@/types/availablity';
import redis from '@/utils/redis';
import { supabase } from '@/utils/supabase/client';

const authorAvailabilityKey = 'author:availability';

export const saveAvailabilityData = async (
  data: AvailabilityData
): Promise<void> => {
  await redis.set(authorAvailabilityKey, JSON.stringify(data));
};

export const getAvailabilityData =
  async (): Promise<AvailabilityData | null> => {
    const data = await redis.get(authorAvailabilityKey);
    return data as AvailabilityData;
  };

export const saveSubscriberEmail = async (email) => {
  try {
    const { data, error } = await supabase
      .from('availability_subscriber')
      .insert([{ email }])
      .select('id');

    if (error) {
      if (error.code === '23505') {
        throw new Error('Email already subscribed.');
      }
      throw new Error('Failed to subscribe email.');
    }

    return data[0].id;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getSubscribers = async () => {
  try {
    const { data, error } = await supabase
      .from('availability_subscriber')
      .select('*');

    if (error) {
      throw new Error('Failed to fetch subscribers.');
    }

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
