import { RoughNotation } from 'react-rough-notation';

import { Twemoji } from '@/components/Twemoji';
import siteMetadata from '@/data/siteMetadata';

const Heading = () => {
  return (
    <h1 className="font-medium text-neutral-900 dark:text-neutral-200">
      I'm {siteMetadata.fullName},{' '}
      <span className="text-white">
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
      <span className="absolute z-[-1] inline-flex pt-[3px]">
        <Twemoji emoji="flag-nepal" />
      </span>
    </h1>
  );
};

export default Heading;
