import { Twemoji } from '@/components/Twemoji';
import { Highlight } from '@/components/ui/hero-highlight';
import siteMetadata from '@/data/siteMetadata';

import Link from '../Link';

const Heading = () => {
  return (
    <h1 className="font-medium text-neutral-900 dark:text-neutral-200">
      <span className="inline-block">I'm</span>{' '}
      <Link href={'/about'} className="special-underline-new mx-1">
        {siteMetadata.fullName}
      </Link>
      ,{' '}
      <Highlight className="text-black dark:text-white">
        backend developer
      </Highlight>{' '}
      from <span>Kathmandu, Nepal</span>
      <span className="absolute z-[-1] inline-flex pt-[3px]">
        <Twemoji emoji="flag-nepal" />
      </span>
    </h1>
  );
};

export default Heading;
