"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { SiGithub } from "react-icons/si";
import { PillLabel } from "@/components/PillLabel";
import { projects, type Project } from "@/data/projects";

const buttonClass = "inline-flex items-center gap-2 rounded-full border border-fg px-4 py-2.5 text-xs font-semibold transition-colors hover:bg-fg hover:text-bg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg";

function Info({ project, index }: { project: Project; index: number }) {
  return <div className="flex min-w-0 flex-col justify-center">
    <p className="font-display text-2xl font-black italic leading-none tracking-[-0.05em] text-fg-muted">{String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</p>
    <h3 className="font-display mt-5 text-[clamp(2.75rem,5.2vw,5.75rem)] font-black italic leading-[0.84] tracking-[-0.05em]">{project.title}</h3><p className="mt-4 text-base font-medium sm:text-lg">{project.tagline}</p><p className="mt-5 max-w-xl text-sm leading-6 text-fg-muted sm:text-base sm:leading-7">{project.description}</p>
    <dl className="mt-6 grid grid-cols-2 gap-4 text-sm"><div><dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-fg-muted">Role</dt><dd className="mt-1">{project.role}</dd></div><div><dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-fg-muted">Year</dt><dd className="mt-1">{project.year}</dd></div></dl>
    <ul className="mt-6 grid gap-2 text-sm leading-5 text-fg-muted" aria-label={`${project.title} highlights`}>{project.features.map((feature) => <li className="flex gap-3" key={feature}><span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-fg" />{feature}</li>)}</ul><div className="mt-6 flex flex-wrap gap-2" aria-label={`${project.title} technology stack`}>{project.stack.map((item) => <span className="rounded-full border border-border px-3 py-1 text-xs text-fg-muted" key={item}>{item}</span>)}</div>
    {(project.liveUrl || project.githubUrl) && <div className="mt-7 flex flex-wrap gap-3">{project.liveUrl && <a className={buttonClass} href={project.liveUrl} rel="noreferrer" target="_blank"><ExternalLink aria-hidden="true" size={14} />Live site</a>}{project.githubUrl && <a className={buttonClass} href={project.githubUrl} rel="noreferrer" target="_blank"><SiGithub aria-hidden="true" size={14} />GitHub</a>}</div>}
  </div>;
}
function Preview({ project }: { project: Project }) {
  return <div className="group relative min-h-64 overflow-hidden border border-border bg-fg/5 sm:min-h-80 lg:min-h-0"><Image alt={`${project.title} project preview`} className="object-cover grayscale transition-[filter,transform] duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0" fill sizes="(max-width: 1023px) 100vw, 50vw" src={project.image} /><div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-5 pb-5 pt-16"><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-fg/80">Project preview</p></div></div>;
}
function Cards() {
  return <div className="lg:hidden"><div className="px-6 pb-10 pt-28 sm:px-10 sm:pt-36"><PillLabel>Projects</PillLabel><h2 className="font-display mt-7 text-[clamp(3.25rem,12vw,5.5rem)] font-black italic leading-[0.84] tracking-[-0.05em]">Selected work.</h2></div>{projects.map((project, index) => <article className="grid gap-8 border-t border-border px-6 py-12 sm:px-10" key={project.title}><Info index={index} project={project} /><Preview project={project} /></article>)}</div>;
}
function Gallery() {
  const ref = useRef<HTMLDivElement>(null); const [active, setActive] = useState(0); const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] }); const progress = useSpring(scrollYProgress, { damping: 24, stiffness: 170 }); const x = useTransform(progress, [0, 1], ["0%", "-66.666667%"]); const scaleX = useTransform(progress, [0, 1], [0, 1]);
  useMotionValueEvent(scrollYProgress, "change", (value) => setActive(Math.min(projects.length - 1, Math.floor(value * projects.length))));
  return <div className="relative hidden bg-bg text-fg lg:block" ref={ref} style={{ height: `${projects.length * 100}svh` }}><div className="sticky top-0 h-svh overflow-hidden"><motion.div className="flex h-full w-[300vw]" style={{ x }}>{projects.map((project, index) => <article className="grid h-svh w-screen shrink-0 grid-cols-2 gap-12 px-12 py-12 xl:gap-20 xl:px-20" key={project.title}><div className="flex min-w-0 flex-col justify-center">{index === 0 && <div className="mb-10"><PillLabel>Projects</PillLabel><h2 className="font-display mt-6 text-[clamp(3.25rem,6vw,6.5rem)] font-black italic leading-[0.84] tracking-[-0.05em]">Selected work.</h2></div>}<Info index={index} project={project} /></div><Preview project={project} /></article>)}</motion.div><div className="absolute bottom-8 left-12 right-12 z-10 flex items-center gap-5 xl:left-20 xl:right-20"><div className="h-px flex-1 overflow-hidden bg-border"><motion.div className="h-full origin-left bg-fg" style={{ scaleX }} /></div><p className="font-display text-sm font-black italic tracking-[-0.05em]">{String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</p></div></div></div>;
}
export function Projects() { const reduced = useReducedMotion(); if (reduced) return <section className="border-t border-border bg-bg text-fg" id="projects"><Cards /></section>; return <section className="border-t border-border bg-bg text-fg" id="projects"><Gallery /><div className="lg:hidden"><Cards /></div></section>; }
