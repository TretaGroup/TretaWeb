"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFoundPage() {
  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-linear-to-br from-slate-900 via-indigo-900 to-slate-800 text-white">
      {/* Floating Blobs */}
      <motion.div
        className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-indigo-600/30 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-purple-600/25 blur-3xl"
        animate={{ scale: [1.1, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
        transition={{ duration: 7, repeat: Infinity }}
      />

      <div className="relative z-10 text-center px-6">
        {/* Glitch heading */}
        <h1 className="text-[20vw] font-black tracking-tight leading-none select-none text-white/10 pointer-events-none">
          404
        </h1>

        {/* Animated subheading */}
        <motion.h2
          className="-mt-16 text-4xl md:text-6xl font-bold drop-shadow-xl tracking-tight"
          animate={{ opacity: [0, 1], y: [40, 0] }}
          transition={{ duration: 1 }}
        >
          Lost in the Void
        </motion.h2>

        {/* Body */}
        <motion.p
          className="mt-4 max-w-xl text-lg text-white/70 mx-auto"
          animate={{ opacity: [0, 1], y: [20, 0] }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          The page you're searching for drifted beyond the stars.  
          It might have never existed — or slipped into a wormhole.
        </motion.p>

        {/* CTA */}
        <motion.div
          className="mt-8 flex justify-center"
          animate={{ opacity: [0, 1], y: [20, 0] }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          <Link
            href="/"
            className="
              group inline-flex items-center gap-2 px-6 py-3 rounded-full
              bg-white text-slate-900 font-medium shadow-lg shadow-black/20
              transition-all duration-300
              hover:bg-slate-200 hover:shadow-xl
              active:scale-95
            "
          >
            <ArrowLeft className="
              w-5 h-5 transition-transform duration-300 
              group-hover:-translate-x-1
            " />
            Return Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
