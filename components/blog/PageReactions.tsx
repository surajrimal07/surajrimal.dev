'use client';

import { useEffect, useRef, useState } from 'react';

import { m, useAnimationControls } from 'framer-motion';
import toast from 'react-hot-toast';
import { FaFire } from 'react-icons/fa6';

import EmojiReaction from '@/components/blog/EmojiReaction';
import ShareMenu from '@/components/blog/ShareButton';
import { reactions } from '@/data/emojiIcons';
import { debounce } from '@/lib/hooks/debounce';
import { useScrollProgress } from '@/lib/hooks/useScrollProgress';
import {
  getBlogShares,
  getPageViews,
  getReactionCount,
  handleReaction,
} from '@/lib/pageView';
import { ReactionType } from '@/types/reaction';
import { BlogShares } from '@/types/share';
import { toastOptions } from '@/utils/toast';

interface ReactionProps {
  slug: string;
  ip: string;
}

export default function Reactions({ slug, ip }: ReactionProps) {
  const [viewCounts, setViewCounts] = useState(0);
  const [shareCounts, setShareCounts] = useState<BlogShares>({
    twittershare: 0,
    facebookshare: 0,
    clipboardshare: 0,
    total: 0,
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const hasBeenShown = useRef(false);
  const { showScrollToTop } = useScrollProgress();
  const controls = useAnimationControls();
  const [userReaction, setUserReaction] = useState<string | null>(null);

  const [reactionCounts, setReactionCounts] = useState<{
    [key: string]: number;
  }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [views, shares, reactionData] = await Promise.all([
          getPageViews(`/${slug}`, false),
          getBlogShares(slug),
          getReactionCount(slug),
        ]);

        setViewCounts(views);
        setShareCounts(shares);

        if (reactionData.success && reactionData.counts) {
          setReactionCounts(reactionData.counts);
        }

        setIsLoaded(true);
      } catch (error) {
        toast.error(`Failed to fetch data: ${error}`, toastOptions);
      }
    };

    fetchData();
  }, [ip, slug]);

  useEffect(() => {
    if (!hasBeenShown.current && isLoaded && showScrollToTop) {
      setIsVisible(true);
      hasBeenShown.current = true;
    }
  }, [isLoaded, showScrollToTop]);

  const addReaction = debounce(async (type: ReactionType) => {
    const reactionResponse = await handleReaction(slug, ip, type);
    if (reactionResponse.success) {
      if (reactionResponse.message === 'Reaction removed') {
        setUserReaction(null);
        setReactionCounts((prevCounts) => ({
          ...prevCounts,
          [type]: Math.max((prevCounts[type] || 0) - 1, 0),
        }));
      } else {
        if (userReaction) {
          setReactionCounts((prevCounts) => ({
            ...prevCounts,
            [userReaction]: Math.max((prevCounts[userReaction] || 0) - 1, 0),
          }));
        }
        setUserReaction(type);
        setReactionCounts((prevCounts) => ({
          ...prevCounts,
          [type]: (prevCounts[type] || 0) + 1,
        }));
      }

      const reactionData = await getReactionCount(slug);
      if (reactionData.success && reactionData.counts) {
        setReactionCounts(reactionData.counts);
      }
    }
  }, 1500);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`inset-x-0 flex justify-center transition-all duration-500 ease-in-out ${
        isVisible ? 'translate-y-0' : 'translate-y-20'
      }`}
    >
      <div className="flex w-[300px] items-center justify-between rounded-[20px] border border-gray-700/30 bg-gradient-to-b from-gray-900/70 to-gray-800/70 px-2 py-0.5 shadow-lg backdrop-blur-md">
        <div className="flex space-x-3">
          {reactions.map((reaction) => (
            <div key={reaction.type} className="flex flex-col items-center">
              <m.div animate={controls}>
                <EmojiReaction
                  disabled={false}
                  title={reaction.title}
                  defaultImage={reaction.defaultImage}
                  animatedImage={reaction.animatedImage}
                  disabledImage={reaction.disabledImage}
                  onClick={() => addReaction(reaction.type)}
                />
              </m.div>
              <span className="-mt-1 text-[11px] font-medium text-gray-300">
                {reactionCounts[reaction.type] || 0}{' '}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex flex-col items-center">
            <div className="h-7.5 w-7.5 flex items-center justify-center rounded-full bg-gray-700/40 transition-colors hover:bg-gray-700/60">
              <button type="button" className="p-1" title="View Counts">
                <FaFire className="h-5 w-5 text-gray-300" />
              </button>
            </div>
            <span className="mt-1 text-[11px] font-medium text-gray-300">
              {viewCounts}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <div className="h-7.5 w-7.5 flex items-center justify-center rounded-full bg-gray-700/40 transition-colors hover:bg-gray-700/60">
              <button type="button" className="p-1" title="Share Article">
                <ShareMenu
                  url={`${process.env.NEXT_PUBLIC_URL}/${slug}`}
                  slug={slug}
                  shares={shareCounts}
                  ip={ip}
                  onShareComplete={(updatedShares: BlogShares) => {
                    setShareCounts(updatedShares);
                  }}
                />
              </button>
            </div>
            <span className="mt-1 text-[11px] font-medium text-gray-300">
              {shareCounts.total}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
