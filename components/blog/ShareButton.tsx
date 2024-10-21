'use client';

import React from 'react';

import toast from 'react-hot-toast';
import { FaFacebookF, FaXTwitter } from 'react-icons/fa6';
import { LuExternalLink, LuLink } from 'react-icons/lu';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { updateBlogShares } from '@/lib/pageView';
import { ShareType } from '@/types/share';

interface ShareMenuProps {
  url: string;
  slug: string;
  ip: string;
  onItemClick?: (type: ShareType) => void;
  onShareComplete?: () => void;
  children: React.ReactNode;
}

export default function ShareMenu({
  url,
  slug,
  ip,
  onItemClick = () => {},
  onShareComplete = () => {},
  children,
}: ShareMenuProps) {
  const handleShareClick = async (
    type: ShareType,
    shareFunction: () => void
  ) => {
    try {
      await updateBlogShares(slug, ip, type);
      onItemClick(type);
      shareFunction();
      onShareComplete();
    } catch (error) {
      if (error.message === 'Max shares limit reached') {
        toast.error('Maximum shares limit reached');
      } else {
        toast.error('Failed to update shares');
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
        '_blank'
      );
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <Card>
          <CardHeader>
            <CardTitle>Share this on</CardTitle>
            <CardDescription>Choose a platform to share</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <DropdownMenuItem onClick={handleTwitter}>
              <FaXTwitter className="mr-2 h-4 w-4" />
              <span>Twitter</span>
              <LuExternalLink className="ml-auto h-4 w-4" />
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleFacebook}>
              <FaFacebookF className="mr-2 h-4 w-4" />
              <span>Facebook</span>
              <LuExternalLink className="ml-auto h-4 w-4" />
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleCopy}>
              <LuLink className="mr-2 h-4 w-4" />
              <span>Copy link</span>
            </DropdownMenuItem>
          </CardContent>
        </Card>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
