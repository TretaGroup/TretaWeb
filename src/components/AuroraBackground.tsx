"use client";

import { motion } from "framer-motion";

export default function AuroraBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Base */}
      <div className="absolute inset-0 bg-black" />

      {/* Aurora Glow 1 */}
      <motion.div
        className="
          absolute -top-1/2 left-1/2 h-225 w-225
          -translate-x-1/2 rounded-full
          bg-linear-to-tr from-[#e7652f]/35 via-[#fcc408]/25 to-transparent
          blur-[140px]
        "
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      />

      {/* Aurora Glow 2 */}
      <motion.div
        className="
          absolute top-1/3 left-1/4 h-175 w-175
          rounded-full
          bg-linear-to-tr from-[#fcc408]/25 via-[#e7652f]/25 to-transparent
          blur-[140px]
        "
        animate={{ rotate: -360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      />

      {/* Noise overlay (THIS MAKES IT LOOK EXPENSIVE) */}
      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.035]" />
    </div>
  );
}
