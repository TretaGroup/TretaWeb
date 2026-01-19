'use client';

import { useState, useEffect } from 'react';
import ValuesSkeleton from '../skeleton/ValuesSkeleton';
import * as LucideIcons from 'lucide-react';

interface ValueItem {
    iconName: string;
    title: string;
    description: string;
}

interface ValuesData {
    heading: {
        line1: string;
        line2: string;
        line2Italic: string;
    };
    values: ValueItem[];
}



export default function Values() {
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const valuesData: ValuesData = {
        heading: {
            line1: "Our Proven Process to",
            line2: "Drive Your",
            line2Italic: "Success"
        },
        values: [
            {
                iconName: "LucideMessageCircle",
                title: "Discover & Diagnose",
                description: "Uncover challenges, opportunities, and root causes with clarity."
            },
            {
                iconName: "LucideSettings",
                title: "Strategize & Plan",
                description: "Build actionable roadmaps aligned with your business goals."
            },
            {
                iconName: "LucideActivity",
                title: "Execute & Optimize",
                description: "Build actionable roadmaps aligned with your business goals."
            },
            {
                iconName: "LucideTarget",
                title: "Measure & Track",
                description: "Monitor key metrics and performance indicators to ensure success."
            },
            {
                iconName: "LucideUsers",
                title: "Collaborate & Engage",
                description: "Foster teamwork and stakeholder alignment throughout the journey."
            },
            {
                iconName: "LucideTrendingUp",
                title: "Scale & Grow",
                description: "Expand your success with sustainable growth strategies and best practices."
            }
        ]
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
            setTimeout(() => setVisible(true), 100);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    if (loading) return <ValuesSkeleton />;

    return (
        <section className={`py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}> 
            <div className="max-w-7xl mx-auto">
                {/* Heading */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 sm:mb-12 lg:mb-16 text-foreground">
                    {valuesData.heading.line1} {valuesData.heading.line2}{' '}
                    <span className="italic font-serif">{valuesData.heading.line2Italic}</span>
                </h2>

                {/* Values Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                    {valuesData.values.map((value, index) => {
                        // Capitalize first letter for case-insensitive icon lookup
                        const iconName = value.iconName.charAt(0).toUpperCase() + value.iconName.slice(1);
                        const IconComponent = (LucideIcons as any)[iconName];

                        // Debug: log if icon is not found
                        if (!IconComponent) {
                            console.warn(`Icon not found: ${value.iconName} (tried: ${iconName})`);
                        }

                        return (
                            <div
                                key={index}
                                className="values-card-bg rounded-2xl p-6 sm:p-8"
                            >
                                {/* Icon */}
                                <div className="w-14 h-14 sm:w-16 sm:h-16 mb-4 sm:mb-6 flex items-center justify-center values-icon-bg rounded-2xl">
                                    {IconComponent ? (
                                        <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 text-background" strokeWidth={2} />
                                    ) : (
                                        <div className="w-7 h-7 sm:w-8 sm:h-8 text-red-500 flex items-center justify-center">?</div>
                                    )}
                                </div>

                                {/* Title */}
                                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-foreground">
                                    {value.title}
                                </h3>

                                {/* Description */}
                                <p className="values-description leading-relaxed text-sm sm:text-base">
                                    {value.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
