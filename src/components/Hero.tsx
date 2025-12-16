"use client";


import { motion } from "framer-motion";


export default function Hero() {
    return (
        <section className="relative z-10 flex flex-col items-center pt-32 text-center">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="max-w-4xl"
            >
                <h1 className="text-6xl md:text-8xl font-semibold bg-linear-to-r from-white via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                    NovaCloud
                </h1>
                <p className="mt-6 text-xl text-neutral-400">
                    The future of enterprise cloud intelligence
                </p>
            </motion.div>
        </section>
    );
}