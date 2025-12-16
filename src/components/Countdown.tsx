"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import GlassCard from "./GlassCard";

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
          <GlassCard key={key}>
            <div className="p-6 text-center">
              <div className="text-4xl font-semibold">{value}</div>
              <div className="mt-2 text-xs uppercase tracking-widest text-neutral-400">
                {key}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
