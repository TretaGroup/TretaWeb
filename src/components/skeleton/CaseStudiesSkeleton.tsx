import React from 'react';

export default function CaseStudiesSkeleton() {
  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 animate-pulse">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="h-10 w-2/3 mb-8 sm:mb-12 lg:mb-16 bg-gray-200 dark:bg-gray-700 rounded" />
        {/* Cards Skeleton */}
        <div className="flex gap-4 sm:gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
              <div className="relative rounded-3xl overflow-hidden h-100 sm:h-112.5 lg:h-125 bg-gray-200 dark:bg-gray-800 shadow-md">
                <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700" />
                <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-8 rounded-3xl m-5 bg-white/95 dark:bg-[#33333399] backdrop-blur-md flex flex-col justify-start z-2">
                  <div className="h-6 w-2/3 mb-3 bg-gray-300 dark:bg-gray-700 rounded" />
                  <div className="h-4 w-full mb-2 bg-gray-300 dark:bg-gray-700 rounded" />
                  <div className="h-4 w-5/6 bg-gray-300 dark:bg-gray-700 rounded" />
                  <div className="h-10 w-32 mt-4 bg-gray-300 dark:bg-gray-700 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Dots Skeleton */}
        <div className="flex justify-center items-center gap-2 mt-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-2 w-8 bg-gray-300 dark:bg-gray-700 rounded-full" />
          ))}
        </div>
      </div>
    </section>
  );
}
