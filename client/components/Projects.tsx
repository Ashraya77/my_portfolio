"use client";

import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { PillLabel } from "@/components/PillLabel";
import { MaskText } from "@/components/motion/MaskText";
import { duration, ease, stagger } from "@/lib/motion";
import { projects, type Project } from "@/data/projects";

const stageSizes = "(min-width: 1024px) 60vw, 92vw";

function projectDomain(url?: string) {
  if (!url) return null;

  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

function ProjectStage({ project, priority }: { project: Project; priority: boolean }) {
  const type = project.type ?? "web";
  const imageSources = project.images?.length ? project.images : project.image ? [project.image] : [];
  const stageContent = type === "app" ? (
    <div
      className="group relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-fg/5 p-4 sm:p-6"
      style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)", backgroundSize: "14px 14px" }}
    >
      <div className="flex h-full items-center justify-center gap-3 sm:gap-5">
        {imageSources.slice(0, 3).map((source, index) => (
          <div
            className="relative h-[86%] aspect-[9/19.5] overflow-hidden rounded-[2rem] border-2 border-fg bg-bg transition-transform duration-500 ease-out group-hover:-translate-y-2"
            key={source}
            style={{ marginTop: index === 1 ? "-5%" : index === 2 ? "5%" : "0", transitionDelay: `${index * 70}ms`, zIndex: imageSources.length - index }}
          >
            <Image alt={`${project.title} mobile app screen ${index + 1}`} className="object-cover" fill priority={priority && index === 0} sizes={stageSizes} src={source} />
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="group relative aspect-[16/10] overflow-hidden bg-fg/5">
      <div className="relative z-10 flex h-7 items-center border-b border-border bg-bg px-3">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="size-2 rounded-full border border-fg/60" />
          <span className="size-2 rounded-full border border-fg/60" />
          <span className="size-2 rounded-full border border-fg/60" />
        </span>
        {projectDomain(project.liveUrl) ? <span className="absolute left-1/2 max-w-[55%] -translate-x-1/2 truncate rounded-full border border-border px-3 py-0.5 text-[9px] text-fg-muted">{projectDomain(project.liveUrl)}</span> : null}
      </div>
      {project.image ? (
        <Image alt={`${project.title} website homepage screenshot`} className="object-cover object-top grayscale transition-transform duration-700 ease-out group-hover:scale-[1.04]" fill priority={priority} sizes={stageSizes} src={project.image} />
      ) : null}
      {project.liveUrl ? <span aria-hidden="true" className="pointer-events-none absolute bottom-4 left-4 translate-y-2 border border-fg/60 bg-bg px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">View project -&gt;</span> : null}
    </div>
  );

  return (
    <div className="border border-border">
      {project.liveUrl && type === "web" ? <a aria-label={`View ${project.title}`} className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg" href={project.liveUrl} rel="noreferrer" target="_blank">{stageContent}</a> : stageContent}
    </div>
  );
}

function ProjectInfo({ project, index }: { project: Project; index: number }) {
  const typeLabel = project.type === "app" ? "Mobile app" : "Website";

  return (
    <div className="flex min-w-0 flex-1 flex-col justify-between">
      <div>
        <p aria-hidden="true" className="font-display text-[clamp(4rem,9vw,9rem)] font-black italic leading-[0.72] tracking-[-0.08em] text-fg/10">{String(index + 1).padStart(2, "0")}</p>
        {(typeLabel || project.year) ? <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-fg-muted">{typeLabel}{project.year ? <><span aria-hidden="true" className="mx-2">/</span>{project.year}</> : null}</p> : null}
      </div>

      <div className="py-8 lg:py-6">
        <MaskText as="h3" className="font-display text-[clamp(2rem,3.6vw,3.5rem)] font-black italic leading-none tracking-[-0.05em] text-fg" text={project.title} />
        <p className="mt-4 max-w-[42ch] text-sm leading-6 text-fg-muted sm:text-base sm:leading-7">{project.description}</p>
        {project.tags?.length ? <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>{project.tags.slice(0, 5).map((tag) => <li className="border border-border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-fg-muted" key={tag}>{tag}</li>)}</ul> : null}
      </div>

      {(project.liveUrl || project.repoUrl) ? <div className="grid gap-4">
        {project.liveUrl ? <a className="group relative inline-flex min-h-12 items-center justify-center overflow-hidden bg-fg px-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-bg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg" href={project.liveUrl} rel="noreferrer" target="_blank"><span className="absolute inset-0 origin-bottom scale-y-0 bg-bg transition-transform duration-300 ease-out group-hover:scale-y-100" /><span className="relative transition-colors duration-300 group-hover:text-fg">View live site -&gt;</span></a> : null}
        {project.repoUrl ? <a className="group w-fit text-xs font-semibold uppercase tracking-[0.16em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg" href={project.repoUrl} rel="noreferrer" target="_blank">Source -&gt;<span aria-hidden="true" className="mt-1 block h-px w-full origin-left bg-fg transition-transform duration-300 group-hover:scale-x-0" /></a> : null}
      </div> : null}
    </div>
  );
}

function StackingCard({ index, onActive, project }: { index: number; onActive: (index: number) => void; project: Project }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const [mobileTall, setMobileTall] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const active = useInView(wrapperRef, { amount: 0.45 });
  const { scrollYProgress } = useScroll({ target: wrapperRef, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.82, 1], [1, 0.94, 0.94]);
  const mobileScale = useTransform(scrollYProgress, [0, 0.82, 1], [1, 0.96, 0.96]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.82, 1], [1, 0.55, 0.55]);
  const isLast = index === projects.length - 1;

  useEffect(() => {
    if (active) onActive(index);
  }, [active, index, onActive]);

  useEffect(() => {
    const checkHeight = () => {
      const compact = window.innerWidth < 1024;
      setIsMobile(compact);
      if (!compact || !cardRef.current) {
        setMobileTall(false);
        return;
      }

      setMobileTall(cardRef.current.scrollHeight > window.innerHeight - 72);
    };

    checkHeight();
    window.addEventListener("resize", checkHeight);
    return () => window.removeEventListener("resize", checkHeight);
  }, []);

  const stackStyle = { "--stack-top": `calc(5.5rem + ${index}rem)` } as CSSProperties;
  const wrapperClass = mobileTall ? "relative mb-[12vh]" : "sticky top-[4.5rem] mb-[12vh] lg:top-[var(--stack-top)]";

  return (
    <div className={wrapperClass} ref={wrapperRef} style={stackStyle}>
      <motion.article
        className="mx-auto max-w-7xl border border-border bg-bg p-4 sm:p-5 lg:min-h-[min(80svh,720px)] lg:p-6 xl:p-8"
        initial={false}
        ref={cardRef}
        style={isLast || reducedMotion ? { transformOrigin: "top center" } : { scale: isMobile ? mobileScale : scale, opacity: contentOpacity, transformOrigin: "top center" }}
      >
        <div className="grid gap-6 lg:h-full lg:grid-cols-12 lg:gap-8">
          <motion.div
            className="lg:col-span-8 lg:flex lg:items-center"
            initial={reducedMotion ? false : { clipPath: "inset(100% 0 0 0)" }}
            transition={{ duration: reducedMotion ? 0 : duration.slow, ease: ease.dramatic }}
            viewport={{ amount: 0.25, once: true }}
            whileInView={reducedMotion ? undefined : { clipPath: "inset(0 0 0 0)" }}
          >
            <ProjectStage priority={index === 0} project={project} />
          </motion.div>
          <motion.div
            className="lg:col-span-4"
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            transition={{ delay: reducedMotion ? 0 : stagger.base, duration: reducedMotion ? 0 : duration.base, ease: ease.gentle }}
            viewport={{ amount: 0.25, once: true }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          >
            <ProjectInfo index={index} project={project} />
          </motion.div>
        </div>
      </motion.article>
    </div>
  );
}

export function Projects() {
  const [active, setActive] = useState(0);
  const count = String(projects.length).padStart(2, "0");

  return (
    <section className="scroll-mt-20 border-t border-border bg-bg px-5 py-24 text-fg sm:px-10 sm:py-32 lg:px-12 lg:py-40" id="projects">
      <div className="mx-auto max-w-7xl">
        <header className="mb-14 grid gap-7 lg:mb-20 lg:grid-cols-[1fr_auto] lg:items-end">
          <div><PillLabel>Projects</PillLabel><MaskText as="h2" className="font-display mt-7 text-[clamp(3.25rem,7vw,6.5rem)] font-black italic leading-[0.84] tracking-[-0.05em]" text="Selected work." /></div>
          <p className="hidden text-[10px] font-semibold uppercase tracking-[0.18em] text-fg-muted lg:block">{count} selected works</p>
        </header>

        <div className="grid lg:grid-cols-[4rem_minmax(0,1fr)] lg:gap-8">
          <aside className="hidden lg:block"><div className="sticky top-24 w-fit text-[10px] font-semibold tracking-[0.18em] text-fg-muted"><AnimatePresence initial={false} mode="wait"><motion.span animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} initial={{ opacity: 0, y: 10 }} key={active} transition={{ duration: duration.fast, ease: ease.gentle }}>{String(active + 1).padStart(2, "0")}</motion.span></AnimatePresence> / {count}</div></aside>
          <div>{projects.map((project, index) => <StackingCard index={index} key={project.title} onActive={setActive} project={project} />)}</div>
        </div>
      </div>
    </section>
  );
}
