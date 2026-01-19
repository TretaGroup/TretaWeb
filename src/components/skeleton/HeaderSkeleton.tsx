'use client';

import { motion, useReducedMotion } from 'framer-motion';

export default function HeaderSkeleton() {
  const reduceMotion = useReducedMotion();

  const shimmer = {
    initial: { backgroundPosition: '200% 0' },
    animate: { backgroundPosition: '-200% 0' },
  };

  const base =
    'relative overflow-hidden rounded-md bg-gray-300/40 dark:bg-gray-700/40';

  const shimmerBg =
    'bg-[linear-gradient(110deg,transparent,rgba(255,255,255,.4),transparent)] bg-[length:200%_100%]';

  return (
    <>
      {/* HEADER SKELETON */}
      <header className="fixed top-4 left-2 right-2 sm:left-4 sm:right-4 z-50 max-w-7xl mx-auto">
        <div className="rounded-3xl px-6 py-4 backdrop-blur-xl bg-white/10">
          <div className="flex justify-between items-center">
            <motion.div
              className={`${base} h-8 w-28 ${!reduceMotion && shimmerBg}`}
              {...(!reduceMotion && shimmer)}
              animate={!reduceMotion ? 'animate' : undefined}
              transition={{ repeat: Infinity, duration: 1.4 }}
            />

            <div className="hidden lg:flex gap-6">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className={`${base} h-5 w-20 ${!reduceMotion && shimmerBg}`}
                  {...(!reduceMotion && shimmer)}
                  animate={!reduceMotion ? 'animate' : undefined}
                  transition={{ repeat: Infinity, duration: 1.4 }}
                />
              ))}
            </div>

            <motion.div
              className={`${base} h-9 w-9 rounded-full ${!reduceMotion && shimmerBg}`}
              {...(!reduceMotion && shimmer)}
              animate={!reduceMotion ? 'animate' : undefined}
              transition={{ repeat: Infinity, duration: 1.4 }}
            />
          </div>
        </div>
      </header>

      {/* MOBILE BOTTOM SHEET SKELETON */}
      <div className="fixed inset-x-0 bottom-0 z-40">
        <div className="bg-background/90 backdrop-blur-2xl rounded-t-[28px]
          max-h-[88dvh] shadow-[0_-20px_60px_rgba(0,0,0,.25)] p-6">

          <div className="mx-auto mb-6 h-1.5 w-12 rounded-full bg-gray-400/40" />

          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className={`${base} h-6 w-full mb-4 ${!reduceMotion && shimmerBg}`}
              {...(!reduceMotion && shimmer)}
              animate={!reduceMotion ? 'animate' : undefined}
              transition={{ repeat: Infinity, duration: 1.4 }}
            />
          ))}

          <motion.div
            className={`${base} h-12 w-full rounded-full mt-8 ${!reduceMotion && shimmerBg}`}
            {...(!reduceMotion && shimmer)}
            animate={!reduceMotion ? 'animate' : undefined}
            transition={{ repeat: Infinity, duration: 1.4 }}
          />
        </div>
      </div>
    </>
  );
}
