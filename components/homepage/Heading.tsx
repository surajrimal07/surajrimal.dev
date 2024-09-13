import siteMetadata from '@/data/siteMetadata';

import { Twemoji } from '@/components/Twemoji';

const Heading = () => {
  return (
    <h1 className="font-medium text-neutral-900 dark:text-neutral-200">
      I'm <span>{siteMetadata.fullName}</span> - a <span>Backend Developer</span> from <span>Kathmandu, Nepal </span>
      <span className="absolute ml-1.5 inline-flex pt-[3px]">
        <Twemoji emoji="flag-nepal" />
      </span>
    </h1>
  );
};

export default Heading;
