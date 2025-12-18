import { siteContent } from "@/public/data/siteContent";
import HeroSection from "@/src/components/Hero";
import WhatWeDo from "@/src/components/WhatWeDo";
import ValuesSection from "@/src/components/Values";
import WhyTreta from "@/src/components/WhyTreta";
import FeaturedCredentials from "@/src/components/FeaturedCredentials";
import CTA from "@/src/components/CTA";
import PageTransition from "@/src/components/ui/PageTransitionUI";

export default function HomePage() {
  return (
    <PageTransition>
      <HeroSection slides={siteContent.hero.slides} />

      <WhatWeDo services={siteContent.services} />

      <section className="mx-auto max-w-7xl px-6 py-20 grid gap-16 lg:grid-cols-2">
        <ValuesSection values={siteContent.values} />
        <WhyTreta reasons={siteContent.whyTreta} />
      </section>

      <FeaturedCredentials />

      <CTA label={siteContent.cta.label} />
    </PageTransition>
  );
}
