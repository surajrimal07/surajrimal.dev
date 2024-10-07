import type { ReactElement } from 'react';

import { FileIcon } from 'lucide-react';

export const urlType = (url: string) => {
  if (['/'].includes(url[0])) {
    return 'internal';
  }

  if (['#'].includes(url[0])) {
    return 'hash';
  }

  if (url.indexOf('mailto') === 0) {
    return 'mail';
  }

  return 'external';
};

export const formatLang = (
  lang: string,
  title?: string
): {
  language: string;
  icon: ReactElement;
} => {
  let language = lang;
  let icon = <FileIcon />;

  switch (lang) {
    case 'js':
    case 'javascript':
      language = 'JavaScript';
      icon = <FileIcon />;
      break;
    case 'ts':
    case 'typescript':
      language = 'TypeScript';
      icon = <FileIcon />;
      break;
    case 'jsx':
      language = 'JavaScript React';
      icon = <FileIcon />;
      break;
    case 'tsx':
      language = 'TypeScript React';
      icon = <FileIcon />;
      break;
    case 'html':
      language = 'HTML';
      icon = <FileIcon />;
      break;
    case 'css':
      language = 'CSS';
      icon = <FileIcon />;
      break;
    case 'bash':
    case 'cmd':
      language = 'Terminal';
      break;
    case 'json':
      language = 'JSON';
      break;
    case '':
      language = 'Plain Text';
      break;
    default:
      break;
  }

  switch (title) {
    case 'tailwind.config.js':
      icon = <FileIcon />;
      break;
    case 'package.json':
      icon = <FileIcon />;
      break;
    case 'npm':
      icon = <FileIcon />;
      break;
    case 'pnpm':
      icon = <FileIcon />;
      break;
    case 'yarn':
      icon = <FileIcon />;
      break;
    default:
      break;
  }

  return { language, icon };
};
