import React from 'react';

export const ErrorSummary = ({ errors }) => {
  if (Object.keys(errors).length === 0) return null;
  
  
  const data= Object.entries(errors).filter(([field, error])=>
    (error!=null)
);

if(data.length===0)
  return null;
  else
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
      <strong className="font-bold">Please fix the following errors:</strong>
      <ul className="mt-2 list-disc list-inside">
        {Object.entries(errors).map(([field, error]) => (
          <li key={field}>{error}</li>
        ))}
      </ul>
    </div>
  );
};