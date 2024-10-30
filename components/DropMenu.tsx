'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { motion } from 'framer-motion';
import {
  BookHeart,
  BriefcaseBusiness,
  Code,
  Computer,
  Contact,
  Cookie,
  HeartHandshake,
  LayoutDashboard,
  LoaderCircle,
  LogOut,
  MicVocal,
  Route,
  ShieldCheck,
  Tags,
  User as UserIcon,
  UserRoundPen,
} from 'lucide-react';
import toast from 'react-hot-toast';
import useSWR from 'swr';

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
import usePlaySound from '@/lib/hooks/PlaySound';
import useChatStore from '@/lib/hooks/chatState';
import { useSoundStore } from '@/lib/hooks/soundState';
import useAuthStore from '@/lib/stores/auth';
import { fetcher } from '@/utils/fetcher';
import { useSuperadminStatus } from '@/utils/supabase/superAdmin';
import { toastOptions } from '@/utils/toast';

export function UserDropdownMenu() {
  const {
    user,
    avatarUrl,
    isLoading: isAuthLoading,
    initialize,
    signOut,
  } = useAuthStore();
  const { chatEnabled, setChatEnabled } = useChatStore();

  const router = useRouter();

  const { isSuperadmin, isLoading: isLoadingSuperadminStatus } =
    useSuperadminStatus(user);

  const { isSoundEnabled, toggleSound } = useSoundStore();

  const {
    data: weatherData,
    error,
    isLoading,
  } = useSWR('/api/weather', fetcher);

  const { playSound } = usePlaySound({
    filePath: '/static/sounds/page-change.mp3',
    volume: 0.7,
  });

  useEffect(() => {
    initialize();
  }, [initialize]);

  const handleSignOut = async () => {
    if (user) {
      try {
        await signOut();
        toast.success('Successfully signed out', {
          ...toastOptions,
        });
      } catch (error) {
        toast.error(`Something went wrong, please try again ${error}`, {
          ...toastOptions,
        });
      }
    } else {
      router.push('/auth');
    }
  };

  const handleDropdownChange = (open: boolean) => {
    if (open && isSoundEnabled) {
      playSound();
    }
  };

  return (
    <DropdownMenu modal={false} onOpenChange={handleDropdownChange}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          aria-label="User dropdown menu"
          className="relative ml-2 h-9 w-9 cursor-pointer rounded-full bg-zinc-300 ring-zinc-400 transition-all hover:bg-zinc-300 hover:ring-1 dark:bg-zinc-700 dark:ring-white dark:hover:bg-zinc-800"
        >
          <motion.div
            whileHover={{ scale: 0.9 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.1, ease: 'easeIn' }}
          >
            <Avatar>
              {isAuthLoading ? (
                <div className="flex h-full w-full items-center justify-center">
                  <LoaderCircle className="h-6 w-6 animate-spin text-white" />
                </div>
              ) : avatarUrl ? (
                <AvatarImage src={avatarUrl} alt="User avatar" />
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
              {isSuperadmin && !isLoadingSuperadminStatus && (
                <DropdownMenuItem asChild>
                  <button
                    onClick={() => router.push('/admin')}
                    className="flex w-full items-center"
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </button>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem asChild>
                <button
                  onClick={() => router.push('/profile')}
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
        <DropdownMenuLabel>Pages</DropdownMenuLabel>
        <DropdownMenuGroup>
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
            <Link href="/snippets" className="flex items-center">
              <Code className="mr-2 h-4 w-4" />
              <span>Snippets</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/media" className="flex items-center">
              <MicVocal className="mr-2 h-4 w-4" />
              <span>In Media</span>
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
            <Link href="/certificates" className="flex items-center">
              <ShieldCheck className="mr-2 h-4 w-4" />
              <span>Certificates</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/available" className="flex items-center">
              <BriefcaseBusiness className="mr-2 h-4 w-4" />
              <span>Availablity</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/guestbook" className="flex items-center">
              <BookHeart className="mr-2 h-4 w-4" />
              <span>Guestbook</span>
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
        <DropdownMenuLabel>Weather</DropdownMenuLabel>
        <DropdownMenuGroup>
          {isLoading && (
            <DropdownMenuItem>Loading weather data</DropdownMenuItem>
          )}
          {error && (
            <DropdownMenuItem>Error loading weather data</DropdownMenuItem>
          )}
          {weatherData && (
            <DropdownMenuItem className="cursor-default focus:bg-transparent">
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Image
                    src={`https:${weatherData.icon}`}
                    alt={weatherData.condition}
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
                  <span className="font-medium">{weatherData.city}</span>
                </div>
                <span className="font-bold">{weatherData.temperature}°C</span>
              </div>
            </DropdownMenuItem>
          )}
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
        <DropdownMenuItem>
          <div className="flex w-full items-center justify-between">
            <Label htmlFor="chat-toggle" className="cursor-pointer">
              Enable Sound
            </Label>
            <Switch
              id="chat-toggle"
              checked={isSoundEnabled}
              onCheckedChange={toggleSound}
            />
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserDropdownMenu;
