import { useState } from "react";
import { motion } from "framer-motion";
import { Edge, MetricTag, NodeDot, VisualFrame } from "./primitives";

const VB = { w: 1000, h: 620 };

const CLUSTERS = [
  { id: "c1", x: 230, y: 180, rx: 90, ry: 56, label: "Urban", n: 12 },
  { id: "c2", x: 760, y: 200, rx: 110, ry: 64, label: "Coastal", n: 16 },
  { id: "c3", x: 200, y: 460, rx: 100, ry: 60, label: "Forest", n: 14 },
  { id: "c4", x: 780, y: 470, rx: 95, ry: 58, label: "Arid", n: 10 },
  { id: "c5", x: 500, y: 120, rx: 70, ry: 42, label: "Polar", n: 6 },
];

const CORE = { x: 500, y: 320 };

function jitterPoints(cx: number, cy: number, rx: number, ry: number, n: number, seed: number) {
  const out: { x: number; y: number }[] = [];
  let s = seed;
  for (let i = 0; i < n; i++) {
    s = (s * 9301 + 49297) % 233280;
    const a = (s / 233280) * Math.PI * 2;
    s = (s * 9301 + 49297) % 233280;
    const r = Math.sqrt(s / 233280);
    out.push({ x: cx + Math.cos(a) * rx * r * 0.92, y: cy + Math.sin(a) * ry * r * 0.92 });
  }
  return out;
}

export function SatelliteRetrievalMap() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <VisualFrame aspect="1000/620">
      <svg
        viewBox={`0 0 ${VB.w} ${VB.h}`}
        className="absolute inset-0 h-full w-full"
        onMouseLeave={() => setActive(null)}
      >
        {/* cesium latitude curves */}
        {[120, 200, 320, 440, 540].map((y, i) => (
          <path
            key={`lat-${i}`}
            d={`M -20 ${y} Q 500 ${y - 30} 1020 ${y}`}
            fill="none"
            stroke="color-mix(in oklab, var(--accent-cyan) 8%, transparent)"
            strokeWidth={0.6}
          />
        ))}
        {[200, 400, 600, 800].map((x, i) => (
          <path
            key={`lon-${i}`}
            d={`M ${x} 0 Q ${x - 20} 310 ${x} 620`}
            fill="none"
            stroke="color-mix(in oklab, white 4%, transparent)"
            strokeWidth={0.5}
          />
        ))}

        {/* DBSCAN cluster regions */}
        {CLUSTERS.map((c) => (
          <g
            key={`reg-${c.id}`}
            style={{
              opacity: !active || active === c.id ? 1 : 0.35,
              transition: "opacity 500ms cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            <ellipse
              cx={c.x}
              cy={c.y}
              rx={c.rx}
              ry={c.ry}
              fill={`color-mix(in oklab, var(--accent-cyan) ${active === c.id ? 14 : 7}%, transparent)`}
              stroke={`color-mix(in oklab, var(--accent-cyan) ${active === c.id ? 50 : 22}%, transparent)`}
              strokeWidth={0.8}
              strokeDasharray="2 5"
            />
            {/* member dots */}
            {jitterPoints(c.x, c.y, c.rx, c.ry, c.n, c.x * 13 + c.y).map((p, i) => (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r={1.6}
                fill="color-mix(in oklab, white 60%, transparent)"
              />
            ))}
            <text
              x={c.x}
              y={c.y - c.ry - 8}
              textAnchor="middle"
              fill="var(--text-secondary)"
              fontFamily="var(--font-mono)"
              fontSize={9}
              style={{ letterSpacing: "0.24em", textTransform: "uppercase" }}
            >
              {c.label}
            </text>
          </g>
        ))}

        {/* embedding similarity edges to core */}
        {CLUSTERS.map((c) => (
          <Edge
            key={`e-${c.id}`}
            d={`M ${c.x} ${c.y} Q ${(c.x + CORE.x) / 2} ${(c.y + CORE.y) / 2 - 40} ${CORE.x} ${CORE.y}`}
            color="color-mix(in oklab, var(--accent-cyan) 22%, transparent)"
            active={active === c.id}
            dimmed={!!active && active !== c.id}
            pulseDur={4.5}
          />
        ))}

        {/* hover-only similarity rays inside active cluster */}
        {active &&
          CLUSTERS.filter((c) => c.id === active).map((c) =>
            jitterPoints(c.x, c.y, c.rx * 0.85, c.ry * 0.85, 6, c.x).map((p, i) => (
              <line
                key={`ray-${c.id}-${i}`}
                x1={c.x}
                y1={c.y}
                x2={p.x}
                y2={p.y}
                stroke="color-mix(in oklab, var(--accent-cyan) 55%, transparent)"
                strokeWidth={0.5}
              />
            )),
          )}

        {/* cluster center nodes */}
        {CLUSTERS.map((c) => (
          <NodeDot
            key={c.id}
            cx={c.x}
            cy={c.y}
            r={7}
            color="var(--accent-cyan)"
            active={active === c.id}
            dimmed={!!active && active !== c.id}
            onEnter={() => setActive(c.id)}
            onLeave={() => setActive(null)}
          />
        ))}

        {/* RemoteCLIP core */}
        <motion.circle
          cx={CORE.x}
          cy={CORE.y}
          r={40}
          fill="color-mix(in oklab, var(--accent-warm) 14%, transparent)"
          style={{ filter: "blur(10px)" }}
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <NodeDot
          cx={CORE.x}
          cy={CORE.y}
          r={18}
          color="var(--accent-warm)"
          hub
          label="RemoteCLIP · ChromaDB"
        />

        <MetricTag x={40} y={40} label="indexed" value="10k+ images" />
        <MetricTag x={40} y={84} label="query" value="<500ms" />
        <MetricTag x={VB.w - 170} y={40} label="bands" value="4-band GeoTIFF" />
      </svg>
    </VisualFrame>
  );
}
