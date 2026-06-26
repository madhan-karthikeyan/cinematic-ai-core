import { useState } from "react";
import { motion } from "framer-motion";
import { Edge, MetricTag, NodeDot, VisualFrame } from "./primitives";

const VB = { w: 1000, h: 620 };

const GMM = [
  { id: "g1", cx: 260, cy: 220, rx: 130, ry: 78, rot: -22, label: "C₁", color: "var(--accent-cyan)" },
  { id: "g2", cx: 700, cy: 200, rx: 150, ry: 88, rot: 14, label: "C₂", color: "var(--accent-indigo)" },
  { id: "g3", cx: 320, cy: 460, rx: 140, ry: 80, rot: 18, label: "C₃", color: "var(--accent-violet)" },
  { id: "g4", cx: 720, cy: 470, rx: 130, ry: 70, rot: -10, label: "C₄", color: "var(--accent-warm)" },
];

const QUERY = { x: 90, y: 80 };

function jitter(cx: number, cy: number, rx: number, ry: number, rot: number, n: number, seed: number) {
  const out: { x: number; y: number }[] = [];
  let s = seed;
  const cos = Math.cos((rot * Math.PI) / 180);
  const sin = Math.sin((rot * Math.PI) / 180);
  for (let i = 0; i < n; i++) {
    s = (s * 9301 + 49297) % 233280;
    const a = (s / 233280) * Math.PI * 2;
    s = (s * 9301 + 49297) % 233280;
    const r = Math.sqrt(s / 233280) * 0.92;
    const px = Math.cos(a) * rx * r;
    const py = Math.sin(a) * ry * r;
    out.push({ x: cx + px * cos - py * sin, y: cy + px * sin + py * cos });
  }
  return out;
}

export function ClusterRetrievalTopology() {
  const [hoverQuery, setHoverQuery] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  // routed cluster when query hovered
  const routed = hoverQuery ? "g2" : null;

  return (
    <VisualFrame aspect="1000/620">
      <svg preserveAspectRatio="xMidYMid slice" viewBox={`0 0 ${VB.w} ${VB.h}`} className="absolute inset-0 h-full w-full" onMouseLeave={() => setActive(null)}>

        {/* semantic cache region overlay */}
        <g style={{ opacity: 0.9 }}>
          <ellipse cx={500} cy={340} rx={420} ry={210} fill="color-mix(in oklab, var(--accent-warm) 4%, transparent)" stroke="color-mix(in oklab, var(--accent-warm) 22%, transparent)" strokeDasharray="2 6" />
          <text x={500} y={70} textAnchor="middle" fill="var(--accent-warm)" fontFamily="var(--font-mono)" fontSize={8} style={{ letterSpacing: "0.28em", textTransform: "uppercase" }}>
            Semantic cache region
          </text>
        </g>

        {/* GMM partition ellipses with member dots */}
        {GMM.map((g) => {
          const isActive = active === g.id || routed === g.id;
          const isDim = !!active && active !== g.id;
          return (
            <g
              key={g.id}
              transform={`rotate(${g.rot} ${g.cx} ${g.cy})`}
              style={{ opacity: isDim ? 0.3 : 1, transition: "opacity 500ms cubic-bezier(0.22,1,0.36,1)" }}
              onMouseEnter={() => setActive(g.id)}
            >
              <ellipse
                cx={g.cx}
                cy={g.cy}
                rx={g.rx}
                ry={g.ry}
                fill={`color-mix(in oklab, ${g.color} ${isActive ? 14 : 7}%, transparent)`}
                stroke={`color-mix(in oklab, ${g.color} ${isActive ? 60 : 28}%, transparent)`}
                strokeWidth={0.9}
              />
              <ellipse
                cx={g.cx}
                cy={g.cy}
                rx={g.rx * 0.66}
                ry={g.ry * 0.66}
                fill="none"
                stroke={`color-mix(in oklab, ${g.color} ${isActive ? 38 : 16}%, transparent)`}
                strokeDasharray="1 5"
              />
              <ellipse
                cx={g.cx}
                cy={g.cy}
                rx={g.rx * 0.32}
                ry={g.ry * 0.32}
                fill="none"
                stroke={`color-mix(in oklab, ${g.color} ${isActive ? 50 : 22}%, transparent)`}
              />
              {jitter(g.cx, g.cy, g.rx * 0.95, g.ry * 0.95, 0, 22, g.cx * 7 + g.cy).map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r={1.5} fill={`color-mix(in oklab, ${g.color} 70%, transparent)`} />
              ))}
              <text
                x={g.cx}
                y={g.cy}
                textAnchor="middle"
                fill="var(--text-primary)"
                fontFamily="var(--font-mono)"
                fontSize={11}
                style={{ letterSpacing: "0.18em" }}
              >
                {g.label}
              </text>
            </g>
          );
        })}

        {/* dynamic routing path query → routed cluster */}
        {GMM.map((g) => {
          const isRouted = routed === g.id;
          return (
            <Edge
              key={`q-${g.id}`}
              d={`M ${QUERY.x + 18} ${QUERY.y} Q ${(QUERY.x + g.cx) / 2} ${(QUERY.y + g.cy) / 2 - 40} ${g.cx} ${g.cy}`}
              color={`color-mix(in oklab, ${g.color} ${isRouted ? 60 : 14}%, transparent)`}
              active={isRouted}
              pulseDur={isRouted ? 1.6 : 6}
              width={isRouted ? 1.2 : 0.5}
            />
          );
        })}

        {/* FAISS fallback dashed edges (cross-cluster) */}
        {[
          [GMM[0], GMM[1]],
          [GMM[1], GMM[3]],
          [GMM[2], GMM[3]],
          [GMM[0], GMM[2]],
        ].map(([a, b], i) => (
          <path
            key={`f-${i}`}
            d={`M ${a.cx} ${a.cy} Q ${(a.cx + b.cx) / 2} ${(a.cy + b.cy) / 2 + (i % 2 ? -40 : 40)} ${b.cx} ${b.cy}`}
            fill="none"
            stroke={`color-mix(in oklab, white ${active ? 22 : 8}%, transparent)`}
            strokeDasharray="2 6"
            strokeWidth={0.6}
          />
        ))}

        {/* query node */}
        <g
          onMouseEnter={() => setHoverQuery(true)}
          onMouseLeave={() => setHoverQuery(false)}
          style={{ cursor: "pointer" }}
        >
          <motion.circle
            cx={QUERY.x}
            cy={QUERY.y}
            r={26}
            fill="color-mix(in oklab, var(--accent-cyan) 16%, transparent)"
            style={{ filter: "blur(10px)" }}
            animate={{ opacity: [0.5, 0.85, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <NodeDot cx={QUERY.x} cy={QUERY.y} r={14} color="var(--accent-cyan)" hub label="Query" />
        </g>

        <MetricTag x={VB.w - 170} y={40} label="latency cut" value="~30%" />
        <MetricTag x={VB.w - 170} y={84} label="cache hit" value="~35%" />

        <text x={VB.w / 2} y={VB.h - 24} textAnchor="middle" fill="var(--text-tertiary)" fontFamily="var(--font-mono)" fontSize={9} style={{ letterSpacing: "0.28em", textTransform: "uppercase" }}>
          Hover Query · GMM-routed FAISS with semantic cache fallback
        </text>
      </svg>
    </VisualFrame>
  );
}
