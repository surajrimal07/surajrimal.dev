import Twemoji from '@/components/Twemoji';

const ShortDescription = () => {
  return (
    <div className="flex justify-center">
      <p className="rounded-md p-2 text-justify shadow-md">
        Originally from <b className="font-medium">Simara</b>, my journey began
        with <b className="font-medium">Java</b> as my first programming
        language, and I now specialize in{' '}
        <b className="font-medium">
          system design, backend development, machine learning
        </b>{' '}
        and{' '}
        <b className="font-medium">
          {' '}
          finance <Twemoji hexcode="1f4b8" size={'sm'} />
        </b>
        . I’m currently working on a{' '}
        <b className="font-medium">Real-time Stock Analytics Platform</b> and
        primarily use <b className="font-medium">JavaScript</b> and{' '}
        <b className="font-medium">TypeScript</b>. As a proud{' '}
        <b className="font-medium">pet owner</b> of a{' '}
        <Twemoji hexcode="1f436" size={'sm'} />, I also have a passion for DC
        and Marvel comics. Additionally, I enjoy sci-fi{' '}
        <Twemoji hexcode="1f3a5" size={'sm'} /> films and have a strong desire
        for travel <Twemoji hexcode="1f305" size={'sm'} /> and adventure. I am
        committed to continuous learning and personal growth{' '}
        <Twemoji hexcode="1f4aa" size={'sm'} />, with a strong work ethic and
        meticulous attention to detail.
      </p>
    </div>
  );
};

export default ShortDescription;
