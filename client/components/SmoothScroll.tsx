"use client";

import Lenis from "lenis";
import { cancelFrame, frame } from "framer-motion";
import { createContext, type ReactNode, useContext, useEffect, useRef, useState } from "react";

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const instanceRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frameId = 0;

    const destroy = () => {
      instanceRef.current?.destroy();
      instanceRef.current = null;
      setLenis(null);
    };

    const configure = () => {
      destroy();
      if (media.matches) return;

      const instance = new Lenis({
        anchors: false,
        autoRaf: false,
        lerp: 0.1,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 1,
      });
      const update = (data: { timestamp: number }) => instance.raf(data.timestamp);
      frame.update(update, true);
      instanceRef.current = instance;
      setLenis(instance);

      const onResize = () => instance.resize();
      window.addEventListener("resize", onResize);
      document.fonts?.ready.then(onResize);

      return () => {
        window.removeEventListener("resize", onResize);
        cancelFrame(update);
        instance.destroy();
        if (instanceRef.current === instance) instanceRef.current = null;
      };
    };

    let cleanup = () => {};
    const refresh = () => {
      cleanup();
      cleanup = configure() ?? (() => {});
    };
    frameId = window.requestAnimationFrame(refresh);
    media.addEventListener("change", refresh);

    return () => {
      window.cancelAnimationFrame(frameId);
      media.removeEventListener("change", refresh);
      cleanup();
      destroy();
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
