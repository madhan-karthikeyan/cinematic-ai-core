import { useState } from "react";
import { BackgroundFX } from "@/components/layout/BackgroundFX";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { GlassNavbar } from "@/components/layout/GlassNavbar";
import { IntroLoader } from "@/components/intro/IntroLoader";
import { Hero } from "@/components/hero/Hero";
import { FeaturedProjects } from "@/components/projects/FeaturedProjects";
import { SecondaryProjects } from "@/components/projects/SecondaryProjects";
import { ExperienceTimeline } from "@/components/timeline/ExperienceTimeline";
import { ArchitectureShowcase } from "@/components/systems/ArchitectureShowcase";
import { SkillsGraph } from "@/components/skills/SkillsGraph";
import { Contact, Footer } from "@/components/contact/Contact";

export default function App() {
  const [booted, setBooted] = useState(false);
  return (
    <>
      <BackgroundFX />
      <SmoothScroll />
      {!booted && <IntroLoader onDone={() => setBooted(true)} />}
      <GlassNavbar />
      <main className="relative">
        <Hero />
        <FeaturedProjects />
        <SecondaryProjects />
        <ArchitectureShowcase />
        <SkillsGraph />
        <ExperienceTimeline />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
