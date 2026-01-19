import React from 'react';

export default function ValuesSkeleton() {
  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 animate-pulse">
      <div className="max-w-7xl mx-auto">
        {/* Heading Skeleton */}
        <div className="h-10 w-2/3 mb-8 sm:mb-12 lg:mb-16 bg-gray-200 dark:bg-gray-700 rounded" />
        {/* Values Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="values-card-bg rounded-2xl p-6 sm:p-8 flex flex-col items-start">
              <div className="w-14 h-14 sm:w-16 sm:h-16 mb-4 sm:mb-6 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
              <div className="h-6 w-2/3 mb-3 sm:mb-4 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 w-full mb-2 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
