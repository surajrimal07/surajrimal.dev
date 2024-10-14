'use client';

import { useEffect, useRef } from 'react';

import {
  type WalineInitOptions,
  type WalineInstance,
  init,
} from '@waline/client';
import '@waline/client/style';

export type WalineOptions = Omit<WalineInitOptions, 'el'>;

const WalineComment = (props: WalineOptions) => {
  const walineInstanceRef = useRef<WalineInstance | null>(null);
  const containerRef = useRef<HTMLDivElement>();

  useEffect(() => {
    walineInstanceRef.current = init({
      ...props,
      el: containerRef.current,
      dark: '.dark',
      emoji: ['https://unpkg.com/@waline/emojis@1.2.0/tw-emoji'],
      requiredMeta: ['nick'],
      pageview: false,
      reaction: false,
    });

    return () => walineInstanceRef.current?.destroy();
  }, [props]);

  useEffect(() => {
    walineInstanceRef.current?.update(props);
  }, [props]);

  // @ts-ignore
  return <div id="waline" ref={containerRef} />;
};

export default WalineComment;
