import { RoughNotation } from 'react-rough-notation';

const ShortDescription = () => {
  return (
    <div className="mb-4 mt-4">
      <p>
        I started learning to code in{' '}
        <RoughNotation
          animate={true}
          type="highlight"
          show={true}
          color="#AB2C2CFF"
          animationDelay={1000}
          animationDuration={2500}
          padding={5}
        >
          2015
        </RoughNotation>{' '}
        when I was in 8th grade.
      </p>
      <p>
        I landed my first job as a{' '}
        <RoughNotation
          animate={true}
          type="highlight"
          show={true}
          color="#AB2C2CFF"
          animationDelay={1000}
          animationDuration={2500}
          padding={5}
        >
          Back-end Developer in 2019.
        </RoughNotation>{' '}
      </p>
      <p>I have a passion for system design and backend development.</p>
      <p>I started this blog to practice my skill and share my knowledge.</p>
      <p>I landed my first job as a Back-end Developer in 2019.</p>
      <p>I have a passion for system design and backend development.</p>
      <p>I started this blog to practice my skill and share my knowledge.</p>
    </div>
  );
};

export default ShortDescription;
