'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { User } from '@supabase/supabase-js';
import { motion } from 'framer-motion';
import {
  Archive,
  Code,
  Home,
  LogOut,
  Pen,
  User as UserIcon,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { createClient } from '@/utils/supabase/component';

import usePlaySound from './PlaySound';

export function DropdownMenuDemo() {
  const [user, setUser] = useState<User | null>(null);
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
      }
    };

    checkUserSession();
  }, [supabase]);

  const handleSignOut = async () => {
    if (user) {
      const { error } = await supabase.auth.signOut();
      if (!error) {
        router.push('/auth');
      } else {
        console.error('Error signing out:', error.message);
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
          className="relative ml-2 h-10 w-10 cursor-pointer rounded-full bg-zinc-300 ring-zinc-400 transition-all hover:bg-zinc-300 hover:ring-1 dark:bg-zinc-700 dark:ring-white dark:hover:bg-zinc-800"
        >
          <motion.div
            whileHover={{ scale: 0.99 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.1, ease: 'easeIn' }}
          >
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="User avatar"
              />
              <AvatarFallback>
                <img
                  src="/static/images/user.png"
                  alt="Default profile"
                  className="h-10 w-10 rounded-full"
                />
              </AvatarFallback>
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
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
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
            <Link href="/" className="flex items-center">
              <Home className="mr-2 h-4 w-4" />
              <span>Home</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/blog" className="flex items-center">
              <Pen className="mr-2 h-4 w-4" />
              <span>Blog</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/snippets" className="flex items-center">
              <Code className="mr-2 h-4 w-4" />
              <span>Snippets</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/projects" className="flex items-center">
              <Archive className="mr-2 h-4 w-4" />
              <span>Projects</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/about" className="flex items-center">
              <UserIcon className="mr-2 h-4 w-4" />
              <span>About</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropdownMenuDemo;
