import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Reveal, SectionLabel } from "@/components/ui/SectionLabel";
import { VisualFrame } from "@/components/projects/visuals/primitives";

type Cluster = {
  id: string;
  label: string;
  color: string;
  hub: { x: number; y: number };
  techs: { id: string; label: string; offset: { x: number; y: number } }[];
};

const VB = { w: 1100, h: 720 };
const CORE = { x: 550, y: 360 };

const CLUSTERS: Cluster[] = [
  {
    id: "retrieval",
    label: "Retrieval Infrastructure",
    color: "var(--accent-cyan)",
    hub: { x: 180, y: 180 },
    techs: [
      { id: "faiss", label: "FAISS", offset: { x: -100, y: -70 } },
      { id: "chroma", label: "ChromaDB", offset: { x: 90, y: -70 } },
      { id: "llama", label: "LlamaIndex", offset: { x: -110, y: 60 } },
      { id: "rclip", label: "RemoteCLIP", offset: { x: 80, y: 70 } },
    ],
  },
  {
    id: "backend",
    label: "Backend Systems",
    color: "var(--accent-indigo)",
    hub: { x: 920, y: 180 },
    techs: [
      { id: "fastapi", label: "FastAPI", offset: { x: 90, y: -70 } },
      { id: "flask", label: "Flask", offset: { x: -100, y: -70 } },
      { id: "rest", label: "REST", offset: { x: 100, y: 60 } },
      { id: "jwt", label: "JWT", offset: { x: -100, y: 70 } },
    ],
  },
  {
    id: "ml",
    label: "ML Infrastructure",
    color: "var(--accent-violet)",
    hub: { x: 180, y: 560 },
    techs: [
      { id: "pytorch", label: "PyTorch", offset: { x: -110, y: -60 } },
      { id: "lgbm", label: "LightGBM", offset: { x: 90, y: -70 } },
      { id: "yolo", label: "YOLOv8", offset: { x: -90, y: 70 } },
      { id: "sklearn", label: "Scikit", offset: { x: 100, y: 70 } },
    ],
  },
  {
    id: "distributed",
    label: "Distributed Systems",
    color: "var(--accent-warm)",
    hub: { x: 920, y: 560 },
    techs: [
      { id: "redis", label: "Redis", offset: { x: 100, y: -70 } },
      { id: "celery", label: "Celery", offset: { x: -100, y: -70 } },
      { id: "pg", label: "PostgreSQL", offset: { x: 100, y: 70 } },
      { id: "mongo", label: "MongoDB", offset: { x: -100, y: 70 } },
    ],
  },
  {
    id: "geo",
    label: "Geospatial Retrieval",
    color: "var(--accent-cyan)",
    hub: { x: 460, y: 90 },
    techs: [
      { id: "cesium", label: "Cesium", offset: { x: -90, y: -50 } },
      { id: "dbscan", label: "DBSCAN", offset: { x: 90, y: -40 } },
      { id: "geotiff", label: "GeoTIFF", offset: { x: -60, y: 60 } },
      { id: "gmm", label: "GMM", offset: { x: 80, y: 60 } },
    ],
  },
  {
    id: "rag",
    label: "RAG Pipelines",
    color: "var(--accent-warm)",
    hub: { x: 640, y: 640 },
    techs: [
      { id: "rerank", label: "Reranker", offset: { x: -100, y: 40 } },
      { id: "cite", label: "Citation", offset: { x: 100, y: 40 } },
      { id: "ctx", label: "Context", offset: { x: -60, y: -60 } },
      { id: "embed", label: "Embeddings", offset: { x: 80, y: -60 } },
    ],
  },
];

export function SkillsGraph() {
  const [active, setActive] = useState<string | null>(null);

  const allNodes = useMemo(() => {
    const out: Record<
      string,
      {
        id: string;
        x: number;
        y: number;
        cluster: string;
        color: string;
        label: string;
        hub?: boolean;
      }
    > = {
      core: {
        id: "core",
        x: CORE.x,
        y: CORE.y,
        cluster: "core",
        color: "white",
        label: "AI Systems",
      },
    };
    for (const c of CLUSTERS) {
      out[`hub-${c.id}`] = {
        id: `hub-${c.id}`,
        x: c.hub.x,
        y: c.hub.y,
        cluster: c.id,
        color: c.color,
        label: c.label,
        hub: true,
      };
      for (const t of c.techs) {
        out[t.id] = {
          id: t.id,
          x: c.hub.x + t.offset.x,
          y: c.hub.y + t.offset.y,
          cluster: c.id,
          color: c.color,
          label: t.label,
        };
      }
    }
    return out;
  }, []);

  const adjacency = useMemo(() => {
    const adj: Record<string, Set<string>> = {};
    const add = (a: string, b: string) => {
      (adj[a] ??= new Set()).add(b);
      (adj[b] ??= new Set()).add(a);
    };
    for (const c of CLUSTERS) {
      add("core", `hub-${c.id}`);
      for (const t of c.techs) add(`hub-${c.id}`, t.id);
    }
    return adj;
  }, []);

  const isNeighbor = (id: string) => !!active && (id === active || adjacency[active]?.has(id));

  const edges: { a: string; b: string; cluster: string }[] = [];
  for (const c of CLUSTERS) {
    edges.push({ a: "core", b: `hub-${c.id}`, cluster: c.id });
    for (const t of c.techs) edges.push({ a: `hub-${c.id}`, b: t.id, cluster: c.id });
  }

  return (
    <section id="skills" className="relative px-6 md:px-10 py-28 md:py-40 overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14 max-w-3xl">
          <SectionLabel index="03">Skills Constellation</SectionLabel>
          <h2 className="mt-5 font-display text-4xl md:text-5xl tracking-tight text-text-primary text-balance">
            An interconnected stack — every node is a discipline practiced in production.
          </h2>
          <p className="mt-5 text-text-secondary max-w-2xl leading-relaxed">
            Hover any technology to follow how it connects through clusters of retrieval, ML
            infrastructure, distributed systems, and orchestration.
          </p>
        </Reveal>

        <div className="relative group">
          <VisualFrame aspect="1100/720">
            <svg
              viewBox={`0 0 ${VB.w} ${VB.h}`}
              className="absolute inset-0 h-full w-full"
              onMouseLeave={() => setActive(null)}
            >
              {/* edges */}
              {edges.map((e, i) => {
                const a = allNodes[e.a];
                const b = allNodes[e.b];
                const eActive = !!active && (e.a === active || e.b === active);
                const dim = !!active && !eActive;
                const d = `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
                return (
                  <g
                    key={i}
                    style={{
                      opacity: dim ? 0.15 : 1,
                      transition: "opacity 500ms cubic-bezier(0.22,1,0.36,1)",
                    }}
                  >
                    <motion.path
                      d={d}
                      fill="none"
                      stroke={
                        eActive
                          ? "color-mix(in oklab, white 70%, transparent)"
                          : "color-mix(in oklab, white 10%, transparent)"
                      }
                      strokeWidth={eActive ? 1.2 : 0.6}
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{
                        duration: 1,
                        delay: 0.2 + (i % 8) * 0.04,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      style={{ transition: "stroke 500ms cubic-bezier(0.22,1,0.36,1)" }}
                    />
                    {(eActive || (!active && i % 4 === 0)) && (
                      <circle
                        r={eActive ? 2.4 : 1.4}
                        fill={eActive ? "white" : "color-mix(in oklab, white 55%, transparent)"}
                      >
                        <animateMotion
                          dur={eActive ? "1.6s" : "6s"}
                          repeatCount="indefinite"
                          path={d}
                        />
                      </circle>
                    )}
                  </g>
                );
              })}

              {/* nodes */}
              {Object.values(allNodes).map((n, i) => {
                const isCore = n.id === "core";
                const isHub = n.id.startsWith("hub-");
                const isActive = active === n.id;
                const neighbor = isNeighbor(n.id);
                const dim = !!active && !neighbor;
                const r = isCore ? 24 : isHub ? 13 : 8;
                return (
                  <motion.g
                    key={n.id}
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{
                      duration: 0.7,
                      delay: 0.15 + (i % 14) * 0.04,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onMouseEnter={() => setActive(n.id)}
                    style={{
                      opacity: dim ? 0.25 : 1,
                      cursor: "pointer",
                      transition: "opacity 500ms cubic-bezier(0.22,1,0.36,1)",
                      transformOrigin: `${n.x}px ${n.y}px`,
                    }}
                    tabIndex={0}
                    onFocus={() => setActive(n.id)}
                  >
                    {(isCore || isHub || isActive) && (
                      <circle
                        cx={n.x}
                        cy={n.y}
                        r={r * (isCore ? 3 : isActive ? 2.6 : 2)}
                        fill={n.color}
                        opacity={isCore ? 0.4 : isActive ? 0.32 : 0.14}
                        style={{ filter: "blur(10px)" }}
                      />
                    )}
                    <circle
                      cx={n.x}
                      cy={n.y}
                      r={r + (isActive ? 4 : 2)}
                      fill="none"
                      stroke={isActive ? n.color : "color-mix(in oklab, white 14%, transparent)"}
                      strokeWidth={isActive ? 1.2 : 0.6}
                      style={{ transition: "all 500ms cubic-bezier(0.22,1,0.36,1)" }}
                    />
                    <circle
                      cx={n.x}
                      cy={n.y}
                      r={r}
                      fill={isCore ? "white" : "color-mix(in oklab, black 50%, transparent)"}
                      stroke={n.color}
                      strokeWidth={isCore ? 0 : isHub ? 1.4 : 1}
                    />
                    {isCore && <circle cx={n.x} cy={n.y} r={r - 7} fill="black" opacity={0.85} />}
                    <text
                      x={n.x}
                      y={n.y + r + (isCore ? 22 : isHub ? 18 : 14)}
                      textAnchor="middle"
                      fill={isCore || isActive ? "var(--text-primary)" : "var(--text-secondary)"}
                      fontFamily="var(--font-mono)"
                      fontSize={isCore ? 11 : isHub ? 10 : 9}
                      style={{
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        transition: "fill 500ms cubic-bezier(0.22,1,0.36,1)",
                      }}
                    >
                      {n.label}
                    </text>
                  </motion.g>
                );
              })}
            </svg>
          </VisualFrame>

          <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 px-2 pb-2 font-mono text-[10px] uppercase tracking-[0.24em] text-text-tertiary">
            {CLUSTERS.map((c) => (
              <span key={c.id} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: c.color }} />
                {c.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
