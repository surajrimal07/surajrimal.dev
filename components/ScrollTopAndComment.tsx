'use client';

import { useCallback, useEffect, useState } from 'react';

import { MessagesSquare } from 'lucide-react';

import useChatStore from '@/lib/hooks/chatState';

export default function ScrollTopAndComment({
  showScrollToComment = true,
}: {
  showScrollToComment?: boolean;
}) {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);
  const { chatEnabled } = useChatStore();

  const handleWindowScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop > 50) setShow(true);
    else setShow(false);

    const windowHeight = scrollHeight - clientHeight;
    const currentProgress = (scrollTop / windowHeight) * 100;
    setProgress(currentProgress);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, [handleWindowScroll]);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToComment = () => {
    const commentElement = document.getElementById('comment');
    if (commentElement) {
      commentElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`fixed bottom-8 right-8 z-10 flex-col gap-3 md:flex ${show ? 'md:flex' : 'md:hidden'}`}
    >
      {showScrollToComment && (
        <button
          aria-label="Scroll To Comment"
          onClick={handleScrollToComment}
          className="rounded-full bg-gray-500 p-2 text-black transition-all hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:text-red-500"
        >
          <MessagesSquare className="h-5 w-5" />
        </button>
      )}
      <button
        aria-label="Scroll To Top"
        onClick={handleScrollTop}
        className="relative rounded-full bg-black p-2 text-white transition-all hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:text-red-500"
        style={{ marginBottom: chatEnabled ? '60px' : '0px' }}
      >
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
        <svg
          className="absolute inset-0 h-full w-full -rotate-90"
          viewBox="0 0 100 100"
        >
          <circle
            className="text-gray-300 dark:text-gray-600"
            strokeWidth="4"
            stroke="currentColor"
            fill="transparent"
            r="46"
            cx="50"
            cy="50"
          />
          <circle
            className="text-white transition-all duration-200 ease-in-out dark:text-white dark:hover:text-red-500"
            strokeWidth="4"
            strokeDasharray={290}
            strokeDashoffset={290 - (290 * progress) / 100}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="46"
            cx="50"
            cy="50"
          />
        </svg>
      </button>
    </div>
  );
}
