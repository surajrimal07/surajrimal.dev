import Image from 'next/image';

import { BLUR_IMAGE_DATA_URL, LOGO_IMAGE_PATH } from '@/constants/index';

const Avatar = () => {
  return (
    <div className="relative inline-block">
      <div className="relative h-64 w-64 rounded-full p-[1px] sm:h-80 sm:w-80 md:h-96 md:w-96 lg:h-[432px] lg:w-[432px]">
        <div className="absolute inset-0 overflow-hidden rounded-full border-2 border-gray-800">
          <Image
            blurDataURL={BLUR_IMAGE_DATA_URL}
            placeholder="blur"
            src={LOGO_IMAGE_PATH}
            priority={true}
            alt="author avatar"
            fill
            sizes="(max-width: 640px) 16rem, (max-width: 768px) 20rem, (max-width: 1024px) 24rem, 27rem"
            className="rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Avatar;
