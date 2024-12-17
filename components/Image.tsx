'use client';

import NextImage from 'next/image';
import { useState } from 'react';

import clsx from 'clsx';

import ImageLightbox from '@/components/ImageLightbox';
import type { ImageProps } from '@/types/components';

const Image = ({ shouldOpenLightbox = true, ...rest }: ImageProps) => {
  const [openLightbox, setOpenLightbox] = useState(false);

  const handleOpenLightbox = () => {
    if (!shouldOpenLightbox) {
      return;
    }

    document.documentElement.classList.add('lightbox-loading');

    setOpenLightbox(true);
  };

  const isThumb = rest.id === 'thumbnail-image';

  const className = clsx(
    'flex justify-center',
    isThumb && 'thumbnail-image',
    shouldOpenLightbox && 'cursor-zoom-in',
  );

  return (
    <>
      <div
        className={className}
        data-umami-event={
          isThumb ? 'view-post-thumbnail' : 'view-image-in-lightbox'
        }
      >
        <NextImage {...rest} onClick={handleOpenLightbox} />
      </div>
      {openLightbox && (
        <ImageLightbox
          closeLightbox={() => setOpenLightbox(false)}
          src={rest.src}
        />
      )}
    </>
  );
};

export default Image;
