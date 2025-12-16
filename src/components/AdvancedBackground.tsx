"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { CONFIDENCE_EASE } from "@/src/lib/motion";

export default function AdvancedBackground() {
    const { scrollYProgress } = useScroll();

    // Scroll-driven transforms
    const glowY = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const glowRotate = useTransform(scrollYProgress, [0, 1], [0, 30]);
    const gridY = useTransform(scrollYProgress, [0, 1], [0, 120]);

    return (
        <div className="absolute inset-0 -z-10 overflow-hidden">
            {/* Base */}
            <div className="absolute inset-0 bg-black dark:bg-black light:bg-white transition-colors" />

            {/* Aurora */}
            <motion.div
                style={{ y: glowY, rotate: glowRotate }}
                transition={{ ease: CONFIDENCE_EASE }}
                className="
          absolute -top-1/2 left-1/2 h-225 w-225
          -translate-x-1/2 rounded-full
          bg-linear-to-tr from-[#e7652f]/35 via-[#fcc408]/25 to-transparent
          blur-[140px]
        "
            />

            <motion.div
                style={{ y: glowY }}
                className="
          absolute top-1/3 left-1/4 h-175 w-175
          rounded-full
          bg-linear-to-tr from-[#fcc408]/25 via-[#e7652f]/25 to-transparent
          blur-[140px]
        "
            />

            {/* Subtle Grid */}
            <motion.div
                style={{ y: gridY }}
                className="
          absolute inset-0
          bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),
              linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)]
          bg-size-[60px_60px]
          opacity-[0.25]
        "
            />

            {/* Noise */}
            <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.035]" />
            <div className="
                absolute inset-0
                pointer-events-none
                bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(0,0,0,0.7))]
                " />

        </div>
    );
}
