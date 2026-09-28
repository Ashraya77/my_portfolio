import type { ReactNode } from "react";

export type PillLabelProps = {
  children: ReactNode;
  className?: string;
};

export function PillLabel({ children, className }: PillLabelProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-border px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-fg ${className ?? ""}`}
    >
      {children}
    </span>
  );
}
