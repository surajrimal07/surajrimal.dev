'use client';

import { ThemeProvider } from 'next-themes';

import siteMetadata from '@/data/siteMetadata';

export function ThemeProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      enableSystem
      attribute="class"
      defaultTheme={siteMetadata.theme}
    >
      {children}
    </ThemeProvider>
  );
}
