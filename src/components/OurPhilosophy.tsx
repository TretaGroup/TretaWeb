"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Compass,
  Sparkles,
  Users,
  Target,
  ShieldCheck,
  Network,
} from "lucide-react";
import { siteContent } from "@/public/data/siteContent";

/* =========================
   TYPES
   ========================= */

type PhilosophyItem = {
  title: string;
  description: string;
};

/* =========================
   ICONS
   ========================= */

const ICONS = [
  Compass,
  Sparkles,
  Users,
  Target,
  ShieldCheck,
  Network,
];

/* =========================
   ANIMATION VARIANTS
   ========================= */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

/* =========================
   COMPONENT
   ========================= */

export default function OurPhilosophy() {
  const { items } = siteContent.philosophy as { items: PhilosophyItem[] };
  const [active, setActive] = useState<number | null>(null);

  /* Scroll lock for modal */
  useEffect(() => {
    document.body.style.overflow = active !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  /* ESC close */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <section id="our-philosophy" className="bg-[var(--background)] py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* ================= MOBILE HEADING ================= */}
        <motion.div
          className="lg:hidden mb-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-2xl font-semibold text-[var(--text-color-2)]">
            Our Philosophy
          </h2>
          <p className="mt-3 text-[var(--text-color)] text-sm leading-relaxed">
            The principles that guide how we think, advise and partner
            with our clients.
          </p>
        </motion.div>

        {/* ================= DESKTOP: EXECUTIVE TIMELINE ================= */}
        <div className="hidden lg:grid grid-cols-12 gap-12">

          {/* Narrative */}
          <motion.div
            className="col-span-4"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-3xl font-semibold text-[var(--text-color-2)]">
              Our Philosophy
            </h2>

            <p className="mt-4 text-[var(--text-color)] leading-relaxed">
              Our values guide how we think, advise and partner with clients —
              shaping decisions across transactions, governance and long-term
              value creation.
            </p>

            <p className="mt-6 text-sm text-neutral-500">
              These principles are embedded in how we work every day.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="col-span-8 relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-[var(--foreground)]" />

            <div className="space-y-10">
              {items.map((item, index) => {
                const Icon = ICONS[index % ICONS.length];

                return (
                  <motion.div
                    key={item.title}
                    className="relative pl-16 group"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.06,
                      ease: "easeOut",
                    }}
                  >
                    {/* Node */}
                    <div
                      className="
                        absolute left-0 top-1
                        h-12 w-12 rounded-full
                        border border-neutral-700
                        flex items-center justify-center
                        bg-[var(--foreground)]
                        text-[var(--foreground-text)]
                        group-hover:border-neutral-400
                        transition
                      "
                    >
                      <Icon className="h-5 w-5 opacity-80" />
                    </div>

                    <span className="text-xs text-neutral-500">
                      Principle {String(index + 1).padStart(2, "0")}
                    </span>

                    <h3 className="mt-1 text-lg font-medium text-[var(--text-color-2)]">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm  text-[var(--text-color)] leading-relaxed max-w-xl">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ================= TABLET: STEPPED ORBIT ================= */}
        <div className="hidden md:block lg:hidden mt-20">
          <div className="relative h-115 flex items-center justify-center">

            {/* Center */}
            <motion.div
              className="absolute h-40 w-40 rounded-full border border-neutral-700 flex items-center justify-center  text-[var(--text-color-2)] font-medium"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Our Philosophy
            </motion.div>

            {items.map((item, index) => {
              const Icon = ICONS[index % ICONS.length];
              const stepY = (index - items.length / 2) * 70;

              return (
                <motion.button
                  key={item.title}
                  onClick={() => setActive(index)}
                  className="
                    absolute left-1/2
                    -translate-x-1/2
                    flex items-center gap-4
                    border border-neutral-700
                    rounded-full px-4 py-3
                    bg-[var(--foreground)]
                        text-[var(--foreground-text)]
                    hover:border-neutral-400
                    transition
                  "
                  style={{
                    transform: `translate(-50%, ${stepY}px)`,
                  }}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.05,
                  }}
                >
                  <Icon className="h-4 w-4 opacity-80" />
                  <span className="text-sm">{item.title}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* ================= MOBILE LIST ================= */}
        <div className="md:hidden space-y-4">
          {items.map((item, index) => {
            const Icon = ICONS[index % ICONS.length];
            return (
              <motion.button
                key={item.title}
                onClick={() => setActive(index)}
                className="
                  w-full p-4 rounded-xl
                  flex items-center gap-4
                  border border-neutral-700
                  text-[var(--text-color-2)] text-left
                "
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                }}
              >
                <Icon className="h-5 w-5 opacity-80" />
                <span className="font-medium text-[var(--text-color-2)]">{item.title}</span>
              </motion.button>
            );
          })}
        </div>

        {/* ================= MODAL ================= */}
        <AnimatePresence>
          {active !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--background)]/60"
              onClick={() => setActive(null)}
            >
              <motion.div
                initial={{ y: 32, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 32, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-xl w-full mx-6 rounded-3xl p-8 bg-[var(--background)]  border border-neutral-700 text-[var(--text-color-2)]"
              >
                <h3 className="text-2xl font-semibold">
                  {items[active].title}
                </h3>

                <p className="mt-4 text-[var(--text-color)] leading-relaxed">
                  {items[active].description}
                </p>

                <button
                  className="mt-6 text-sm underline opacity-60"
                  onClick={() => setActive(null)}
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
