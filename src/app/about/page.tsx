import MissionVisionSection from "@/components/about/MissionVisionSection";
import MoreAboutSection from "@/components/about/MoreAboutSection";
import OurProcess from "@/components/about/OurProcess";
import TeamSection from "@/components/about/TeamSection";
import PageHeroSection from "@/components/common/PageHeroSection";
import CTA from "@/components/home/CTA";
import Services from "@/components/home/ServicesSection";


export default function AboutPage(){
    return (
        <>
            <PageHeroSection />
            <MoreAboutSection />
            <MissionVisionSection isVision={false} isLeft={false} /> 
            <MissionVisionSection isVision={true} isLeft={true} /> 
            <Services />
            <OurProcess />
            <TeamSection />
            <CTA />
        </>
    )
}