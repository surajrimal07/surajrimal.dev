'use client';

import { memo, useCallback, useEffect, useState } from 'react';

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

import usePlaySound from '../lib/hooks/PlaySound';

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
      onClick={() => onClick(value)}
      className={`${
        theme === value ? 'bg-red-500 text-white dark:bg-red-500' : ''
      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
    >
      <div className="mr-2">{icon}</div>
      {label}
    </DropdownMenuItem>
  )
);

ThemeOption.displayName = 'ThemeOption';

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { playSound } = usePlaySound({
    filePath: '/static/sounds/switch-on.mp3',
    volume: 0.7,
  });
  const [isThemeChanged, setIsThemeChanged] = useState(false);

  const handleClick = useCallback(
    (value: string) => {
      playSound();
      setTheme(value);
      setIsThemeChanged(true);
    },
    [playSound, setTheme]
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

  const getCurrentIcon = () => {
    if (!mounted) return <BsMoonStarsFill />;
    return resolvedTheme === 'dark' ? <BsMoonStarsFill /> : <HiSun />;
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative ml-2 h-8 w-8 cursor-pointer rounded-full bg-zinc-300 ring-zinc-400 transition-all hover:bg-zinc-300 hover:ring-1 dark:bg-zinc-700 dark:ring-white dark:hover:bg-zinc-800"
        >
          <motion.div
            className="flex h-8 w-8 items-center justify-center p-2"
            animate={isThemeChanged ? { scale: 1.2, rotate: 180 } : {}}
            transition={{ duration: 0.1, ease: 'easeIn' }}
            whileHover={{ scale: 1.1 }}
          >
            {getCurrentIcon()}
            <span className="sr-only">Toggle theme</span>
          </motion.div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={10} className="w-32">
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {THEME_OPTIONS.map(({ value, icon, label }) => (
            <ThemeOption
              key={value}
              value={value}
              icon={icon}
              label={label}
              theme={theme}
              onClick={handleClick}
            />
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default memo(ThemeSwitch);
