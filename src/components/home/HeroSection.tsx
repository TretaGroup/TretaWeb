'use client';
import Button from '@/components/common/Button';
import React, { useEffect, useRef } from 'react';
import BussinessCard from '@/components/home/BussinessCard';
import HeroSectionSkeleton from '../skeleton/HeroSectionSkeleton';

interface HeroSectionProps {
  maxZoom?: number;
}


const HeroSection: React.FC<HeroSectionProps> = ({ maxZoom = 0.15 }) => {
  const [loading, setLoading] = React.useState(true);
  const [visible, setVisible] = React.useState(false);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => setVisible(true), 100); // Delay for animation
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const onScroll = () => {
      if (!bgRef.current) return;

      const progress = Math.min(window.scrollY / window.innerHeight, 1);
      const scale = 1 + progress * maxZoom;
      const translate = progress * 2;

      bgRef.current.style.transform =
        `translate3d(-${translate}%, -${translate}%, 0) scale(${scale})`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, [maxZoom]);

  if (loading) return <HeroSectionSkeleton />;
  return (
    <section className="relative h-screen">
      {/* CLIPPED BACKGROUND LAYER */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          ref={bgRef}
          className="absolute inset-0 will-change-transform origin-top bg-hero-animation"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
              url('/images/hero-img.png')
            `,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: 'translate3d(0,0,0) scale(1)',
          }}
        />
      </div>

      {/* CONTENT LAYER (NOT CLIPPED) */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 h-full flex items-center">
        {/* TEXT */}
        <div className={`w-full text-white transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-5xl font-bold mb-4 transition-all duration-700 delay-100">
            Welcome to Our Website
          </h1>
          <p className="text-xl mb-8 max-w-xl transition-all duration-700 delay-200">
            Discover our features and services.
          </p>

          <Button
            href="#get-started"
            icon="arrow-up-right"
            className={`bg-primary inline-flex transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            Get Started
          </Button>
        </div>

        {/* BUSINESS CARD (FREE TO OVERFLOW) */}
        <BussinessCard />
      </div>
    </section>
  );
};

export default HeroSection;
