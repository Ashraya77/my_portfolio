import { PillLabel } from "@/components/PillLabel";
import { MaskText } from "@/components/motion/MaskText";
import { Reveal } from "@/components/motion/Reveal";

const defaultStats = [
  { value: "15+", label: "Projects Involvements" },
  { value: "2+", label: "Years of Learning" },
  { value: "100%", label: "Commitment" },
];

export type AboutStat = {
  value: string;
  label: string;
};

export type AboutProps = {
  headline?: string;
  description?: string;
  stats?: AboutStat[];
};

export function About({
  headline = "I design and build smooth,\ninteractive web and mobile experiences.",
  description = "I turn thoughtful ideas into polished digital products that feel clear, responsive, and enjoyable to use.",
  stats = defaultStats,
}: AboutProps) {
  return (
    <section className="relative overflow-hidden border-t border-border bg-bg px-6 pt-28 pb-16 text-fg sm:px-10 sm:pt-36 sm:pb-20 lg:px-12 lg:pt-44 lg:pb-24" id="about">
      <div className="mx-auto flex max-w-7xl flex-col items-center text-center">
        <Reveal><PillLabel>About Me</PillLabel></Reveal>

        <MaskText as="h2" className="font-display mt-8 w-full max-w-none text-[clamp(2.5rem,5.5vw,5.5rem)] font-black italic leading-[0.9] tracking-[-0.05em] text-fg" text={headline} />

        <Reveal className="mt-8 max-w-4xl">
          <p className="text-base leading-7 text-fg-muted sm:text-lg">{description}</p>
        </Reveal>

      <div className="relative mt-10 w-full sm:mt-28">
  <div className="mx-auto grid max-w-3xl grid-cols-3 gap-4 text-left sm:gap-8">
    {stats.map(({ value, label }) => (
      <div key={`${value}-${label}`}>
        <p className="font-display text-[clamp(2.5rem,5vw,5rem)] font-black italic leading-none tracking-[-0.05em] text-fg">
          {value}
        </p>
        <p className="mt-3 max-w-[14ch] text-[10px] font-semibold uppercase leading-tight tracking-[0.06em] text-fg sm:text-xs">
          {label}
        </p>
      </div>
    ))}
  </div>
</div>
      </div>
    </section>
  );
}