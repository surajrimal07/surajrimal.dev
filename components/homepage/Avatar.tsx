import { BLUR_IMAGE_DATA_URL, LOGO_IMAGE_PATH } from '@/constants/index';
import Image from 'next/image';

//removing z-[-1]  makes page so smooth, else it makes page janky, not sure why

const Avatar = () => {
  return (
    <div className="overflow-hidden rounded-md">
      <Image
        blurDataURL={BLUR_IMAGE_DATA_URL}
        placeholder="blur"
        src={LOGO_IMAGE_PATH}
        alt="author avatar"
        height={430}
        width={430}
        style={{ width: '430px', height: '430px' }}
      />
    </div>
  );
};

export default Avatar;
