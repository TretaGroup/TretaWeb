"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/src/lib/motion";
import SectionHeading from "@/src/components/ui/SectionHeading";

interface Service {
  title: string;
  description: string;
}

export default function WhatWeDo({ services }: { services: Service[] }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <SectionHeading title="What We Do" />

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition"
          >
            <h3 className="text-lg font-medium">{service.title}</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {service.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
