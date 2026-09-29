import type { CSSProperties, ReactNode } from "react";

export type MarqueeProps = {
  items: ReactNode[];
  speed?: number;
  className?: string;
};

export function Marquee({ items, speed = 24, className }: MarqueeProps) {
  if (items.length === 0) {
    return null;
  }

  const duration = Number.isFinite(speed) && speed > 0 ? speed : 24;
  const style = {
    "--marquee-duration": `${duration}s`,
  } as CSSProperties;

  return (
    <div className={`marquee ${className ?? ""}`}>
      <div className="marquee__track" style={style}>
        <div className="flex shrink-0 gap-6 pr-6">
          {items.map((item, index) => (
            <div className="shrink-0" key={index}>
              {item}
            </div>
          ))}
        </div>
        <div aria-hidden="true" className="flex shrink-0 gap-6 pr-6" inert>
          {items.map((item, index) => (
            <div className="shrink-0" key={index}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
