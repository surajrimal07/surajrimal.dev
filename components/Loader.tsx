'use client';

import { useEffect } from 'react';

export default function Loader() {
  useEffect(() => {
    async function getLoader() {
      const { lineWobble } = await import('ldrs');
      lineWobble.register();
    }
    getLoader();
  }, []);
  return (
    <l-line-wobble
      bg-opacity="0.2"
      color="#dc2626"
      size="80"
      speed="1.75"
      stroke="5"
    />
  );
}
