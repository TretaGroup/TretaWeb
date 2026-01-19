'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Linkedin, Mail } from 'lucide-react';
import CTA from '../home/CTA';

/* ---------------- Animations ---------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45 },
  },
};

/* ---------------- Types ---------------- */

export interface TeamMemberData {
  name: string;
  role: string;
  image: string;
  bio: string;
  expertise: string[];
  experience: string;
  email?: string;
  linkedin?: string;
}

/* ---------------- Enhanced Skeleton ---------------- */

function Skeleton({ className }: { className: string }) {
  return (
    <div
      className={`
        relative overflow-hidden rounded-xl bg-secondary
        ${className}
      `}
    >
      <span
        className="
          absolute inset-0
          -translate-x-full
          animate-[shimmer_1.6s_infinite]
          bg-gradient-to-r
          from-transparent via-white/40 to-transparent
        "
      />
    </div>
  );
}

/* ---------------- Component ---------------- */

export default function SingleTeamMember({
  data,
}: {
  data?: TeamMemberData;
}) {
  const loading = !data;

  return (
    <section className="py-35 px-4 bg-surface text-foreground transition-colors">
      <div className="max-w-6xl mx-auto space-y-14">

        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-3  gap-10 items-start">

          {/* Avatar */}
          {loading ? (
            <Skeleton className="w-full h-95" />
          ) : (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="relative h-95 rounded-3xl overflow-hidden"
            >
              <Image
                src={data.image}
                alt={data.name}
                fill
                priority
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZWVlZWVlIi8+PC9zdmc+"
                className="object-cover"
              />
            </motion.div>
          )}

          {/* Info */}
          <div className="md:col-span-2 space-y-6">
            {loading ? (
              <>
                <Skeleton className="h-10 w-2/3" />
                <Skeleton className="h-6 w-1/2" />
              </>
            ) : (
              <>
                <motion.h1
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="text-4xl font-bold"
                >
                  {data.name}
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="text-lg text-primary font-medium"
                >
                  {data.role}
                </motion.p>
              </>
            )}

            {!loading && (
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap gap-4"
              >
                {data.email && (
                  <a
                    href={`mailto:${data.email}`}
                    className="inline-flex items-center gap-2 text-sm text-foreground/80 hover:text-primary"
                  >
                    <Mail size={16} />
                    {data.email}
                  </a>
                )}

                {data.linkedin && (
                  <a
                    href={data.linkedin}
                    target="_blank"
                    className="inline-flex items-center gap-2 text-sm text-foreground/80 hover:text-primary"
                  >
                    <Linkedin size={16} />
                    LinkedIn
                  </a>
                )}
              </motion.div>
            )}
          </div>
        </div>

        {/* Biography */}
        <div className="space-y-6 ">
          {loading ? (
            <Skeleton className="h-28 w-full" />
          ) : (
            <>
              <h2 className="text-2xl font-bold">Biography</h2>
              <p className="text-lg text-foreground/80 leading-relaxed">
                {data.bio}
              </p>
            </>
          )}
        </div>

        {/* Expertise */}
        <div className="space-y-6">
          {loading ? (
            <Skeleton className="h-32 w-full" />
          ) : (
            <>
              <h2 className="text-2xl font-bold">Areas of Expertise</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {data.expertise.map((item, i) => (
                  <li
                    key={i}
                    className="bg-card border border-secondary-main rounded-xl px-4 py-3 text-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* Experience */}
        <div className="space-y-6">
          {loading ? (
            <Skeleton className="h-24 w-full" />
          ) : (
            <>
              <h2 className="text-2xl font-bold">Experience</h2>
              <p className="text-lg text-foreground/80">
                {data.experience}
              </p>
            </>
          )}
        </div>

      </div>

      <CTA />

      {/* shimmer animation */}
      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </section>
  );
}
