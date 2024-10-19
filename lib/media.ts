import { InMedia } from '@/types/media';
import { supabase } from '@/utils/supabase/client';

export async function getMedia() {
  const { data, error } = await supabase
    .from('in_media')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching medias:', error);
    throw new Error('Failed to fetch medias');
  }

  return data;
}

export async function createMedia(media: Omit<InMedia, 'id'>) {
  const { data, error } = await supabase
    .from('in_media')
    .insert([media])
    .single();

  if (error) {
    console.error('Error creating medias:', error);
    throw new Error('Failed to create medias');
  }

  return data;
}

export async function updateMedia(
  id: number,
  updatedData: Partial<Omit<InMedia, 'id'>>
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

  return data;
}
