'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { User } from '@supabase/supabase-js';
import { motion } from 'framer-motion';
import {
  BriefcaseBusiness,
  Code,
  Computer,
  Contact,
  Cookie,
  HeartHandshake,
  LayoutDashboard,
  LogOut,
  Route,
  Tags,
  User as UserIcon,
  UserRoundPen,
} from 'lucide-react';
import toast from 'react-hot-toast';

import usePlaySound from '@/components/PlaySound';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import useChatStore from '@/lib/hooks/chatState';
import { cacheAndServeImage } from '@/utils/cacheImage';
import { createClient } from '@/utils/supabase/client';
import { toastOptions } from '@/utils/toast';

export function DropdownMenuDemo() {
  const [user, setUser] = useState<User | null>(null);
  const { chatEnabled, setChatEnabled } = useChatStore();
  const [cachedAvatarUrl, setCachedAvatarUrl] = useState<string | null>(null);

  const supabase = createClient();
  const router = useRouter();

  const { playSound } = usePlaySound({
    filePath: '/static/sounds/page-change.mp3',
    volume: 0.7,
  });

  useEffect(() => {
    const checkUserSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error || !session?.user) {
        setUser(null);
      } else {
        setUser(session.user);
        if (session.user.user_metadata?.avatar_url) {
          const cachedUrl = await cacheAndServeImage(
            session.user.user_metadata.avatar_url
          );
          setCachedAvatarUrl(cachedUrl);
        }
      }
    };

    checkUserSession();
  }, [supabase]);

  const handleSignOut = async () => {
    if (user) {
      const { error } = await supabase.auth.signOut();

      if (!error) {
        router.push('/auth');

        toast.success('Successfully signed out', {
          ...toastOptions,
        });
      } else {
        toast.error('Something went wrong, please try again', {
          ...toastOptions,
        });
      }
    } else {
      router.push('/auth');
    }
  };

  const handleDropdownChange = (open: boolean) => {
    if (open) {
      playSound();
    }
  };

  return (
    <DropdownMenu modal={false} onOpenChange={handleDropdownChange}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative ml-2 h-9 w-9 cursor-pointer rounded-full bg-zinc-300 ring-zinc-400 transition-all hover:bg-zinc-300 hover:ring-1 dark:bg-zinc-700 dark:ring-white dark:hover:bg-zinc-800"
        >
          <motion.div
            whileHover={{ scale: 0.9 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.1, ease: 'easeIn' }}
          >
            <Avatar>
              {cachedAvatarUrl ? (
                <AvatarImage src={cachedAvatarUrl} alt="User avatar" />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <UserIcon size={22} />
                </div>
              )}
            </Avatar>
          </motion.div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56"
        align="end"
        sideOffset={10}
        forceMount
      >
        <DropdownMenuLabel>
          {user?.email ? user.email : 'My Account'}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {user && (
            <>
              <DropdownMenuItem asChild>
                <button
                  onClick={() => router.push('/dashboard')}
                  className="flex w-full items-center"
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </button>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <button
                  onClick={() => router.push('/dashboard')}
                  className="flex w-full items-center"
                >
                  <UserRoundPen className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </button>
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuItem asChild>
            <button
              onClick={handleSignOut}
              className="flex w-full items-center"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>{user ? 'Sign Out' : 'Sign In'}</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/snippets" className="flex items-center">
              <Code className="mr-2 h-4 w-4" />
              <span>Snippets</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/uses" className="flex items-center">
              <Computer className="mr-2 h-4 w-4" />
              <span>Uses</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/tags" className="flex items-center">
              <Tags className="mr-2 h-4 w-4" />
              <span>Tags</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/journey" className="flex items-center">
              <Route className="mr-2 h-4 w-4" />
              <span>Journey</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/contact" className="flex items-center">
              <Contact className="mr-2 h-4 w-4" />
              <span>Contact</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/available" className="flex items-center">
              <BriefcaseBusiness className="mr-2 h-4 w-4" />
              <span>Availablity</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/privacy" className="flex items-center">
              <Cookie className="mr-2 h-4 w-4" />
              <span>Privacy</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/terms" className="flex items-center">
              <HeartHandshake className="mr-2 h-4 w-4" />
              <span>Terms of service</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <div className="flex w-full items-center justify-between">
            <Label htmlFor="chat-toggle" className="cursor-pointer">
              Enable Chat
            </Label>
            <Switch
              id="chat-toggle"
              checked={chatEnabled}
              onCheckedChange={setChatEnabled}
            />
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropdownMenuDemo;
