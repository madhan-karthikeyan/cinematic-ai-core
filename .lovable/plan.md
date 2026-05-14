
# Cinematic Portfolio Refinement Plan

## 1. Hero Section

**File: `src/components/hero/Hero.tsx`**
- Reduce top padding from `pt-36 md:pt-40` → `pt-20 md:pt-24` to shift composition up ~6–8vh; trim bottom padding accordingly.
- **Remove** the entire `CAPABILITIES` strip (Semantic Retrieval / Vector Infrastructure / Async Pipelines / Production ML Systems) and the `CAPABILITIES` constant.
- Slightly reduce heading scale: `clamp(2.25rem, 5.6vw, 4.75rem)`.
- Increase spacing between heading and tagline (`mt-10`), tighten paragraph max-width (`max-w-sm`), refine summary text hierarchy.
- Soften ambient lighting opacity (already dual-tone) — slight reduction of blob saturation.

**File: `src/components/hero/Portrait.tsx`**
- Fix visible cropped edges by:
  - Replacing the elliptical mask with a softer **layered alpha feather**: a radial mask plus a vertical linear-gradient mask combined via `mask-composite` so shoulders dissolve into the bg.
  - Adding an inner atmospheric haze layer (low-opacity radial color-mix with `--bg-primary`).
  - Adding a soft volumetric "aura" ring behind the silhouette (blurred radial in cyan/amber matching portrait lighting).
  - Strengthening the bottom & side fade gradients so no hard edge is visible at any viewport.
- Keep breathing animation but slow it (12s) and reduce travel to 6px.

## 2. Navbar

**File: `src/components/layout/GlassNavbar.tsx`**
- Replace `NAV` with: Projects, Systems, Skills, Experience, Contact.
- Hash targets: `#projects`, `#systems`, `#skills`, `#experience`, `#contact`.
- Reduce border opacity further (`white/[0.04]`), drop the cyan dot accent on MK (use neutral), thinner padding (`py-1`), smaller pill.
- Smoother underline: animate `scaleX` over 600ms with cinematic ease, slightly thicker (0.5px → subtle), neutral color.

## 3. Routing Section IDs

Update section IDs / order in `src/routes/index.tsx` so `#systems` → ArchitectureShowcase (renamed conceptually to systems map), `#skills` → new Skills graph (replaces `Expertise`). Final order:
`Hero → FeaturedProjects (#projects) → ArchitectureShowcase (#systems) → SkillsGraph (#skills) → ExperienceTimeline (#experience) → Contact (#contact)`. Remove `Philosophy` + `Expertise` from render (Philosophy stays only if needed; per direction, prefer leaner page → remove both).

## 4. Projects Section — Bespoke Topology Per Project

**Remove globally** (in `FeaturedProjects.tsx`):
- The duplicated metric grid below the diagram (the "two-metric mini cards").
- The repeated "architecture / live" header label.
- The repetitive stack chip rows beneath visuals.
- Stack chips can stay once on the copy side, condensed.

**File: `src/components/projects/PipelineDiagram.tsx`** → delete (no longer used).

**New folder: `src/components/projects/visuals/`** — one bespoke SVG component per project. Each is an interactive Framer Motion + SVG visualization with hover-aware highlights, animated signal pulses (`<animateMotion>` along paths), and inline contextual metric labels embedded inside the diagram (no separate KPI cards):

- `MediCoreTopology.tsx` — central API gateway node, orbiting microservices (Auth, Billing, Records, Notifications), Celery worker cluster ring, Redis event bus arcs, Postgres persistence layer at base. Animated async pulses along event edges; small inline `p95 <150ms` tag near gateway.
- `SatelliteRetrievalMap.tsx` — abstract hemisphere/orbital arc layout with floating geo-cluster blobs (DBSCAN regions as soft ellipses), embedding similarity edges connecting clusters to a central RemoteCLIP node, Cesium-style latitude curves in background. Hover a cluster → shows similarity rays.
- `RagOrchestrationGraph.tsx` — left: semantic document cloud (jittered dots), middle: branching retrieval paths converging into reranker, right: context assembly node feeding LLM with citation tracer lines back to source dots (animated trace).
- `DriftBenchTemporal.tsx` — horizontal timeline waveform (sine + noise SVG path), drift event pulses (vertical glints), branching forecast streams above, retraining trigger markers below, small benchmark grid in corner.
- `ClusterRetrievalTopology.tsx` — flagship: 2D embedding-space with GMM partition ellipses (rotated), floating cluster centroids, semantic cache region overlay, FAISS fallback dashed edges activating on hover, dynamic routing path that lights up when hovering "Query" entry node.

Each visual:
- Uses `viewBox` + responsive container.
- Shares a small helper `src/components/projects/visuals/primitives.tsx` for: animated edge with motion pulse, hover-aware node, ambient grid backdrop.
- Inline metrics rendered as monospaced floating labels at meaningful positions.

**File: `src/components/projects/FeaturedProjects.tsx`**
- Map project `id` → bespoke visual component.
- Replace the right-side glass card content: remove header label, remove bottom mini-metrics; let the visual be the centerpiece, full-bleed inside a thinner glass frame (border only, no inner padding chrome).
- Keep copy side (category, name, subtitle, description) but remove redundant chip row.

**Data: `src/data/portfolio.ts`**
- Remove `pipeline` arrays (no longer needed).
- Keep `metrics` only if referenced inside visuals; otherwise drop.

## 5. Skills Section — Interactive Systems Graph

**New file: `src/components/skills/SkillsGraph.tsx`** (section id `#skills`).
- Replaces `Expertise.tsx` in render.
- Central node: **AI SYSTEMS**.
- 6 cluster hubs around it:
  - Retrieval Infrastructure → FAISS, ChromaDB, LlamaIndex, RemoteCLIP
  - Backend Systems → FastAPI, Flask, REST, JWT
  - ML Infrastructure → PyTorch, LightGBM, YOLOv8, Scikit
  - Distributed Systems → Redis, Celery, PostgreSQL, MongoDB
  - Geospatial Retrieval → Cesium, DBSCAN, GeoTIFF, GMM
  - RAG Pipelines → LlamaIndex, Reranker, ChromaDB, Citation
- SVG-based, ~1100×680 viewBox.
- Interactions: hover node → connected nodes brighten, others dim to ~25% opacity, edges between active set pulse; signal pulses travel continuously at low opacity on all edges.
- Subtle parallax on mouse move (small translate on layer groups).
- Replace and **delete the "Core Capabilities" strip** entirely (currently in `ArchitectureShowcase`).

## 6. Architecture / Systems Showcase

**File: `src/components/systems/ArchitectureShowcase.tsx`**
- Keep the existing topology graph but:
  - Remove the "Core Capabilities" rail at the bottom.
  - Reduce glow intensity on edges/nodes (`opacity` cuts on filters).
  - Soften cluster hub colors (mix toward neutral 30%).
  - Section id remains `#systems`.

## 7. Animation & Visual Polish (global)

- Reduce blur radii on background blobs (`-30%`).
- Reduce gradient opacity globally where saturation feels neon.
- Standardize entrance reveal: slower (`1.1s`) with `cubic-bezier(0.22,1,0.36,1)`.
- Add subtle ambient drift (8–14s loops) on background mesh in `BackgroundFX`.

## 8. Files Touched Summary

Edit:
- `src/components/hero/Hero.tsx`
- `src/components/hero/Portrait.tsx`
- `src/components/layout/GlassNavbar.tsx`
- `src/components/projects/FeaturedProjects.tsx`
- `src/components/systems/ArchitectureShowcase.tsx`
- `src/components/layout/BackgroundFX.tsx`
- `src/routes/index.tsx`
- `src/data/portfolio.ts`
- `src/styles.css` (tone down accent intensities if needed)

Create:
- `src/components/projects/visuals/primitives.tsx`
- `src/components/projects/visuals/MediCoreTopology.tsx`
- `src/components/projects/visuals/SatelliteRetrievalMap.tsx`
- `src/components/projects/visuals/RagOrchestrationGraph.tsx`
- `src/components/projects/visuals/DriftBenchTemporal.tsx`
- `src/components/projects/visuals/ClusterRetrievalTopology.tsx`
- `src/components/skills/SkillsGraph.tsx`

Delete:
- `src/components/projects/PipelineDiagram.tsx`
- `src/components/expertise/Expertise.tsx`
- `src/components/philosophy/Philosophy.tsx` (lean page direction)

## Outcome

A leaner, art-directed page: cinematic hero with embedded portrait, refined glass navbar, five uniquely-architected interactive project topologies, an interactive skills constellation, and the existing systems map cleaned of redundant rails — communicating production AI systems engineering rather than a developer template.
