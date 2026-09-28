"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { useLenis } from "@/components/SmoothScroll";
import { scrollToSection } from "@/lib/scroll";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];
const emptySubscribe = () => () => {};

type Reveal = {
  x: number;
  y: number;
  radius: number;
};

export type HeroMenuProps = {
  email?: string;
  name?: string;
};

function getReveal(button: HTMLButtonElement): Reveal {
  const { bottom, left, right, top } = button.getBoundingClientRect();
  const x = (left + right) / 2;
  const y = (top + bottom) / 2;
  const radius = Math.max(
    Math.hypot(x, y),
    Math.hypot(window.innerWidth - x, y),
    Math.hypot(x, window.innerHeight - y),
    Math.hypot(window.innerWidth - x, window.innerHeight - y),
  );

  return { x, y, radius };
}

export function HeroMenu({
  email = "aashray851@gmail.com",
  name = "Ashraya",
}: HeroMenuProps) {
  const isMounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [isOpen, setIsOpen] = useState(false);
  const [reveal, setReveal] = useState<Reveal>({ radius: 0, x: 0, y: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();
  const lenis = useLenis();
  const duration = reducedMotion ? 0 : 0.75;
  const collapsedClip = `circle(0px at ${reveal.x}px ${reveal.y}px)`;
  const expandedClip = `circle(${reveal.radius}px at ${reveal.x}px ${reveal.y}px)`;


  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    lenis?.stop();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.documentElement.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      lenis?.start();
    };
  }, [isOpen, lenis]);

  function openMenu() {
    const trigger = triggerRef.current;
    if (!trigger) {
      return;
    }

    setReveal(getReveal(trigger));
    setIsOpen(true);
  }

  function closeMenu() {
    setIsOpen(false);
    triggerRef.current?.focus();
  }

  function navigate(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
    event.preventDefault();
    closeMenu();

    window.setTimeout(() => {
      scrollToSection(href, lenis);
    }, 350);
  }

  const overlay = (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          animate={{ clipPath: expandedClip }}
          aria-label="Site menu"
          aria-modal="true"
          className="fixed inset-0 z-[100] overflow-y-auto bg-fg text-bg"
          exit={{ clipPath: collapsedClip }}
          id="site-menu"
          initial={{ clipPath: collapsedClip }}
          key="site-menu"
          role="dialog"
          data-lenis-prevent
          transition={{ duration, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex min-h-svh flex-col px-6 py-6 sm:px-10 sm:py-8 lg:px-12 lg:py-10">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em]">Menu</p>
              <button
                aria-label="Close menu"
                className="grid size-11 place-items-center rounded-full border-2 border-bg text-bg transition-colors hover:bg-bg hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bg"
                onClick={closeMenu}
                ref={closeRef}
                type="button"
              >
                <X aria-hidden="true" size={20} strokeWidth={1.75} />
              </button>
            </div>

            <nav aria-label="Pages" className="my-auto py-12 sm:py-16">
              <ul className="grid gap-2 sm:gap-3">
                {links.map((link, index) => (
                  <li className="overflow-hidden" key={link.href}>
                    <motion.a
                      animate={{ opacity: 1, y: 0 }}
                      className="group flex min-w-0 items-baseline gap-4 py-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bg"
                      exit={{ opacity: 0, y: "110%" }}
                      href={link.href}
                      initial={{ opacity: 0, y: "110%" }}
                      onClick={(event) => navigate(event, link.href)}
                      transition={{
                        delay: reducedMotion ? 0 : 0.18 + index * 0.07,
                        duration: reducedMotion ? 0 : 0.45,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <span className="shrink-0 text-xs font-medium opacity-60 sm:text-sm">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display min-w-0 break-words text-[clamp(2.75rem,11vw,7.5rem)] font-black italic leading-[1.05] tracking-[-0.05em] transition-transform duration-300 group-hover:translate-x-3">
                        {link.label}
                      </span>
                    </motion.a>
                  </li>
                ))}
              </ul>
            </nav>

            <footer className="flex flex-col gap-3 border-t border-bg/20 pt-5 text-xs text-bg/70 sm:flex-row sm:items-center sm:justify-between sm:text-sm">
              <a className="w-fit transition-colors hover:text-bg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bg" href={`mailto:${email}`}>
                {email}
              </a>
              <p>{`\u00A9 2026 ${name}`}</p>
            </footer>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  return (
    <>
      <button
        aria-controls="site-menu"
        aria-expanded={isOpen}
        aria-label="Open menu"
        className="grid size-11 place-items-center rounded-full border-2 border-fg text-fg transition-colors hover:bg-fg hover:text-bg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg"
        onClick={openMenu}
        ref={triggerRef}
        type="button"
      >
        <Menu aria-hidden="true" size={20} strokeWidth={1.75} />
      </button>
      {isMounted ? createPortal(overlay, document.body) : null}
    </>
  );
}
