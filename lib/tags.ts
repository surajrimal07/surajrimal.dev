import { PopularTag } from '@/types/tag';
import { supabase } from '@/utils/supabase/client';

export const getAllTags = async () => {
  const { data, error } = await supabase.from('popular_tags').select('*');

  if (error) {
    console.error('Error fetching tags:', error);
    return [];
  }

  return data;
};

export const insertTag = async (tag: PopularTag) => {
  const { data, error } = await supabase.from('popular_tags').insert([tag]);

  if (error) {
    console.error('Error inserting tag:', error);
    return null;
  }

  return data;
};

export const updateTagByTitle = async (title: string, newCount: number) => {
  const { data, error } = await supabase
    .from('popular_tags')
    .update({ count: newCount, updated_at: new Date() })
    .eq('title', title);

  if (error) {
    console.error('Error updating tag:', error);
    return null;
  }

  return data;
};

export const deleteTagByTitle = async (title: string) => {
  const { data, error } = await supabase
    .from('popular_tags')
    .delete()
    .eq('title', title);

  if (error) {
    console.error('Error deleting tag:', error);
    return null;
  }

  return data;
};
