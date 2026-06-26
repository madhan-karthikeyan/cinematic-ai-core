import { useState } from "react";
import { Edge, MetricTag, NodeDot, VisualFrame } from "./primitives";

const VB = { w: 1000, h: 620 };

export function SatelliteVisual() {
  const [active, setActive] = useState<string | null>(null);

  const satellites = [
    { id: "s1", x: 200, y: 100 },
    { id: "s2", x: 400, y: 80 },
    { id: "s3", x: 600, y: 80 },
    { id: "s4", x: 800, y: 100 },
  ];

  return (
    <VisualFrame aspect="1000/620">
      <svg viewBox={`0 0 ${VB.w} ${VB.h}`} className="absolute inset-0 h-full w-full" onMouseLeave={() => setActive(null)}>
        {/* Orbital glow */}
        <ellipse cx={500} cy={150} rx={400} ry={100} fill="color-mix(in oklab, var(--accent-indigo) 5%, transparent)" style={{ filter: "blur(40px)" }} />

        {/* Orbit paths */}
        <path d="M 100 150 Q 500 50 900 150" fill="none" stroke="color-mix(in oklab, var(--accent-indigo) 15%, transparent)" strokeDasharray="4 6" />
        
        {/* Satellites beaming down to RemoteCLIP */}
        {satellites.map(s => (
          <g key={s.id}>
            <Edge d={`M ${s.x} ${s.y} L 500 240`} color="color-mix(in oklab, var(--accent-indigo) 30%, transparent)" pulseDur={3 + Math.random()} />
            <NodeDot cx={s.x} cy={s.y} r={4} color="var(--text-tertiary)" />
          </g>
        ))}

        {/* RemoteCLIP with 8x TTA Ring */}
        <g>
          <circle cx={500} cy={240} r={40} fill="none" stroke="var(--accent-indigo)" strokeWidth={1} strokeDasharray="2 4">
            <animateTransform attributeName="transform" type="rotate" from="0 500 240" to="360 500 240" dur="10s" repeatCount="indefinite" />
          </circle>
          <text x={440} y={245} fill="var(--text-tertiary)" fontSize={9} fontFamily="var(--font-mono)">8x TTA</text>
          
          <rect x={470} y={225} width={60} height={30} rx={6} fill="color-mix(in oklab, var(--accent-indigo) 20%, transparent)" stroke="var(--accent-indigo)" strokeWidth={1} />
          <text x={500} y={244} textAnchor="middle" fill="var(--accent-indigo)" fontSize={10} fontFamily="var(--font-mono)">RemoteCLIP</text>
        </g>

        {/* Down to ChromaDB */}
        <Edge d="M 500 255 L 500 320" color="color-mix(in oklab, var(--accent-indigo) 40%, transparent)" />
        <NodeDot cx={500} cy={320} r={12} color="var(--accent-indigo)" label="ChromaDB (20k+ fMoW)" />

        {/* RRF Node */}
        <Edge d="M 500 320 L 500 400" color="color-mix(in oklab, var(--accent-indigo) 40%, transparent)" />
        <rect x={470} y={390} width={60} height={20} rx={4} fill="color-mix(in oklab, var(--text-tertiary) 20%, transparent)" stroke="var(--text-tertiary)" strokeWidth={1} />
        <text x={500} y={404} textAnchor="middle" fill="var(--text-primary)" fontSize={9} fontFamily="var(--font-mono)">RRF Fusion</text>

        {/* DBSCAN and Earth */}
        <Edge d="M 500 410 L 500 480" color="color-mix(in oklab, var(--accent-indigo) 40%, transparent)" />
        <NodeDot cx={500} cy={480} r={10} color="var(--accent-cyan)" label="DBSCAN Clustering" />
        
        {/* Output to Cesium Globe (Abstract arc) */}
        <path d="M 400 560 Q 500 620 600 560" fill="none" stroke="color-mix(in oklab, var(--accent-indigo) 30%, transparent)" strokeWidth={2} />
        <text x={500} y={570} textAnchor="middle" fill="var(--text-tertiary)" fontSize={10} fontFamily="var(--font-mono)">Cesium 3D Globe Visualization</text>

        {/* Metrics */}
        <MetricTag x={40} y={40} label="Scale" value="20,000+ Images" />
        <MetricTag x={VB.w - 180} y={40} label="Latency" value="< 500ms" />
      </svg>
    </VisualFrame>
  );
}
