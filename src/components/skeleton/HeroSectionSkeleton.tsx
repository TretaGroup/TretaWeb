import React from 'react';

export default function HeroSectionSkeleton() {
  return (
    <section className="animate-pulse py-16 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center space-y-8">
        <div className="h-12 w-3/4 bg-gray-300 rounded mb-4" />
        <div className="h-8 w-1/2 bg-gray-200 rounded mb-8" />
        <div className="h-96 w-full bg-gray-200 rounded-3xl" />
      </div>
    </section>
  );
}
