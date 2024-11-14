import React from 'react';

export const ProgressBar = ({ progress }) => {
  const getColor = () => {
    if (progress <= 25) return 'bg-red-500';
    if (progress <= 50) return 'bg-yellow-500';
    if (progress <= 75) return 'bg-blue-500';
    return 'bg-green-500';
  };

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
      <div
        className={`h-2.5 rounded-full transition-all duration-500 ease-in-out ${getColor()}`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};