import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { TechStack } from "@/components/sections/TechStack";
import { Projects } from "@/components/Projects";

export default function Home() {
  return (
    <main className="flex w-full flex-col bg-bg">
      <Hero />
      <About />
      <TechStack />

      <Projects />
      <Contact />
    </main>
  );
}
