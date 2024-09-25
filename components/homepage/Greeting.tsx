import clsx from 'clsx';
import { RoughNotation } from 'react-rough-notation';

const Greeting = () => {
  const textClassName = clsx(
    'bg-gradient-to-l from-gray-500 to-rose-600 ',
    'mb-0 mt-0 bg-clip-text text-4xl font-extrabold leading-[60px] tracking-tight text-transparent md:text-6xl md:leading-[78px]'
  );

  return (
    <div className={textClassName}>
      Hey, there!{' '}
      <span className="font-bold">
        Discover about me and my {}
        <RoughNotation
          animate={true}
          type="circle"
          show={true}
          color="#FDE68A"
          animationDelay={1000}
          animationDuration={2500}
          padding={5}
        >
          creative ideas.
        </RoughNotation>
      </span>
    </div>
  );
};

export default Greeting;
