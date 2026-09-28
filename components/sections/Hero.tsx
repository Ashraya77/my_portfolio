import { FileText, Folder, Menu } from "lucide-react";
import Image from "next/image";
import { SocialIconButtons } from "@/components/SocialIconButtons";

export type HeroProps = {
  name?: string;
  role?: string;
  imageSrc?: string;
};

export function Hero({
  name = "Ashraya",
  role = "Software Developer",
  imageSrc = "/profile.png",
}: HeroProps) {
  return (
    <section className="grid min-h-svh overflow-x-clip bg-bg lg:min-h-screen lg:grid-cols-2">
      <div className="relative min-h-[60svh] overflow-hidden lg:min-h-screen">
        <Image
          alt={`${name} portrait`}
          className="object-cover grayscale"
          fill
          preload
          sizes="(max-width: 1023px) 100vw, 50vw"
          src={imageSrc}
        />
      </div>

      <div className="relative z-10 flex min-h-[38rem] flex-col py-6 sm:py-8 lg:min-h-screen lg:py-10">
        <header className="flex items-center justify-between px-6 sm:px-10 lg:px-12">
          <SocialIconButtons />

          <button
            aria-label="Open menu"
            className="grid size-11 place-items-center rounded-full border border-fg text-fg transition-colors hover:bg-fg hover:text-bg"
            type="button"
          >
            <Menu aria-hidden="true" size={20} strokeWidth={1.75} />
          </button>
        </header>

        <div className="flex flex-1 flex-col justify-center py-24 pl-6 pr-6 sm:py-28 sm:pl-10 sm:pr-10 lg:-ml-[12%] lg:pl-0 lg:pr-12">
          <p className="mb-2 text-lg font-medium tracking-[-0.02em] text-white">
            Hi, I&apos;m {name}.
          </p>
          <h1 className="font-display max-w-none whitespace-nowrap text-[clamp(2rem,4.5vw,4.75rem)] font-black italic leading-[0.82] tracking-[-0.05em] text-fg">
            A {role}
          </h1>
        </div>


        <a
          className="font-display absolute bottom-32 right-6 z-10 grid size-28 -rotate-6 place-items-center rounded-full bg-fg p-4 text-center text-sm font-black italic leading-none text-bg transition-transform hover:scale-105 sm:right-10 sm:size-32 lg:bottom-36 lg:right-[14%]"
          href="#contact"
        >
          Contact Me
        </a>

        <footer className="flex flex-wrap gap-3 pl-6 pr-24 sm:pl-10 sm:pr-32 lg:pl-12">
          <button
            className="inline-flex items-center gap-2 rounded-full border border-fg px-4 py-2.5 text-xs font-semibold text-fg transition-colors hover:bg-fg hover:text-bg"
            type="button"
          >
            <Folder aria-hidden="true" size={15} strokeWidth={1.75} />
            View My Projects
          </button>
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
