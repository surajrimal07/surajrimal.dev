'use client';
import { useEffect } from 'react';

export default function Loader() {
  // const { theme } = useTheme();
  // //const color = theme === 'light' ? '#000000FF' : '#D4E7F7';

  useEffect(() => {
    async function getLoader() {
      const { lineWobble } = await import('ldrs');
      lineWobble.register();
    }
    getLoader();
  }, []);
  return <l-line-wobble size="80" stroke="5" bg-opacity="0.2" speed="1.75" color="#dc2626"></l-line-wobble>;
}
