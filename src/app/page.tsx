import AdvancedBackground from "@/src/components/AdvancedBackground";
import CursorGlow from "@/src/components/CursorGlow";
import Hero from "@/src/components/Hero";
import Countdown from "@/src/components/Countdown";

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <AdvancedBackground />
      <CursorGlow />
      <Hero />
      <Countdown targetDate={process.env.NEXT_PUBLIC_DATE_OF_LAUNCH} />
    </main>
  );
}
