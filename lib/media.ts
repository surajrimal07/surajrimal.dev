import { localCache } from '@/lib/cache';
import type { Tables } from '@/types/database';
import { supabase } from '@/utils/supabase/client';

const CACHE_KEY = 'in_media';
export async function getMedia(): Promise<Tables<'in_media'>[]> {
  const cached = localCache.get(CACHE_KEY);
  if (cached) {
    return cached as Tables<'in_media'>[];
  }

  const { data, error } = await supabase
    .from('in_media')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching medias:', error);
    throw new Error('Failed to fetch medias');
  }

  localCache.set(CACHE_KEY, data);
  return data;
}

export async function createMedia(media: Omit<Tables<'in_media'>, 'id'>) {
  const { data, error } = await supabase
    .from('in_media')
    .insert([media])
    .single();

  if (error) {
    console.error('Error creating medias:', error);
    throw new Error('Failed to create medias');
  }

  localCache.delete(CACHE_KEY);
  return data;
}

export async function updateMedia(
  id: number,
  updatedData: Partial<Omit<Tables<'in_media'>, 'id'>>,
) {
  const { data, error } = await supabase
    .from('in_media')
    .update(updatedData)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error updating medias:', error);
    throw new Error('Failed to update medias');
  }

  localCache.delete(CACHE_KEY);
  return data;
}

export async function deleteMedia(id: number) {
  console.log('deleteMedia', id);

  const { data, error } = await supabase
    .from('in_media')
    .delete()
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error deleting medias:', error);
    throw new Error('Failed to delete medias');
  }

  localCache.delete(CACHE_KEY);
  return data;
}
