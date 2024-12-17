'use server';

import { MAX_SHARES_PER_SESSION } from '@/constants';
import { localCache } from '@/lib/cache';
import type { ReactionType } from '@/types/reaction';
import type { BlogShares, ShareType } from '@/types/share';
import redis from '@/utils/redis';
import { supabase } from '@/utils/supabase/client';

const POPULAR_POSTS_CACHE_KEY = 'popular-posts-cache';

export async function getPageViews(
  slug: string,
  shouldIncrement?: boolean
): Promise<number> {
  const cacheKey = `views:${slug}`;

  try {
    if (shouldIncrement) {
      const newViews = await redis.incr(slug);
      localCache.set(cacheKey, newViews);
      updatePopularPostsCache(slug, newViews);
      return newViews;
    }

    const cachedViews = localCache.get(cacheKey) as number | undefined;

    if (cachedViews !== undefined && cachedViews !== null) {
      return cachedViews;
    }

    const views = Number.parseInt((await redis.get(slug)) as string) || 0;
    localCache.set(cacheKey, views);
    return views;
  } catch (error) {
    console.error(
      `Error ${shouldIncrement ? 'updating' : 'fetching'} page views for ${slug}:`,
      error
    );
    return localCache.get(cacheKey) || 0;
  }
}

export async function getBlogShares(slug: string): Promise<BlogShares> {
  const sharesKey = `shares:${slug}`;
  const cacheKey = `shares-data:${slug}`;

  const cachedShares = localCache.get(cacheKey) as BlogShares | undefined;

  if (cachedShares !== undefined && cachedShares !== null) {
    return cachedShares;
  }

  const shares = await redis.hgetall(sharesKey);

  const updatedShares: BlogShares = {
    twittershare: Number.parseInt(shares?.twittershare as string) || 0,
    facebookshare: Number.parseInt(shares?.facebookshare as string) || 0,
    clipboardshare: Number.parseInt(shares?.clipboardshare as string) || 0,
    total: 0,
  };
  updatedShares.total =
    updatedShares.twittershare +
    updatedShares.facebookshare +
    updatedShares.clipboardshare;

  localCache.set(cacheKey, updatedShares);

  return updatedShares;
}

async function updatePopularPostsCache(slug: string, newViews: number) {
  const cachedPopularPosts = localCache.get(POPULAR_POSTS_CACHE_KEY) as
    | Array<{ slug: string; views: number }>
    | undefined;

  if (cachedPopularPosts) {
    const normalizedSlug = slug.replace('/blog/', '');
    const updatedPopularPosts = cachedPopularPosts.map((post) => {
      if (post.slug === normalizedSlug) {
        return { ...post, views: newViews };
      }
      return post;
    });

    updatedPopularPosts.sort((a, b) => b.views - a.views);
    localCache.set(POPULAR_POSTS_CACHE_KEY, updatedPopularPosts);
  }
}

export async function getPopularPosts(
  slugs: string[],
  limit = 5
): Promise<Array<{ slug: string; views: number }>> {
  try {
    const cachedPopularPosts = localCache.get(POPULAR_POSTS_CACHE_KEY) as
      | Array<{ slug: string; views: number }>
      | undefined;
    if (cachedPopularPosts !== undefined && cachedPopularPosts !== null) {
      return cachedPopularPosts;
    }

    const modifiedSlugs = slugs.map((slug) => `/blog/${slug}`);
    const pipeline = redis.pipeline();

    for (const slug of modifiedSlugs) {
      pipeline.get(slug);
    }

    const results = await pipeline.exec();
    if (!results) return [];

    const viewsArray = modifiedSlugs
      .map((slug, i) => ({
        slug: slug.replace('/blog/', ''),
        views: results[i] as number,
      }))
      .filter((item) => item.views > 0)
      .sort((a, b) => b.views - a.views)
      .slice(0, limit);

    localCache.set(POPULAR_POSTS_CACHE_KEY, viewsArray);

    return viewsArray;
  } catch (error) {
    console.error('Error fetching popular posts:', error);
    return [];
  }
}

export async function updateBlogShares(
  slug: string,
  ip: string,
  shareType: ShareType
): Promise<BlogShares> {
  const BLOG_SHARES_CACHE_KEY = `shares-data:${slug}`;
  const sharesKey = `shares:${slug}`;
  const ipKey = `ip:${ip}:shares`;

  const cachedShares = localCache.get(BLOG_SHARES_CACHE_KEY) as
    | BlogShares
    | undefined;
  const cachedIpCount = localCache.get(ipKey) as number | undefined;

  try {
    if (cachedIpCount === undefined) {
      const currentCount = Number.parseInt((await redis.get(ipKey)) || '0');
      if (currentCount >= MAX_SHARES_PER_SESSION) {
        throw new Error('Max shares limit reached');
      }
      localCache.set(ipKey, currentCount);
    }

    const multi = redis.multi();
    multi.hincrby(sharesKey, shareType, 1);
    multi.incr(ipKey);
    multi.expire(ipKey, 24 * 60 * 60);
    multi.hgetall(sharesKey);

    const results = await multi.exec();
    if (!results) throw new Error('Transaction failed');

    const finalShares = results[results.length - 1] as Record<string, string>;

    const updatedShares: BlogShares = {
      twittershare: Number.parseInt(finalShares?.twittershare as string) || 0,
      facebookshare: Number.parseInt(finalShares?.facebookshare as string) || 0,
      clipboardshare:
        Number.parseInt(finalShares?.clipboardshare as string) || 0,
      total: 0,
    };
    updatedShares.total =
      updatedShares.twittershare +
      updatedShares.facebookshare +
      updatedShares.clipboardshare;

    localCache.set(BLOG_SHARES_CACHE_KEY, updatedShares);
    localCache.set(ipKey, (cachedIpCount || 0) + 1);

    return updatedShares;
  } catch (error) {
    if (cachedShares) return cachedShares;
    throw error;
  }
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
  const reactionCacheKey = `reaction-count:${slug}`;

  const cachedReactionCount = localCache.get(reactionCacheKey) as
    | Record<ReactionType, number>
    | undefined;

  if (cachedReactionCount !== undefined && cachedReactionCount !== null) {
    return { success: true, counts: cachedReactionCount };
  }

  const { data, error } = await supabase
    .from('blog_reactions')
    .select('reaction')
    .eq('post_slug', slug);

  if (error) {
    return { success: false, error: error.message };
  }

  const reactionCounts: Record<ReactionType, number> = {
    CLAPPING: 0,
    LOVE: 0,
    THINK: 0,
    CRY: 0,
    VOMIT: 0,
  };

  for (const reaction of data) {
    const reactionType = reaction.reaction as ReactionType;
    if (reactionCounts[reactionType] !== undefined) {
      reactionCounts[reactionType] += 1;
    }
  }

  localCache.set(reactionCacheKey, reactionCounts);

  return { success: true, counts: reactionCounts };
}
