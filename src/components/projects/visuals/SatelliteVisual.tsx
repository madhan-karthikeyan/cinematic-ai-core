import { useState } from "react";
import { Edge, MetricTag, NodeDot, VisualFrame } from "./primitives";

const VB = { w: 1000, h: 620 };

export function SatelliteVisual() {
  const [active, setActive] = useState<string | null>(null);

  const indigo = "var(--accent-indigo)";
  const cyan = "var(--accent-cyan)";
  const violet = "var(--accent-violet)";

  return (
    <VisualFrame aspect="1000/620">
      <svg
        viewBox={`0 0 ${VB.w} ${VB.h}`}
        className="absolute inset-0 h-full w-full"
        onMouseLeave={() => setActive(null)}
      >
        {/* Glow */}
        <circle
          cx={500}
          cy={310}
          r={280}
          fill="color-mix(in oklab, var(--accent-indigo) 6%, transparent)"
          style={{ filter: "blur(60px)" }}
        />

        {/* Client Subgraph (Top Left) */}
        <rect
          x={40}
          y={80}
          width={200}
          height={160}
          rx={12}
          fill="color-mix(in oklab, var(--accent-cyan) 5%, transparent)"
          stroke={cyan}
          strokeWidth={1}
          strokeDasharray="4 6"
          opacity={0.6}
        />
        <text
          x={140}
          y={105}
          textAnchor="middle"
          fill={cyan}
          fontSize={11}
          fontFamily="var(--font-mono)"
          letterSpacing="0.1em"
        >
          FRONTEND (REACT)
        </text>

        <NodeDot
          cx={140}
          cy={140}
          r={10}
          color={cyan}
          label="User Upload"
          active={active === "ui"}
          onEnter={() => setActive("ui")}
        />
        <Edge d="M 140 150 L 140 200" active={active === "ui"} />
        <NodeDot cx={140} cy={200} r={8} color={cyan} label="Interactive Globe" />

        {/* FastAPI Backend */}
        <Edge d="M 240 140 L 335 140" active={active === "ui" || active === "api"} />
        <Edge d="M 240 200 L 335 200" active={active === "ui" || active === "api"} />

        <rect
          x={350}
          y={100}
          width={60}
          height={130}
          rx={8}
          fill="color-mix(in oklab, var(--accent-indigo) 15%, transparent)"
          stroke={indigo}
          strokeWidth={1}
        />
        <text
          x={380}
          y={160}
          textAnchor="middle"
          fill={indigo}
          fontSize={10}
          fontFamily="var(--font-mono)"
          style={{ writingMode: "vertical-rl" }}
        >
          FastAPI Backend
        </text>

        {/* SatGeoInfer Engine (Bottom Left) */}
        <rect
          x={40}
          y={320}
          width={370}
          height={200}
          rx={12}
          fill="none"
          stroke="var(--text-tertiary)"
          strokeWidth={1}
          strokeDasharray="4 4"
          opacity={0.5}
        />
        <text
          x={225}
          y={345}
          textAnchor="middle"
          fill="var(--text-secondary)"
          fontSize={11}
          fontFamily="var(--font-mono)"
          letterSpacing="0.1em"
        >
          SAT-GEO INFER ML CORE
        </text>

        <Edge
          d="M 380 230 L 380 280 L 140 280 L 140 370"
          active={active === "api" || active === "ml"}
        />

        <NodeDot
          cx={140}
          cy={380}
          r={12}
          color={violet}
          label="RemoteCLIP-ViT"
          active={active === "ml"}
          onEnter={() => setActive("ml")}
        />

        <Edge d="M 140 395 L 140 460" active={active === "ml"} />
        <NodeDot cx={140} cy={470} r={10} color={violet} label="8x Test-Time Augmentation" />

        <Edge d="M 155 470 L 320 470" active={active === "ml" || active === "emb"} />
        <NodeDot
          cx={330}
          cy={470}
          r={12}
          color={indigo}
          label="Vector Embedding"
          active={active === "emb"}
          onEnter={() => setActive("emb")}
        />

        {/* Vector DB & Retrieval System (Center) */}
        <rect
          x={450}
          y={220}
          width={220}
          height={300}
          rx={12}
          fill="color-mix(in oklab, var(--accent-indigo) 8%, transparent)"
          stroke={indigo}
          strokeWidth={1}
        />
        <text
          x={560}
          y={245}
          textAnchor="middle"
          fill={indigo}
          fontSize={11}
          fontFamily="var(--font-mono)"
          letterSpacing="0.1em"
        >
          VECTOR SEARCH
        </text>

        <Edge d="M 345 470 L 545 470" active={active === "emb" || active === "db"} />
        <NodeDot
          cx={560}
          cy={470}
          r={14}
          color={indigo}
          label="ChromaDB Index"
          hub
          active={active === "db"}
          onEnter={() => setActive("db")}
        />

        <Edge d="M 560 455 L 560 380" active={active === "db" || active === "rrf"} />
        <NodeDot
          cx={560}
          cy={370}
          r={10}
          color={indigo}
          label="Reciprocal Rank Fusion"
          active={active === "rrf"}
          onEnter={() => setActive("rrf")}
        />

        <Edge d="M 560 360 L 560 295" active={active === "rrf"} />
        <NodeDot cx={560} cy={285} r={8} color={indigo} label="Adaptive Thresholding" />

        {/* Geo Compute (Right) */}
        <rect
          x={710}
          y={100}
          width={250}
          height={420}
          rx={12}
          fill="color-mix(in oklab, var(--accent-violet) 5%, transparent)"
          stroke={violet}
          strokeWidth={1}
        />
        <text
          x={835}
          y={125}
          textAnchor="middle"
          fill={violet}
          fontSize={11}
          fontFamily="var(--font-mono)"
          letterSpacing="0.1em"
        >
          SPATIAL ANALYSIS
        </text>

        <Edge d="M 670 285 L 820 285" active={active === "rrf" || active === "geo"} />
        <NodeDot
          cx={835}
          cy={285}
          r={14}
          color={violet}
          label="DBSCAN Clustering"
          hub
          active={active === "geo"}
          onEnter={() => setActive("geo")}
        />

        <Edge d="M 835 299 L 835 370" active={active === "geo"} />
        <NodeDot cx={835} cy={380} r={10} color={violet} label="Confidence Calibration" />

        <Edge d="M 850 285 L 910 285 L 910 330" active={active === "geo"} />
        <NodeDot cx={910} cy={340} r={8} color="var(--text-tertiary)" label="Secondary Clusters" />

        <Edge d="M 835 390 L 835 460" active={active === "geo"} />
        <NodeDot cx={835} cy={470} r={12} color={cyan} label="GPS Coordinates" />

        {/* Return loop back to FastAPI */}
        <Edge
          d="M 835 482 L 835 560 L 410 560 L 410 230"
          active={active === "geo" || active === "api"}
          pulseDur={6}
        />
        <text
          x={620}
          y={550}
          fill="var(--text-tertiary)"
          fontSize={9}
          fontFamily="var(--font-mono)"
        >
          Response Loop
        </text>

        {/* Metrics */}
        <MetricTag x={40} y={40} label="Embeddings" value="8x TTA" />
        <MetricTag x={VB.w - 180} y={40} label="Fusion" value="RRF + DBSCAN" />
      </svg>
    </VisualFrame>
  );
}
