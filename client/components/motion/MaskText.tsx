"use client";

import { motion, useReducedMotion } from "framer-motion";
import { duration, ease, stagger } from "@/lib/motion";

export type MaskTextProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  onLoad?: boolean;
};

export function MaskText({ text, className, as = "span", delay = 0, onLoad = false }: MaskTextProps) {
  const reducedMotion = useReducedMotion();
  const lines = text.split("\n");
  const Tag = as;

  return (
    <Tag className={className}>
      {lines.map((line, index) => (
        <span className="block overflow-hidden" key={`${line}-${index}`}>
          <motion.span
            animate={onLoad ? { opacity: 1, y: 0 } : undefined}
            className="block will-change-transform"
            initial={onLoad && !reducedMotion ? { opacity: 0, y: "110%" } : false}
            transition={{
              delay: reducedMotion ? 0 : delay + index * stagger.tight,
              duration: reducedMotion ? 0 : duration.base,
              ease: ease.gentle,
            }}
            viewport={{ margin: "-10% 0px", once: true }}
            whileInView={onLoad ? undefined : { opacity: 1, y: 0 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
