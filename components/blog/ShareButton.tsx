'use client';

import { updateBlogShares } from '@/lib/pageView';
import { ShareType } from '@/types/share';
import clsx from 'clsx';
import React from 'react';
import { FaFacebookF, FaXTwitter } from 'react-icons/fa6';
import { LuExternalLink } from 'react-icons/lu';

import toast from 'react-hot-toast';
import { FaRegClipboard } from 'react-icons/fa';

interface ShareButtonProps {
  url: string;
  slug: string;
  ip: string;
  onItemClick?: (type: ShareType) => void;
  onShareComplete?: () => void;
}

const toastOptions = {
  style: {
    borderRadius: '10px',
    background: '#333',
    color: '#fff',
  },
  duration: 2000,
};

const ShareButton: React.FC<ShareButtonProps> = ({
  url,
  slug,
  ip,
  onItemClick = () => {},
  onShareComplete = () => {},
}) => {
  const handleShareClick = async (type: ShareType, shareFunction: () => void) => {
    try {
      await updateBlogShares(slug, ip, type);
      onItemClick(type);
      shareFunction();
      onShareComplete();
    } catch (error) {
      if (error.message === 'Max shares limit reached') {
        toast.error('Maximum shares limit reached', {
          ...toastOptions,
        });
      } else {
        console.error(`Failed to update shares for ${slug}:`, error);
      }
    }
  };

  const handleCopy = () => {
    toast.success('Link copied to clipboard', {
      ...toastOptions,
    });
    handleShareClick('clipboardshare', () => {
      navigator.clipboard.writeText(url);
    });
  };

  const handleTwitter = () => {
    handleShareClick('twittershare', () => {
      window.open(`https://twitter.com/intent/tweet?url=${url}`, '_blank');
    });
  };

  const handleFacebook = () => {
    handleShareClick('facebookshare', () => {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    });
  };

  return (
    <div className="absolute left-0 mt-2 w-42 bg-gray-900 rounded-md shadow-lg z-10">
      <div className={clsx('py-2 px-2 text-center text-lg text-gray-300')}>Share this on</div>
      <div className="h-px bg-gray-600 my-1"></div>
      <button onClick={handleTwitter} className="flex items-center w-full px-6 py-3 text-white hover:bg-gray-700">
        <FaXTwitter className="mr-2 h-4 w-4" />
        Twitter
        <LuExternalLink className="ml-1 h-3 w-3" />
      </button>
      <button onClick={handleFacebook} className="flex items-center w-full px-6 py-3 text-white hover:bg-gray-700">
        <FaFacebookF className="mr-2 h-4 w-4" />
        Facebook
        <LuExternalLink className="ml-1 h-3 w-3" />
      </button>
      <button onClick={handleCopy} className="flex items-center w-full px-6 py-3 text-white hover:bg-gray-700">
        <FaRegClipboard className="mr-2 h-4 w-4" />
        Copy link
      </button>
    </div>
  );
};

export default ShareButton;
