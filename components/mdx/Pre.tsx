'use client';

import { ReactNode, useRef, useState } from 'react';

import { Copy, CopyCheck } from 'lucide-react';
import toast from 'react-hot-toast';

import { toastOptions } from '@/utils/toast';

interface PreProps {
  children: ReactNode;
}

const Pre = ({ children }: PreProps) => {
  const textInput = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const onExit = () => {
    setCopied(false);
  };
  const onCopy = () => {
    setCopied(true);
    notify();
    if (textInput.current) {
      const textContent = textInput.current.textContent || '';
      navigator.clipboard.writeText(textContent);
    }
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const notify = () =>
    toast.success('Copied', {
      ...toastOptions,
    });

  return (
    <div
      ref={textInput}
      onMouseLeave={onExit}
      className="relative rounded-lg bg-black"
    >
      <button
        aria-label="Copy code"
        type="button"
        className={`absolute right-0 top-[2px] z-10 h-8 w-8 rounded bg-transparent ring-0 ${
          copied
            ? 'border-green-400 focus:border-green-400 focus:outline-none'
            : 'border-gray-300'
        }`}
        onClick={onCopy}
      >
        {copied ? (
          <CopyCheck
            size={20}
            className={copied ? 'text-green-400' : 'text-white'}
          />
        ) : (
          <Copy
            size={20}
            className={copied ? 'text-green-400' : 'text-white'}
          />
        )}
      </button>

      <pre className="rounded-lg font-mono text-base font-normal shadow-2xl">
        <div className="macOSdots absolute z-10 -mx-2 flex gap-2 md:mx-0">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-[#f5bf4f]" />
          <div className="h-3 w-3 rounded-full bg-emerald-400" />
        </div>
        <pre className="-mx-7 -my-3 mt-5 rounded-lg font-mono text-base font-normal shadow-2xl md:-mx-5">
          {children}
        </pre>
      </pre>
    </div>
  );
};

export default Pre;
