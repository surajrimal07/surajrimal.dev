'use client';

import NextImage from 'next/image';
import { useState } from 'react';

import clsx from 'clsx';

import ImageLightbox from '@/components/ImageLightbox';
import { BLUR_IMAGE_DATA_URL, LOGO_IMAGE_PATH } from '@/constants/index';
import type { ImageProps } from '@/types/components';

const Image = ({ shouldOpenLightbox = true, ...rest }: ImageProps) => {
  let blurDataURL = '';

  if (rest.src !== LOGO_IMAGE_PATH) {
    blurDataURL = BLUR_IMAGE_DATA_URL;
  }

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
    shouldOpenLightbox && 'cursor-zoom-in'
  );

  return (
    <>
      <div
        className={className}
        data-umami-event={
          isThumb ? 'view-post-thumbnail' : 'view-image-in-lightbox'
        }
      >
        <NextImage
          {...rest}
          blurDataURL={blurDataURL}
          onClick={handleOpenLightbox}
        />
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
