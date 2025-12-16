import { useReducedMotion, type Easing } from "framer-motion";

export const CONFIDENCE_EASE: Easing = [0.16, 1, 0.3, 1];

export const MOTION = {
  slow: {
    duration: 1.2,
    ease: CONFIDENCE_EASE,
  },
  medium: {
    duration: 0.8,
    ease: CONFIDENCE_EASE,
  },
  fast: {
    duration: 0.4,
    ease: CONFIDENCE_EASE,
  },
};

export function useMotionSafe<T>(value: T, reduced: T) {
  const prefersReduced = useReducedMotion();
  return prefersReduced ? reduced : value;
}
