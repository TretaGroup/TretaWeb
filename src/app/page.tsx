import About from "../components/About";
import CaseStudies from "../components/CaseStudies";
import CTA from "../components/CTA";
import FAQ from "../components/FAQ";
import Hero from "../components/Hero";
import NumbersSection from "../components/NumbersSection";
import Services from "../components/Services";
import Values from "../components/Values";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <NumbersSection />
      <Services />
      <Values />
      <CaseStudies />
      <CTA />
      <FAQ />
    </div>
  );
}