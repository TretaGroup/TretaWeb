import React from 'react';

export default function CTASkeleton() {
  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 animate-pulse">
      <div className="max-w-7xl mx-auto">
        {/* Heading Skeleton */}
        <div className="h-10 w-2/3 mx-auto mb-8 sm:mb-12 lg:mb-16 bg-gray-200 dark:bg-gray-700 rounded" />
        {/* Content Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* Left - Image Skeleton */}
          <div>
            <div className="relative rounded-3xl overflow-hidden h-75 sm:h-100 lg:h-full min-h-125 bg-gray-200 dark:bg-gray-800" />
          </div>
          {/* Right - Box Skeleton */}
          <div>
            <div className="rounded-3xl p-8 sm:p-10 lg:p-12 h-full flex flex-col justify-between bg-gray-100 dark:bg-gray-900">
              <div className="mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-200 dark:bg-gray-700 rounded-full" />
              </div>
              <div className="h-8 w-2/3 mb-4 sm:mb-6 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 w-full mb-6 sm:mb-8 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="space-y-4 sm:space-y-5 mb-8 sm:mb-10">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex justify-between items-center pb-4 sm:pb-5">
                    <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="h-4 w-1/4 bg-gray-200 dark:bg-gray-700 rounded" />
                  </div>
                ))}
              </div>
              <div className="h-12 w-40 bg-gray-200 dark:bg-gray-700 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
