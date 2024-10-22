import { ReactionType } from '@/types/reaction';
import { BlogShares, ShareType } from '@/types/share';
import redis from '@/utils/redis';

import { MAX_SHARES_PER_SESSION } from '../constants';
import { supabase } from '../utils/supabase/client';

export async function getBlogView(slug: string): Promise<number> {
  const normalizedSlug = `/${slug}`;

  try {
    const views = await redis.get(normalizedSlug);
    return parseInt(views as string) || 0;
  } catch (error) {
    console.error(`Error fetching blog view for ${normalizedSlug}:`, error);
    return 0;
  }
}

export async function updatePageViews(slug: string): Promise<number> {
  const normalizedSlug = slug === '/' ? 'home' : slug;

  try {
    const newViews = await redis.incr(normalizedSlug);
    return newViews;
  } catch (error) {
    console.error(`Error updating page views for ${normalizedSlug}:`, error);
    return 0;
  }
}

// export async function getBlogShares(slug: string): Promise<BlogShares> {
//   const normalizedSlug = `/${slug}`;

//   const { data, error } = await supabase
//     .from('page_views')
//     .select('twittershare, facebookshare, clipboardshare')
//     .eq('slug', normalizedSlug)
//     .maybeSingle();

//   if (error) {
//     console.error(`Error fetching shares for ${normalizedSlug}:`, error);
//     return { twittershare: 0, facebookshare: 0, clipboardshare: 0, total: 0 };
//   }

//   const twittershare = data?.twittershare ?? 0;
//   const facebookshare = data?.facebookshare ?? 0;
//   const clipboardshare = data?.clipboardshare ?? 0;
//   const total = twittershare + facebookshare + clipboardshare;

//   return {
//     twittershare,
//     facebookshare,
//     clipboardshare,
//     total,
//   };
// }

export async function getBlogShares(slug: string): Promise<BlogShares> {
  const normalizedSlug = `/${slug}`;
  const sharesKey = `shares:${slug}`;

  try {
    const shares = await redis.hgetall(sharesKey);

    const twittershare = parseInt(shares?.twittershare as string) || 0;
    const facebookshare = parseInt(shares?.facebookshare as string) || 0;
    const clipboardshare = parseInt(shares?.clipboardshare as string) || 0;
    const total = twittershare + facebookshare + clipboardshare;

    return {
      twittershare,
      facebookshare,
      clipboardshare,
      total,
    };
  } catch (error) {
    console.error(`Error fetching shares for ${normalizedSlug}:`, error);
    return {
      twittershare: 0,
      facebookshare: 0,
      clipboardshare: 0,
      total: 0,
    };
  }
}

export async function updateBlogShares(
  slug: string,
  ip: string,
  shareType: ShareType
): Promise<number> {
  const sharesKey = `shares:${slug}`;
  const ipKey = `ip:${ip}:shares`;

  const multi = redis.multi();

  // Remove the try-catch from here and let it bubble up
  const currentSharesCount = parseInt((await redis.get(ipKey)) || '0');

  if (currentSharesCount >= MAX_SHARES_PER_SESSION) {
    throw new Error('Max shares limit reached');
  }

  // Increment share count for the specific type
  multi.hincrby(sharesKey, shareType, 1);

  // Increment IP shares count
  multi.incr(ipKey);

  // Set expiry for IP record (24 hours)
  multi.expire(ipKey, 24 * 60 * 60);

  const results = await multi.exec();

  if (!results) {
    throw new Error('Transaction failed');
  }

  // Type guard for the results
  if (!Array.isArray(results[0]) || results[0].length < 2) {
    throw new Error('Unexpected result format');
  }
  const newShares = Number(results[0][1]);

  if (isNaN(newShares)) {
    throw new Error('Invalid share count returned');
  }

  return newShares;
}

export async function handleReaction(
  slug: string,
  userIdentifier: string,
  reactionType: ReactionType
) {
  // Check if the user has already reacted to this post
  const { data: existingReaction, error: checkError } = await supabase
    .from('blog_reactions')
    .select('*')
    .eq('post_slug', slug)
    .eq('user_identifier', userIdentifier)
    .single();

  if (checkError && checkError.code !== 'PGRST116') {
    console.error('Error checking existing reaction:', checkError.message);
    return { success: false, error: checkError.message };
  }

  // If no existing reaction, add a new one
  if (!existingReaction) {
    const { data, error } = await supabase
      .from('blog_reactions')
      .insert([
        {
          post_slug: slug,
          user_identifier: userIdentifier,
          reaction: reactionType,
        },
      ])
      .single();

    if (error) {
      console.error('Error adding reaction:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  }

  // If the same reaction exists, remove it (toggle reaction off)
  if (existingReaction.reaction === reactionType) {
    const { data, error } = await supabase
      .from('blog_reactions')
      .delete()
      .eq('post_slug', slug)
      .eq('user_identifier', userIdentifier);

    if (error) {
      console.error('Error removing reaction:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data, message: 'Reaction removed' };
  }

  // If a different reaction exists, update it
  const { data, error } = await supabase
    .from('blog_reactions')
    .update({ reaction: reactionType })
    .eq('post_slug', slug)
    .eq('user_identifier', userIdentifier);

  if (error) {
    console.error('Error updating reaction:', error.message);
    return { success: false, error: error.message };
  }

  return { success: true, data, message: 'Reaction updated' };
}

export async function getReactionCount(slug: string) {
  const { data, error } = await supabase
    .from('blog_reactions')
    .select('reaction')
    .eq('post_slug', slug);

  if (error) {
    console.error('Error fetching reaction count:', error.message);
    return { success: false, error: error.message };
  }

  const reactionCounts: Record<ReactionType, number> = {
    CLAPPING: 0,
    LOVE: 0,
    THINK: 0,
    CRY: 0,
    VOMIT: 0,
  };

  data.forEach((reaction) => {
    const reactionType = reaction.reaction as ReactionType;
    if (reactionCounts[reactionType] !== undefined) {
      reactionCounts[reactionType] += 1;
    }
  });

  return { success: true, counts: reactionCounts };
}
