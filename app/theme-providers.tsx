'use client';

import { ThemeProvider } from 'next-themes';

export function ThemeProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      defaultTheme="dark"
      themes={['light', 'dark', 'system']}
      attribute="class"
    >
      {children}
    </ThemeProvider>
  );
}
