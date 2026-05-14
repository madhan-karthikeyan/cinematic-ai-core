import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BackgroundFX } from "@/components/layout/BackgroundFX";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { GlassNavbar } from "@/components/layout/GlassNavbar";
import { IntroLoader } from "@/components/intro/IntroLoader";
import { Hero } from "@/components/hero/Hero";
import { FeaturedProjects } from "@/components/projects/FeaturedProjects";
import { Philosophy } from "@/components/philosophy/Philosophy";
import { Expertise } from "@/components/expertise/Expertise";
import { ExperienceTimeline } from "@/components/timeline/ExperienceTimeline";
import { ArchitectureShowcase } from "@/components/systems/ArchitectureShowcase";
import { Contact, Footer } from "@/components/contact/Contact";
import { PROFILE } from "@/data/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Madhan Karthikeyan — AI Systems Engineer" },
      {
        name: "description",
        content:
          "Portfolio of Madhan Karthikeyan — AI Systems Engineer building retrieval systems, ML infrastructure, and intelligent backend architectures.",
      },
      { property: "og:title", content: "Madhan Karthikeyan — AI Systems Engineer" },
      {
        property: "og:description",
        content:
          "Retrieval systems, ML infrastructure, and intelligent backend architectures.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
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
        <Philosophy />
        <Expertise />
        <ExperienceTimeline />
        <ArchitectureShowcase />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
