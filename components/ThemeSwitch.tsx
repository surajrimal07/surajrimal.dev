'use client';

import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { motion } from 'framer-motion';
import { Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';
import { BsMoonStarsFill } from 'react-icons/bs';
import { HiSun } from 'react-icons/hi';

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
import usePlaySound from '@/lib/hooks/PlaySound';
import { useSoundStore } from '@/lib/store/soundStore';

const THEME_OPTIONS = [
  { value: 'light', icon: <HiSun />, label: 'Light' },
  { value: 'dark', icon: <BsMoonStarsFill />, label: 'Dark' },
  { value: 'system', icon: <Monitor />, label: 'System' },
] as const;

const ThemeOption = memo(
  ({
    value,
    icon,
    label,
    theme,
    onClick,
  }: {
    value: string;
    icon: React.ReactNode;
    label: string;
    theme: string | undefined;
    onClick: (value: string) => void;
  }) => (
    <DropdownMenuItem
      className={`${
        theme === value ? 'bg-red-500 text-white dark:bg-red-500' : ''
      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
      onClick={() => onClick(value)}
    >
      <div className="mr-2">{icon}</div>
      {label}
    </DropdownMenuItem>
  ),
);

ThemeOption.displayName = 'ThemeOption';

const ThemeSwitch = memo(() => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { isSoundEnabled } = useSoundStore();
  const { playSound } = usePlaySound({
    filePath: '/static/sounds/switch-on.mp3',
    volume: 0.7,
  });
  const [isThemeChanged, setIsThemeChanged] = useState(false);

  const handleClick = useCallback(
    (value: string) => {
      if (isSoundEnabled) playSound();
      setTheme(value);
      setIsThemeChanged(true);
    },
    [isSoundEnabled, playSound, setTheme],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isThemeChanged) {
      timeoutId = setTimeout(() => setIsThemeChanged(false), 500);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isThemeChanged]);

  const getCurrentIcon = useCallback(() => {
    if (!mounted) return <BsMoonStarsFill />;
    return resolvedTheme === 'dark' ? <BsMoonStarsFill /> : <HiSun />;
  }, [mounted, resolvedTheme]);

  const memoizedButton = useMemo(
    () => (
      <Button
        className="relative ml-2 h-8 w-8 cursor-pointer rounded-full bg-zinc-300 ring-zinc-400 transition-all hover:bg-zinc-300 hover:ring-1 dark:bg-zinc-700 dark:ring-white dark:hover:bg-zinc-800"
        variant="ghost"
      >
        <motion.div
          animate={isThemeChanged ? { scale: 1.2, rotate: 180 } : {}}
          className="flex h-8 w-8 items-center justify-center p-2"
          transition={{ duration: 0.1, ease: 'easeIn' }}
          whileHover={{ scale: 1.1 }}
        >
          {getCurrentIcon()}
          <span className="sr-only">Toggle theme</span>
        </motion.div>
      </Button>
    ),
    [isThemeChanged, getCurrentIcon],
  );

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>{memoizedButton}</DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-32" sideOffset={10}>
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {THEME_OPTIONS.map(({ value, icon, label }) => (
            <ThemeOption
              key={value}
              icon={icon}
              label={label}
              theme={theme}
              value={value}
              onClick={handleClick}
            />
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

ThemeSwitch.displayName = 'ThemeSwitch';

export default ThemeSwitch;
