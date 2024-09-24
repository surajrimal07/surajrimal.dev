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
      typeSpeed: 5,
      backSpeed: 10,
      loop: true,
      backDelay: 1000,
    });
    return () => {
      if (typed.current) {
        typed.current.destroy();
      }
    };
  }, []);

  return (
    <div>
      <ul id="bios" className="hidden">
        <li>
          I'm aliased as <b className="font-medium">Suraj</b> at work.
        </li>
        <li>
          I live in <b className="font-medium">Kathmandu, Nepal</b>.
        </li>
        <li>
          I was born in the beautiful city <b className="font-medium">Simara</b>
          .
        </li>
        <li>
          My first programming language I learned was{' '}
          <b className="font-medium">Java</b>.
        </li>
        <li>
          I love <b className="font-medium">system design </b> and{' '}
          <b className="font-medium"> backend development</b>.
        </li>
        <li>
          I'm focusing on building{' '}
          <b className="font-medium">Realtime Stock Analytics Platform </b>.
        </li>
        <li>
          I work mostly with{' '}
          <b className="font-medium">Javascript/Typescript</b> technologies.
        </li>
        <li>
          I'm a <b className="font-medium"> pet-person </b> and i own a{' '}
          <Twemoji emoji="dog" />.
        </li>
        <li>
          I'm a comics-guy. I love
          <span className="ml-1">
            <Twemoji emoji="the-flash" />
            ,and <Twemoji emoji="superman" />
          </span>
          .
        </li>
        <li>
          I love listening <Twemoji emoji="musical-notes" /> music and watching
          si-fi <Twemoji emoji="movie-camera" />.
        </li>
        <li>
          I love traveling <Twemoji emoji="sunrise" />, new places.
        </li>
      </ul>
      <span ref={el} className="text-neutral-900 dark:text-neutral-200" />
    </div>
  );
};

export default TypedBios;
