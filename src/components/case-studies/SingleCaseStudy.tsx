'use client';

import Image from 'next/image';
import { motion, useScroll } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { MapPin, User, Briefcase, Clock } from 'lucide-react';
import CTA from '../home/CTA';
import Button from '../common/Button';

/* ---------------- Animations ---------------- */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const stagger: Variants = {
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

/* ---------------- Types ---------------- */

interface Result {
  value: string;
  label: string;
}

interface CaseStudyData {
  title: string;
  heroImage: string;
  client: string;
  location: string;
  service: string;
  duration: string;
  overview: string;
  challenges: string[];
  gallery: string[];
  approach: string[];
  results: Result[];
  finalThoughts: string;
}

interface CaseStudyDetailsProps {
  data?: CaseStudyData;
}

/* ---------------- Utils (Image Blur) ---------------- */

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#f3f4f6" offset="20%" />
      <stop stop-color="#e5e7eb" offset="50%" />
      <stop stop-color="#f3f4f6" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#f3f4f6" />
  <rect width="${w}" height="${h}" fill="url(#g)">
    <animate attributeName="x" from="-${w}" to="${w}" dur="1.2s" repeatCount="indefinite" />
  </rect>
</svg>
`;

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

/* ---------------- Skeleton ---------------- */

function Skeleton({ className }: { className: string }) {
  return <div className={`animate-pulse bg-secondary rounded-xl ${className}`} />;
}

/* ---------------- Component ---------------- */

export default function CaseStudyDetails({ data }: CaseStudyDetailsProps) {
  const { scrollYProgress } = useScroll();
  const loading = !data;

  return (
    <section className="py-20 px-4 bg-surface text-foreground transition-colors">
      {/* Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.75 bg-primary z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <section className="bg-background py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-16">

          {/* Breadcrumb */}
          {loading ? (
            <Skeleton className="h-4 w-40" />
          ) : (
            <Button
              className=""
              href='/case-studies'
              icon='arrow-up-left'
            > Back to Case Studies</Button>
          )}

          {/* Title */}
          {loading ? (
            <Skeleton className="h-12 w-3/4" />
          ) : (
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl font-bold text-center text-foreground w-full leading-tight"
            >
              {data.title}
            </motion.h1>
          )}

          {/* Hero */}
          {loading ? (
            <Skeleton className="h-75 sm:h-120 w-full" />
          ) : (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative h-75 sm:h-120 rounded-3xl overflow-hidden"
            >
              <Image
                src={data.heroImage}
                alt={data.title}
                fill
                priority
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(700, 475)
                )}`}
                className="object-cover"
              />
            </motion.div>
          )}

          {/* Meta */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-20 w-full" />
              ))
            ) : (
              <>
                <MetaCard icon={<User />} label="Client" value={data.client} />
                <MetaCard icon={<MapPin />} label="Location" value={data.location} />
                <MetaCard icon={<Briefcase />} label="Service" value={data.service} />
                <MetaCard icon={<Clock />} label="Duration" value={data.duration} />
              </>
            )}
          </motion.div>

          {/* Overview */}
          <Section title="Overview">
            {loading ? (
              <Skeleton className="h-28 w-full" />
            ) : (
              <p className="text-lg text-foreground/80 leading-relaxed">
                {data.overview}
              </p>
            )}
          </Section>

          {/* Challenges */}
          <Section title="Challenges">
            {loading ? (
              <Skeleton className="h-32 w-full" />
            ) : (
              <ul className="list-disc pl-6 space-y-3 text-foreground/80">
                {data.challenges.map((c, i) => (
                  <motion.li key={i} variants={fadeUp}>
                    {c}
                  </motion.li>
                ))}
              </ul>
            )}
          </Section>

          {/* Gallery */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {loading
              ? Array.from({ length: 2 }).map((_, i) => (
                  <Skeleton key={i} className="h-64 w-full" />
                ))
              : data.gallery.map((img, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className="relative h-64 rounded-3xl overflow-hidden"
                  >
                    <Image
                      src={img}
                      alt=""
                      fill
                      placeholder="blur"
                      blurDataURL={`data:image/svg+xml;base64,${toBase64(
                        shimmer(400, 300)
                      )}`}
                      className="object-cover"
                    />
                  </motion.div>
                ))}
          </motion.div>

          {/* Approach */}
          <Section title="Our Approach">
            {loading ? (
              <Skeleton className="h-32 w-full" />
            ) : (
              <ul className="space-y-4 text-foreground/80">
                {data.approach.map((a, i) => (
                  <motion.li key={i} variants={fadeUp}>
                    • {a}
                  </motion.li>
                ))}
              </ul>
            )}
          </Section>

          {/* Results */}
          <Section title="Results">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-24 w-full" />
                  ))
                : data.results.map((r, i) => (
                    <motion.div
                      key={i}
                      variants={fadeUp}
                      className="bg-card border border-secondary-main rounded-2xl p-6 text-center"
                    >
                      <p className="text-4xl font-bold text-primary">
                        {r.value}
                      </p>
                      <p className="text-sm text-foreground/70 mt-2">
                        {r.label}
                      </p>
                    </motion.div>
                  ))}
            </div>
          </Section>

          {/* Final Thoughts */}
          <Section title="Final Thoughts">
            {loading ? (
              <Skeleton className="h-24 w-full" />
            ) : (
              <p className="text-lg text-foreground/80 leading-relaxed">
                {data.finalThoughts}
              </p>
            )}
          </Section>
          <CTA />

        </div>
      </section>
    </section>
  );
}

/* ---------------- Helpers ---------------- */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="space-y-5 max-w-4xl"
    >
      <h2 className="text-2xl font-bold text-foreground">{title}</h2>
      {children}
    </motion.div>
  );
}

function MetaCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-card border border-secondary-main rounded-2xl p-4 flex items-center gap-3"
    >
      <div className="icon-primary p-2 rounded-lg">{icon}</div>
      <div>
        <p className="text-xs text-foreground/60">{label}</p>
        <p className="text-sm font-semibold text-foreground">{value}</p>
      </div>
    </motion.div>
  );
}
