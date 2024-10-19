'use client';

import { useEffect, useRef, useState } from 'react';

import { m, useAnimationControls } from 'framer-motion';
import { ShareIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { FaFire } from 'react-icons/fa6';

import { reactions } from '@/data/emojiIcons';
import { debounce } from '@/lib/hooks/debounce';
import { useReadingProgress } from '@/lib/hooks/useReadingProgressbar';
import {
  getBlogShares,
  getBlogView,
  getReactionCount,
  handleReaction,
} from '@/lib/pageView';
import { ReactionType } from '@/types/reaction';
import { toastOptions } from '@/utils/toast';

import EmojiReaction from './EmojiReaction';

interface ReactionProps {
  slug: string;
  ip: string;
}

export default function Reactions({ slug, ip }: ReactionProps) {
  const [viewCounts, setViewCounts] = useState(0);
  const [shareCounts, setShareCounts] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const hasBeenShown = useRef(false);
  const completion = useReadingProgress();
  const controls = useAnimationControls();
  const [userReaction, setUserReaction] = useState<string | null>(null);
  const [reactionCounts, setReactionCounts] = useState<{
    [key: string]: number;
  }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const views = await getBlogView(slug);
        const { total } = await getBlogShares(slug);
        const reactionData = await getReactionCount(slug);

        setViewCounts(views);
        setShareCounts(total);

        if (reactionData.success && reactionData.counts) {
          setReactionCounts(reactionData.counts);
        }
        setIsLoaded(true);
      } catch (error) {
        toast.error(`Failed to fetch reaction data ${error} `, toastOptions);
      }
    };

    fetchData();
  }, [ip, slug]);

  useEffect(() => {
    if (!hasBeenShown.current && !isLoaded && completion >= 50) {
      setIsVisible(true);
      hasBeenShown.current = true;
    }
  }, [completion, isLoaded]);

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
      className={`z-99 fixed inset-x-0 bottom-2 flex justify-center transition-all duration-500 ease-in-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
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
              <button className="p-1">
                <FaFire className="h-5 w-5 text-gray-300" />
              </button>
            </div>
            <span className="mt-1 text-[11px] font-medium text-gray-300">
              {viewCounts}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <div className="h-7.5 w-7.5 flex items-center justify-center rounded-full bg-gray-700/40 transition-colors hover:bg-gray-700/60">
              <button className="p-1">
                <ShareIcon className="h-5 w-5 text-gray-300" />
              </button>
            </div>
            <span className="mt-1 text-[11px] font-medium text-gray-300">
              {shareCounts}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
