"use client";


import { motion } from "framer-motion";
import { caldina } from "../app/fonts";
import {MOTION} from '@/src/lib/motion'


export default function Hero() {
    return (
        <section className="relative z-10 flex flex-col items-center pt-32 text-center">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="max-w-4xl"
            >
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={MOTION.slow}
                    className={`
                            relative text-6xl md:text-8xl font-semibold uppercase
                            bg-linear-to-r from-[#e7652f] via-[#fcc408] to-[#e7652f]
                            bg-size-[200%_100%] bg-clip-text text-transparent
                            animate-[shine_6s_linear_infinite]
                            ${caldina.className}
                        `}
                >
                    {process.env.NEXT_PUBLIC_COMPANY_NAME}
                </motion.h1>

                <p className="mt-6 text-xl text-neutral-500 dark:text-neutral-200">
                    Precision in transactions. <br /> Confidence in tax. <br /> <b className="text-[30px]">Coming Soon.</b>
                </p>
            </motion.div>
        </section>
    );
}