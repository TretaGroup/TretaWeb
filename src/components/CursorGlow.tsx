"use client";

import { motion, useMotionValue } from "framer-motion";
import { BRAND } from "@/src/lib/brand";

export default function CursorGlow() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-0"
      onMouseMove={(e) => {
        x.set(e.clientX - 200);
        y.set(e.clientY - 200);
      }}
    >
      <motion.div
        // style={{ x, y }}
        className="absolute h-100 w-100 rounded-full blur-[120px]"
        style={{
          background: `radial-gradient(circle, ${BRAND.glow.soft}, transparent 70%)`,
        }}
      />
    </motion.div>
  );
}
