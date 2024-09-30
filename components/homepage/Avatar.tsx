import Image from 'next/image';

import { BLUR_IMAGE_DATA_URL, LOGO_IMAGE_PATH } from '@/constants/index';

import { BorderBeam } from '../ui/border-beam';

const Avatar = () => {
  return (
    <div className="relative inline-block">
      <div className="h-[430px] w-[430px] overflow-hidden rounded-full">
        <BorderBeam />
        <Image
          blurDataURL={BLUR_IMAGE_DATA_URL}
          placeholder="blur"
          src={LOGO_IMAGE_PATH}
          alt="author avatar"
          height={428}
          width={428}
          className="h-[428px] w-[428px] rounded-full object-cover"
        />
      </div>
    </div>
  );
};

export default Avatar;
