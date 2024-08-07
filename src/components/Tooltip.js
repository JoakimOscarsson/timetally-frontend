import React, { useState, useRef, useEffect } from 'react';

const Tooltip = ({ children, content }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const tooltipRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (isVisible && tooltipRef.current && containerRef.current) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;

      let left = 0;
      const top = containerRect.height;

      // Check if tooltip would overflow the right edge of the screen
      if (containerRect.left + tooltipRect.width > viewportWidth) {
        // Align the right edge of the tooltip with the right edge of the container
        left = containerRect.width - tooltipRect.width;
      }

      setPosition({ left, top });
    }
  }, [isVisible]);

  return (
    <div className="relative inline-block" ref={containerRef}>
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      {isVisible && (
        <div
          ref={tooltipRef}
          className="absolute z-10 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm tooltip dark:bg-gray-700 whitespace-nowrap"
          style={{
            left: `${position.left}px`,
            top: `${position.top}px`,
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
