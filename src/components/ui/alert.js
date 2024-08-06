import React from 'react';

export const Alert = ({ children, variant = 'info', className, ...props }) => {
  const variantClasses = {
    info: 'bg-blue-100 border-blue-500 text-blue-700',
    success: 'bg-green-100 border-green-500 text-green-700',
    warning: 'bg-yellow-100 border-yellow-500 text-yellow-700',
    destructive: 'bg-red-100 border-red-500 text-red-700',
  };

  return (
    <div
      className={`border-l-4 p-4 ${variantClasses[variant]} ${className}`}
      role="alert"
      {...props}
    >
      {children}
    </div>
  );
};

export const AlertDescription = ({ children, className, ...props }) => (
  <p className={`text-sm ${className}`} {...props}>
    {children}
  </p>
);
