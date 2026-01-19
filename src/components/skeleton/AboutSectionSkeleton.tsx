import React from 'react';

export default function AboutSectionSkeleton() {
  return (
    <section className="animate-pulse py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="h-10 w-2/3 bg-gray-300 rounded mb-4" />
        <div className="h-6 w-1/2 bg-gray-200 rounded mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="h-40 bg-gray-200 rounded-2xl" />
          <div className="h-80 bg-gray-200 rounded-2xl" />
          <div className="h-40 bg-gray-200 rounded-2xl" />
        </div>
      </div>
    </section>
  );
}
