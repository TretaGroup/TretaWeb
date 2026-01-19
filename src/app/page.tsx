import About from "@/components/home/AboutSection";
import CaseStudies from "@/components/home/CaseStudies";
import CTA from "@/components/home/CTA";
import HeroSection from "@/components/home/HeroSection";
import NumbersSection from "@/components/home/Numbers";
import Services from "@/components/home/ServicesSection";
import Values from "@/components/home/Values";

export default function Home() {
  return (
    <>
      <HeroSection maxZoom={0.19} />
      <About />
      <NumbersSection />
      <Services />
      <Values />
      <CaseStudies />
      <CTA />
    </>
  );
}
