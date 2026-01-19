import React from 'react';

export default function ServicesSectionSkeleton() {
  return (
    <section className="animate-pulse py-12 lg:py-20 px-6">
      <div className="max-w-7xl mx-auto mb-12 lg:mb-16">
        <div className="h-12 w-2/3 bg-gray-300 rounded mb-6" />
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded-xl mb-2" />
          ))}
        </div>
        <div className="h-96 bg-gray-200 rounded-3xl" />
      </div>
    </section>
  );
}
