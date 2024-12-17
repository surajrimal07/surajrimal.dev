'use client';

import { ShareIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { FaFacebookF, FaXTwitter } from 'react-icons/fa6';
import { LuExternalLink, LuLink } from 'react-icons/lu';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { updateBlogShares } from '@/lib/pageView';
import type { BlogShares, ShareType } from '@/types/share';
import { toastOptions } from '@/utils/toast';

interface ShareMenuProps {
  url: string;
  slug: string;
  ip: string;
  shares: BlogShares;
  onShareComplete?: (shares: BlogShares) => void;
}

export default function ShareMenu({
  url,
  slug,
  ip,
  shares,
  onShareComplete = () => {},
}: ShareMenuProps) {
  const handleShareClick = async (
    type: ShareType,
    shareFunction: () => void,
  ) => {
    shareFunction();

    try {
      const updatedShares = await updateBlogShares(slug, ip, type);
      onShareComplete(updatedShares);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === 'Max shares limit reached'
      ) {
        toast.error(error.message, toastOptions);
      }
    }
  };

  const handleCopy = () => {
    handleShareClick('clipboardshare', () => {
      navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard');
    });
  };

  const handleTwitter = () => {
    handleShareClick('twittershare', () => {
      window.open(`https://twitter.com/intent/tweet?url=${url}`, '_blank');
    });
  };

  const handleFacebook = () => {
    handleShareClick('facebookshare', () => {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        '_blank',
      );
    });
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <ShareIcon className="h-5 w-5 text-gray-300" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        avoidCollisions={false}
        className="w-56 rounded-lg border border-gray-700 bg-gray-900 p-0 text-white shadow-lg"
        side="top"
        sideOffset={20}
      >
        <div className="border-b border-gray-700 p-3">
          <h3 className="text-base font-semibold">Share this on</h3>
          <p className="text-sm text-gray-400">Choose a platform to share</p>
        </div>
        <div className="p-1.5">
          <DropdownMenuItem
            className="flex cursor-pointer items-center rounded-md px-2 py-1.5 hover:bg-gray-800"
            onClick={handleTwitter}
          >
            <FaXTwitter className="mr-2 h-4 w-4" />
            <span>Twitter - {shares.twittershare}</span>
            <LuExternalLink className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex cursor-pointer items-center rounded-md px-2 py-1.5 hover:bg-gray-800"
            onClick={handleFacebook}
          >
            <FaFacebookF className="mr-2 h-4 w-4" />
            <span>Facebook - {shares.facebookshare}</span>
            <LuExternalLink className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex cursor-pointer items-center rounded-md px-2 py-1.5 hover:bg-gray-800"
            onClick={handleCopy}
          >
            <LuLink className="mr-2 h-4 w-4" />
            <span>Copy link - {shares.clipboardshare}</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
