"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

type Bounds = {
  bottom: number;
  left: number;
  right: number;
  top: number;
};

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], [data-cursor="wrap"]';
const TEXT_ENTRY_SELECTOR = "input, textarea";
const CORNER_SIZE = 8;
const DEFAULT_HALF_SIZE = 18;
const FRAME_PADDING = 6;
const PRESS_INSET = 6;
const IDLE_ROTATION_SPEED = (Math.PI * 2) / 8000;

const emptySubscribe = () => () => {};
function isTextEntry(target: EventTarget | null) {
  return target instanceof Element && Boolean(target.closest(TEXT_ENTRY_SELECTOR));
}

function getInteractiveTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) {
    return null;
  }

  return target.closest<HTMLElement>(INTERACTIVE_SELECTOR);
}

export function CustomCursor() {
  const isEnabled = useSyncExternalStore(emptySubscribe, () => !window.matchMedia("(pointer: coarse)").matches, () => false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const cornerRefs = useRef<Array<HTMLSpanElement | null>>([]);


  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    const corners = cornerRefs.current;

    if (!cursor || !dot || corners.length !== 4 || corners.some((corner) => !corner)) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const html = document.documentElement;
    const activeTarget = { current: null as HTMLElement | null };
    const activeBounds = { current: null as Bounds | null };
    const pointer = { x: 0, y: 0 };
    const smoothedPointer = { x: 0, y: 0 };
    const previousPointer = { x: 0, y: 0 };
    let hasPointer = false;
    let isPressed = false;
    let rotation = 0;
    let rotationBoost = 0;
    let previousTime = 0;
    let animationFrame = 0;
    let resizeObserver: ResizeObserver | null = null;

    html.classList.add("has-custom-cursor");

    const updateBounds = () => {
      const target = activeTarget.current;

      if (!target) {
        return;
      }

      const { bottom, left, right, top } = target.getBoundingClientRect();
      activeBounds.current = { bottom, left, right, top };
    };

    const clearTarget = () => {
      activeTarget.current?.classList.remove("cursor-hovered");
      activeTarget.current = null;
      activeBounds.current = null;
      resizeObserver?.disconnect();
      cursor.classList.remove("is-wrapping");
    };

    const setTarget = (target: HTMLElement | null) => {
      if (target === activeTarget.current) {
        return;
      }

      clearTarget();

      if (!target) {
        return;
      }

      activeTarget.current = target;
      target.classList.add("cursor-hovered");
      updateBounds();
      cursor.classList.add("is-wrapping");

      resizeObserver = new ResizeObserver(updateBounds);
      resizeObserver.observe(target);
    };

    const placeCorner = (index: number, x: number, y: number, angle: number) => {
      const corner = corners[index];

      if (corner) {
        corner.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${angle}rad)`;
      }
    };

    const renderFrame = () => {
      const bounds = activeBounds.current;
      const pressOffset = isPressed ? PRESS_INSET : 0;

      if (activeTarget.current && bounds) {
        const left = bounds.left - FRAME_PADDING + pressOffset;
        const top = bounds.top - FRAME_PADDING + pressOffset;
        const right = bounds.right + FRAME_PADDING - pressOffset - CORNER_SIZE;
        const bottom = bounds.bottom + FRAME_PADDING - pressOffset - CORNER_SIZE;

        placeCorner(0, left, top, 0);
        placeCorner(1, right, top, 0);
        placeCorner(2, right, bottom, 0);
        placeCorner(3, left, bottom, 0);
        return;
      }

      const halfSize = DEFAULT_HALF_SIZE - pressOffset;
      const sine = Math.sin(rotation);
      const cosine = Math.cos(rotation);
      const offsets = [
        [-halfSize, -halfSize],
        [halfSize, -halfSize],
        [halfSize, halfSize],
        [-halfSize, halfSize],
      ];

      offsets.forEach(([x, y], index) => {
        const rotatedX = x * cosine - y * sine;
        const rotatedY = x * sine + y * cosine;

        placeCorner(
          index,
          smoothedPointer.x + rotatedX - CORNER_SIZE / 2,
          smoothedPointer.y + rotatedY - CORNER_SIZE / 2,
          rotation,
        );
      });
    };

    const tick = (timestamp: number) => {
      const delta = previousTime ? Math.min(timestamp - previousTime, 48) : 16;
      previousTime = timestamp;

      if (hasPointer) {
        const easing = reducedMotion ? 0.45 : 0.18;
        smoothedPointer.x += (pointer.x - smoothedPointer.x) * easing;
        smoothedPointer.y += (pointer.y - smoothedPointer.y) * easing;

        if (activeTarget.current) {
          rotation += (0 - rotation) * (reducedMotion ? 0.45 : 0.18);
          rotationBoost *= 0.82;
        } else if (!reducedMotion) {
          rotation += (IDLE_ROTATION_SPEED + rotationBoost) * delta;
          rotationBoost *= 0.9;
        }

        renderFrame();
      }

      animationFrame = window.requestAnimationFrame(tick);
    };

    const onMouseMove = (event: MouseEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      dot.style.transform = `translate3d(${pointer.x - 2.5}px, ${pointer.y - 2.5}px, 0)`;

      if (!hasPointer) {
        hasPointer = true;
        smoothedPointer.x = pointer.x;
        smoothedPointer.y = pointer.y;
        previousPointer.x = pointer.x;
        previousPointer.y = pointer.y;
        cursor.classList.add("is-visible");
        return;
      }

      if (!reducedMotion) {
        const velocity = Math.hypot(pointer.x - previousPointer.x, pointer.y - previousPointer.y);
        rotationBoost = Math.min(0.012, rotationBoost + velocity * 0.00005);
      }

      previousPointer.x = pointer.x;
      previousPointer.y = pointer.y;
    };

    const onMouseOver = (event: MouseEvent) => {
      if (isTextEntry(event.target)) {
        clearTarget();
        cursor.classList.add("is-typing");
        return;
      }

      cursor.classList.remove("is-typing");
      setTarget(getInteractiveTarget(event.target));
    };

    const onMouseOut = (event: MouseEvent) => {
      const target = activeTarget.current;
      const nextTarget = getInteractiveTarget(event.relatedTarget);

      if (target && nextTarget !== target && !target.contains(event.relatedTarget as Node | null)) {
        clearTarget();
      }

      if (!isTextEntry(event.relatedTarget)) {
        cursor.classList.remove("is-typing");
      }
    };

    const onMouseDown = () => {
      isPressed = true;
    };

    const onMouseUp = () => {
      isPressed = false;
    };

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);
    document.addEventListener("mousedown", onMouseDown, { passive: true });
    document.addEventListener("mouseup", onMouseUp, { passive: true });
    window.addEventListener("resize", updateBounds, { passive: true });
    window.addEventListener("scroll", updateBounds, { capture: true, passive: true });
    animationFrame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("resize", updateBounds);
      window.removeEventListener("scroll", updateBounds, true);
      resizeObserver?.disconnect();
      clearTarget();
      html.classList.remove("has-custom-cursor");
    };
  }, [isEnabled]);

  if (!isEnabled) {
    return null;
  }

  return (
    <div aria-hidden="true" className="custom-cursor" ref={cursorRef}>
      <span className="custom-cursor__dot" ref={dotRef} />
      {["top-left", "top-right", "bottom-right", "bottom-left"].map((corner, index) => (
        <span
          className={`custom-cursor__corner custom-cursor__corner--${corner}`}
          key={corner}
          ref={(element) => {
            cornerRefs.current[index] = element;
          }}
        />
      ))}
    </div>
  );
}
