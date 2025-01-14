'use client';

import clsx from 'clsx';
import { MessagesSquare } from 'lucide-react';

import { useScrollProgress } from '@/lib/hooks/useScrollProgress';
import useChatStore from '@/lib/store/chatStore';

interface ScrollTopAndCommentProps {
  showScrollToComment?: boolean;
}

export default function ScrollTopAndComment({
  showScrollToComment = true,
}: ScrollTopAndCommentProps) {
  const { showScrollToTop, progress } = useScrollProgress();
  const { chatEnabled } = useChatStore();

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
      className={clsx(
        'fixed right-8 z-50 flex flex-col gap-3',
        chatEnabled ? 'bottom-[80px]' : 'bottom-8',
      )}
    >
      {showScrollToComment && (
        <button
          aria-label="Scroll To Comment"
          className="rounded-full bg-gray-500 p-2 text-black transition-all hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:text-red-500"
          type="button"
          onClick={handleScrollToComment}
        >
          <MessagesSquare className="h-5 w-5" />
        </button>
      )}
      {showScrollToTop && (
        <button
          aria-label="Scroll To Top"
          className="relative rounded-full bg-black p-2 text-white transition-all hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:text-red-500"
          type="button"
          onClick={handleScrollTop}
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <title>Scroll to top icon</title>
            <path
              clipRule="evenodd"
              d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
              fillRule="evenodd"
            />
          </svg>
          <svg
            className="absolute inset-0 h-full w-full -rotate-90"
            viewBox="0 0 100 100"
          >
            <title>Progress circle</title>
            <circle
              className="text-gray-300 dark:text-gray-600"
              cx="50"
              cy="50"
              fill="transparent"
              r="46"
              stroke="currentColor"
              strokeWidth="4"
            />
            <circle
              className="text-white transition-all duration-200 ease-in-out dark:text-white dark:hover:text-red-500"
              cx="50"
              cy="50"
              fill="transparent"
              r="46"
              stroke="currentColor"
              strokeDasharray={290}
              strokeDashoffset={290 - (290 * progress) / 100}
              strokeLinecap="round"
              strokeWidth="4"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
