import { Highlight } from '@/components/ui/hero-highlight';
import siteMetadata from '@/data/siteMetadata';

const Heading = () => {
  return (
    <h1 className="ml-2 font-medium text-neutral-900 dark:text-neutral-200">
      <span className="inline-block">I&apos;m</span> {siteMetadata.fullName},{' '}
      <Highlight className="text-black dark:text-white">
        backend developer
      </Highlight>{' '}
      from <span>Kathmandu, Nepal</span>
    </h1>
  );
};

export default Heading;
