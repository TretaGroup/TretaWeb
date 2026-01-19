import React from 'react';

export default function BusinessCardSkeleton() {
  return (
    <div className="animate-pulse p-6 rounded-2xl shadow-xl bg-gray-100 w-full max-w-sm mx-auto">
      <div className="h-24 w-24 bg-gray-300 rounded-full mx-auto mb-4" />
      <div className="h-6 w-2/3 bg-gray-300 rounded mx-auto mb-2" />
      <div className="h-4 w-1/2 bg-gray-200 rounded mx-auto mb-4" />
      <div className="h-8 w-3/4 bg-gray-200 rounded mx-auto" />
    </div>
  );
}
