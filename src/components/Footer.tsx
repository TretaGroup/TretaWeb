'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface LinkItem {
    label: string;
    link: string;
}

interface FooterData {
    companyInfo: {
        name: string;
        tagline: string;
    };
    links: {
        mainPages: {
            title: string;
            items: LinkItem[];
        };
        company: {
            title: string;
            items: LinkItem[];
        };
    };
    contact: {
        title: string;
        email: {
            label: string;
            value: string;
        };
        address: {
            label: string;
            value: string;
        };
        phone: {
            label: string;
            value: string;
        };
    };
    bottomLinks: LinkItem[];
    copyright: string;
    developer: {
        text: string;
        name: string;
        link: string;
    };
}

export default function Footer() {
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [footerData, setFooterData] = useState<FooterData | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFooterData({
                companyInfo: {
                    name: "OPTIMO",
                    tagline: "Transforming your vision into measurable results through innovative solutions and strategic excellence."
                },
                links: {
                    mainPages: {
                        title: "Main Pages",
                        items: [
                            { label: "Home", link: "/" },
                            { label: "Case Study", link: "/case-studies" },
                            { label: "Pricing", link: "/pricing" },
                            { label: "Blog", link: "/blog" }
                        ]
                    },
                    company: {
                        title: "Company",
                        items: [
                            { label: "Contact", link: "/contact" },
                            { label: "Services", link: "/services" },
                            { label: "About Us", link: "/about" },
                            { label: "Pricing", link: "/pricing" }
                        ]
                    }
                },
                contact: {
                    title: "Contact",
                    email: { label: "Email", value: "contactinfo@gmail.com" },
                    address: { label: "Visit Us", value: "Los Angeles, CA 90077 United States" },
                    phone: { label: "Call us Now", value: "+99 1234 5478" }
                },
                bottomLinks: [
                    { label: "Changelog", link: "/changelog" },
                    { label: "Terms", link: "/terms" }
                ],
                copyright: "© 2025. All rights reserved.",
                developer: {
                    text: "Developed by",
                    name: "Swarup",
                    link: "https://google.com"
                }
            });
            setLoading(false);
            setTimeout(() => setVisible(true), 100);
        }, 1200);
        return () => clearTimeout(timer);
    }, []);

    if (loading || !footerData) return require('./skeleton/FooterSkeleton').default();

    return (
        <footer className="bg-card">
            {/* Top Section - Company Info and Links */}
            <div className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                        {/* Company Info */}
                        <div className="lg:col-span-1">
                            <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-foreground">
                                {footerData.companyInfo.name}
                            </h3>
                            <p className="text-card-fore text-sm sm:text-base leading-relaxed">
                                {footerData.companyInfo.tagline}
                            </p>
                        </div>

                        {/* Main Pages */}
                        <div>
                            <h4 className="text-lg sm:text-xl font-bold mb-6 text-foreground">
                                {footerData.links.mainPages.title}
                            </h4>
                            <ul className="space-y-3 sm:space-y-4">
                                {footerData.links.mainPages.items.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            href={item.link}
                                            className="text-card-fore  text-sm sm:text-base hover:text-primary hover:translate-x-1 transition-all block"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Company */}
                        <div>
                            <h4 className="text-lg sm:text-xl font-bold mb-6 text-foreground">
                                {footerData.links.company.title}
                            </h4>
                            <ul className="space-y-3 sm:space-y-4">
                                {footerData.links.company.items.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            href={item.link}
                                            className="text-card-fore text-sm sm:text-base hover:text-primary hover:translate-x-1 transition-all block"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Details */}
                        <div>
                            <h4 className="text-lg sm:text-xl font-bold mb-6 text-foreground">
                                {footerData.contact.title}
                            </h4>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs mb-1 text-foreground">
                                        {footerData.contact.email.label}
                                    </p>
                                    <a
                                        href={`mailto:${footerData.contact.email.value}`}
                                        className="text-card-fore text-sm sm:text-base hover:text-primary hover:opacity-70 transition-opacity block"
                                    >
                                        {footerData.contact.email.value}
                                    </a>
                                </div>
                                <div>
                                    <p className="text-xs mb-1 text-foreground">
                                        {footerData.contact.address.label}
                                    </p>
                                    <p className="text-card-fore text-sm sm:text-base">
                                        {footerData.contact.address.value}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs mb-1 text-foreground">
                                        {footerData.contact.phone.label}
                                    </p>
                                    <a
                                        href={`tel:${footerData.contact.phone.value}`}
                                        className="text-card-fore text-sm sm:text-base hover:text-primary hover:opacity-70 transition-opacity block"
                                    >
                                        {footerData.contact.phone.value}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright Bar - Dark */}
            <div className="text-background bg-foreground px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                        <p className="text-background">
                            {footerData.copyright}
                        </p>
                        {footerData.developer && (
                            <p className="text-background">
                                {footerData.developer.text}{' '}
                                <a
                                    href={footerData.developer.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="footer-developer-link text-primary hover:opacity-70 transition-opacity"
                                >
                                    {footerData.developer.name}
                                </a>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </footer>
    );
}
