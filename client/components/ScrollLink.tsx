"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { useLenis } from "@/components/SmoothScroll";
import { scrollToSection } from "@/lib/scroll";

type ScrollLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  href: string;
};

export function ScrollLink({ children, href, onClick, ...props }: ScrollLinkProps) {
  const lenis = useLenis();

  return <a href={href} onClick={(event) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    event.preventDefault();
    scrollToSection(href, lenis);
  }} {...props}>{children}</a>;
}
