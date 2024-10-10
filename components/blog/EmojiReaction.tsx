import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import clsx from 'clsx';
import { m } from 'framer-motion';

const emojiMotion = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.2,
    transition: { duration: 0.3 },
  },
  tap: {
    scale: 0.8,
    transition: { duration: 0.3 },
  },
};

interface EmojiReactionProps {
  title: string;
  disabled?: boolean;
  defaultImage: string;
  animatedImage: string;
  disabledImage: string;
  onClick?: () => void;
  onHover?: () => void;
}

function EmojiReaction({
  title,
  disabled = false,
  defaultImage,
  animatedImage,
  disabledImage,
  onClick = () => {},
}: EmojiReactionProps) {
  const [src, setSrc] = useState<string>(
    disabled ? disabledImage : defaultImage
  );
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (disabled) {
      setSrc(disabledImage);
    }
  }, [disabled, disabledImage]);

  // Cleanup any existing timeout when the component unmounts
  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, [hoverTimeout]);

  const handleHoverStart = () => {
    if (disabled) {
      setSrc(disabledImage);
      return;
    }
    setSrc(animatedImage);
  };

  const handleHoverEnd = () => {
    if (disabled) {
      setSrc(disabledImage);
      return;
    }

    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }

    const timeout = setTimeout(() => {
      setSrc(defaultImage);
    }, 2000);

    setHoverTimeout(timeout);
  };

  const handleClick = () => {
    if (disabled) return;

    onClick();
  };

  return (
    <>
      <Head>
        <link rel="preload" as="image" href={animatedImage} />
        <link rel="preload" as="image" href={disabledImage} />
      </Head>
      <m.button
        disabled={disabled}
        title={title}
        aria-label={title}
        className={clsx('relative cursor-pointer select-none', [
          disabled && 'cursor-not-allowed',
        ])}
        whileTap={disabled ? undefined : 'tap'}
        onClick={handleClick}
        onMouseEnter={handleHoverStart}
        onMouseLeave={handleHoverEnd}
      >
        <m.div className={clsx('h-8 w-8')} variants={emojiMotion}>
          <Image
            className={clsx('pointer-events-none h-full w-full')}
            alt={title}
            src={src}
            width={48}
            height={48}
            unoptimized
            priority
          />
        </m.div>
      </m.button>
    </>
  );
}

export default EmojiReaction;
