import { BlogShares, ShareType } from '@/types/share';

import { MAX_SHARES_PER_SESSION } from '../constants';
import { supabase } from '../utils/supabase/client';

export async function getBlogView(slug: string): Promise<number> {
  const normalizedSlug = `/${slug}`;

  const { data, error } = await supabase
    .from('page_views')
    .select('views')
    .eq('slug', normalizedSlug)
    .maybeSingle();

  if (error) {
    console.error(`Error fetching blog view for ${normalizedSlug}:`, error);
    return 0;
  }

  return data?.views ?? 0;
}

export async function updatePageViews(slug: string): Promise<number> {
  const normalizedSlug = slug === '/' ? 'home' : slug;

  const { data, error } = await supabase
    .from('page_views')
    .select('views')
    .eq('slug', normalizedSlug)
    .maybeSingle();

  if (error) {
    console.error(`Error fetching page views for ${normalizedSlug}:`, error);
  }

  const newViews = (data?.views ?? 0) + 1;

  const { error: upsertError } = await supabase
    .from('page_views')
    .upsert({ slug: normalizedSlug, views: newViews }, { onConflict: 'slug' });

  if (upsertError) {
    console.error(
      `Error updating page views for ${normalizedSlug}:`,
      upsertError
    );
  }

  return newViews;
}

export async function getBlogShares(slug: string): Promise<BlogShares> {
  const normalizedSlug = `/${slug}`;

  const { data, error } = await supabase
    .from('page_views')
    .select('twittershare, facebookshare, clipboardshare')
    .eq('slug', normalizedSlug)
    .maybeSingle();

  if (error) {
    console.error(`Error fetching shares for ${normalizedSlug}:`, error);
    return { twittershare: 0, facebookshare: 0, clipboardshare: 0, total: 0 };
  }

  const twittershare = data?.twittershare ?? 0;
  const facebookshare = data?.facebookshare ?? 0;
  const clipboardshare = data?.clipboardshare ?? 0;
  const total = twittershare + facebookshare + clipboardshare;

  return {
    twittershare,
    facebookshare,
    clipboardshare,
    total,
  };
}

export async function updateBlogShares(
  slug: string,
  ip: string,
  shareType: ShareType
): Promise<number> {
  const normalizedSlug = `/${slug}`;

  const { data: ipData, error: ipError } = await supabase
    .from('iprecord')
    .select('shares')
    .eq('ipaddress', ip)
    .maybeSingle();

  if (ipError) {
    throw new Error('Max shares limit reached');
  }

  const currentSharesCount = ipData ? ipData.shares : 0;

  if (currentSharesCount >= MAX_SHARES_PER_SESSION) {
    console.warn(`IP ${ip} has reached the maximum shares limit.`);
    return -1;
  }

  const { data: currentData, error: fetchError } = await supabase
    .from('page_views')
    .select(`${shareType}`)
    .eq('slug', normalizedSlug)
    .maybeSingle();

  if (fetchError) {
    console.error(`Error fetching shares for ${normalizedSlug}:`, fetchError);
    return 0;
  }

  const currentShares = currentData ? currentData[shareType] : 0;
  const newShares = currentShares + 1;

  const { error: updateError } = await supabase
    .from('page_views')
    .upsert(
      { slug: normalizedSlug, [shareType]: newShares },
      { onConflict: 'slug' }
    );

  if (updateError) {
    console.error(`Error updating shares for ${normalizedSlug}:`, updateError);
    return 0;
  }

  const { error: updateIpError } = await supabase
    .from('iprecord')
    .upsert(
      { ipaddress: ip, shares: currentSharesCount + 1 },
      { onConflict: 'ipaddress' }
    );

  if (updateIpError) {
    console.error(`Error updating shares count for IP ${ip}:`, updateIpError);
    return 0;
  }

  return newShares;
}
