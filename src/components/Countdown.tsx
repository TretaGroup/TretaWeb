"use client";


import { useEffect, useState } from "react";
import { motion } from "framer-motion";


const calc = (date: string) => {
    const diff = +new Date(date) - +new Date();
    return {
        days: Math.max(Math.floor(diff / 86400000), 0),
        hours: Math.max(Math.floor((diff / 3600000) % 24), 0),
        minutes: Math.max(Math.floor((diff / 60000) % 60), 0),
        seconds: Math.max(Math.floor((diff / 1000) % 60), 0),
    };
};


export default function Countdown({ targetDate }: { targetDate: string }) {
    const [time, setTime] = useState(calc(targetDate));


    useEffect(() => {
        const i = setInterval(() => setTime(calc(targetDate)), 1000);
        return () => clearInterval(i);
    }, [targetDate]);


    return (
        <section className="relative z-10 flex justify-center pb-24 pt-24">
            <div className="grid grid-cols-4 gap-6">
                {Object.entries(time).map(([k, v]) => (
                    <motion.div
                        key={k}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 text-center"
                    >
                        <div className="text-4xl font-semibold">{v}</div>
                        <div className="mt-2 text-xs uppercase tracking-widest text-neutral-400">
                            {k}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}