import { siteContent } from "@/public/data/siteContent";
import HeroSection from "@/src/components/Hero";
import PageTransition from "@/src/components/ui/PageTransitionUI";
import WhatWeDo from "@/src/components/WhatWeDo";
import OurPhilosophy from "../components/OurPhilosophy";

export default function Page() {
  return (
    <PageTransition>
      <HeroSection slides={siteContent.hero.slides} />
      <WhatWeDo />
      <OurPhilosophy />
    </PageTransition>
  );
}
