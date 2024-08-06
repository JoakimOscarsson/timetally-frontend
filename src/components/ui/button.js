import React from 'react';

export const Button = ({ children, className, ...props }) => (
  <button
    className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 ${className}`}
    {...props}
  >
    {children}
  </button>
);
