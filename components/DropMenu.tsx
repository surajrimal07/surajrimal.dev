'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { memo, useCallback, useEffect, useMemo } from 'react';

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

import { useCurrentPath } from '@/components//PathProvider';
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
import useAuthStore from '@/lib/store/authStore';
import type { WeatherApiResponse } from '@/types/weather';
import { fetcher } from '@/utils/fetcher';
import { useSuperadminStatus } from '@/utils/supabase/superAdmin';
import { toastOptions } from '@/utils/toast';
import type { User } from '@supabase/supabase-js';

interface MemoizedAvatarProps {
  isAuthLoading: boolean;
  avatarUrl?: string;
}

interface DropdownMenuContentProps {
  user: User | null;
  isSuperadmin: boolean;
  isLoadingSuperadminStatus: boolean;
  handleSignOut: () => void;
  router: ReturnType<typeof useRouter>;
  chatEnabled: boolean;
  setChatEnabled: (enabled: boolean) => void;
  isLoading: boolean;
  weatherData: WeatherApiResponse | undefined;
  isSoundEnabled: boolean;
  toggleSound: () => void;
}
interface MemoizedDropdownMenuTriggerProps {
  memoizedMotionProps: {
    whileHover: { scale: number };
    whileTap: { scale: number };
    transition: { duration: number; ease: string };
  };
  memoizedAvatar: React.ReactNode;
}

const MemoizedAvatar = memo(
  ({ isAuthLoading, avatarUrl }: MemoizedAvatarProps) => (
    <Avatar>
      {isAuthLoading ? (
        <div className="flex h-full w-full items-center justify-center">
          <LoaderCircle className="h-6 w-6 animate-spin text-white" />
        </div>
      ) : avatarUrl ? (
        <AvatarImage alt="User avatar" src={avatarUrl} />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <UserIcon size={22} />
        </div>
      )}
    </Avatar>
  ),
);
MemoizedAvatar.displayName = 'MemoizedAvatar';

const MemoizedDropdownMenuContent = memo(
  ({
    user,
    isSuperadmin,
    isLoadingSuperadminStatus,
    handleSignOut,
    router,
    chatEnabled,
    setChatEnabled,
    isLoading,
    weatherData,
    isSoundEnabled,
    toggleSound,
  }: DropdownMenuContentProps) => (
    <DropdownMenuContent
      forceMount
      align="end"
      className="w-56"
      sideOffset={10}
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
                  className="flex w-full items-center"
                  type="button"
                  onClick={() => router.push('/admin')}
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </button>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem asChild>
              <button
                className="flex w-full items-center"
                type="button"
                onClick={() => router.push('/profile')}
              >
                <UserRoundPen className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </button>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuItem asChild>
          <button
            className="flex w-full items-center"
            type="button"
            onClick={handleSignOut}
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
          <Link className="flex items-center" href="/uses">
            <Computer className="mr-2 h-4 w-4" />
            <span>Uses</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link className="flex items-center" href="/tags">
            <Tags className="mr-2 h-4 w-4" />
            <span>Tags</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link className="flex items-center" href="/snippets">
            <Code className="mr-2 h-4 w-4" />
            <span>Snippets</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link className="flex items-center" href="/media">
            <MicVocal className="mr-2 h-4 w-4" />
            <span>In Media</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link className="flex items-center" href="/journey">
            <Route className="mr-2 h-4 w-4" />
            <span>Journey</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link className="flex items-center" href="/contact">
            <Contact className="mr-2 h-4 w-4" />
            <span>Contact</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link className="flex items-center" href="/certificates">
            <ShieldCheck className="mr-2 h-4 w-4" />
            <span>Certificates</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link className="flex items-center" href="/available">
            <BriefcaseBusiness className="mr-2 h-4 w-4" />
            <span>Availablity</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link className="flex items-center" href="/guestbook">
            <BookHeart className="mr-2 h-4 w-4" />
            <span>Guestbook</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link className="flex items-center" href="/privacy">
            <Cookie className="mr-2 h-4 w-4" />
            <span>Privacy</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link className="flex items-center" href="/terms">
            <HeartHandshake className="mr-2 h-4 w-4" />
            <span>Terms of service</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuLabel>Weather</DropdownMenuLabel>
      <DropdownMenuGroup>
        {isLoading && <DropdownMenuItem>Loading weather data</DropdownMenuItem>}
        {!weatherData && (
          <DropdownMenuItem>Error loading weather data</DropdownMenuItem>
        )}
        {weatherData && (
          <DropdownMenuItem className="cursor-default focus:bg-transparent">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center space-x-2">
                <Image
                  alt={weatherData.condition}
                  className="h-6 w-6"
                  height={24}
                  src={`https:${weatherData.icon}`}
                  width={24}
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
          <Label className="cursor-pointer" htmlFor="chat-toggle">
            Enable Chat
          </Label>
          <Switch
            checked={chatEnabled}
            id="chat-toggle"
            onCheckedChange={setChatEnabled}
          />
        </div>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <div className="flex w-full items-center justify-between">
          <Label className="cursor-pointer" htmlFor="sound-toggle">
            Enable Sound
          </Label>
          <Switch
            checked={isSoundEnabled}
            id="sound-toggle"
            onCheckedChange={toggleSound}
          />
        </div>
      </DropdownMenuItem>
    </DropdownMenuContent>
  ),
);
MemoizedDropdownMenuContent.displayName = 'MemoizedDropdownMenuContent';

const MemoizedDropdownMenuTrigger = memo(
  ({
    memoizedMotionProps,
    memoizedAvatar,
  }: MemoizedDropdownMenuTriggerProps) => {
    const memoizedButton = useMemo(
      () => (
        <Button
          aria-label="User dropdown menu"
          className="relative ml-2 h-9 w-9 cursor-pointer rounded-full bg-zinc-300 ring-zinc-400 transition-all hover:bg-zinc-300 hover:ring-1 dark:bg-zinc-700 dark:ring-white dark:hover:bg-zinc-800"
          variant="ghost"
        >
          <motion.div {...memoizedMotionProps}>{memoizedAvatar}</motion.div>
        </Button>
      ),
      [memoizedMotionProps, memoizedAvatar],
    );

    return <DropdownMenuTrigger asChild>{memoizedButton}</DropdownMenuTrigger>;
  },
);
MemoizedDropdownMenuTrigger.displayName = 'MemoizedDropdownMenuTrigger';

interface UserDropdownMenuProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const UserDropdownMenu = memo<UserDropdownMenuProps>(() => {
  const {
    user,
    avatarUrl,
    isLoading: isAuthLoading,
    initialize,
    signOut,
  } = useAuthStore();
  const { chatEnabled, setChatEnabled } = useChatStore();

  const router = useRouter();
  const currentPath = useCurrentPath();

  const { isSuperadmin, isLoading: isLoadingSuperadminStatus } =
    useSuperadminStatus(user ?? null);

  const { isSoundEnabled, toggleSound } = useSoundStore();

  const { data: weatherData, isLoading } = useSWR<WeatherApiResponse>(
    '/api/weather',
    fetcher,
  );

  const { playSound } = usePlaySound({
    filePath: '/static/sounds/page-change.mp3',
    volume: 0.7,
  });

  useEffect(() => {
    initialize();
  }, [initialize]);

  const memoizedAvatar = useMemo(
    () => (
      <MemoizedAvatar
        avatarUrl={avatarUrl ?? undefined}
        isAuthLoading={isAuthLoading}
      />
    ),
    [isAuthLoading, avatarUrl],
  );

  const handleSignOut = useCallback(async () => {
    if (user) {
      try {
        const { shouldRedirect } = await signOut(currentPath);
        if (shouldRedirect) {
          router.push('/auth');
        }
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
  }, [user, signOut, currentPath, router]);

  type DropdownChangeHandler = (open: boolean) => void;

  const handleDropdownChange: DropdownChangeHandler = useCallback(
    (open: boolean): void => {
      if (open && isSoundEnabled) {
        playSound();
      }
    },
    [isSoundEnabled, playSound],
  );

  const memoizedDropdownMenuContent = useMemo(
    () => (
      <MemoizedDropdownMenuContent
        chatEnabled={chatEnabled}
        handleSignOut={handleSignOut}
        isLoading={isLoading}
        isLoadingSuperadminStatus={isLoadingSuperadminStatus}
        isSoundEnabled={isSoundEnabled}
        isSuperadmin={isSuperadmin}
        router={router}
        setChatEnabled={setChatEnabled}
        toggleSound={toggleSound}
        user={user}
        weatherData={weatherData}
      />
    ),
    [
      user,
      isSuperadmin,
      isLoadingSuperadminStatus,
      handleSignOut,
      router,
      chatEnabled,
      setChatEnabled,
      isLoading,
      weatherData,
      isSoundEnabled,
      toggleSound,
    ],
  );

  const memoizedMotionProps = useMemo(
    () => ({
      whileHover: { scale: 0.9 },
      whileTap: { scale: 0.95 },
      transition: { duration: 0.1, ease: 'easeIn' },
    }),
    [],
  );

  const memoizedDropdownMenuTrigger = useMemo(
    () => (
      <MemoizedDropdownMenuTrigger
        memoizedAvatar={memoizedAvatar}
        memoizedMotionProps={memoizedMotionProps}
      />
    ),
    [memoizedMotionProps, memoizedAvatar],
  );

  return (
    <DropdownMenu modal={false} onOpenChange={handleDropdownChange}>
      {memoizedDropdownMenuTrigger}
      {memoizedDropdownMenuContent}
    </DropdownMenu>
  );
});

// Add display name for debugging
UserDropdownMenu.displayName = 'UserDropdownMenu';

export default UserDropdownMenu;
