import React from 'react';

export default function FooterSkeleton() {
  return (
    <footer className="footer-bg animate-pulse">
      {/* Top Section - Company Info and Links */}
      <div className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info Skeleton */}
            <div className="lg:col-span-1">
              <div className="h-8 w-2/3 mb-4 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
            {/* Main Pages Skeleton */}
            <div>
              <div className="h-6 w-1/2 mb-6 bg-gray-200 dark:bg-gray-700 rounded" />
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-4 w-2/3 mb-3 bg-gray-200 dark:bg-gray-700 rounded" />
              ))}
            </div>
            {/* Company Skeleton */}
            <div>
              <div className="h-6 w-1/2 mb-6 bg-gray-200 dark:bg-gray-700 rounded" />
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-4 w-2/3 mb-3 bg-gray-200 dark:bg-gray-700 rounded" />
              ))}
            </div>
            {/* Contact Details Skeleton */}
            <div>
              <div className="h-6 w-1/2 mb-6 bg-gray-200 dark:bg-gray-700 rounded" />
              {[...Array(3)].map((_, i) => (
                <div key={i} className="mb-4">
                  <div className="h-3 w-1/3 mb-1 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Copyright Bar Skeleton */}
      <div className="footer-copyright-bg px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4 text-xs sm:text-sm">
            <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        </div>
      </div>
    </footer>
  );
}
