"use client";

import { motion } from "framer-motion";
import {
  Target,
  ShieldCheck,
  Network,
  TrendingUp,
} from "lucide-react";
import { WhyTretaProps } from "@/src/types/pages";
import SectionHeader from "./ui/SectionHeader";

const ICON_MAP = {
  Target,
  ShieldCheck,
  Network,
  TrendingUp,
};

export default function WhyTreta({ header, points }: WhyTretaProps) {
  return (
    <section className="py-28 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div className="max-w-3xl mb-20">
          <SectionHeader title={header.title} eyebrow={header.eyebrow} description={header.description} align="left" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {points.map((point) => {
            const Icon = ICON_MAP[point.icon as keyof typeof ICON_MAP];
            return (
              <div key={point.title} className="flex gap-6">
                <div className="h-12 w-12 rounded-xl bg-[var(--accent-muted)] flex items-center justify-center">
                  <Icon className="h-6 w-6 text-[var(--accent-primary)]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[var(--text-color-2)]">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-[var(--text-color)]">
                    {point.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
