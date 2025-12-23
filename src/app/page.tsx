import { siteContent } from "@/public/data/siteContent";
import PageTransition from "@/src/components/ui/PageTransitionUI";
import HeroSection from "@/src/components/Hero";
import WhatWeDo from "@/src/components/WhatWeDo";
import OurPhilosophy from "@/src/components/OurPhilosophy";
import WhyTreta from "@/src/components/WhyTreta";

export default function Page() {
  return (
    <PageTransition>
      <HeroSection slides={siteContent.hero.slides} />

      <WhatWeDo {...siteContent.whatWeDo} />

      <OurPhilosophy {...siteContent.philosophy} />

      <WhyTreta {...siteContent.whyTreta} />
    </PageTransition>
  );
}
