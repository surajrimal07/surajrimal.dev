'use client';

import { usePathname } from 'next/navigation';
import type React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

const PathContext = createContext<string | null>(null);

export function PathProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [path, setPath] = useState(pathname);

  useEffect(() => {
    setPath(pathname);
  }, [pathname]);

  return <PathContext.Provider value={path}>{children}</PathContext.Provider>;
}

export function useCurrentPath() {
  const context = useContext(PathContext);
  if (context === null) {
    throw new Error('useCurrentPath must be used within a PathProvider');
  }
  return context;
}
