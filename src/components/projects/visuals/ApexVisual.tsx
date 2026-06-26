import { useState } from "react";
import { Edge, MetricTag, NodeDot, VisualFrame } from "./primitives";

const VB = { w: 1000, h: 620 };

export function ApexVisual() {
  const [active, setActive] = useState<string | null>(null);

  const inputs = [
    { id: "context", label: "Context", x: 200, y: 150 },
    { id: "weights", label: "Weights", x: 200, y: 310 },
    { id: "history", label: "History", x: 200, y: 470 },
  ];

  const outputs = [
    { id: "plan", label: "Sprint Plan", x: 800, y: 150 },
    { id: "explain", label: "Explainability", x: 800, y: 310 },
    { id: "status", label: "Job Status", x: 800, y: 470 },
  ];

  return (
    <VisualFrame aspect="1000/620">
      <svg viewBox={`0 0 ${VB.w} ${VB.h}`} className="absolute inset-0 h-full w-full" onMouseLeave={() => setActive(null)}>
        {/* Core Glow */}
        <circle cx={500} cy={310} r={180} fill="color-mix(in oklab, var(--accent-cyan) 8%, transparent)" style={{ filter: "blur(50px)" }} />
        
        {/* Input Edges converging */}
        {inputs.map(n => (
          <Edge key={`in-${n.id}`} d={`M ${n.x} ${n.y} Q 350 ${n.y} 440 310`} color="color-mix(in oklab, var(--accent-cyan) 30%, transparent)" pulseDur={2 + Math.random()} />
        ))}

        {/* Output Edges diverging */}
        {outputs.map(n => (
          <Edge key={`out-${n.id}`} d={`M 560 310 Q 650 ${n.y} ${n.x} ${n.y}`} color="color-mix(in oklab, var(--accent-cyan) 30%, transparent)" pulseDur={2.5 + Math.random()} />
        ))}

        {/* Input Nodes */}
        {inputs.map(n => (
          <NodeDot key={n.id} cx={n.x} cy={n.y} r={8} color="var(--text-tertiary)" label={n.label} />
        ))}
        {/* Output Nodes */}
        {outputs.map(n => (
          <NodeDot key={n.id} cx={n.x} cy={n.y} r={8} color="var(--text-tertiary)" label={n.label} />
        ))}

        {/* The Reactor Core (ILP Optimizer) */}
        <g>
          {/* Outer ring */}
          <circle cx={500} cy={310} r={60} fill="none" stroke="var(--accent-cyan)" strokeWidth={1} strokeDasharray="4 6">
            <animateTransform attributeName="transform" type="rotate" from="0 500 310" to="360 500 310" dur="20s" repeatCount="indefinite" />
          </circle>
          {/* Inner core */}
          <circle cx={500} cy={310} r={45} fill="color-mix(in oklab, var(--accent-cyan) 20%, transparent)" stroke="var(--accent-cyan)" strokeWidth={2} />
          
          {/* Abstract Constraint Grid inside core */}
          <path d="M 470 290 L 530 330 M 470 330 L 530 290 M 480 280 L 480 340 M 520 280 L 520 340" stroke="var(--accent-cyan)" opacity={0.4} strokeWidth={1} />
          
          <text x={500} y={395} textAnchor="middle" fill="var(--accent-cyan)" fontSize={12} fontFamily="var(--font-mono)" letterSpacing="0.1em">ILP OPTIMIZER</text>
          <text x={500} y={415} textAnchor="middle" fill="var(--text-tertiary)" fontSize={10} fontFamily="var(--font-mono)">PuLP / CBC Solver</text>
        </g>

        {/* Metrics */}
        <MetricTag x={40} y={40} label="Algorithm" value="Constrained Optimization" />
        <MetricTag x={VB.w - 200} y={40} label="Explainability" value="Per-story scores" />
      </svg>
    </VisualFrame>
  );
}
