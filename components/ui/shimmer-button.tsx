'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { motion } from 'framer-motion';

import { cn } from '@/lib/utils';

type Direction = 'TOP' | 'LEFT' | 'BOTTOM' | 'RIGHT';

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = 'button',
  duration = 1,
  clockwise = true,
  ...props
}: React.PropsWithChildren<
  {
    as?: React.ElementType;
    containerClassName?: string;
    className?: string;
    duration?: number;
    clockwise?: boolean;
  } & React.HTMLAttributes<HTMLElement>
>) {
  const [hovered, setHovered] = useState<boolean>(false);
  const [direction, setDirection] = useState<Direction>('TOP');

  const rotateDirection = useCallback(
    (currentDirection: Direction): Direction => {
      const directions: Direction[] = ['TOP', 'LEFT', 'BOTTOM', 'RIGHT'];
      const currentIndex = directions.indexOf(currentDirection);
      const nextIndex = clockwise
        ? (currentIndex - 1 + directions.length) % directions.length
        : (currentIndex + 1) % directions.length;
      return directions[nextIndex];
    },
    [clockwise]
  );

  const movingMap: Record<Direction, string> = useMemo(
    () => ({
      TOP: 'radial-gradient(20.7% 50% at 50% 0%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)',
      LEFT: 'radial-gradient(16.6% 43.1% at 0% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)',
      BOTTOM:
        'radial-gradient(20.7% 50% at 50% 100%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)',
      RIGHT:
        'radial-gradient(16.2% 41.199999999999996% at 100% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)',
    }),
    []
  );

  const highlight = useMemo(
    () =>
      'radial-gradient(75% 181.15942028985506% at 50% 50%, #3275F8 0%, rgba(255, 255, 255, 0) 100%)',
    []
  );

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((prevState) => rotateDirection(prevState));
      }, duration * 1000);
      return () => clearInterval(interval);
    }
  }, [duration, hovered, rotateDirection]);

  const handleMouseEnter = useCallback(() => {
    setHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
  }, []);

  const initialBackground = useMemo(
    () => ({ background: movingMap[direction] }),
    [movingMap, direction]
  );

  const animateBackground = useMemo(
    () => ({
      background: hovered
        ? [movingMap[direction], highlight]
        : movingMap[direction],
    }),
    [hovered, movingMap, direction, highlight]
  );

  const style = useMemo(
    () => ({
      filter: 'blur(2px)',
      position: 'absolute' as const,
      width: '100%',
      height: '100%',
    }),
    []
  );

  const transition = useMemo(
    () => ({
      ease: 'linear',
      duration: duration ?? 1,
    }),
    [duration]
  );

  return (
    <Tag
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'relative flex h-min w-fit flex-col flex-nowrap content-center items-center justify-center gap-10 overflow-visible rounded-full border bg-black/20 decoration-clone p-px transition duration-500 hover:bg-black/10 dark:bg-white/20',
        containerClassName
      )}
      {...props}
    >
      <div
        className={cn(
          'z-10 w-auto rounded-[inherit] bg-zinc-900 px-1.5 py-1 text-white',
          className
        )}
      >
        {children}
      </div>
      <motion.div
        className={cn(
          'absolute inset-0 z-0 flex-none overflow-hidden rounded-[inherit]'
        )}
        style={style}
        initial={initialBackground}
        animate={animateBackground}
        transition={transition}
      />
      <div className="z-1 absolute inset-[2px] flex-none rounded-[100px] bg-zinc-900" />
    </Tag>
  );
}
