'use client';

import { useEffect, useRef } from 'react';

import { useInView, useMotionValue, useSpring } from 'framer-motion';

interface CounterProps {
  format?: (value: number) => string;
  targetValue: number;
  direction?: 'up' | 'down';
  delay?: number;
  className?: string;
}

export const Formatter = {
  number: (value: number) =>
    Intl.NumberFormat('en-US').format(+value.toFixed(0)),
  currency: (value: number) =>
    Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
      +value.toFixed(0)
    ),
};

export default function AnimatedCounter({
  format = Formatter.number,
  targetValue,
  direction = 'up',
  delay = 0,
  className,
}: CounterProps) {
  // Use ref and hooks unconditionally
  const ref = useRef<HTMLSpanElement>(null);
  const isGoingUp = direction === 'up';
  const motionValue = useMotionValue(isGoingUp ? 0 : targetValue);
  const springValue = useSpring(motionValue, { damping: 10, stiffness: 80 });
  const isInView = useInView(ref, { margin: '0px', once: true });

  // Early return for targetValue 0
  useEffect(() => {
    if (targetValue === 0) {
      if (ref.current) {
        ref.current.textContent = format ? format(0) : '0';
      }
      return; // Exit early if targetValue is 0
    }

    const timer = setTimeout(() => {
      if (isInView) {
        motionValue.set(isGoingUp ? targetValue : 0);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [isInView, delay, isGoingUp, targetValue, motionValue, format]);

  useEffect(() => {
    springValue.on('change', (value) => {
      if (ref.current) {
        ref.current.textContent = format ? format(value) : value.toString();
      }
    });
  }, [springValue, format]);

  return <span ref={ref} className={className} />;
}
