'use client';

import React from 'react';

import Typed from 'typed.js';

import Twemoji from '@/components/Twemoji';

const TypedBios = () => {
  const el = React.useRef(null);
  const typed = React.useRef<Typed | null>(null);

  React.useEffect(() => {
    typed.current = new Typed(el.current, {
      stringsElement: '#bios',
      typeSpeed: 50,
      backSpeed: 25,
      loop: true,
      backDelay: 1000,
    });
    return () => {
      typed.current?.destroy();
    };
  }, []);

  return (
    <div>
      <ul id="bios" className="hidden">
        <li>
          I go by <b className="font-medium">Suraj</b> professionally.
        </li>
        <li>
          Currently based in <b className="font-medium">Kathmandu, Nepal</b>.
        </li>
        <li>
          Originating from the picturesque city of{' '}
          <b className="font-medium">Simara</b>.
        </li>
        <li>
          My first programming language was <b className="font-medium">Java</b>.
        </li>
        <li>
          I am passionate about <b className="font-medium">system design</b> and{' '}
          <b className="font-medium">backend design</b>.
        </li>
        <li>
          Currently, I’m developing a{' '}
          <b className="font-medium">Real-time Stock Analytics Platform</b>.
        </li>
        <li>
          I primarily work with <b className="font-medium">JavaScript</b> and{' '}
          <b className="font-medium">TypeScript</b>.
        </li>
        <li>
          A proud <b className="font-medium">pet owner</b>, I have a{' '}
          <Twemoji emoji="dog" />.
        </li>
        <li>
          I enjoy comics, especially <Twemoji emoji="the-flash" /> and{' '}
          <Twemoji emoji="superman" />.
        </li>
        <li>
          Music is my passion, and I love watching sci-fi{' '}
          <Twemoji emoji="movie-camera" /> films.
        </li>
        <li>
          I have a strong desire for travel <Twemoji emoji="sunrise" /> and
          adventure.
        </li>
      </ul>
      <span ref={el} className="text-neutral-900 dark:text-neutral-200" />
    </div>
  );
};

export default TypedBios;
