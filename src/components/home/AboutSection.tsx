'use client';

import { useState, useEffect, useRef } from 'react';
import AboutSectionSkeleton from '../skeleton/AboutSectionSkeleton';
import Link from 'next/link';
import Image from 'next/image';
import * as LucideIcons from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';
import Button from '../common/Button';

interface Service {
    icon: string;
    label: string;
    color: string;
    hoverText: string;
}

interface AboutData {
    heading: string;
    description: string;
    image: string;
    services: Service[];
    stats: {
        number: string;
        label: string;
    };
    cta: {
        label: string;
        link: string;
    };
}


export default function About() {
    const [aboutData, setAboutData] = useState<AboutData | null>(null);
    const [loading, setLoading] = useState(true);
    const [showContent, setShowContent] = useState(false);
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [visible, setVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!loading && aboutData) {
            setShowContent(true);
        }
    }, [loading, aboutData]);

    useEffect(() => {
        const timer = setTimeout(() => {
            // Dummy data for development/testing
            const dummyData: AboutData = {
                heading: "About Our Team",
                description: "We are a passionate group of developers, designers, and strategists dedicated to building impactful digital experiences.",
                image: "/images/team.jpg",
                services: [
                    { icon: "code", label: "Web Development", color: "icon-blue",hoverText:"group-hover:text-blue-600 dark:group-hover:text-blue-400" },
                    { icon: "palette", label: "UI/UX Design", color: "icon-purple",hoverText:"group-hover:text-purple-600 dark:group-hover:text-purple-400" },
                    { icon: "rocket", label: "Startup Consulting", color: "icon-green",hoverText:"group-hover:text-green-600 dark:group-hover:text-green-400" },
                    { icon: "shield", label: "Security Audits", color: "icon-orange",hoverText:"group-hover:text-orange-600 dark:group-hover:text-orange-400" }
                ],
                stats: {
                    number: "120",
                    label: "Projects Completed"
                },
                cta: {
                    label: "Meet the Team",
                    link: "/team"
                }
            };
            setAboutData(dummyData);
            setLoading(false);
            setTimeout(() => setVisible(true), 100);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);
    useEffect(() => {
        if (!aboutData || hasAnimated) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setHasAnimated(true);
                    setIsVisible(true);
                    const target = parseInt(aboutData.stats.number.replace(/\D/g, ''));
                    const duration = 2000;
                    const increment = target / (duration / 16);
                    let current = 0;

                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            setCount(target);
                            clearInterval(timer);
                        } else {
                            setCount(Math.floor(current));
                        }
                    }, 16);
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, [aboutData, hasAnimated]);

    if (loading || !aboutData) {
        return <AboutSectionSkeleton />;
    }

    return (
        <section ref={sectionRef} className={`py-16 md:py-16 px-4 sm:px-8 lg:px-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}> 
            <div className="max-w-7xl mx-auto">
                {/* Heading at Top */}
                <div className={`mb-12 sm:mb-16 md:max-w-[75%] ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                        {aboutData.heading}
                    </h2>
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
                    {/* Left Column - Description & Stats */}
                    <div className={`lg:col-span-4 flex flex-col justify-between ${isVisible ? 'animate-slide-left animation-delay-200' : 'opacity-0'}`}>
                        <p className="text-base sm:text-lg leading-relaxed mb-16 lg:mb-0 transition-all duration-300 hover:text-opacity-80">
                            {aboutData.description}
                        </p>

                        {/* Stats at Bottom */}
                        <div className="border-l-4 border-primary pl-4 transition-all duration-300 hover:border-primary/80 hover:pl-6 ">
                            <div className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-1 leading-none transition-all duration-300 hover:text-primary">
                                {count}+
                            </div>
                            <p className="text-base sm:text-lg font-normal">
                                {aboutData.stats.label}
                            </p>
                        </div>
                    </div>

                    {/* Center Column - Image */}
                    <div className={`lg:col-span-4 ${isVisible ? 'animate-scale-in animation-delay-400' : 'opacity-0'}`}>
                        <div className="relative aspect-3/4 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-3xl hover:scale-[1.02] group">
                            <Image
                                src={aboutData.image}
                                alt="Team"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                    </div>

                    {/* Right Column - Services & CTA */}
                    <div className={`lg:col-span-4 flex flex-col justify-end min-h-100 gap-8 lg:gap-12 ${isVisible ? 'animate-slide-right animation-delay-600' : 'opacity-0'}`}>
                        {/* Services List */}
                        <div className="relative">
                            {/* Pin Icon */}


                            <div className="space-y-6 card-bg relative p-6 sm:p-8 rounded-2xl shadow-2xl transition-all duration-500 hover:shadow-3xl hover:-translate-y-1">
                                <div className="absolute top-4 right-8 z-10">
                                    <svg className="w-6 h-6 text-primary transform rotate-45" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M16 12V4h1c.55 0 1-.45 1-1s-.45-1-1-1H7c-.55 0-1 .45-1 1s.45 1 1 1h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" />
                                    </svg>
                                </div>
                                {aboutData.services.map((service, index) => {
                                    // Capitalize first letter for case-insensitive icon lookup
                                    const iconName = service.icon.charAt(0).toUpperCase() + service.icon.slice(1);
                                    const IconComponent = (LucideIcons as any)[iconName];
                                    return (
                                        <div
  key={index}
  className="group flex items-center gap-3 transition-all duration-300 hover:translate-x-2 cursor-pointer"
>
  <div className={`${service.color} p-2.5 rounded-lg shrink-0 mt-0.5 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md`}>
    {IconComponent && <IconComponent className="w-5 h-5" />}
  </div>

  <span className={`text-base sm:text-lg font-normal transition-colors duration-300 ${service.hoverText}`}>
    {service.label}
  </span>
</div>

                                    );
                                })}
                            </div>
                        </div>

                        {/* CTA Button at Bottom */}
                        <div className="mt-8 lg:mt-0 flex items-center justify-end-safe">
                            <Button
                                href={aboutData.cta.link}
                                className="bg-primary text-white inline-flex"
                                icon="arrow-up-right"
                            >
                                {aboutData.cta.label}
                                
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
