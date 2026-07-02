import { useState } from "react";
import { Edge, MetricTag, NodeDot, VisualFrame } from "./primitives";

const VB = { w: 1000, h: 620 };

export function CinemaVisual() {
  const [active, setActive] = useState<string | null>(null);

  const emerald = "#10b981";

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
          r={300}
          fill="color-mix(in srgb, #10b981 5%, transparent)"
          style={{ filter: "blur(80px)" }}
        />

        {/* Docker Deployment Boundary */}
        <rect
          x={150}
          y={40}
          width={800}
          height={540}
          rx={16}
          fill="none"
          stroke="color-mix(in srgb, #10b981 15%, transparent)"
          strokeWidth={1}
          strokeDasharray="8 8"
        />
        <text
          x={160}
          y={60}
          fill="#10b981"
          fontSize={10}
          fontFamily="var(--font-mono)"
          opacity={0.6}
        >
          Docker Containerized Deployment
        </text>

        {/* Client -> FastAPI */}
        <NodeDot
          cx={80}
          cy={310}
          r={12}
          color="var(--accent-cyan)"
          label="Client"
          active={active === "client"}
          onEnter={() => setActive("client")}
        />
        <Edge d="M 100 310 L 220 310" active={active === "client" || active === "api"} />
        <NodeDot
          cx={235}
          cy={310}
          r={15}
          color={emerald}
          label="FastAPI API"
          hub
          active={active === "api"}
          onEnter={() => setActive("api")}
        />

        {/* Orchestration */}
        <Edge d="M 235 295 L 235 150 L 350 150" active={active === "api" || active === "orch"} />
        <NodeDot
          cx={365}
          cy={150}
          r={12}
          color={emerald}
          label="Ensemble Orchestrator"
          active={active === "orch"}
          onEnter={() => setActive("orch")}
        />

        {/* APScheduler */}
        <Edge d="M 365 70 L 365 130" pulse={false} dimmed />
        <NodeDot cx={365} cy={60} r={8} color="var(--text-tertiary)" label="APScheduler" />

        {/* Feature Pipeline */}
        <Edge d="M 380 150 L 465 150 L 465 295" active={active === "orch" || active === "feat"} />
        <NodeDot
          cx={465}
          cy={310}
          r={15}
          color={emerald}
          label="Feature Pipeline"
          hub
          active={active === "feat"}
          onEnter={() => setActive("feat")}
        />

        {/* Feature Pipeline Inputs */}
        <rect
          x={280}
          y={400}
          width={100}
          height={40}
          rx={4}
          fill="color-mix(in srgb, #10b981 10%, transparent)"
          stroke="#10b981"
          strokeWidth={1}
        />
        <text
          x={330}
          y={424}
          textAnchor="middle"
          fill="#10b981"
          fontSize={9}
          fontFamily="var(--font-mono)"
        >
          Parquet History
        </text>
        <Edge
          d="M 330 400 L 330 350 L 450 320"
          active={active === "feat"}
          width={0.5}
          pulseDur={2}
        />

        <rect
          x={410}
          y={440}
          width={110}
          height={40}
          rx={4}
          fill="color-mix(in oklab, var(--accent-indigo) 10%, transparent)"
          stroke="var(--accent-indigo)"
          strokeWidth={1}
        />
        <text
          x={465}
          y={464}
          textAnchor="middle"
          fill="var(--accent-indigo)"
          fontSize={9}
          fontFamily="var(--font-mono)"
        >
          Redis Cache
        </text>
        <Edge d="M 465 440 L 465 330" active={active === "feat"} width={0.5} />

        <rect
          x={540}
          y={400}
          width={120}
          height={40}
          rx={4}
          fill="color-mix(in oklab, var(--text-secondary) 10%, transparent)"
          stroke="var(--text-tertiary)"
          strokeWidth={1}
        />
        <text
          x={600}
          y={419}
          textAnchor="middle"
          fill="var(--text-secondary)"
          fontSize={9}
          fontFamily="var(--font-mono)"
        >
          Cold Start Defaults
        </text>
        <text
          x={600}
          y={430}
          textAnchor="middle"
          fill="var(--text-tertiary)"
          fontSize={7}
          fontFamily="var(--font-mono)"
        >
          (Feature Schema Contract)
        </text>
        <Edge d="M 600 400 L 600 350 L 480 320" active={active === "feat"} width={0.5} />

        {/* Rolling Window State */}
        <rect
          x={415}
          y={220}
          width={100}
          height={20}
          rx={4}
          fill="none"
          stroke="var(--text-tertiary)"
          strokeDasharray="2 2"
        />
        <text
          x={465}
          y={233}
          textAnchor="middle"
          fill="var(--text-secondary)"
          fontSize={8}
          fontFamily="var(--font-mono)"
        >
          Rolling Window State
        </text>
        <Edge d="M 465 240 L 465 290" pulse={false} width={0.5} />

        {/* ML Ensemble */}
        <Edge d="M 480 310 Q 550 200 685 200" active={active === "feat" || active === "lgb"} />
        <NodeDot
          cx={700}
          cy={200}
          r={10}
          color={emerald}
          label="LightGBM"
          active={active === "lgb"}
          onEnter={() => setActive("lgb")}
        />

        <Edge d="M 485 310 L 685 310" active={active === "feat" || active === "xgb"} />
        <NodeDot
          cx={700}
          cy={310}
          r={10}
          color={emerald}
          label="XGBoost"
          active={active === "xgb"}
          onEnter={() => setActive("xgb")}
        />

        <Edge d="M 480 310 Q 550 420 685 420" active={active === "feat" || active === "cat"} />
        <NodeDot
          cx={700}
          cy={420}
          r={10}
          color={emerald}
          label="CatBoost"
          active={active === "cat"}
          onEnter={() => setActive("cat")}
        />

        {/* Blender */}
        <Edge d="M 715 200 Q 820 200 835 295" active={active === "lgb" || active === "blend"} />
        <Edge d="M 715 310 L 820 310" active={active === "xgb" || active === "blend"} />
        <Edge d="M 715 420 Q 820 420 835 325" active={active === "cat" || active === "blend"} />

        <NodeDot
          cx={835}
          cy={310}
          r={12}
          color={emerald}
          label="Blender"
          hub
          active={active === "blend"}
          onEnter={() => setActive("blend")}
        />

        {/* Output & Persistence */}
        <Edge
          d="M 835 290 L 835 150 L 250 150 L 250 290"
          active={active === "blend" || active === "api"}
          pulseDur={6}
        />
        <text
          x={500}
          y={140}
          textAnchor="middle"
          fill={emerald}
          fontSize={8}
          fontFamily="var(--font-mono)"
        >
          Forecast Response
        </text>

        <Edge d="M 835 330 L 835 460 L 525 460" active={active === "blend"} pulseDur={3} />
        <text
          x={650}
          y={450}
          textAnchor="middle"
          fill="var(--accent-indigo)"
          fontSize={8}
          fontFamily="var(--font-mono)"
        >
          Prediction Persistence
        </text>

        {/* Observability */}
        <rect
          x={180}
          y={510}
          width={250}
          height={40}
          rx={6}
          fill="color-mix(in oklab, var(--accent-cyan) 10%, transparent)"
          stroke="var(--accent-cyan)"
          strokeWidth={1}
        />
        <text
          x={305}
          y={535}
          textAnchor="middle"
          fill="var(--accent-cyan)"
          fontSize={10}
          fontFamily="var(--font-mono)"
        >
          Prometheus + Grafana
        </text>
        <Edge d="M 235 330 L 235 510" pulse={false} dimmed />

        <rect
          x={450}
          y={510}
          width={150}
          height={40}
          rx={6}
          fill="color-mix(in oklab, var(--text-secondary) 10%, transparent)"
          stroke="var(--text-tertiary)"
          strokeWidth={1}
        />
        <text
          x={525}
          y={535}
          textAnchor="middle"
          fill="var(--text-secondary)"
          fontSize={10}
          fontFamily="var(--font-mono)"
        >
          Structured Logging
        </text>
        <Edge d="M 250 320 L 525 320 L 525 510" pulse={false} dimmed />

        {/* Metrics */}
        <MetricTag x={40} y={40} label="Inference" value="Parallel" />
        <MetricTag x={VB.w - 180} y={40} label="Cache" value="Rolling State" />
      </svg>
    </VisualFrame>
  );
}
