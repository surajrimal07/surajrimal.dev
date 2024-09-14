import clsx from 'clsx';

const Greeting = () => {
  const textClassName = clsx(
    'bg-gradient-to-l from-red-600 to-primary',
    'mb-8 bg-clip-text text-3xl font-extrabold leading-[60px] tracking-tight text-transparent md:text-7xl md:leading-[80px]'
  );
  return (
    <div className={textClassName}>
      Hey, there! <span className="font-bold">Discover about me and my creative ideas.</span>
    </div>
  );
};

export default Greeting;
