"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useSyncExternalStore } from "react";

const SESSION_KEY = "portfolio-loading-screen-seen";
const LETTER_INTERVAL_MS = 90;
const HOLD_DURATION_MS = 400;

const subscribeToSessionStorage = () => () => {};
const getSessionStorageSnapshot = () =>
  window.sessionStorage.getItem(SESSION_KEY) === "true";
const getServerSnapshot = () => false;

export type LoadingScreenProps = {
  name?: string;
};

export function LoadingScreen({ name = "ASHRAYA" }: LoadingScreenProps) {
  const letters = Array.from(name);
  const letterCount = letters.length;
  const hasSeenLoadingScreen = useSyncExternalStore(
    subscribeToSessionStorage,
    getSessionStorageSnapshot,
    getServerSnapshot,
  );
  const shouldPlay = !hasSeenLoadingScreen;
  const [typedCount, setTypedCount] = useState(0);
  const [isBursting, setIsBursting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!shouldPlay || letterCount === 0 || typedCount >= letterCount) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setTypedCount((currentCount) =>
        Math.min(currentCount + 1, letterCount),
      );
    }, LETTER_INTERVAL_MS);

    return () => window.clearTimeout(timeoutId);
  }, [letterCount, shouldPlay, typedCount]);

  useEffect(() => {
    if (!shouldPlay || typedCount !== letterCount) {
      return;
    }

    const timeoutId = window.setTimeout(
      () => setIsBursting(true),
      HOLD_DURATION_MS,
    );

    return () => window.clearTimeout(timeoutId);
  }, [letterCount, shouldPlay, typedCount]);

  if (!isVisible || !shouldPlay) {
    return null;
  }

  const midpoint = (letterCount - 1) / 2;

  return (
    <motion.div
      aria-label="Loading portfolio"
      className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-bg px-6 text-fg"
      initial={{ opacity: 1, scale: 1 }}
      animate={
        isBursting
          ? { opacity: 0, scale: 1.035 }
          : { opacity: 1, scale: 1 }
      }
      transition={{
        duration: isBursting ? 0.36 : 0,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <span className="sr-only">Loading portfolio</span>

      <div
        aria-hidden="true"
        className="font-display flex items-center whitespace-nowrap text-[clamp(3.5rem,15vw,15rem)] font-black italic uppercase leading-none tracking-[-0.05em]"
      >
        {letters.slice(0, typedCount).map((letter, index) => {
          const distanceFromCenter = index - midpoint;

          return (
            <motion.span
              animate={
                isBursting
                  ? {
                      opacity: 0,
                      scale: 1.6,
                      x: distanceFromCenter * 18,
                      y: (index % 2 === 0 ? 1 : -1) *
                        (8 + Math.abs(distanceFromCenter) * 4),
                    }
                  : { opacity: 1, scale: 1, x: 0, y: 0 }
              }
              initial={{ opacity: 0, scale: 0.98, y: "0.12em" }}
              key={`${letter}-${index}`}
              onAnimationComplete={() => {
                if (isBursting && index === letterCount - 1) {
                  window.sessionStorage.setItem(SESSION_KEY, "true");
                  setIsVisible(false);
                }
              }}
              transition={{
                duration: isBursting ? 0.28 : 0.06,
                delay: isBursting ? index * 0.025 : 0,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {letter}
            </motion.span>
          );
        })}
        <motion.span
          animate={isBursting ? { opacity: 0 } : { opacity: [0, 1, 0] }}
          className="ml-[0.04em] font-mono font-normal"
          transition={
            isBursting
              ? { duration: 0.12 }
              : { duration: 0.8, repeat: Number.POSITIVE_INFINITY }
          }
        >
          _
        </motion.span>
      </div>
    </motion.div>
  );
}
