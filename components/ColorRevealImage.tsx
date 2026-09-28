"use client";

import Image, { type ImageProps } from "next/image";
import { useSpring, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

type ColorRevealImageProps = Pick<ImageProps, "alt" | "priority" | "sizes" | "src">;

function supportsMaskImage() {
  return CSS.supports("mask-image", "radial-gradient(circle, black, transparent)") ||
    CSS.supports("-webkit-mask-image", "radial-gradient(circle, black, transparent)");
}

export function ColorRevealImage({ alt, priority, sizes, src }: ColorRevealImageProps) {
  const reducedMotion = useReducedMotion();
  const maskSupported = useSyncExternalStore(emptySubscribe, supportsMaskImage, () => false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rawRadius = useMotionValue(0);
  const smoothX = useSpring(pointerX, { damping: 28, stiffness: 200 });
  const smoothY = useSpring(pointerY, { damping: 28, stiffness: 200 });
  const smoothRadius = useSpring(rawRadius, { damping: 24, stiffness: 220 });
  const x = reducedMotion ? pointerX : smoothX;
  const y = reducedMotion ? pointerY : smoothY;
  const radius = reducedMotion ? rawRadius : smoothRadius;
  const maskImage = useMotionTemplate`radial-gradient(circle ${radius}px at ${x}px ${y}px, black 0%, black 55%, transparent 100%)`;

  function updatePointer(event: React.PointerEvent<HTMLDivElement>, snap = false) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const nextX = event.clientX - bounds.left;
    const nextY = event.clientY - bounds.top;
    const nextRadius = Math.max(110, Math.min(180, Math.min(bounds.width, bounds.height) * 0.32));

    pointerX.set(nextX);
    pointerY.set(nextY);
    if (snap && !reducedMotion) {
      smoothX.set(nextX);
      smoothY.set(nextY);
    }
    rawRadius.set(nextRadius);
  }

  return (
    <div
      className="absolute inset-0 overflow-hidden touch-pan-y"
      onPointerDown={(event) => {
        if (event.pointerType === "touch") updatePointer(event, true);
      }}
      onPointerEnter={(event) => updatePointer(event, true)}
      onPointerLeave={() => rawRadius.set(0)}
      onPointerMove={(event) => updatePointer(event)}
      onPointerUp={(event) => {
        if (event.pointerType === "touch") rawRadius.set(0);
      }}
      onPointerCancel={() => rawRadius.set(0)}
    >
      <Image alt={alt} className="pointer-events-none object-cover grayscale" draggable={false} fill priority={priority} sizes={sizes} src={src} />
      {maskSupported ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 will-change-[mask-image]"
          style={{ maskImage, WebkitMaskImage: maskImage }}
        >
          <Image alt="" aria-hidden="true" className="pointer-events-none object-cover" draggable={false} fill priority={priority} sizes={sizes} src={src} />
        </div>
      ) : null}
    </div>
  );
}
