import { FileText, Folder } from "lucide-react";
import { SocialIconButtons } from "@/components/SocialIconButtons";
import { ColorRevealImage } from "@/components/ColorRevealImage";
import { HeroMenu } from "@/components/HeroMenu";
import { ScrollLink } from "@/components/ScrollLink";
import { MaskText } from "@/components/motion/MaskText";
import { Reveal } from "@/components/motion/Reveal";

export type HeroProps = {
  name?: string;
  role?: string;
  imageSrc?: string;
};

export function Hero({
  name = "Ashraya",
  role = "Software Developer",
  imageSrc = "/profile2.jpeg",
}: HeroProps) {
  return (
    <section className="grid min-h-svh overflow-x-clip bg-bg lg:min-h-screen lg:grid-cols-2" id="home">
      <Reveal className="min-h-[46svh] sm:min-h-[54svh] lg:min-h-screen" delay={0.42} onLoad>
      <div className="relative min-h-[46svh] overflow-hidden sm:min-h-[54svh] lg:min-h-screen">
        <ColorRevealImage alt={`${name} portrait`} priority sizes="(max-width: 1023px) 100vw, 50vw" src={imageSrc} />
      </div>
      </Reveal>

      <div className="relative z-10 flex min-h-[29rem] flex-col py-5 sm:min-h-[38rem] sm:py-8 lg:min-h-screen lg:py-10">
        <Reveal delay={0} onLoad>
        <header className="flex items-center justify-between px-5 sm:px-10 lg:px-12">
          <SocialIconButtons />

          <HeroMenu />
        </header>
        </Reveal>

        <div className="flex flex-none flex-col justify-start px-5 pb-8 pt-10 sm:flex-1 sm:justify-center sm:px-10 sm:py-24 lg:-ml-[12%] lg:px-0 lg:pr-12 lg:py-28">
          <Reveal as="p" className="mb-2 text-base font-medium tracking-[-0.02em] text-white sm:text-lg" delay={0.12} onLoad>
            Hi, I&apos;m {name}.
          </Reveal>
          <MaskText as="h1" className="font-display max-w-[11ch] text-[clamp(2.5rem,10vw,4.75rem)] font-black italic leading-[0.82] tracking-[-0.05em] text-fg sm:max-w-none sm:whitespace-nowrap sm:text-[clamp(2.75rem,4.5vw,4.75rem)]" delay={0.18} onLoad text={`A ${role}`} />
        </div>


        <ScrollLink
          className="font-display relative z-10 ml-auto mt-1 grid size-24 -rotate-6 place-items-center rounded-full bg-fg p-3 text-center text-xs font-black italic leading-none text-bg transition-transform hover:scale-105 sm:absolute sm:bottom-32 sm:right-10 sm:mt-0 sm:size-32 sm:p-4 sm:text-sm lg:bottom-36 lg:right-[14%]"
          href="#contact"
        >
          Contact Me
        </ScrollLink>

        <footer className="mt-8 flex flex-wrap gap-2 px-5 sm:mt-0 sm:gap-3 sm:px-10 sm:pr-32 lg:pl-12">
          <ScrollLink
            className="inline-flex items-center gap-2 rounded-full border border-fg px-4 py-2.5 text-xs font-semibold text-fg transition-colors hover:bg-fg hover:text-bg"
            href="#projects"
          >
            <Folder aria-hidden="true" size={15} strokeWidth={1.75} />
            View My Projects
          </ScrollLink>
          <button
            className="inline-flex items-center gap-2 rounded-full border border-fg px-4 py-2.5 text-xs font-semibold text-fg transition-colors hover:bg-fg hover:text-bg"
            type="button"
          >
            <FileText aria-hidden="true" size={15} strokeWidth={1.75} />
            Download CV
          </button>
        </footer>
      </div>
    </section>
  );
}
