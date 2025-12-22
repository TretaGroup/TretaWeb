"use client";

import { motion, Variants, useReducedMotion } from "framer-motion";
import {
  Briefcase,
  Scale,
  Shuffle,
  Globe,
  LineChart,
  ShieldCheck,
} from "lucide-react";
import { siteContent } from "@/public/data/siteContent";
import { JSX } from "react";
import { useRouter } from "next/navigation";

/* =========================
   TYPES
   ========================= */

type WhatWeDoItem = {
  title: keyof typeof iconMap;
  description: string;
};

/* =========================
   ICON MAP
   ========================= */

const iconMap = {
  "Transaction & Deal Advisory": <Briefcase size={28} />,
  "Tax & Regulatory Structuring": <Scale size={28} />,
  "Business & Group Restructuring": <Shuffle size={28} />,
  "International Tax & Cross-border Advisory": <Globe size={28} />,
  "Fund Raise, Valuation & CFO Services": <LineChart size={28} />,
  "Governance, Compliance & Litigation": <ShieldCheck size={28} />,
} satisfies Record<string, JSX.Element>;

/* =========================
   HELPERS
   ========================= */

const slugify = (value: string) =>
  value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-");

/* =========================
   COMPONENT
   ========================= */

export default function WhatWeDo() {
  const { title, subtitle, items } = siteContent.whatWeDo as {
    title: string;
    subtitle: string;
    items: WhatWeDoItem[];
  };

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

  const handleClick = (item: WhatWeDoItem) => {
    const slug = slugify(item.title);

    /* Analytics hook */
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("analytics:event", {
          detail: {
            event: "service_card_click",
            service: item.title,
          },
        })
      );
    }

    router.push(`/services/${slug}`);
  };

  return (
    <section
      id="what-we-do"
      className="py-28 bg-[var(--background)] transition-colors"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-semibold ttext-[var(--text-color-2)">
            {title}
          </h2>
          <p className="mt-6 text-lg text-[var(--text-color) max-w-4xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {items.map((item) => (
            <motion.button
              key={item.title}
              variants={cardVariants}
              onClick={() => handleClick(item)}
              whileHover={reduceMotion ? {} : { y: -6 }}
              className="
                group relative text-left rounded-2xl p-8
                border border-[var(--glass-border-cards)]
                bg-[var(--glass-bg-cards)]
                backdrop-blur-xl
                shadow-sm hover:shadow-2xl
                transition-all duration-300
                overflow-hidden cursor-pointer
              "
            >
              {/* Shimmer */}
              <span
                className="
                  pointer-events-none absolute inset-0
                  bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.05),transparent)]
                  bg-size-[200%_100%]
                  opacity-0 group-hover:opacity-100
                  animate-[shine_1.4s_linear_infinite]
                "
              />

              {/* Icon */}
              <div
                className="
                  mb-6 inline-flex items-center justify-center
                  rounded-xl p-3
                  bg-neutral-100 dark:bg-neutral-800
                  text-neutral-800 dark:text-neutral-100
                "
              >
                {iconMap[item.title]}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-[var(--text-color-2)] mb-4">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {item.description}
              </p>

              {/* Accent */}
              <span
                className="
                  absolute inset-x-0 bottom-0 h-0.5
                  bg-[var(--text-color-2)]
                  scale-x-0 group-hover:scale-x-100
                  transition-transform origin-left
                "
              />
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
