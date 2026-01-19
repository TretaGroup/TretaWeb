'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  ShieldCheck,
  ClipboardList,
  AlertTriangle,
} from 'lucide-react';
import Button from '../common/Button';

/* ---------------- Animations (TS SAFE) ---------------- */

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut', // ✅ FIXED
    },
  },
};

const stagger: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

/* ---------------- Types ---------------- */

interface ServiceDetailsData {
  title: string;
  heroImage: string;
  overview: string;
  expectation: string;
  keyFocus: string[];
  quote: {
    text: string;
    author: string;
    role: string;
    avatar: string;
  };
  gallery: string[];
  sections: {
    title: string;
    description: string;
  }[];
}

interface ServiceDetailsProps {
  data?: ServiceDetailsData;
}

/* ---------------- Skeleton ---------------- */

function Skeleton({ className }: { className: string }) {
  return (
    <div className={`animate-pulse bg-secondary rounded-xl ${className}`} />
  );
}

/* ---------------- Component ---------------- */

export default function SingleServiceDetails({ data }: ServiceDetailsProps) {
  const loading = !data;

  return (
    <section className="py-35 px-4 bg-surface text-foreground transition-colors">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* Header */}
        {loading ? (
          <>
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-12 w-3/4" />
          </>
        ) : (
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.span
              variants={fadeUp}
              className="text-sm text-primary font-medium"
            >
              [ Our Services ]
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl font-bold text-foreground mt-3"
            >
              {data.title}
            </motion.h1>
          </motion.div>
        )}

        {/* Hero */}
        {loading ? (
          <Skeleton className="h-65 sm:h-105 w-full" />
        ) : (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="relative h-65 sm:h-105 rounded-2xl overflow-hidden"
          >
            <Image
              src={data.heroImage}
              alt={data.title}
              fill
              priority
              className="object-cover"
            />
          </motion.div>
        )}

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Left Content */}
          <div className="lg:col-span-2 space-y-12">

            {/* Overview */}
            <Section title="Overview" loading={loading}>
              {loading ? (
                <Skeleton className="h-24 w-full" />
              ) : (
                <p className="text-foreground/80 leading-relaxed">
                  {data.overview}
                </p>
              )}
            </Section>

            {/* Expectation */}
            <Section title="What You Can Expect" loading={loading}>
              {loading ? (
                <Skeleton className="h-20 w-full" />
              ) : (
                <p className="text-foreground/80 leading-relaxed">
                  {data.expectation}
                </p>
              )}
            </Section>

            {/* Key Focus */}
            <Section title="Key Focus Area" loading={loading}>
              {loading ? (
                <Skeleton className="h-32 w-full" />
              ) : (
                <ul className="space-y-4">
                  {data.keyFocus.map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <ShieldCheck className="w-5 h-5 text-primary mt-1" />
                      <span className="text-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Section>

            {/* Quote */}
            {loading ? (
              <Skeleton className="h-28 w-full" />
            ) : (
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="border-l-4 border-primary pl-6 space-y-4"
              >
                <p className="italic text-foreground/80">
                  “{data.quote.text}”
                </p>

                <div className="flex items-center gap-3">
                  <Image
                    src={data.quote.avatar}
                    alt={data.quote.author}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {data.quote.author}
                    </p>
                    <p className="text-xs text-foreground/60">
                      {data.quote.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="bg-card border border-secondary-main rounded-2xl p-6 h-fit">
            <h3 className="text-lg font-bold text-foreground mb-4">
              Get Started Today
            </h3>

            <ul className="space-y-3 text-sm text-foreground/80 mb-6">
              <li className="flex gap-2">
                <ClipboardList className="w-4 h-4 text-primary" />
                Initial risk assessment
              </li>
              <li className="flex gap-2">
                <AlertTriangle className="w-4 h-4 text-primary" />
                Identify vulnerabilities
              </li>
              <li className="flex gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" />
                Strategic mitigation plan
              </li>
            </ul>

            <Button
              href="/contact"
              variant="primary"
              icon="arrow-right"
              className="w-full justify-center"
            >
              Book a Call
            </Button>
          </div>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {loading
            ? Array.from({ length: 2 }).map((_, i) => (
                <Skeleton key={i} className="h-56 w-full" />
              ))
            : data.gallery.map((img, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="relative h-56 rounded-xl overflow-hidden"
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </motion.div>
              ))}
        </div>

        {/* Bottom Sections */}
        <div className="space-y-12">
          {loading
            ? <Skeleton className="h-32 w-full" />
            : data.sections.map((s, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-3 max-w-4xl"
                >
                  <h3 className="text-xl font-bold text-foreground">
                    {s.title}
                  </h3>
                  <p className="text-foreground/80 leading-relaxed">
                    {s.description}
                  </p>
                </motion.div>
              ))}
        </div>

      </div>
    </section>
  );
}

/* ---------------- Helpers ---------------- */

function Section({
  title,
  children,
  loading,
}: {
  title: string;
  children: React.ReactNode;
  loading?: boolean;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="space-y-5 max-w-4xl"
    >
      <h2 className="text-xl font-bold text-foreground">{title}</h2>
      {children}
    </motion.div>
  );
}
