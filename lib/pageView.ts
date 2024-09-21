import { supabase } from './supabaseClient';

export async function getBlogView(slug: string): Promise<number> {
  const normalizedSlug = `/${slug}`;

  const { data, error } = await supabase.from('page_views').select('views').eq('slug', normalizedSlug).maybeSingle();

  if (error) {
    console.error(`Error fetching blog view for ${normalizedSlug}:`, error);
    return 0;
  }

  return data?.views ?? 0;
}

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

export async function getBlogShares(slug: string): Promise<number> {
  const normalizedSlug = `/${slug}`;

  const { data, error } = await supabase.from('page_views').select('shares').eq('slug', normalizedSlug).maybeSingle();

  if (error) {
    console.error(`Error fetching shares for ${normalizedSlug}:`, error);
    return 0;
  }

  return data?.shares ?? 0;
}

export async function updateBlogShares(slug: string): Promise<number> {
  const normalizedSlug = `/${slug}`;

  const { data: currentData, error: fetchError } = await supabase
    .from('page_views')
    .select('shares')
    .eq('slug', normalizedSlug)
    .maybeSingle();

  if (fetchError) {
    console.error(`Error fetching shares for ${normalizedSlug}:`, fetchError);
    return 0;
  }

  const currentShares = currentData?.shares ?? 0;
  const newShares = currentShares + 1;

  const { error: updateError } = await supabase
    .from('page_views')
    .upsert({ slug: normalizedSlug, shares: newShares }, { onConflict: 'slug' });

  if (updateError) {
    console.error(`Error updating shares for ${normalizedSlug}:`, updateError);
    return 0;
  }

  return newShares;
}
