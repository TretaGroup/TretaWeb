"use client";


import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";


export default function ParticlesBackground() {
    const init = useCallback(async (engine: any) => {
        await loadSlim(engine);
    }, []);


    return (
        <Particles
            init={init}
            options={{
                background: { color: "transparent" },
                particles: {
                    number: { value: 50 },
                    color: { value: "#6366f1" },
                    opacity: { value: 0.3 },
                    size: { value: 2 },
                    move: { enable: true, speed: 0.6 },
                },
            }}
            className="absolute inset-0 -z-10"
        />
    );
}