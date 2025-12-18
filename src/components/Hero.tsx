"use client";

import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { heroAnimations } from "@/src/lib/heroAnimations";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { HeroSlide } from "../types/heroslide";

interface HeroSectionProps {
  slides: HeroSlide[];
}

export default function HeroSection({ slides }: HeroSectionProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  /* Auto-play */
  useEffect(() => {
    if (paused) return;
    const i = setInterval(
      () => setIndex((v) => (v + 1) % slides.length),
      5000
    );
    return () => clearInterval(i);
  }, [paused, slides.length]);

  /* Keyboard */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % slides.length);
      if (e.key === "ArrowLeft")
        setIndex((i) => (i - 1 + slides.length) % slides.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [slides.length]);

  /* Parallax */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const current = slides[index];

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ["0%", "0%"] : ["0%", `${(current.parallax ?? 0.2) * 40}%`]
  );

  const animationVariants = reduceMotion
    ? heroAnimations.fadeUp
    : heroAnimations[current.animation];

  return (
    <section
      ref={containerRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative min-h-screen overflow-hidden"
    >
      {/* Background (cross-fade) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          style={{ y }}
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.3 : 0.8 }}
        >
          {current.media?.type === "video" ? (
            <video
              src={current.media.src}
              poster={current.media.poster}
              autoPlay={!reduceMotion}
              muted
              loop
              playsInline
              preload="none"
              className="h-full w-full object-cover"
            />
          ) : (
            <img
              src={current.media?.src}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover"
            />
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="absolute inset-0 z-10 grid place-items-center px-6 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            variants={animationVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{
              duration: reduceMotion ? 0.3 : 0.6,
              ease: "easeOut",
            }}
            className="max-w-3xl"
          >
            {current.kicker && (
              <motion.span
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1 text-xs font-medium tracking-wide text-white/80 backdrop-blur"
              >
                {current.kicker}
              </motion.span>
            )}

            <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
              {current.title}
            </h1>


            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              {current.subtitle}
            </p>


            {/* CTA */}
            {current.cta && (
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="mt-10 flex flex-wrap justify-center gap-4"
              >
                <a
  href={current.cta.primary.href}
  className="group relative inline-flex items-center gap-2 rounded-xl bg-linear-to-br from-white to-gray-200 px-8 py-3 text-sm font-medium text-black shadow-xl transition hover:-translate-y-0.5"
>
  <span className="absolute inset-0 -z-10 rounded-xl bg-white/30 blur-xl opacity-0 transition group-hover:opacity-100" />
  <Sparkles className="h-4 w-4" />
  {current.cta.primary.label}
  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
</a>


                {current.cta.secondary && (
                  <a
                    href={current.cta.secondary.href}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/40 px-8 py-3 text-sm font-medium text-white backdrop-blur transition hover:bg-white/10"
                  >
                    {current.cta.secondary.label}
                  </a>
                )}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Scroll Down Indicator */}
        {/* <motion.div
  className="absolute bottom-10 right-2 -translate-x-1/2"
  aria-hidden
  animate={reduceMotion ? {} : { opacity: [0.6, 1, 0.6] }}
  transition={{ duration: 2, repeat: Infinity }}
>
  <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/40">
    <motion.span
      className="mt-2 h-1.5 w-1.5 rounded-full bg-white/70"
      animate={reduceMotion ? {} : { y: [0, 12, 0] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
</motion.div> */}

<motion.div
  className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center justify-center cursor-pointer"
  aria-hidden
  onClick={() =>
  window.scrollTo({
    top: window.innerHeight,
    behavior: "smooth",
  })
}

>
  <svg width="48" height="48" className="absolute">
    <motion.circle
      cx="24"
      cy="24"
      r="20"
      fill="none"
      stroke="rgba(255,255,255,0.4)"
      strokeWidth="1.5"
      strokeDasharray={2 * Math.PI * 20}
      strokeDashoffset={0}
      animate={{
        strokeDashoffset: 2 * Math.PI * 20,
      }}
      transition={{
        duration: 5,
        ease: "linear",
        repeat: Infinity,
      }}
    />
  </svg>

  <ChevronDown className="h-5 w-5 text-white/80" />
</motion.div>



        {/* Indicators */}
        <div className="absolute bottom-6 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition ${i === index
                ? "bg-white scale-125"
                : "bg-white/40 hover:bg-white/60"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
