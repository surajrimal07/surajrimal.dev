import { supabase } from './supabaseClient';

export async function updatePageViews(slug: string): Promise<number> {
  const normalizedSlug = slug === '/' ? 'home' : slug;

  const { data, error } = await supabase.from('page_views').select('views').eq('slug', normalizedSlug).maybeSingle();

  if (error) {
    console.error(`Error fetching page views for ${normalizedSlug}:`, error);
  }

  const newViews = (data?.views ?? 0) + 1;

  const { error: upsertError } = await supabase
    .from('page_views')
    .upsert({ slug: normalizedSlug, views: newViews }, { onConflict: 'slug' });

  if (upsertError) {
    console.error(`Error updating page views for ${normalizedSlug}:`, upsertError);
  }

  return newViews;
}
