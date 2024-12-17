import Image from 'next/image';

import { LOGO_IMAGE_SMALL_PATH } from '@/constants/index';

const Avatar = () => {
  return (
    <div className="relative inline-block">
      <div className="relative h-64 w-64 rounded-full p-[1px] sm:h-80 sm:w-80 md:h-96 md:w-96 lg:h-[432px] lg:w-[432px]">
        <div className="absolute inset-0 overflow-hidden rounded-full border-2 border-gray-800">
          <Image
            fill
            alt="author avatar"
            className="rounded-full object-cover"
            priority={true}
            sizes="(max-width: 640px) 16rem, (max-width: 768px) 20rem, (max-width: 1024px) 24rem, 27rem"
            src={LOGO_IMAGE_SMALL_PATH}
          />
        </div>
      </div>
    </div>
  );
};

export default Avatar;
