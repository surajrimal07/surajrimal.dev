import Image from 'next/image';

//removing z-[-1]  makes page so smooth, else it makes page janky, not sure why

const Avatar = () => {
  return (
    <div className="max-h-[430px] overflow-hidden rounded-md">
      <Image
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOcWZJcDwAFDwHxT36VswAAAABJRU5ErkJggg=="
        placeholder="blur"
        src={'/static/images/avatar.jpg'}
        alt="author avatar"
        width={430}
        height={430}
      />
    </div>
  );
};

export default Avatar;
