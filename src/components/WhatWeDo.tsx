"use client";

import { motion, Variants, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { WhatWeDoProps } from "@/src/types/pages";
import SectionHeader from "./ui/SectionHeader";

/* =========================
   COLOR SYSTEM (UNCHANGED)
   ========================= */

const ACCENT_BORDERS = [
  "from-indigo-500/40",
  "from-emerald-500/40",
  "from-rose-500/40",
  "from-amber-500/40",
  "from-cyan-500/40",
  "from-violet-500/40",
];

const ACCENT_BORDERS_MAIN = [
  "from-indigo-500 to-indigo-400",
  "from-emerald-500 to-emerald-400",
  "from-rose-500 to-rose-400",
  "from-amber-500 to-amber-400",
  "from-cyan-500 to-cyan-400",
  "from-violet-500 to-violet-400",
];

const ICON_COLORS = [
  "text-indigo-500",
  "text-emerald-500",
  "text-rose-500",
  "text-amber-500",
  "text-cyan-500",
  "text-violet-500",
];

/* =========================
   HELPERS
   ========================= */

const slugify = (value: string) =>
  value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-");

/* =========================
   COMPONENT
   ========================= */

export default function WhatWeDo({ header, items }: WhatWeDoProps) {
  const router = useRouter();
  const reduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: reduceMotion ? {} : { staggerChildren: 0.08 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: "easeOut" },
    },
  };

  return (
    <section id="what-we-do" className="py-28 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-6">

        {/* ================= HEADER ================= */}
        <motion.div className="text-center mb-20">
          <SectionHeader title={header.title} eyebrow={header.eyebrow} description={header.description} align="center" />
        </motion.div>

        {/* ================= CARDS ================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {items.map((item, index) => (
            <motion.button
              key={item.title}
              variants={cardVariants}
              whileHover={reduceMotion ? {} : { y: -6 }}
              onClick={() => router.push(`/services/${slugify(item.title)}`)}
              className="
                group relative text-left rounded-2xl overflow-hidden cursor-pointer
                border border-[var(--glass-border-cards)]
                bg-[var(--glass-bg-cards)]
                backdrop-blur-xl
                shadow-sm hover:shadow-2xl
                transition-all duration-300 flex flex-col items-start justify-start
              "
            >

              {/* ================= IMAGE ================= */}
              {item.image && (
                <div className="relative min-h-40 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                </div>
              )}

              {/* ================= CONTENT ================= */}
              <div className="p-8">

                {/* Title */}
                <h3 className="text-xl font-semibold text-[var(--text-color-2)] mb-4">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-[var(--text-color)]">
                  {item.description}
                </p>
              </div>

              {/* Bottom accent */}
              <span
                className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${ACCENT_BORDERS_MAIN[index % ACCENT_BORDERS_MAIN.length]} scale-x-0 group-hover:scale-x-100 transition-transform origin-left`}
              />
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
