//not used as of now
import tagData from 'app/tag-data.json';

import type { PopularTag } from '@/types/tag';
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

export async function updateTagsInSupabase() {
  const tagDatas: Record<string, number> = tagData;

  for (const [tagSlug, count] of Object.entries(tagDatas)) {
    await upsertTagInSupabase(tagSlug, count);
  }
}

async function upsertTagInSupabase(tagSlug: string, count: number) {
  const href = `/tags/${tagSlug}`;
  const title = capitalize(tagSlug);
  const iconType = 'Javascript';

  const { error } = await supabase.from('popular_tags').upsert(
    {
      slug: tagSlug,
      href: href,
      icon_type: iconType,
      title: title,
      count: count,
    },
    { onConflict: 'slug' }
  );

  if (error) {
    console.error('Error upserting tag in Supabase:', error);
  }
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
