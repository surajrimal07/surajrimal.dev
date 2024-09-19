import { BLUR_IMAGE_DATA_URL, LOGO_IMAGE_PATH } from '@/constants/index';
import Image from 'next/image';

//removing z-[-1]  makes page so smooth, else it makes page janky, not sure why

const Avatar = () => {
  return (
    <div className="max-h-[430px] overflow-hidden rounded-md">
      <Image
        blurDataURL={BLUR_IMAGE_DATA_URL}
        placeholder="blur"
        src={LOGO_IMAGE_PATH}
        alt="author avatar"
        width={430}
        height={430}
      />
    </div>
  );
};

export default Avatar;
