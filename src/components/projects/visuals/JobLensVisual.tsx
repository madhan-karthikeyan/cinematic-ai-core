import { useState } from "react";
import { Edge, MetricTag, NodeDot, VisualFrame } from "./primitives";

const VB = { w: 1000, h: 620 };

export function JobLensVisual() {
  const [active, setActive] = useState<string | null>(null);

  const sources = [
    { id: "gh", label: "Greenhouse", angle: 200 },
    { id: "lv", label: "Lever", angle: 230 },
    { id: "ab", label: "Ashby", angle: 260 },
    { id: "wd", label: "Workday", angle: 290 },
    { id: "ad", label: "Adzuna", angle: 320 },
    { id: "js", label: "JSearch", angle: 350 },
    { id: "yc", label: "YC", angle: 20 },
  ];

  const outputs = [
    { id: "job", label: "Job Board", angle: 140 },
    { id: "kanban", label: "Kanban", angle: 100 },
    { id: "skill", label: "Skill Gap", angle: 60 },
    { id: "discord", label: "Discord Digest", angle: 170 },
    { id: "company", label: "Company Browser", angle: 80 },
  ];

  const polar = (cx: number, cy: number, r: number, aDeg: number) => {
    const a = (aDeg * Math.PI) / 180;
    return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r };
  };

  return (
    <VisualFrame aspect="1000/620">
      <svg viewBox={`0 0 ${VB.w} ${VB.h}`} className="absolute inset-0 h-full w-full" onMouseLeave={() => setActive(null)}>
        <circle cx={500} cy={310} r={280} fill="color-mix(in oklab, var(--accent-warm) 4%, transparent)" style={{ filter: "blur(60px)" }} />

        {/* Orbit Rings */}
        <circle cx={500} cy={310} r={220} fill="none" stroke="color-mix(in oklab, var(--accent-warm) 10%, transparent)" strokeDasharray="4 8" />
        <circle cx={500} cy={310} r={140} fill="none" stroke="color-mix(in oklab, var(--accent-warm) 15%, transparent)" strokeDasharray="2 6" />

        {/* Source Nodes -> Core */}
        {sources.map(s => {
          const p = polar(500, 310, 220, s.angle);
          return (
            <g key={`src-${s.id}`}>
              <Edge d={`M ${p.x} ${p.y} L 500 310`} color="color-mix(in oklab, var(--accent-warm) 25%, transparent)" pulseDur={3 + Math.random()} />
              <NodeDot cx={p.x} cy={p.y} r={6} color="var(--text-tertiary)" label={s.label} />
            </g>
          );
        })}

        {/* Core -> Output Nodes */}
        {outputs.map(o => {
          const p = polar(500, 310, 140, o.angle);
          return (
            <g key={`out-${o.id}`}>
              <Edge d={`M 500 310 L ${p.x} ${p.y}`} color="color-mix(in oklab, var(--accent-warm) 35%, transparent)" pulseDur={2.5 + Math.random()} />
              <NodeDot cx={p.x} cy={p.y} r={8} color="var(--accent-warm)" label={o.label} />
            </g>
          );
        })}

        {/* The Intelligence Hub Core */}
        <g>
          <polygon points="500,260 540,310 500,360 460,310" fill="color-mix(in oklab, var(--accent-warm) 20%, transparent)" stroke="var(--accent-warm)" strokeWidth={2} />
          <text x={500} y={390} textAnchor="middle" fill="var(--accent-warm)" fontSize={12} fontFamily="var(--font-mono)" letterSpacing="0.1em">RANKING CORE</text>
          <text x={500} y={410} textAnchor="middle" fill="var(--text-tertiary)" fontSize={9} fontFamily="var(--font-mono)">4-Factor Deterministic</text>
        </g>

        {/* Metrics */}
        <MetricTag x={40} y={40} label="Integration" value="7+ ATS APIs" />
        <MetricTag x={VB.w - 180} y={40} label="Ranking" value="Role & Skill Match" />
      </svg>
    </VisualFrame>
  );
}
