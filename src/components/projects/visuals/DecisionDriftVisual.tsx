import { useState } from "react";
import { Edge, MetricTag, NodeDot, VisualFrame } from "./primitives";

const VB = { w: 1000, h: 620 };

export function DecisionDriftVisual() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <VisualFrame aspect="1000/620">
      <svg viewBox={`0 0 ${VB.w} ${VB.h}`} className="absolute inset-0 h-full w-full" onMouseLeave={() => setActive(null)}>
        {/* Background Radial Glow */}
        <circle cx={500} cy={310} r={250} fill="color-mix(in oklab, var(--accent-violet) 8%, transparent)" style={{ filter: "blur(60px)" }} />

        {/* Incoming Traffic (Left) */}
        <Edge d="M 100 210 L 350 210" color="color-mix(in oklab, var(--text-tertiary) 40%, transparent)" pulseDur={3} />
        <Edge d="M 100 410 L 350 410" color="color-mix(in oklab, var(--text-tertiary) 40%, transparent)" pulseDur={3.5} />
        <NodeDot cx={200} cy={210} r={6} color="var(--text-tertiary)" label="Git Diff" />
        <NodeDot cx={200} cy={410} r={6} color="var(--text-tertiary)" label="Tree-sitter AST" />

        {/* The Firewall / Rule Engine (Center) */}
        <g>
          {/* Vertical Wall */}
          <rect x={480} y={100} width={40} height={420} rx={12} fill="color-mix(in oklab, var(--accent-violet) 15%, transparent)" stroke="var(--accent-violet)" strokeWidth={1} />
          {/* Glowing core */}
          <rect x={488} y={150} width={24} height={320} rx={8} fill="var(--accent-violet)" opacity={0.6} style={{ filter: "blur(12px)" }} />
          
          <text x={500} y={80} textAnchor="middle" fill="var(--accent-violet)" fontSize={12} fontFamily="var(--font-mono)" letterSpacing="0.2em">
            ════ RULE ENGINE ════
          </text>

          {/* Audit Branch (Technical verification addition) */}
          <Edge d="M 500 100 L 500 60 L 650 60" color="color-mix(in oklab, var(--accent-cyan) 30%, transparent)" />
          <NodeDot cx={650} cy={60} r={5} color="var(--accent-cyan)" label="AUDIT (Drift & Health)" />
        </g>

        {/* Convergence into Wall */}
        <Edge d="M 350 210 Q 420 210 480 310" color="color-mix(in oklab, var(--accent-violet) 40%, transparent)" />
        <Edge d="M 350 410 Q 420 410 480 310" color="color-mix(in oklab, var(--accent-violet) 40%, transparent)" />

        {/* Outgoing Traffic (Right) */}
        {/* Blocked Path */}
        <Edge d="M 520 210 L 750 210" color="color-mix(in oklab, #ef4444 30%, transparent)" pulseDur={2} />
        <g>
          <circle cx={750} cy={210} r={20} fill="color-mix(in oklab, #ef4444 20%, transparent)" stroke="#ef4444" strokeWidth={1.5} />
          <path d="M 742 202 L 758 218 M 758 202 L 742 218" stroke="#ef4444" strokeWidth={2} strokeLinecap="round" />
          <text x={750} y={250} textAnchor="middle" fill="#ef4444" fontSize={10} fontFamily="var(--font-mono)" letterSpacing="0.1em">BLOCKED</text>
        </g>

        {/* Allowed Path */}
        <Edge d="M 520 410 L 750 410" color="color-mix(in oklab, #22c55e 30%, transparent)" pulseDur={3} />
        <g>
          <circle cx={750} cy={410} r={20} fill="color-mix(in oklab, #22c55e 20%, transparent)" stroke="#22c55e" strokeWidth={1.5} />
          <path d="M 740 410 L 748 418 L 760 402" fill="none" stroke="#22c55e" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          <text x={750} y={450} textAnchor="middle" fill="#22c55e" fontSize={10} fontFamily="var(--font-mono)" letterSpacing="0.1em">APPROVED</text>
        </g>

        {/* Metrics */}
        <MetricTag x={40} y={540} label="Recall@5" value="95.2%" />
        <MetricTag x={VB.w - 180} y={540} label="Rules" value="5 types" />
      </svg>
    </VisualFrame>
  );
}
