import React, { useEffect } from 'react';

export const Notification = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div className={`fixed bottom-5 right-5 ${bgColor} text-white px-6 py-4 rounded-md shadow-md`}>
      <p>{message}</p>
    </div>
  );
};