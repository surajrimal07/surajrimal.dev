import Twemoji from '../Twemoji';

const ShortDescription = () => {
  return (
    <div className="flex justify-center">
      <p className="rounded-md p-2 text-justify shadow-md">
        Originally from <b className="font-medium">Simara</b>, my journey began
        with <b className="font-medium">Java</b> as my first programming
        language, and I now specialize in{' '}
        <b className="font-medium">system design</b> and{' '}
        <b className="font-medium">backend development</b>. I’m currently
        working on a{' '}
        <b className="font-medium">Real-time Stock Analytics Platform</b> and
        primarily use <b className="font-medium">JavaScript</b> and{' '}
        <b className="font-medium">TypeScript</b>. As a proud{' '}
        <b className="font-medium">pet owner</b> of a <Twemoji emoji="dog" />, I
        also have a passion for comics like <Twemoji emoji="the-flash" /> and{' '}
        <Twemoji emoji="superman" />. Additionally, I enjoy sci-fi{' '}
        <Twemoji emoji="movie-camera" /> films and have a strong desire for
        travel <Twemoji emoji="sunrise" /> and adventure. I am committed to
        continuous learning and personal growth{' '}
        <Twemoji emoji="flexed-biceps" />, with a strong work ethic and
        meticulous attention to detail.
      </p>
    </div>
  );
};

export default ShortDescription;
