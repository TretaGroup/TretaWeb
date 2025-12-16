"use client";


import { motion } from "framer-motion";
import { caldina } from "../app/fonts";


export default function Hero() {
    return (
        <section className="relative z-10 flex flex-col items-center pt-32 text-center">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="max-w-4xl"
            >
                <h1 className={`text-6xl md:text-8xl font-semibold bg-linear-90 from-[#e7652f] to-[#fcc408] bg-clip-text text-transparent uppercase ${caldina.className }`}>
                    {process.env.NEXT_PUBLIC_COMPANY_NAME}
                </h1>
                <p className="mt-6 text-xl text-neutral-200">
                    Precision in transactions. <br /> Confidence in tax. <br /> <b className="text-[30px]">Coming Soon.</b>
                </p>
            </motion.div>
        </section>
    );
}