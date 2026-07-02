import { useState } from "react";
import { Edge, MetricTag, NodeDot, VisualFrame } from "./primitives";

const VB = { w: 1000, h: 620 };

export function ApexVisual() {
  const [active, setActive] = useState<string | null>(null);

  const cyan = "var(--accent-cyan)";
  const indigo = "var(--accent-indigo)";
  const violet = "var(--accent-violet)";

  return (
    <VisualFrame aspect="1000/620">
      <svg
        viewBox={`0 0 ${VB.w} ${VB.h}`}
        className="absolute inset-0 h-full w-full"
        onMouseLeave={() => setActive(null)}
      >
        {/* Core Glow */}
        <circle
          cx={650}
          cy={310}
          r={220}
          fill="color-mix(in oklab, var(--accent-cyan) 6%, transparent)"
          style={{ filter: "blur(60px)" }}
        />

        {/* Infrastructure & Storage (Top Left) */}
        <rect
          x={50}
          y={50}
          width={220}
          height={180}
          rx={12}
          fill="color-mix(in oklab, var(--accent-indigo) 5%, transparent)"
          stroke={indigo}
          strokeWidth={1}
          strokeDasharray="4 6"
          opacity={0.6}
        />
        <text
          x={160}
          y={75}
          textAnchor="middle"
          fill={indigo}
          fontSize={11}
          fontFamily="var(--font-mono)"
          letterSpacing="0.1em"
        >
          INFRASTRUCTURE
        </text>

        <NodeDot cx={100} cy={120} r={10} color={indigo} label="SQLite/PG" />
        <NodeDot cx={220} cy={120} r={10} color={indigo} label="Redis" />
        <NodeDot cx={100} cy={180} r={10} color={indigo} label="MinIO" />
        <NodeDot cx={220} cy={180} r={10} color={indigo} label="Celery" />

        {/* Presentation & API Layer (Left) */}
        <NodeDot
          cx={160}
          cy={320}
          r={15}
          color={violet}
          label="React Frontend"
          active={active === "ui"}
          onEnter={() => setActive("ui")}
          hub
        />

        <Edge d="M 160 335 L 160 415" active={active === "ui" || active === "api"} />
        <NodeDot
          cx={160}
          cy={430}
          r={12}
          color={violet}
          label="FastAPI Backend"
          active={active === "api"}
          onEnter={() => setActive("api")}
        />

        {/* API to Infra & Pipeline */}
        <Edge d="M 160 415 L 160 210 L 220 210" active={active === "api"} dimmed pulse={false} />
        <Edge
          d="M 175 430 L 350 430 L 350 150 L 485 150"
          active={active === "api" || active === "pipe"}
          pulseDur={4}
        />

        {/* Async Planning Pipeline (Right side) */}
        <rect
          x={400}
          y={50}
          width={550}
          height={420}
          rx={12}
          fill="color-mix(in oklab, var(--accent-cyan) 5%, transparent)"
          stroke={cyan}
          strokeWidth={1}
        />
        <text
          x={675}
          y={80}
          textAnchor="middle"
          fill={cyan}
          fontSize={12}
          fontFamily="var(--font-mono)"
          letterSpacing="0.1em"
        >
          ASYNC PLANNING PIPELINE
        </text>

        {/* Pipeline Nodes */}
        <NodeDot
          cx={500}
          cy={150}
          r={12}
          color={cyan}
          label="Context Extraction"
          active={active === "pipe"}
          onEnter={() => setActive("pipe")}
        />
        <Edge d="M 500 165 L 500 225" active={active === "pipe"} />

        <NodeDot
          cx={500}
          cy={240}
          r={12}
          color={cyan}
          label="Weight Learning"
          active={active === "pipe"}
          onEnter={() => setActive("pipe")}
        />
        <Edge d="M 500 255 L 500 365" active={active === "pipe"} />

        {/* Optimization Engine */}
        <g>
          <circle
            cx={500}
            cy={380}
            r={35}
            fill="color-mix(in oklab, var(--accent-cyan) 20%, transparent)"
            stroke={cyan}
            strokeWidth={2}
          />
          <text
            x={500}
            y={375}
            textAnchor="middle"
            fill="var(--text-primary)"
            fontSize={11}
            fontFamily="var(--font-mono)"
          >
            Optimization
          </text>
          <text
            x={500}
            y={390}
            textAnchor="middle"
            fill="var(--text-tertiary)"
            fontSize={9}
            fontFamily="var(--font-mono)"
          >
            Engine
          </text>
          {/* Active Area */}
          <circle
            cx={500}
            cy={380}
            r={35}
            fill="transparent"
            stroke="transparent"
            strokeWidth={0}
            onMouseEnter={() => setActive("opt")}
            onMouseLeave={() => setActive(null)}
            style={{ cursor: "pointer" }}
          />
        </g>

        <Edge d="M 535 380 L 735 380" active={active === "opt" || active === "exp"} />

        <NodeDot
          cx={750}
          cy={380}
          r={14}
          color={violet}
          label="Explainability Engine"
          hub
          active={active === "exp"}
          onEnter={() => setActive("exp")}
        />
        <Edge d="M 750 365 L 750 255" active={active === "exp" || active === "plan"} />

        <NodeDot
          cx={750}
          cy={240}
          r={12}
          color={cyan}
          label="Sprint Plan"
          active={active === "plan"}
          onEnter={() => setActive("plan")}
        />
        <Edge d="M 750 225 L 750 165" active={active === "plan"} />

        <NodeDot cx={750} cy={150} r={10} color={indigo} label="Export JSON/CSV" />

        {/* Output Loop back to UI */}
        <Edge
          d="M 765 240 L 880 240 L 880 560 L 160 560 L 160 445"
          active={active === "plan"}
          pulseDur={6}
        />
        <text
          x={520}
          y={550}
          fill="var(--text-tertiary)"
          fontSize={10}
          fontFamily="var(--font-mono)"
        >
          Async Status Polling & Plan Retrieval
        </text>

        {/* Optimization Constraints (Bottom Center) */}
        <rect
          x={400}
          y={490}
          width={400}
          height={80}
          rx={12}
          fill="none"
          stroke="var(--text-tertiary)"
          strokeWidth={1}
          strokeDasharray="4 6"
          opacity={0.6}
        />
        <text
          x={600}
          y={510}
          textAnchor="middle"
          fill="var(--text-secondary)"
          fontSize={9}
          fontFamily="var(--font-mono)"
        >
          OPTIMIZATION CONSTRAINTS
        </text>

        <NodeDot
          cx={450}
          cy={540}
          r={8}
          color="var(--text-tertiary)"
          label="Capacity"
          active={active === "opt"}
        />
        <Edge d="M 450 530 L 450 410" active={active === "opt"} width={0.5} />

        <NodeDot
          cx={550}
          cy={540}
          r={8}
          color="var(--text-tertiary)"
          label="Risk"
          active={active === "opt"}
        />
        <Edge d="M 550 530 L 550 450 L 515 410" active={active === "opt"} width={0.5} />

        <NodeDot
          cx={650}
          cy={540}
          r={8}
          color="var(--text-tertiary)"
          label="Skills"
          active={active === "opt"}
        />
        <Edge d="M 650 530 L 650 450 L 525 410" active={active === "opt"} width={0.5} />

        <NodeDot
          cx={750}
          cy={540}
          r={8}
          color="var(--text-tertiary)"
          label="Dependencies"
          active={active === "opt"}
        />
        <Edge d="M 750 530 L 750 460 L 535 405" active={active === "opt"} width={0.5} />

        {/* Metrics */}
        <MetricTag x={40} y={540} label="Algorithm" value="ILP (PuLP/CBC)" />
        <MetricTag x={VB.w - 180} y={40} label="Pipeline" value="Async 5-Stage" />
      </svg>
    </VisualFrame>
  );
}
