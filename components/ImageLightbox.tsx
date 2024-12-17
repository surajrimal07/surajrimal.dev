/* eslint-disable @next/next/no-img-element */
import type React from 'react';
import {
  type KeyboardEvent as ReactKeyboardEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { useTheme } from 'next-themes';

import Twemoji from '@/components/Twemoji';
import type { ImageLightBoxProps } from '@/types/components';

const ImageLightbox = ({ src, closeLightbox }: ImageLightBoxProps) => {
  const { theme } = useTheme();

  const [close, setClose] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleClose = useCallback(() => {
    setClose(true);

    document.documentElement.classList.remove(
      'prevent-scroll',
      'lightbox-loading',
    );

    setTimeout(() => closeLightbox(), 400);
  }, [closeLightbox]);

  const handleKeydown = useCallback(
    (e: ReactKeyboardEvent | KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    },
    [handleClose],
  );

  useEffect(() => {
    document.documentElement.classList.add('prevent-scroll');

    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
  }, [handleKeydown]);

  useEffect(() => {
    if (imgLoaded) {
      setTimeout(() => {
        document.documentElement.classList.remove('lightbox-loading');
      }, 150);
    }
  }, [imgLoaded]);

  const style = {
    '--tw-bg-opacity': theme === 'dark' ? 0.7 : 0.9,
    opacity: !close && imgLoaded ? 1 : 0,
  } as React.CSSProperties;

  return (
    <div
      className="lightbox-overlay fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-300 ease-out"
      role="button"
      style={style}
      tabIndex={0}
      onClick={handleClose}
      onKeyDown={handleKeydown}
    >
      <div className="relative flex h-full w-full items-center justify-center">
        <div className="absolute inset-x-0 top-0 flex justify-between">
          <button
            className="p-4 text-xl text-white"
            type="button"
            onClick={handleClose}
          >
            Esc
          </button>
          <button className="p-4" type="button" onClick={handleClose}>
            <Twemoji name="cross" size="sm" />
          </button>
        </div>
        <img
          alt="Lightbox"
          className="max-h-[80vh] max-w-[90vw] cursor-zoom-out"
          src={src.toString()}
          onLoad={() => setImgLoaded(true)}
        />
      </div>
    </div>
  );
};

export default ImageLightbox;
