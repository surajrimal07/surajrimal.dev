'use client';

import { useEffect, useRef, useState } from 'react';

import clsx from 'clsx';
import { m, useAnimationControls } from 'framer-motion';
import { ShareIcon } from 'lucide-react';

import { reactions } from '@/data/emojiIcons';
import { debounce } from '@/lib/hooks/debounce';
import {
  getBlogShares,
  getBlogView,
  getReactionCount,
  handleReaction,
} from '@/lib/pageView';
import { ReactionType } from '@/types/reaction';

import { InsightIcon } from '../social-icons/icons';
import EmojiReaction from './EmojiReaction';

interface ReactionProps {
  slug: string;
  ip: string;
}

interface CounterProps {
  count: number;
}

function Counter({ count }: CounterProps) {
  const controls = useAnimationControls();

  useEffect(() => {
    const startMotion = async () => {
      await controls.start({
        y: [-20, 0],
        transition: {
          duration: 0.18,
        },
      });
    };

    if (count !== 0) {
      startMotion();
    }
  }, [count, controls]);

  return count === 0 ? (
    <span className={clsx('flex flex-col font-mono text-sm')}>
      <span
        className={clsx(
          'flex h-5 items-center font-mono text-sm font-bold text-slate-600',
          'dark:text-slate-300'
        )}
      >
        0
      </span>
    </span>
  ) : (
    <m.span
      className={clsx(
        'flex flex-col font-mono text-sm font-bold text-slate-600',
        'dark:text-slate-300'
      )}
      animate={controls}
    >
      <span className={clsx('flex h-5 items-center')}>&nbsp;</span>
      <span className={clsx('flex h-5 items-center')}>{count}</span>
      <span className={clsx('flex h-5 items-center')}>{count - 1}</span>
    </m.span>
  );
}

export default function Reactions({ slug, ip }: ReactionProps) {
  const [viewCounts, setViewCounts] = useState(0);
  const [shareCounts, setShareCounts] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const hasBeenShown = useRef(false);
  //const completion = useReadingProgress();
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
        console.error('Error fetching blog data:', error);
      }
    };

    fetchData();
  }, [ip, slug]);

  useEffect(() => {
    if (!hasBeenShown.current && !isLoaded) {
      setIsVisible(true);
      hasBeenShown.current = true;
    }
  }, [isLoaded]);

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
  return (
    <div
      className={`fixed inset-x-0 bottom-2 z-50 flex justify-center transition-all duration-500 ease-in-out ${
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
                <InsightIcon className="h-5 w-5 text-gray-300" />
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
