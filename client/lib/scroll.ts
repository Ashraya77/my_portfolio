import type Lenis from "lenis";

const easeInOutExpo = (value: number) =>
  value === 0 || value === 1
    ? value
    : value < 0.5
      ? 2 ** (20 * value - 10) / 2
      : (2 - 2 ** (-20 * value + 10)) / 2;

export function scrollToSection(href: string, lenis: Lenis | null) {
  const target = href === "#home" ? document.getElementById("home") : document.querySelector(href);

  if (lenis) {
    lenis.scrollTo(target instanceof HTMLElement ? target : 0, {
      duration: 1.4,
      easing: easeInOutExpo,
      offset: 0,
    });
    return;
  }

  if (target instanceof HTMLElement) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    window.scrollTo({ behavior: "smooth", top: 0 });
  }
}
