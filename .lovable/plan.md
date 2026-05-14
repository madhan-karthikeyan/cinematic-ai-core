# Cinematic AI Systems Portfolio — Madhan Karthikeyan

A dark, glass, architecturally-minimal portfolio that positions Madhan as an **AI Systems Engineer / ML Infrastructure Builder / Retrieval & Backend Systems Developer**. All copy, projects, metrics, and stacks are pulled verbatim from the attached resume — nothing fabricated.

## Stack note (important)

This Lovable project runs on **TanStack Start + Vite + React + Tailwind v4**, not Next.js. I'll honor the design and motion intent fully (Tailwind, Framer Motion, Lenis smooth scroll, light GSAP only if needed), but routing/SSR will use TanStack Start. The end result is visually identical to a Next.js build — no functional compromise.

## Visual system

- **Background**: matte black (`#050505`), subtle radial glows, low-opacity grid texture, faint gradient mesh, optional film-grain overlay.
- **Palette tokens** (added to `src/styles.css` in oklch):
  - `--bg-primary #050505`, `--bg-secondary #0B0F14`, `--bg-tertiary #111827`
  - `--accent-indigo #4F46E5`, `--accent-cyan #3B82F6`, `--accent-violet #8B5CF6`
  - `--text-primary #E5E7EB`, `--text-secondary #9CA3AF`
  - Glass surface tokens: border, backdrop-blur, soft shadow
- **Typography** (loaded via Google Fonts / Fontshare):
  - Display: **Clash Display**
  - Body: **Inter**
  - Mono / metrics: **JetBrains Mono**
- **Motion curve**: `cubic-bezier(0.22, 1, 0.36, 1)` everywhere. Only fade, blur, subtle scale, soft float, gradient shift. No bounce, no parallax abuse.
- **Smooth scroll**: Lenis, lightly weighted.
- **Cursor**: subtle glow follow on desktop only.

## Architecture

```text
src/
  routes/
    __root.tsx              // global layout, Lenis provider, fonts, meta
    index.tsx               // single long-scroll portfolio
  components/
    intro/IntroLoader.tsx
    layout/GlassNavbar.tsx
    layout/BackgroundFX.tsx     // grid + mesh + grain + radial glows
    layout/SmoothScroll.tsx     // Lenis wrapper
    hero/Hero.tsx
    hero/Portrait.tsx           // transparent PNG + rim/key lighting
    hero/FloatingWidgets.tsx
    projects/FeaturedProjects.tsx
    projects/ProjectCase.tsx    // alternating L/R case-study block
    projects/ArchitectureDiagram.tsx
    philosophy/Philosophy.tsx
    expertise/Expertise.tsx     // categorized glass panels
    timeline/Experience.tsx
    systems/ArchitectureShowcase.tsx  // animated nodes/edges
    contact/Contact.tsx
    layout/Footer.tsx
    ui/GlassPanel.tsx, AnimatedCounter.tsx, SectionLabel.tsx
  assets/
    portrait.png              // copied from upload
  data/
    projects.ts, experience.ts, expertise.ts   // resume-sourced
  lib/
    motion.ts                 // shared variants + easing
public/
    resume.pdf                // copied from upload for download
```

## Sections (resume-faithful)

1. **Intro Loader** (~2.2s, skippable): mono terminal lines — `Initializing retrieval systems…` → `Loading semantic pipelines…` → `Embedding portfolio interface…` → `System online.` → blur-fade out.

2. **Glass Navbar**: floating, centered. Items: Projects · Experience · Systems · Stack · Contact + right-side Resume pill. Transparent → blurred dark glass on scroll.

3. **Hero**
   - Left: `Madhan / Karthikeyan` (Clash Display, large, tight tracking) · subtitle `AI Systems Engineer` · tagline `Building retrieval systems, ML infrastructure, and intelligent backend architectures.` · supporting line from resume summary · CTAs `View Projects` / `Download Resume` / `Contact`.
   - Right: transparent portrait, oversized, edges fading to black, soft blue rim + warm key light via layered radial gradients and drop-shadows; slow float + breathing.
   - Floating glass widgets (mono labels): `Semantic Retrieval · <500ms`, `FAISS + ChromaDB`, `Redis · Celery`, `Production ML Systems`.

4. **Featured Projects** — alternating L/R cinematic case studies. Each: category label, name, 1–2 line description, stack chips, animated metric counters, hover-revealed mini architecture diagram, soft border glow.
   - **MediCore** — Full-Stack Distributed System · Flask · Vue · Celery · Redis · PostgreSQL · JWT · Razorpay · ~40 REST APIs · `<150ms p95` · event-driven cache invalidation.
   - **Satellite Image Search System** — Embedding-Based Geospatial Retrieval · RemoteCLIP · ChromaDB · DBSCAN · FastAPI · Cesium · `10,000+ images` · `<500ms` · 4-band GeoTIFF.
   - **Responsible Financial AI — RAG System** — LlamaIndex · ChromaDB · FastAPI · React · `<2s` · `1,000+ docs` · source-cited.
   - **DriftBench-TS** — Config-driven benchmarking · 5+ forecasters · 8+ drift detectors · 6 datasets · Flask + React dashboard.
   - **Cluster-Aware Semantic Retrieval & Caching** — GMM + FAISS + FastAPI · ~30% latency reduction · ~35% cache hit rate.

5. **Engineering Philosophy** — centered statement on faint animated grid: *"I enjoy building systems where machine learning, retrieval infrastructure, and backend engineering intersect."* + supporting line.

6. **Technical Expertise** — four categorized glass panels (no bars, no logo soup):
   - **Retrieval Systems**: FAISS, ChromaDB, LlamaIndex, RemoteCLIP/CLIP, Vector Search, Embedding Pipelines, Semantic Caching
   - **ML Infrastructure**: PyTorch, Scikit-learn, LightGBM, YOLOv8, Time-Series Forecasting, GMM, DBSCAN, RAG Pipelines
   - **Backend Systems**: Python, FastAPI, Flask, REST, JWT, Celery, Redis, Distributed Task Queues
   - **Systems & DevOps**: Docker, AWS (EC2, S3), Event-Driven Architecture, Async Pipelines, PostgreSQL, MongoDB, Git

7. **Experience Timeline** — vertical line that grows on scroll:
   - **NIC, Govt. of India — AI Engineer Intern** (May–Jul 2025): triage-to-resolution pipeline, VLM + vector index over 150+ docs / 4GB, >24h → <1min; sub-second retrieval.
   - **GloballyGI — Computer Vision Intern** (Jan–Apr 2025): YOLOv8n + D-FINE, 80–85% mAP / 50 classes / 5,000 images, ~25% latency reduction.
   - Education chips: VIT (CGPA 8.80) · IIT Madras BS Data Science.
   - Certifications: Microsoft Azure AI Engineer Associate · IIT Madras Advanced Certificate ML & DS.

8. **Architecture Showcase — "Systems Thinking"** — animated SVG diagram: `Input → Embedding Pipeline → Semantic Cache → Vector Retrieval → LLM / Reranker → Response`. Nodes light up and edges draw via `pathLength` as the section enters viewport (Framer Motion `useInView` + `whileInView`).

9. **Contact** — `Let's build intelligent systems.` + glass pill buttons: GitHub, LinkedIn, Email (`madhankrthik@gmail.com`), Resume. Footer: `Designed & engineered by Madhan Karthikeyan`.

## Performance, SEO, A11y

- Per-route `head()` with title, description, OG tags, JSON-LD `Person` schema (name, jobTitle, alumniOf, sameAs links).
- Single H1 (Hero name), semantic landmarks, alt text on portrait, focus-visible rings on all interactive glass elements, `prefers-reduced-motion` disables float/scroll animations and skips intro loader.
- Portrait shipped as optimized PNG via `src/assets` import; preload hero font subsets; lazy-init Lenis on client only.

## Mobile

- Portrait centered above stacked text, widgets become a 2-col mono chip row, nav collapses to glass pill with sheet menu, case studies become single-column with the architecture diagram below the copy. Cinematic feel preserved; motion intensity reduced.

## Out of scope (explicitly skipped)

- Command palette, ambient sound, dynamic theme glow per section — the brief marks these "optional"; I'll skip unless you ask, to keep the build tight and performant.
