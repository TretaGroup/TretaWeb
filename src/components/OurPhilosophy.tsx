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
import { OurPhilosophyProps } from "@/src/types/pages";
import SectionHeader from "./ui/SectionHeader";

/* =========================
   ICONS + COLORS (UNCHANGED)
   ========================= */

const ICONS = [
  Compass,
  Sparkles,
  Users,
  Target,
  ShieldCheck,
  Network,
];

const ICON_COLORS = [
  "text-orange-500",
  "text-emerald-500",
  "text-rose-500",
  "text-amber-500",
  "text-cyan-500",
  "text-violet-500",
];

const ACCENT_BORDERS = [
  "from-orange-500/40",
  "from-emerald-500/40",
  "from-rose-500/40",
  "from-amber-500/40",
  "from-cyan-500/40",
  "from-violet-500/40",
];

/* =========================
   ANIMATION (UNCHANGED)
   ========================= */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function OurPhilosophy({ header, items }: OurPhilosophyProps) {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    document.body.style.overflow = active !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

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
        >
          <SectionHeader
            title={header.title}
            eyebrow={header.eyebrow}
            description={header.description}
            align="left"
          />
        </motion.div>

        {/* ================= DESKTOP ================= */}
        <div className="hidden lg:grid grid-cols-12 gap-12">

          <motion.div
            className="col-span-4"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
          >
            <SectionHeader
              title={header.title}
              eyebrow={header.eyebrow}
              description={header.description}
              align="left"
            />
          </motion.div>

          {/* ================= CARDS ================= */}
          <motion.div
            className="col-span-8 grid grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {items.map((item, index) => {
              const Icon = ICONS[index % ICONS.length];

              return (
                <motion.button
                  key={item.title}
                  variants={fadeUp}
                  transition={{ delay: index * 0.06 }}
                  onClick={() => setActive(index)}
                  className="
                    group relative text-left rounded-2xl p-8
                    border border-[var(--glass-border-cards)]
                    bg-[var(--glass-bg-cards)] cursor-pointer
                    backdrop-blur-xl
                    shadow-sm hover:shadow-2xl
                    transition-all duration-300 overflow-hidden
                  "
                >
                  <span
                    className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${ACCENT_BORDERS[index % ACCENT_BORDERS.length]} to-transparent`}
                  />

                  <div className="mb-6 inline-flex items-center justify-center">
                    <Icon
                      className={`h-6 w-6 ${ICON_COLORS[index % ICON_COLORS.length]}`}
                    />
                  </div>

                  <h3 className="text-lg font-medium text-[var(--text-color-2)]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm text-[var(--text-color)]">
                    {item.outline || item.description}
                  </p>
                </motion.button>
              );
            })}
          </motion.div>
        </div>

        {/* ================= MOBILE ================= */}
        <div className="md:hidden space-y-4">
          {items.map((item, index) => {
            const Icon = ICONS[index % ICONS.length];
            return (
              <motion.button
                key={item.title}
                onClick={() => setActive(index)}
                className="
                  w-full p-5 rounded-xl flex items-center gap-4
                  border border-[var(--glass-border-cards)]
                  bg-[var(--glass-bg-cards)] cursor-pointer
                  backdrop-blur-xl
                  transition hover:shadow-md
                "
              >
                <Icon
                  className={`h-5 w-5 ${ICON_COLORS[index % ICON_COLORS.length]}`}
                />
                <span className="font-medium text-[var(--text-color)]">
                  {item.title}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* ================= MODAL ================= */}
        <AnimatePresence>
          {active !== null && (
            <motion.div
              className="
                fixed inset-0 z-50 flex items-center justify-center
                bg-black/70 backdrop-blur-md
              "
              onClick={() => setActive(null)}
            >
              <motion.div
                onClick={(e) => e.stopPropagation()}
                className="max-w-xl w-full mx-6 rounded-3xl p-8 bg-[var(--background)]"
              >
                <h3 className="text-2xl font-semibold text-[var(--text-color-2)]">
                  {items[active].title}
                </h3>

                {items[active].image && (
                  <div className="mt-5 overflow-hidden rounded-2xl">
                    <img
                      src={items[active].image}
                      alt={items[active].title}
                      className="w-full h-48 object-cover"
                      loading="lazy"
                    />
                  </div>
                )}

                <p className="mt-5 text-[var(--text-color)] leading-relaxed">
                  {items[active].description}
                </p>

                <button
                  className="mt-6 text-sm text-[var(--accent-primary)] underline cursor-pointer"
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
