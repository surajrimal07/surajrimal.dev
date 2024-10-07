'use client';

import dynamic from 'next/dynamic';
import React from 'react';

import { Check, Copy } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Icons = {
  ts: dynamic(() =>
    import('react-icons/tb').then((mod) => mod.TbBrandTypescript)
  ),
  js: dynamic(() =>
    import('react-icons/ri').then((mod) => mod.RiJavascriptLine)
  ),
  javascript: dynamic(() =>
    import('react-icons/ri').then((mod) => mod.RiJavascriptLine)
  ),
  terminal: dynamic(() =>
    import('react-icons/io5').then((mod) => mod.IoTerminalOutline)
  ),
  md: dynamic(() => import('react-icons/bs').then((mod) => mod.BsMarkdown)),
  css: dynamic(() =>
    import('react-icons/pi').then((mod) => mod.PiFileCssDuotone)
  ),
  yaml: dynamic(() => import('react-icons/si').then((mod) => mod.SiYaml)),
  code: dynamic(() => import('react-icons/lu').then((mod) => mod.LuCode2)),
};

interface PreProps {
  children: React.ReactNode;
}

const Pre = ({ children }: PreProps) => {
  const [copied, setCopied] = React.useState(false);
  const preRef = React.useRef<HTMLPreElement>(null);

  const className = React.isValidElement(children)
    ? children.props?.className || ''
    : '';

  console.log('className', className);

  const colonIndex = className.indexOf(':');
  const fileName =
    colonIndex !== -1 ? className.slice(colonIndex + 1).trim() : '';

  let language = 'code';
  if (fileName) {
    const ext = fileName.split('.').pop();
    if (ext) language = ext;
  } else {
    const langMatch = className.match(/language-([\w-]+)/);
    if (langMatch) language = langMatch[1];
  }
  const Icon = Icons[language as keyof typeof Icons] || Icons.code;

  const onCopy = async () => {
    const text = preRef.current?.textContent;
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error(`Failed to copy text: ${err}`);
    }
  };

  return (
    <div className="not-prose">
      <div className="flex h-9 items-center justify-between rounded-t-md border border-gray-600 bg-black px-4">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-zinc-400" />
          {fileName && (
            <span className="text-xs text-zinc-400">{fileName}</span>
          )}
        </div>
        <button
          onClick={onCopy}
          className="flex items-center gap-1 text-xs text-zinc-400 transition-colors hover:text-zinc-100"
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>

      <div className="relative">
        <pre
          ref={preRef}
          className={`overflow-x-auto rounded-b-md border border-gray-600 bg-neutral-950 p-4 ${
            fileName ? 'rounded-t-none border-t-0' : 'rounded-md'
          }`}
        >
          {children}
        </pre>
      </div>
    </div>
  );
};

export default Pre;
