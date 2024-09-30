import { Highlight } from '@/components/ui/hero-highlight';

const ShortDescription = () => {
  return (
    <div className="mb-4 mt-4">
      <p>
        I started learning to code in{' '}
        <Highlight className="text-black dark:text-white">2015</Highlight>
        when I was in 8th grade.
      </p>
      <p>
        I landed my first job as a{' '}
        <Highlight className="text-black dark:text-white">
          Back-end Developer in 2019.
        </Highlight>
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
