import Hero from "@/src/components/Hero";
import Countdown from "@/src/components/Countdown";
import AuroraBackground from "@/src/components/AuroraBackground";

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <AuroraBackground />
      <Hero />
      <Countdown targetDate={process.env.NEXT_PUBLIC_DATE_OF_LAUNCH} />
    </main>
  );
}
