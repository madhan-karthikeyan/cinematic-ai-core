import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BackgroundFX } from "@/components/layout/BackgroundFX";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { GlassNavbar } from "@/components/layout/GlassNavbar";
import { IntroLoader } from "@/components/intro/IntroLoader";
import { Hero } from "@/components/hero/Hero";
import { FeaturedProjects } from "@/components/projects/FeaturedProjects";
import { ExperienceTimeline } from "@/components/timeline/ExperienceTimeline";
import { ArchitectureShowcase } from "@/components/systems/ArchitectureShowcase";
import { SkillsGraph } from "@/components/skills/SkillsGraph";
import { Contact, Footer } from "@/components/contact/Contact";
import { PROFILE } from "@/data/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Madhan Karthikeyan — AI Systems Engineer" },
      {
        name: "description",
        content:
          "AI Systems Engineer specializing in retrieval systems, ML infrastructure, distributed backend engineering, and production-grade machine learning systems.",
      },
      { property: "og:title", content: "Madhan Karthikeyan — AI Systems Engineer" },
      {
        property: "og:description",
        content:
          "Engineering intelligent systems that scale — from vector retrieval pipelines to production ML infrastructure.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://madhan-karthikeyan.dev" },
      { property: "og:image", content: "/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://madhan-karthikeyan.dev" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: PROFILE.name,
          jobTitle: PROFILE.role,
          email: PROFILE.email,
          url: "/",
          sameAs: [PROFILE.github, PROFILE.linkedin],
          alumniOf: [
            { "@type": "CollegeOrUniversity", name: "Vellore Institute of Technology" },
            { "@type": "CollegeOrUniversity", name: "Indian Institute of Technology, Madras" },
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
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
        <ArchitectureShowcase />
        <SkillsGraph />
        <ExperienceTimeline />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
