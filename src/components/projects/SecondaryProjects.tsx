import { motion } from "framer-motion";
import { SECONDARY_PROJECTS } from "@/data/portfolio";
import { Reveal } from "@/components/ui/SectionLabel";

export function SecondaryProjects() {
  return (
    <section className="relative px-6 md:px-10 pb-28 md:pb-40">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-12 max-w-3xl">
          <h2 className="font-display text-2xl md:text-3xl tracking-tight text-text-primary text-balance">
            Other significant work
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6">
          {SECONDARY_PROJECTS.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.1}>
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="group block h-full glass glass-panel-hover p-6 md:p-8 rounded-2xl transition-all duration-300"
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-tertiary mb-4">
                  {project.category}
                </div>
                <h3 className="font-display text-2xl tracking-tight text-text-primary group-hover:text-text-secondary transition-colors">
                  {project.name}
                </h3>
                <div className="mt-1 text-text-secondary text-sm">{project.subtitle}</div>
                <p className="mt-4 text-text-tertiary text-sm leading-relaxed max-w-md">
                  {project.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.stack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 rounded-md bg-white/[0.03] border border-white/[0.05] text-[10px] font-mono text-text-secondary uppercase tracking-widest"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {project.github && (
                  <div className="mt-8 flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-text-secondary group-hover:text-text-primary transition-colors">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    Source
                  </div>
                )}
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
