import { siteContent } from "@/public/data/siteContent";
import HeroSection from "@/src/components/Hero";
import PageTransition from "@/src/components/ui/PageTransitionUI";
import WhatWeDo from "@/src/components/WhatWeDo";

export default function HomePage() {
  return (
    <PageTransition>
      <HeroSection slides={siteContent.hero.slides} />
      <WhatWeDo />
    </PageTransition>
  );
}
