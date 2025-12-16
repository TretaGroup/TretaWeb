"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const calc = (date?: string): TimeLeft => {
  if (!date) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const target = new Date(date).getTime();
  const now = Date.now();
  const diff = Math.max(target - now, 0);

  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

export default function Countdown({ targetDate }: { targetDate?: string }) {
  const [time, setTime] = useState<TimeLeft>(() => calc(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calc(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <section className="relative z-10 flex justify-center px-4 py-16 sm:py-20 lg:py-24">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        {Object.entries(time).map(([key, value]) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-4 sm:p-6 text-center min-w-17.5"
          >
            <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
              {value}
            </div>
            <div className="mt-1 sm:mt-2 text-[10px] sm:text-xs uppercase tracking-widest text-neutral-400">
              {key}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
