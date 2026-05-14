import { useState } from "react";
import { motion } from "framer-motion";
import { Edge, MetricTag, NodeDot, VisualFrame } from "./primitives";

const VB = { w: 1000, h: 620 };

// document cloud (left)
const DOCS = Array.from({ length: 38 }).map((_, i) => {
  const s = (i * 9301 + 49297) % 233280;
  const t = (s / 233280) * Math.PI * 2;
  const r = 90 + ((s * 7) % 80);
  return {
    id: `d${i}`,
    x: 170 + Math.cos(t) * r * 0.55,
    y: 310 + Math.sin(t) * r,
  };
});

const RETRIEVERS = [
  { id: "r1", x: 420, y: 200, label: "Dense" },
  { id: "r2", x: 420, y: 310, label: "Sparse" },
  { id: "r3", x: 420, y: 420, label: "Hybrid" },
];

const RERANKER = { x: 600, y: 310 };
const CONTEXT = { x: 760, y: 310 };
const LLM = { x: 900, y: 310 };

export function RagOrchestrationGraph() {
  const [trace, setTrace] = useState(false);

  return (
    <VisualFrame aspect="1000/620">
      <svg
        viewBox={`0 0 ${VB.w} ${VB.h}`}
        className="absolute inset-0 h-full w-full"
        onMouseEnter={() => setTrace(true)}
        onMouseLeave={() => setTrace(false)}
      >
        {/* document cloud */}
        <g>
          <ellipse cx={170} cy={310} rx={130} ry={170} fill="color-mix(in oklab, var(--accent-violet) 6%, transparent)" stroke="color-mix(in oklab, var(--accent-violet) 18%, transparent)" strokeDasharray="2 5" />
          {DOCS.map((d) => (
            <motion.rect
              key={d.id}
              x={d.x - 4}
              y={d.y - 5}
              width={8}
              height={10}
              rx={1}
              fill={trace ? "color-mix(in oklab, var(--accent-cyan) 60%, transparent)" : "color-mix(in oklab, white 28%, transparent)"}
              style={{ transition: "fill 600ms cubic-bezier(0.22,1,0.36,1)" }}
            />
          ))}
          <text x={170} y={130} textAnchor="middle" fill="var(--text-tertiary)" fontFamily="var(--font-mono)" fontSize={9} style={{ letterSpacing: "0.24em", textTransform: "uppercase" }}>
            Knowledge · 1k+ docs
          </text>
        </g>

        {/* retrieval branches docs → retrievers */}
        {RETRIEVERS.map((r, i) => (
          <Edge
            key={`d-r-${r.id}`}
            d={`M 280 ${250 + i * 50} Q 360 ${r.y} ${r.x - 18} ${r.y}`}
            color="color-mix(in oklab, var(--accent-cyan) 22%, transparent)"
            pulseDur={3.4 + i * 0.3}
          />
        ))}

        {/* retrievers → reranker */}
        {RETRIEVERS.map((r) => (
          <Edge
            key={`r-rk-${r.id}`}
            d={`M ${r.x + 16} ${r.y} Q ${(r.x + RERANKER.x) / 2} ${(r.y + RERANKER.y) / 2} ${RERANKER.x - 16} ${RERANKER.y}`}
            color="color-mix(in oklab, var(--accent-indigo) 28%, transparent)"
            pulseDur={2.8}
          />
        ))}

        {/* reranker → context */}
        <Edge d={`M ${RERANKER.x + 16} ${RERANKER.y} L ${CONTEXT.x - 16} ${CONTEXT.y}`} color="color-mix(in oklab, var(--accent-warm) 26%, transparent)" pulseDur={2.4} />
        {/* context → LLM */}
        <Edge d={`M ${CONTEXT.x + 16} ${CONTEXT.y} L ${LLM.x - 16} ${LLM.y}`} color="color-mix(in oklab, var(--accent-warm) 32%, transparent)" pulseDur={2} />

        {/* citation tracer (LLM → docs) */}
        {trace && DOCS.slice(0, 8).map((d, i) => (
          <g key={`cite-${d.id}`}>
            <path
              d={`M ${LLM.x} ${LLM.y - 18} Q ${600 - i * 12} ${120 + i * 10} ${d.x} ${d.y}`}
              fill="none"
              stroke="color-mix(in oklab, var(--accent-cyan) 35%, transparent)"
              strokeWidth={0.5}
              strokeDasharray="2 4"
            />
            <circle r={1.6} fill="white">
              <animateMotion
                dur={`${2 + i * 0.18}s`}
                repeatCount="indefinite"
                path={`M ${LLM.x} ${LLM.y - 18} Q ${600 - i * 12} ${120 + i * 10} ${d.x} ${d.y}`}
              />
            </circle>
          </g>
        ))}

        {/* nodes */}
        {RETRIEVERS.map((r) => (
          <NodeDot key={r.id} cx={r.x} cy={r.y} r={9} color="var(--accent-cyan)" label={r.label} />
        ))}
        <NodeDot cx={RERANKER.x} cy={RERANKER.y} r={12} color="var(--accent-indigo)" hub label="Reranker" />
        <NodeDot cx={CONTEXT.x} cy={CONTEXT.y} r={12} color="var(--accent-warm)" hub label="Context Assembly" />

        {/* LLM hub */}
        <motion.circle
          cx={LLM.x}
          cy={LLM.y}
          r={32}
          fill="color-mix(in oklab, var(--accent-warm) 16%, transparent)"
          style={{ filter: "blur(10px)" }}
          animate={{ opacity: [0.45, 0.75, 0.45] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <NodeDot cx={LLM.x} cy={LLM.y} r={16} color="var(--accent-warm)" hub label="LLM · Cited" />

        <MetricTag x={40} y={40} label="latency" value="<2s end-to-end" />
        <MetricTag x={VB.w - 170} y={40} label="grounding" value="100% cited" />
        <text x={VB.w / 2} y={VB.h - 24} textAnchor="middle" fill="var(--text-tertiary)" fontFamily="var(--font-mono)" fontSize={9} style={{ letterSpacing: "0.28em", textTransform: "uppercase" }}>
          Hover to trace citations back to source
        </text>
      </svg>
    </VisualFrame>
  );
}
