// src/types/HeroSlide.ts
import { heroAnimations } from "@/src/lib/heroAnimations";

export type HeroAnimationKey = keyof typeof heroAnimations;

export interface HeroSlide {
    kicker:string
  title: string;
  subtitle: string;
  animation: HeroAnimationKey;
  parallax?: number;
  media?: {
    type: "image" | "video";
    src: string;
    poster?: string;
  };
  cta?: {
    primary: {
      label: string;
      href: string;
    };
    secondary?: {
      label: string;
      href: string;
    };
  };
}
