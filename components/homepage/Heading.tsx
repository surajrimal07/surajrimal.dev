import siteMetadata from '@/data/siteMetadata';

import { Twemoji } from '@/components/Twemoji';
import { RoughNotation } from 'react-rough-notation';

const Heading = () => {
  return (
    <h1 className="font-medium text-neutral-900 dark:text-neutral-200">
      I'm{' '}
      <span>
        {siteMetadata.fullName},
        <RoughNotation
          animate={true}
          type="highlight"
          show={true}
          color="#AB2C2CFF"
          animationDelay={1000}
          animationDuration={2500}
          padding={1}
        >
          backend developer
        </RoughNotation>
      </span>{' '}
      from <span>Kathmandu, Nepal </span>
      <span className="absolute inline-flex pt-[3px] z-[-1]">
        <Twemoji emoji="flag-nepal" />
      </span>
    </h1>
  );
};

export default Heading;
