import React from 'react';

export default function NumbersSkeleton() {
  return (
    <section className="animate-pulse py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="h-10 w-2/3 bg-gray-300 rounded mb-6" />
        <div className="h-6 w-1/2 bg-gray-200 rounded mb-12" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="p-8 rounded-3xl shadow-xl bg-gray-100 flex flex-col items-center space-y-4">
              <div className="h-14 w-14 bg-gray-300 rounded-full mb-4" />
              <div className="h-8 w-1/2 bg-gray-300 rounded mb-2" />
              <div className="h-4 w-3/4 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
