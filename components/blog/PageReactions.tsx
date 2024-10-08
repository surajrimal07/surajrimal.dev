'use client';

import { useEffect, useState } from 'react';

import { m, useAnimationControls } from 'framer-motion';
import { ShareIcon } from 'lucide-react';

import { getBlogShares, getBlogView } from '@/lib/pageView';

import { InsightIcon } from '../social-icons/icons';
import EmojiReaction from './EmojiReaction';

interface ReactionCounterProps {
  slug: string;
}

export default function ReactionCounter({ slug }: ReactionCounterProps) {
  const [viewCounts, setViewCounts] = useState(0);
  const [shareCounts, setShareCounts] = useState(0);
  const controls = useAnimationControls();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const views = await getBlogView(slug);
        const { total } = await getBlogShares(slug);
        setViewCounts(views);
        setShareCounts(total);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    fetchData();
  }, [slug]);

  useEffect(() => {
    if (!isLoading) {
      controls.start({
        y: 0,
        opacity: 1,
        pointerEvents: 'auto',
        transition: {
          delay: 0.24,
          duration: 0.18,
        },
      });
    }
  }, [isLoading, controls]);

  const addReaction = ({ type, section }) => {
    console.log('Reaction added:', type, section);
  };

  return (
    <m.div animate={controls}>
      <div className="fixed inset-x-0 bottom-2 z-50 flex justify-center">
        <div className="flex w-[350px] items-center justify-between rounded-[20px] border border-gray-700/30 bg-gradient-to-b from-gray-900/70 to-gray-800/70 px-2 py-0.5 shadow-lg backdrop-blur-md">
          <div className="flex space-x-3">
            <div className="flex flex-col items-center">
              <EmojiReaction
                title="Claps"
                defaultImage="/static/emojis/clapping-hands.png"
                animatedImage="/static/emojis/clapping-hands-animated.png"
                disabledImage="/static/emojis/love-you-gesture.png"
                onClick={() =>
                  addReaction({ type: 'CLAPPING', section: 'current' })
                }
              />
              <span className="mt-0.5 text-[11px] font-medium text-gray-300">
                {viewCounts}
              </span>
            </div>

            <div className="flex flex-col items-center">
              <EmojiReaction
                title="Love"
                defaultImage="/static/emojis/astonished-face.png"
                animatedImage="/static/emojis/astonished-face-animated.png"
                disabledImage="/static/emojis/star-struck.png"
                onClick={() =>
                  addReaction({ type: 'LOVE', section: 'current' })
                }
              />
              <span className="mt-0.5 text-[11px] font-medium text-gray-300">
                {shareCounts} {/* Update as necessary */}
              </span>
            </div>

            <div className="flex flex-col items-center">
              <EmojiReaction
                title="Think"
                defaultImage="/static/emojis/face-with-monocle.png"
                animatedImage="/static/emojis/face-with-monocle-animated.png"
                disabledImage="/static/emojis/nerd-face.png"
                onClick={() =>
                  addReaction({ type: 'THINK', section: 'current' })
                }
              />
              <span className="mt-0.5 text-[11px] font-medium text-gray-300">
                {shareCounts} {/* Update as necessary */}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <EmojiReaction
                title="Claps"
                defaultImage="/static/emojis/crying.png"
                animatedImage="/static/emojis/crying.webp"
                disabledImage="/static/emojis/love-you-gesture.png"
                onClick={() =>
                  addReaction({ type: 'CLAPPING', section: 'current' })
                }
              />
              <span className="mt-0.5 text-[11px] font-medium text-gray-300">
                {viewCounts}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <EmojiReaction
                title="Claps"
                defaultImage="/static/emojis/waka.png"
                animatedImage="/static/emojis/waka.webp"
                disabledImage="/static/emojis/love-you-gesture.png"
                onClick={() =>
                  addReaction({ type: 'CLAPPING', section: 'current' })
                }
              />
              <span className="mt-0.5 text-[11px] font-medium text-gray-300">
                {viewCounts}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex flex-col items-center">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-700/40 transition-colors hover:bg-gray-700/60">
                <button className="p-1.5">
                  <InsightIcon className="h-3.5 w-3.5 text-gray-300" />
                </button>
              </div>
              <span className="mt-0.5 text-[11px] text-gray-400">
                {viewCounts}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-700/40 transition-colors hover:bg-gray-700/60">
                <button className="p-1.5">
                  <ShareIcon className="h-3.5 w-3.5 text-gray-300" />
                </button>
              </div>
              <span className="mt-0.5 text-[11px] text-gray-400">
                {shareCounts}
              </span>
            </div>
          </div>
        </div>
      </div>
    </m.div>
  );
}
