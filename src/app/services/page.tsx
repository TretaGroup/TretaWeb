import PageHeroSection from "@/components/common/PageHeroSection";
import CTA from "@/components/home/CTA";
import NumbersSection from "@/components/home/Numbers";
import ServicesGrid from "@/components/services/serviceGrid";


export default function ServicePage(){
    return (
        <>
            <PageHeroSection />
            <NumbersSection />
            <ServicesGrid />
            <CTA />
        </>
    )
}