import { motion, useInView } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { Reveal, SectionLabel } from "@/components/ui/SectionLabel";
import { VisualFrame } from "@/components/projects/visuals/primitives";

/* ---------- topology data ---------- */

type Node = {
  id: string;
  label: string;
  x: number;
  y: number;
  r: number;
  cluster: string;
  desc?: string;
};

const VB = { w: 1000, h: 640 };
const CORE: Node = {
  id: "core",
  label: "AI Systems",
  x: 500,
  y: 320,
  r: 26,
  cluster: "core",
  desc: "An interconnected stack — retrieval, reasoning, caching, and orchestration converging into production behaviour.",
};

const CLUSTERS = [
  {
    id: "retrieval",
    label: "Retrieval Infrastructure",
    color: "var(--accent-cyan)",
    hub: { x: 200, y: 150, r: 18 },
    nodes: [
      {
        id: "faiss",
        label: "FAISS",
        x: 70,
        y: 70,
        r: 10,
        desc: "GMM-routed FAISS for cluster-scoped vector search.",
      },
      {
        id: "chroma",
        label: "ChromaDB",
        x: 320,
        y: 60,
        r: 11,
        desc: "Persistent vector store powering RAG and geospatial retrieval.",
      },
      {
        id: "semantic",
        label: "Semantic Search",
        x: 50,
        y: 240,
        r: 10,
        desc: "Embedding-based search over multispectral and textual corpora.",
      },
      {
        id: "embed",
        label: "Embedding Pipelines",
        x: 360,
        y: 220,
        r: 11,
        desc: "Chunking, encoding, metadata-filtered cosine retrieval.",
      },
      {
        id: "rag",
        label: "RAG Systems",
        x: 170,
        y: 290,
        r: 11,
        desc: "LlamaIndex + ChromaDB for source-cited responses.",
      },
    ],
  },
  {
    id: "backend",
    label: "Backend Architecture",
    color: "var(--accent-indigo)",
    hub: { x: 800, y: 150, r: 18 },
    nodes: [
      {
        id: "fastapi",
        label: "FastAPI",
        x: 930,
        y: 80,
        r: 11,
        desc: "Typed Python services exposing retrieval and clustering APIs.",
      },
      {
        id: "redis",
        label: "Redis",
        x: 680,
        y: 60,
        r: 10,
        desc: "Event-driven cache invalidation, queue broker, semantic cache layer.",
      },
      {
        id: "celery",
        label: "Celery",
        x: 940,
        y: 230,
        r: 10,
        desc: "Async task pipelines for reports, exports, and reminders.",
      },
      {
        id: "jwt",
        label: "JWT · RBAC",
        x: 660,
        y: 230,
        r: 10,
        desc: "Multi-role auth across a 3-tier user hierarchy.",
      },
      {
        id: "rest",
        label: "REST APIs",
        x: 820,
        y: 300,
        r: 11,
        desc: "Idempotent endpoints, ~40-route surface across MediCore.",
      },
    ],
  },
  {
    id: "ml",
    label: "ML Systems",
    color: "var(--accent-violet)",
    hub: { x: 200, y: 490, r: 18 },
    nodes: [
      {
        id: "pytorch",
        label: "PyTorch",
        x: 50,
        y: 410,
        r: 11,
        desc: "Foundation for embedding and detection model work.",
      },
      {
        id: "lightgbm",
        label: "LightGBM",
        x: 340,
        y: 410,
        r: 10,
        desc: "Tabular forecasting in DriftBench-TS.",
      },
      {
        id: "yolo",
        label: "YOLOv8",
        x: 70,
        y: 580,
        r: 10,
        desc: "Multi-object detection, ~25% latency reduction post-optimization.",
      },
      {
        id: "ts",
        label: "Time-Series",
        x: 360,
        y: 560,
        r: 10,
        desc: "Rolling-window simulation across 6 benchmark datasets.",
      },
      {
        id: "gmm",
        label: "GMM · DBSCAN",
        x: 180,
        y: 600,
        r: 10,
        desc: "Clustering for retrieval routing and geographic grouping.",
      },
    ],
  },
  {
    id: "prod",
    label: "Production Engineering",
    color: "var(--accent-warm)",
    hub: { x: 800, y: 490, r: 18 },
    nodes: [
      {
        id: "docker",
        label: "Docker",
        x: 940,
        y: 410,
        r: 11,
        desc: "Reproducible runtimes for every service.",
      },
      {
        id: "aws",
        label: "AWS",
        x: 680,
        y: 410,
        r: 10,
        desc: "EC2 + S3 for deployment and asset pipelines.",
      },
      {
        id: "cache",
        label: "Semantic Cache",
        x: 940,
        y: 560,
        r: 11,
        desc: "Cluster-indexed reuse — ~35% hit rate under repeated queries.",
      },
      {
        id: "async",
        label: "Async Pipelines",
        x: 670,
        y: 580,
        r: 10,
        desc: "Decoupling long-running jobs from the HTTP request cycle.",
      },
      {
        id: "latency",
        label: "Latency Budgets",
        x: 830,
        y: 600,
        r: 10,
        desc: "<150ms p95 API · <500ms retrieval · <2s end-to-end RAG.",
      },
    ],
  },
];

type Edge = { from: string; to: string; cluster: string };

const EDGES: Edge[] = (() => {
  const out: Edge[] = [];
  for (const c of CLUSTERS) {
    out.push({ from: "core", to: `hub-${c.id}`, cluster: c.id });
    for (const n of c.nodes) {
      out.push({ from: `hub-${c.id}`, to: n.id, cluster: c.id });
    }
  }
  // a few cross-cluster mesh edges for topology feel
  out.push({ from: "embed", to: "fastapi", cluster: "mesh" });
  out.push({ from: "rag", to: "cache", cluster: "mesh" });
  out.push({ from: "gmm", to: "faiss", cluster: "mesh" });
  out.push({ from: "celery", to: "async", cluster: "mesh" });
  return out;
})();

const ALL_NODES: Record<string, Node & { color?: string }> = (() => {
  const map: Record<string, Node & { color?: string }> = { core: CORE };
  for (const c of CLUSTERS) {
    map[`hub-${c.id}`] = {
      id: `hub-${c.id}`,
      label: c.label,
      x: c.hub.x,
      y: c.hub.y,
      r: c.hub.r,
      cluster: c.id,
      color: c.color,
    };
    for (const n of c.nodes) {
      map[n.id] = { ...n, cluster: c.id, color: c.color };
    }
  }
  return map;
})();

/* ---------- component ---------- */

export function ArchitectureShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const [active, setActive] = useState<string | null>(null);

  const activeCluster = active ? ALL_NODES[active]?.cluster : null;

  const adjacency = useMemo(() => {
    const adj: Record<string, Set<string>> = {};
    for (const e of EDGES) {
      (adj[e.from] ??= new Set()).add(e.to);
      (adj[e.to] ??= new Set()).add(e.from);
    }
    return adj;
  }, []);

  const isEdgeActive = (e: Edge) => !!active && (e.from === active || e.to === active);
  const isNodeNeighbor = (id: string) => !!active && (id === active || adjacency[active]?.has(id));

  const activeNode = active ? ALL_NODES[active] : null;

  return (
    <section id="systems" className="relative px-6 md:px-10 py-28 md:py-40 overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14 max-w-3xl">
          <SectionLabel index="02">Systems Architecture</SectionLabel>
          <h2 className="mt-5 font-display text-4xl md:text-5xl tracking-tight text-text-primary text-balance">
            Designing scalable systems where retrieval, reasoning, caching, and orchestration
            converge.
          </h2>
          <p className="mt-5 text-text-secondary max-w-2xl leading-relaxed">
            Production AI systems are networks of interacting components — not isolated models.
            Hover any node to follow its dependencies through the topology.
          </p>
        </Reveal>

        <div ref={ref} className="relative group">
          <VisualFrame aspect="1000/640">
            <svg
              viewBox={`0 0 ${VB.w} ${VB.h}`}
              className="absolute inset-0 h-full w-full"
              onMouseLeave={() => setActive(null)}
            >
              <defs>
                <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="white" stopOpacity="0.95" />
                  <stop offset="60%" stopColor="white" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </radialGradient>
                <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="8" />
                </filter>
              </defs>

              {/* edges */}
              {EDGES.map((e, i) => {
                const a = ALL_NODES[e.from];
                const b = ALL_NODES[e.to];
                if (!a || !b) return null;
                const activeE = isEdgeActive(e);
                const dimmed = !!active && !activeE;
                const stroke = activeE
                  ? "color-mix(in oklab, white 70%, transparent)"
                  : "color-mix(in oklab, white 12%, transparent)";
                const pathId = `edge-${i}`;
                const d = `M ${a.x} ${a.y} L ${b.x} ${b.y}`;

                return (
                  <g
                    key={i}
                    style={{
                      opacity: dimmed ? 0.18 : 1,
                      transition: "opacity 600ms cubic-bezier(0.22,1,0.36,1)",
                    }}
                  >
                    <motion.path
                      id={pathId}
                      d={d}
                      stroke={stroke}
                      strokeWidth={activeE ? 1.4 : 0.8}
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={inView ? { pathLength: 1, opacity: 1 } : undefined}
                      transition={{
                        duration: 1.1,
                        delay: 0.4 + (i % 12) * 0.04,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      style={{
                        transition: "stroke 600ms cubic-bezier(0.22,1,0.36,1), stroke-width 600ms",
                      }}
                    />
                    {/* signal pulse */}
                    {(activeE || (!active && i % 5 === 0)) && (
                      <circle
                        r={activeE ? 2.6 : 1.6}
                        fill={activeE ? "white" : "color-mix(in oklab, white 60%, transparent)"}
                      >
                        <animateMotion
                          dur={activeE ? "1.6s" : "5.5s"}
                          repeatCount="indefinite"
                          path={d}
                          rotate="auto"
                        />
                      </circle>
                    )}
                  </g>
                );
              })}

              {/* nodes */}
              {Object.values(ALL_NODES).map((n, i) => {
                const isCore = n.id === "core";
                const isHub = n.id.startsWith("hub-");
                const isActive = active === n.id;
                const isNeighbor = isNodeNeighbor(n.id);
                const dimmed = !!active && !isNeighbor;
                const color = (n.color as string) || "var(--accent-cyan)";

                return (
                  <motion.g
                    key={n.id}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={inView ? { opacity: 1, scale: 1 } : undefined}
                    transition={{
                      duration: 0.7,
                      delay: 0.2 + (i % 14) * 0.04,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{
                      cursor: "pointer",
                      opacity: dimmed ? 0.25 : 1,
                      transition: "opacity 500ms cubic-bezier(0.22,1,0.36,1)",
                      transformOrigin: `${n.x}px ${n.y}px`,
                    }}
                    onMouseEnter={() => setActive(n.id)}
                    onFocus={() => setActive(n.id)}
                    tabIndex={0}
                  >
                    {/* glow */}
                    {(isCore || isActive || isHub) && (
                      <circle
                        cx={n.x}
                        cy={n.y}
                        r={n.r * (isCore ? 3.2 : isActive ? 2.6 : 2)}
                        fill={isCore ? "url(#coreGlow)" : color}
                        opacity={isCore ? 0.45 : isActive ? 0.35 : 0.18}
                        filter="url(#soft)"
                      />
                    )}
                    {/* outer ring */}
                    <circle
                      cx={n.x}
                      cy={n.y}
                      r={n.r + (isActive ? 4 : 2)}
                      fill="none"
                      stroke={isActive ? color : "color-mix(in oklab, white 16%, transparent)"}
                      strokeWidth={isActive ? 1.2 : 0.6}
                      style={{ transition: "all 500ms cubic-bezier(0.22,1,0.36,1)" }}
                    />
                    {/* core dot */}
                    <circle
                      cx={n.x}
                      cy={n.y}
                      r={n.r}
                      fill={isCore ? "white" : "color-mix(in oklab, black 40%, transparent)"}
                      stroke={color}
                      strokeWidth={isCore ? 0 : isHub ? 1.4 : 1}
                      style={{ transition: "all 500ms cubic-bezier(0.22,1,0.36,1)" }}
                    />
                    {isCore && <circle cx={n.x} cy={n.y} r={n.r - 6} fill="black" opacity={0.85} />}
                    {/* label */}
                    <text
                      x={n.x}
                      y={n.y + n.r + (isCore ? 22 : isHub ? 18 : 16)}
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

          {/* description panel */}
          <div className="pointer-events-none absolute left-3 md:left-5 bottom-3 md:bottom-5 right-3 md:right-5 flex justify-between gap-4 z-20">
            <motion.div
              key={active ?? "idle"}
              initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-md rounded-xl border border-white/[0.07] bg-black/40 backdrop-blur-md p-4"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-tertiary">
                {activeNode
                  ? (activeCluster && CLUSTERS.find((c) => c.id === activeCluster)?.label) || "Core"
                  : "Topology"}
              </div>
              <div className="mt-1 font-display text-lg text-text-primary">
                {activeNode ? activeNode.label : "AI Systems"}
              </div>
              <div className="mt-1.5 text-xs text-text-secondary leading-relaxed">
                {activeNode?.desc ??
                  "Hover or focus a node to reveal how retrieval, backend, ML, and production layers connect."}
              </div>
            </motion.div>

            <div className="hidden md:flex items-end">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-tertiary text-right">
                {Object.keys(ALL_NODES).length} nodes
                <br />
                {EDGES.length} edges
              </div>
            </div>
          </div>

          {/* cluster legend */}
          <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 px-2 pb-2 font-mono text-[10px] uppercase tracking-[0.24em] text-text-tertiary">
            {CLUSTERS.map((c) => (
              <span key={c.id} className="flex items-center gap-2">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: c.color, boxShadow: `0 0 10px ${c.color}` }}
                />
                {c.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
