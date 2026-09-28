"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { duration, fadeUp } from "@/lib/motion";

export type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "p" | "span";
  onLoad?: boolean;
};

export function Reveal({ children, className, delay = 0, as = "div", onLoad = false }: RevealProps) {
  const reducedMotion = useReducedMotion();
  const MotionComponent = as === "p" ? motion.p : as === "span" ? motion.span : motion.div;
  const transition = { duration: reducedMotion ? 0 : duration.base, delay: reducedMotion ? 0 : delay };

  return (
    <MotionComponent
      animate={onLoad ? "visible" : undefined}
      className={className}
      initial={onLoad && !reducedMotion ? "hidden" : false}
      transition={transition}
      variants={fadeUp}
      viewport={{ margin: "-10% 0px", once: true }}
      whileInView={onLoad ? undefined : "visible"}
    >
      {children}
    </MotionComponent>
  );
}
