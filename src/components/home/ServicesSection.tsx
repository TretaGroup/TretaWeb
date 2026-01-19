"use client";
import React, { useState, useEffect } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import Button from "../common/Button";

interface Service {
    title: string;
    overview: string;
    image: string;
    description: string;
    features: string[];
}

interface ServicesData {
    heading: string;
    cta: {
        label: string;
        link: string;
    };
    services: Service[];
}


export default function Services() {
    const [data, setData] = useState<ServicesData | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showContent, setShowContent] = useState(false);
    const [visible, setVisible] = useState(false);
    // Import skeleton
    const ServicesSectionSkeleton = require('../skeleton/ServicesSectionSkeleton').default;

    useEffect(() => {
        const timer = setTimeout(() => {
            setData({
                heading: "Driving Growth Through Strategic Excellence",
                cta: {
                    label: "See All Service",
                    link: "/services"
                },
                services: [
                    {
                        title: "Wealth Finance",
                        overview: "Strategic financial planning and wealth management solutions",
                        image: "/images/wealth-finance.jpg",
                        description: "Comprehensive financial strategies designed to maximize wealth creation and preservation through intelligent investment planning.",
                        features: [
                            "Investment Portfolio Management",
                            "Tax Optimization Strategies",
                            "Retirement Planning Solutions"
                        ]
                    },
                    {
                        title: "Risk Assessment",
                        overview: "Helping organizations identify vulnerabilities and safeguard assets with proactive, data-driven risk strategies.",
                        image: "/images/risk-assessment.jpg",
                        description: "Comprehensive risk evaluation and mitigation strategies to protect your business from potential threats and uncertainties.",
                        features: [
                            "Comprehensive Risk Audits",
                            "Compliance & Regulatory Alignment",
                            "Crisis Management & Prevention"
                        ]
                    },
                    {
                        title: "Team Strategy",
                        overview: "Building high-performance teams through strategic organizational development",
                        image: "/images/team-strategy.jpg",
                        description: "Strategic planning and team optimization to enhance collaboration, productivity, and organizational effectiveness.",
                        features: [
                            "Leadership Development Programs",
                            "Team Performance Analytics",
                            "Organizational Culture Building"
                        ]
                    },
                    {
                        title: "Growth Planning",
                        overview: "Scalable growth strategies for sustainable business expansion",
                        image: "/images/growth-planning.jpg",
                        description: "Data-driven growth strategies designed to accelerate business expansion and market penetration.",
                        features: [
                            "Market Analysis & Research",
                            "Scalability Framework Development",
                            "Revenue Optimization Strategies"
                        ]
                    }
                ]
            });
            setIsVisible(true);
            setLoading(false);
            setTimeout(() => setVisible(true), 100);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);
    useEffect(() => {
        if (!loading && data) {
            setShowContent(true);
        }
    }, [loading, data]);

    if (loading || !data) return <ServicesSectionSkeleton />;

    const handleAccordionClick = (index: number) => {
        setActiveIndex(index);
    };

    return (
        <section className={`relative py-12 lg:py-20 overflow-hidden transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}> 
            {/* Header */}
            <div
                className={`max-w-7xl mx-auto px-6 mb-12 lg:mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
            >
                <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold card-text max-w-4xl">
                    {data.heading.split("Strategic")[0]}
                    <span className="block">
                        Strategic{" "}
                        <span className="italic font-serif">
                            {data.heading.split("Strategic")[1].trim()}
                        </span>
                    </span>
                </h2>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left Column - Accordion */}
                    <div className="space-y-2">
                        {data.services.map((service, index) => (
                            <div
                                key={index}
                                className={`border-b card-text-muted transition-all duration-500 ${isVisible
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 -translate-x-8"
                                    }`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                {/* Accordion Header */}
                                <button
                                    onClick={() => handleAccordionClick(index)}
                                    className="w-full text-left py-6 lg:py-8 flex items-start cursor-pointer gap-4 lg:gap-6 hover:opacity-80 transition-all duration-300 group"
                                >
                                    <span className="text-lg lg:text-xl font-bold card-text-muted shrink-0 transition-colors duration-300 group-hover:text-primary">
                                        [0{index + 1}]
                                    </span>
                                    <div className="flex-1">
                                        <h3 className="text-2xl lg:text-3xl font-bold card-text transition-colors duration-300 group-hover:text-primary">
                                            {service.title}
                                        </h3>
                                        {activeIndex === index && (
                                            <p className="text-sm lg:text-base card-text-muted mt-4 leading-relaxed">
                                                {service.overview}
                                            </p>
                                        )}
                                    </div>
                                    <ChevronDown
                                        className={`w-5 h-5 lg:w-6 lg:h-6 card-text-muted shrink-0 transition-all duration-300 group-hover:text-primary ${activeIndex === index ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>

                                {/* Accordion Content */}
                                <div
                                    className={`overflow-hidden transition-all duration-500 ${activeIndex === index
                                        ? "max-h-200 opacity-100"
                                        : "max-h-0 opacity-0"
                                        }`}
                                >
                                    <div className="pl-10 lg:pl-16 pr-6 lg:pr-8 pb-6 lg:pb-8 pt-2">
                                        <p className="card-text-muted mb-6 text-sm lg:text-base leading-relaxed">
                                            {service.description}
                                        </p>

                                        <Button
                                            href="/services"
                                            variant="primary"
                                            icon="arrow-up-right"
                                            className="bg-primary inline-flex"
                                        >
                                            Explore Service
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Column - Image */}
                    <div
                        className={`sticky top-24 h-fit transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                            }`}
                    >
                        <div className="relative aspect-4/5 rounded-3xl overflow-hidden card-bg shadow-2xl">
                            {data.services[activeIndex].image && (
                                <img
                                    src={data.services[activeIndex].image}
                                    alt={data.services[activeIndex].title}
                                    className="w-full h-full object-cover transition-all duration-500"
                                    key={activeIndex}
                                />
                            )}

                            {/* Overlay with gradient */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                            {/* Service title overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-8">
                                <div className="inline-block px-4 py-2 card-bg backdrop-blur-sm rounded-full">
                                    <span className="text-sm font-semibold card-text">
                                        {data.services[activeIndex].title}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
