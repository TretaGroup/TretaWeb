'use client';
import { useEffect, useRef } from 'react';

interface ParallaxLayer {
  ref: React.RefObject<HTMLElement>;
  speed?: number;
  zoom?: number;
}

export function useParallax(layers: ParallaxLayer[]) {
  const rafRef = useRef<number | null>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const onScroll = () => {
      lastScrollY.current = window.scrollY;
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(update);
      }
    };

    const update = () => {
      const scrollY = lastScrollY.current;
      const vh = window.innerHeight;
      const progress = Math.min(scrollY / vh, 1);

      layers.forEach(({ ref, speed = 0.15, zoom = 0.08 }) => {
        if (!ref.current) return;

        const translateY = progress * speed * 100;
        const scale = 1 + progress * zoom;

        ref.current.style.transform =
          `translate3d(0, ${-translateY}px, 0) scale(${scale})`;
      });

      rafRef.current = null;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [layers]);
}
