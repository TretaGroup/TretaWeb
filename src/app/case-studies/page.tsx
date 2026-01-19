import { Suspense } from "react";
import CaseStudiesGrid from "@/components/case-studies/case-studies";
import PageHeroSection from "@/components/common/PageHeroSection";
import CTA from "@/components/home/CTA";

export default function CaseStudiesPage() {
  return (
    <>
      <PageHeroSection />

      <Suspense fallback={<div className="py-20 text-center">Loading case studies…</div>}>
        <CaseStudiesGrid />
      </Suspense>

      <CTA />
    </>
  );
}
