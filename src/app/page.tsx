import Hero from "@/src/components/Hero";
import Countdown from "@/src/components/Countdown";
import ParticlesBackground from "@/src/components/ParticlesBackground";


export default function Page() {
  return (
    <main className="relative min-h-screen">
      <ParticlesBackground />
      <Hero />
      <Countdown targetDate={process.env.NEXT_PUBLIC_DATE_OF_LAUNCH} />
    </main>
  );
}