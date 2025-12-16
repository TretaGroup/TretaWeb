"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { ReactNode } from "react";
import { CONFIDENCE_EASE } from "@/src/lib/motion";

export default function GlassCard({ children }: { children: ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-50, 50], [6, -6]);
  const rotateY = useTransform(x, [-50, 50], [-6, 6]);

  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY }}
      transition={{ ease: CONFIDENCE_EASE, duration: 0.4 }}
      className="
        relative rounded-2xl
        bg-white/10 dark:bg-white/10 light:bg-black/5
        backdrop-blur-xl border border-white/20
        shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]
      "
    >
      {children}
    </motion.div>
  );
}
