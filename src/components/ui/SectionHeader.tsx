"use client";

import { motion, useReducedMotion } from "framer-motion";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeaderProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`max-w-4xl ${
        align === "center" ? "mx-auto text-center" : ""
      }`}
    >
      {eyebrow && (
        <span className="block text-sm uppercase tracking-wide text-[var(--accent-primary)]">
          {eyebrow}
        </span>
      )}

      <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-semibold text-[var(--text-color-2)] leading-tight">
        {title}
      </h2>

      {description && (
        <p className="mt-6 text-base md:text-lg text-[var(--text-color)] leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
