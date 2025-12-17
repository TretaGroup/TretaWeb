"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/src/lib/motion";
import ThemeToggle from "@/src/components/ui/ThemeToggle";

interface HeroSectionProps {
  title: string;
  subtitle: string;
}

export default function HeroSection({
  title,
  subtitle,
}: HeroSectionProps) {
  return (
    <section className="bg-linear-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <div className="mx-auto max-w-7xl px-6 py-28 text-center">

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-4xl font-semibold tracking-tight sm:text-5xl"
        >
          {title}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400"
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
}
