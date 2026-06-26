import { useState } from "react";
import { Edge, MetricTag, NodeDot, VisualFrame } from "./primitives";

const VB = { w: 1000, h: 620 };

export function CinemaVisual() {
  const [active, setActive] = useState<string | null>(null);
  
  // Custom Emerald color for this project since it's not in styles.css
  const emerald = "#10b981";

  return (
    <VisualFrame aspect="1000/620">
      <svg preserveAspectRatio="xMidYMid slice" viewBox={`0 0 ${VB.w} ${VB.h}`} className="absolute inset-0 h-full w-full" onMouseLeave={() => setActive(null)}>
        {/* Glow */}
        <circle cx={700} cy={310} r={200} fill="color-mix(in srgb, #10b981 8%, transparent)" style={{ filter: "blur(60px)" }} />

        {/* HistoryStore (Left) */}
        <rect x={80} y={270} width={120} height={80} rx={8} fill="color-mix(in srgb, #10b981 10%, transparent)" stroke="#10b981" strokeWidth={1} />
        <text x={140} y={310} textAnchor="middle" fill="#10b981" fontSize={11} fontFamily="var(--font-mono)">HistoryStore</text>
        <text x={140} y={330} textAnchor="middle" fill="var(--text-tertiary)" fontSize={9} fontFamily="var(--font-mono)">Parquet Partitioned</text>

        {/* Three Rivers (Models) */}
        {/* River 1: LightGBM */}
        <path d="M 200 310 Q 300 200 450 200 T 700 310" fill="none" stroke="color-mix(in srgb, #10b981 40%, transparent)" strokeWidth={2} />
        <NodeDot cx={450} cy={200} r={8} color={emerald} label="LightGBM" />
        
        {/* River 2: XGBoost */}
        <path d="M 200 310 L 700 310" fill="none" stroke="color-mix(in srgb, #10b981 40%, transparent)" strokeWidth={2} />
        <NodeDot cx={450} cy={310} r={8} color={emerald} label="XGBoost" />
        
        {/* River 3: CatBoost */}
        <path d="M 200 310 Q 300 420 450 420 T 700 310" fill="none" stroke="color-mix(in srgb, #10b981 40%, transparent)" strokeWidth={2} />
        <NodeDot cx={450} cy={420} r={8} color={emerald} label="CatBoost" />

        {/* Ensemble Convergence Node */}
        <g>
          <circle cx={700} cy={310} r={35} fill="color-mix(in srgb, #10b981 20%, transparent)" stroke="#10b981" strokeWidth={2} />
          <text x={700} y={365} textAnchor="middle" fill="#10b981" fontSize={11} fontFamily="var(--font-mono)">Ensemble Blend</text>
          <text x={700} y={380} textAnchor="middle" fill="var(--text-tertiary)" fontSize={9} fontFamily="var(--font-mono)">α=0.2 lag blend</text>
        </g>

        {/* Feedback loop (Lag 7) */}
        <path d="M 700 275 Q 700 100 450 100 T 140 270" fill="none" stroke="color-mix(in oklab, var(--accent-warm) 40%, transparent)" strokeDasharray="4 6" />
        <text x={450} y={90} textAnchor="middle" fill="var(--accent-warm)" fontSize={9} fontFamily="var(--font-mono)">Feedback Loop (Lag 7)</text>

        {/* Observability Layer hovering above */}
        <rect x={400} y={30} width={200} height={24} rx={4} fill="color-mix(in oklab, var(--accent-cyan) 15%, transparent)" stroke="var(--accent-cyan)" strokeWidth={1} />
        <text x={500} y={46} textAnchor="middle" fill="var(--accent-cyan)" fontSize={9} fontFamily="var(--font-mono)">Prometheus / Grafana (15 metrics)</text>

        {/* Final Forecast Output */}
        <Edge d="M 735 310 L 880 310" color="color-mix(in srgb, #10b981 60%, transparent)" />
        <NodeDot cx={880} cy={310} r={10} color={emerald} label="Forecast Prediction" />

        {/* Metrics */}
        <MetricTag x={40} y={40} label="Accuracy" value="RMSE 21.6" />
        <MetricTag x={VB.w - 180} y={40} label="Production" value="APScheduler" />
      </svg>
    </VisualFrame>
  );
}
