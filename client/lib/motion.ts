import type { Variants } from "framer-motion";

export const ease = {
  dramatic: [0.76, 0, 0.24, 1],
  gentle: [0.22, 1, 0.36, 1],
} as const;

export const duration = {
  fast: 0.3,
  base: 0.6,
  slow: 0.9,
} as const;

export const stagger = {
  tight: 0.06,
  base: 0.08,
  relaxed: 0.12,
} as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease: ease.gentle },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.base, ease: ease.gentle },
  },
};

export const maskUp: Variants = {
  hidden: { opacity: 0, y: "110%" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease: ease.gentle },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.04, staggerChildren: stagger.base },
  },
};
