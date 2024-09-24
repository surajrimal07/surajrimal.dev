import React, { useState } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      {isVisible && (
        <div className="font-small absolute z-10 mt-2 rounded-md bg-gray-800 px-2 py-2 text-sm text-white shadow-lg">
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
