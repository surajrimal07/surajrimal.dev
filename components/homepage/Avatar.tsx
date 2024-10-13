import Image from 'next/image';

import { BLUR_IMAGE_DATA_URL, LOGO_IMAGE_PATH } from '@/constants/index';

const Avatar = () => {
  return (
    <div className="relative inline-block">
      <div className="h-[432px] w-[432px] rounded-full p-[1px]">
        <div className="h-[430px] w-[430px] overflow-hidden rounded-full border-2 border-gray-800">
          <Image
            blurDataURL={BLUR_IMAGE_DATA_URL}
            placeholder="blur"
            src={LOGO_IMAGE_PATH}
            alt="author avatar"
            height={430}
            width={430}
            className="h-[430px] w-[430px] rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Avatar;

//       <BorderBeam />
