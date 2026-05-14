import { Reveal, SectionLabel } from "@/components/ui/SectionLabel";

export function Philosophy() {
  return (
    <section className="relative px-6 md:px-10 py-28 md:py-40">
      <div className="absolute inset-0 grid-texture opacity-[0.18] pointer-events-none" />
      <div className="mx-auto max-w-4xl text-center relative">
        <Reveal>
          <SectionLabel index="02">
            <span className="mx-auto">Engineering Philosophy</span>
          </SectionLabel>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-10 font-display text-3xl md:text-5xl leading-[1.15] tracking-tight text-text-primary text-balance">
            I build systems where{" "}
            <span className="text-text-secondary">machine learning,</span>{" "}
            <span className="text-text-secondary">retrieval infrastructure,</span> and{" "}
            <span className="text-text-secondary">backend engineering</span> intersect.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-8 text-text-tertiary max-w-2xl mx-auto leading-relaxed">
            From vector search pipelines to async distributed architectures — focused on
            scalable systems designed for real-world deployment.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
