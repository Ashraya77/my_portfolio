import { VscCode } from "react-icons/vsc";
import {
  SiFramer,
  SiGit,
  SiGithub,
  SiJavascript,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { Marquee } from "@/components/Marquee";
import { PillLabel } from "@/components/PillLabel";

const technologies = [
  { name: "JavaScript", icon: SiJavascript, inverted: true },
  { name: "TypeScript", icon: SiTypescript, inverted: true },
  { name: "Tailwind CSS", icon: SiTailwindcss, inverted: false },
  { name: "Next.js", icon: SiNextdotjs, inverted: false },
  { name: "React", icon: SiReact, inverted: false },
  { name: "Framer Motion", icon: SiFramer, inverted: false },
  { name: "Vercel", icon: SiVercel, inverted: false },
  { name: "Git", icon: SiGit, inverted: false },
  { name: "GitHub", icon: SiGithub, inverted: false },
  { name: "VS Code", icon: VscCode, inverted: false },
];

export type TechStackProps = {
  description?: string;
  speed?: number;
};

export function TechStack({
  description = "The tools and technologies I use to bring ideas to life.",
  speed = 28,
}: TechStackProps) {
  const items = technologies.map(({ icon: Icon, inverted, name }) => (
    <div
      className={`grid size-24 place-items-center sm:size-28 ${
        inverted ? "bg-fg text-bg" : "bg-bg text-fg"
      }`}
      key={name}
    >
      <Icon aria-hidden="true" className="size-12 sm:size-14" />
      <span className="sr-only">{name}</span>
    </div>
  ));

  return (
    <section className="w-full overflow-hidden bg-bg pt-0 pb-28 text-fg sm:pt-0 sm:pb-36 lg:pt-0 lg:pb-44">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 text-center sm:px-10">
        <PillLabel>My Tech Stack</PillLabel>
        <p className="mt-7 max-w-xl text-base leading-7 text-fg-muted sm:text-lg">
          {description}
        </p>
      </div>

      <div className="mt-14 sm:mt-18">
        <Marquee items={items} speed={speed} />
      </div>
    </section>
  );
}
