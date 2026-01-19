import CaseStudiesGrid from "@/components/case-studies/case-studies";
import PageHeroSection from "@/components/common/PageHeroSection";
import CTA from "@/components/home/CTA";


export default function CaseStudiesPage(){
    return (
        <>
            <PageHeroSection />
            <CaseStudiesGrid />
            <CTA />
        </>
    )
}