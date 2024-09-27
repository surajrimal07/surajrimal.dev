import { Twemoji } from '@/components/Twemoji';
import { Highlight } from '@/components/ui/hero-highlight';
import siteMetadata from '@/data/siteMetadata';

const Heading = () => {
  return (
    <h1 className="font-medium text-neutral-900 dark:text-neutral-200">
      I'm {siteMetadata.fullName},{' '}
      <Highlight className="text-black dark:text-white">
        backend developer
      </Highlight>
      from <span>Kathmandu, Nepal </span>
      <span className="absolute z-[-1] inline-flex pt-[3px]">
        <Twemoji emoji="flag-nepal" />
      </span>
    </h1>
  );
};

export default Heading;
