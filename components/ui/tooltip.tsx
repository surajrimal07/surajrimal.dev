'use client';

import React, { useState } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      {/* biome-ignore lint/nursery/noStaticElementInteractions: <explanation> */}
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      {isVisible && (
        <div className="absolute z-10 mt-2 rounded-md bg-muted/90 px-2 py-1 text-sm font-thin text-white shadow-lg">
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
