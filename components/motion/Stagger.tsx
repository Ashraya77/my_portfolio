"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Children, type ReactNode } from "react";
import { duration, ease, stagger as staggerValues } from "@/lib/motion";

export type StaggerProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Stagger({ children, className, delay = 0 }: StaggerProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : "hidden"}
      transition={{ delay: reducedMotion ? 0 : delay }}
      viewport={{ margin: "-10% 0px", once: true }}
      whileInView="visible"
    >
      {Children.map(children, (child, index) => (
        <motion.div
          transition={{
            delay: reducedMotion ? 0 : index * staggerValues.tight,
            duration: reducedMotion ? 0 : duration.base,
            ease: ease.gentle,
          }}
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
