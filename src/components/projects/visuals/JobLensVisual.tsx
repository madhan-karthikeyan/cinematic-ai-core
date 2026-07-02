import { useState } from "react";
import { Edge, MetricTag, NodeDot, VisualFrame } from "./primitives";

const VB = { w: 1000, h: 620 };

export function JobLensVisual() {
  const [active, setActive] = useState<string | null>(null);

  const warm = "var(--accent-warm)";
  const cyan = "var(--accent-cyan)";
  const indigo = "var(--accent-indigo)";
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
          cx={480}
          cy={250}
          r={250}
          fill="color-mix(in oklab, var(--accent-warm) 6%, transparent)"
          style={{ filter: "blur(70px)" }}
        />

        {/* Data Ingestion Subgraph (Left) */}
        <rect
          x={50}
          y={50}
          width={220}
          height={260}
          rx={12}
          fill="none"
          stroke="var(--text-tertiary)"
          strokeWidth={1}
          strokeDasharray="4 6"
          opacity={0.3}
        />
        <text
          x={160}
          y={75}
          textAnchor="middle"
          fill="var(--text-secondary)"
          fontSize={10}
          fontFamily="var(--font-mono)"
        >
          External Sources & Scrapers
        </text>

        {/* Sources */}
        <NodeDot
          cx={100}
          cy={120}
          r={6}
          color={warm}
          label="Adzuna"
          active={active === "src"}
          onEnter={() => setActive("src")}
        />
        <NodeDot
          cx={160}
          cy={120}
          r={6}
          color={warm}
          label="JSearch"
          active={active === "src"}
          onEnter={() => setActive("src")}
        />
        <NodeDot
          cx={220}
          cy={120}
          r={6}
          color={warm}
          label="Greenhouse"
          active={active === "src"}
          onEnter={() => setActive("src")}
        />
        <NodeDot
          cx={100}
          cy={170}
          r={6}
          color={warm}
          label="Lever"
          active={active === "src"}
          onEnter={() => setActive("src")}
        />
        <NodeDot
          cx={160}
          cy={170}
          r={6}
          color={warm}
          label="Ashby"
          active={active === "src"}
          onEnter={() => setActive("src")}
        />
        <NodeDot
          cx={220}
          cy={170}
          r={6}
          color={warm}
          label="Workday"
          active={active === "src"}
          onEnter={() => setActive("src")}
        />

        {/* Manual Jobs */}
        <NodeDot
          cx={100}
          cy={260}
          r={8}
          color={cyan}
          label="Manual Input"
          active={active === "src"}
          onEnter={() => setActive("src")}
        />

        <Edge d="M 160 180 L 160 210 L 220 210" active={active === "src"} />
        <Edge d="M 100 130 L 100 210 L 220 210" active={active === "src"} />
        <Edge d="M 220 180 L 220 210" active={active === "src"} />

        <NodeDot
          cx={220}
          cy={230}
          r={8}
          color={warm}
          label="Cron Scrapers"
          active={active === "src"}
          onEnter={() => setActive("src")}
        />

        {/* PostgreSQL Database */}
        <Edge d="M 230 230 L 320 230" active={active === "src" || active === "db"} />
        <Edge d="M 115 260 L 320 260 L 320 230" active={active === "src" || active === "db"} />

        <rect
          x={320}
          y={200}
          width={60}
          height={60}
          rx={8}
          fill="color-mix(in oklab, var(--accent-indigo) 15%, transparent)"
          stroke={indigo}
          strokeWidth={1}
        />
        <text
          x={350}
          y={225}
          textAnchor="middle"
          fill={indigo}
          fontSize={10}
          fontFamily="var(--font-mono)"
        >
          Postgres
        </text>
        <text
          x={350}
          y={240}
          textAnchor="middle"
          fill="var(--text-tertiary)"
          fontSize={8}
          fontFamily="var(--font-mono)"
        >
          (asyncpg)
        </text>

        {/* Recommendation Engine (Center) */}
        <Edge d="M 380 230 L 460 230" active={active === "db" || active === "engine"} />
        <rect
          x={460}
          y={100}
          width={240}
          height={260}
          rx={12}
          fill="color-mix(in oklab, var(--accent-warm) 8%, transparent)"
          stroke={warm}
          strokeWidth={1}
        />
        <text
          x={580}
          y={125}
          textAnchor="middle"
          fill={warm}
          fontSize={11}
          fontFamily="var(--font-mono)"
          letterSpacing="0.1em"
        >
          RECOMMENDATION ENGINE V2
        </text>

        {/* Internals */}
        <rect
          x={500}
          y={150}
          width={160}
          height={24}
          rx={4}
          fill="none"
          stroke={warm}
          strokeWidth={0.5}
          strokeDasharray="2 2"
        />
        <text
          x={580}
          y={166}
          textAnchor="middle"
          fill="var(--text-primary)"
          fontSize={9}
          fontFamily="var(--font-mono)"
        >
          Role Match (35%)
        </text>

        <rect
          x={500}
          y={190}
          width={160}
          height={24}
          rx={4}
          fill="none"
          stroke={warm}
          strokeWidth={0.5}
          strokeDasharray="2 2"
        />
        <text
          x={580}
          y={206}
          textAnchor="middle"
          fill="var(--text-primary)"
          fontSize={9}
          fontFamily="var(--font-mono)"
        >
          Skill Match (30%)
        </text>

        <rect
          x={500}
          y={230}
          width={160}
          height={24}
          rx={4}
          fill="none"
          stroke={warm}
          strokeWidth={0.5}
          strokeDasharray="2 2"
        />
        <text
          x={580}
          y={246}
          textAnchor="middle"
          fill="var(--text-primary)"
          fontSize={9}
          fontFamily="var(--font-mono)"
        >
          Behavior Affinity (20%)
        </text>

        <rect
          x={500}
          y={270}
          width={160}
          height={24}
          rx={4}
          fill="none"
          stroke={warm}
          strokeWidth={0.5}
          strokeDasharray="2 2"
        />
        <text
          x={580}
          y={286}
          textAnchor="middle"
          fill="var(--text-primary)"
          fontSize={9}
          fontFamily="var(--font-mono)"
        >
          Freshness (10%) + Bonuses
        </text>

        {/* Deterministic Node */}
        <NodeDot
          cx={580}
          cy={335}
          r={10}
          color={warm}
          label="Ranker Hub"
          hub
          active={active === "engine"}
          onEnter={() => setActive("engine")}
        />

        {/* API Layer */}
        <Edge d="M 700 230 L 780 230" active={active === "engine" || active === "api"} />
        <NodeDot
          cx={780}
          cy={230}
          r={12}
          color={cyan}
          label="FastAPI Backend"
          active={active === "api"}
          onEnter={() => setActive("api")}
        />

        {/* Frontend & Interfaces */}
        <Edge
          d="M 780 215 L 780 150 L 880 150"
          active={active === "api" || active === "ui"}
          pulseDur={2.5}
        />
        <NodeDot
          cx={890}
          cy={150}
          r={12}
          color={cyan}
          label="React Frontend"
          active={active === "ui"}
          onEnter={() => setActive("ui")}
        />

        {/* Discord Digest */}
        <Edge d="M 350 200 L 350 90 L 880 90" color="var(--accent-indigo)" pulseDur={5} />
        <NodeDot cx={890} cy={90} r={10} color={indigo} label="Discord Digest (Cron)" />
        <text x={600} y={80} fill={indigo} fontSize={8} fontFamily="var(--font-mono)">
          Python Webhook Script (8 AM)
        </text>

        {/* Application Tracking Kanban Pipeline (Bottom) */}
        <rect
          x={150}
          y={420}
          width={700}
          height={120}
          rx={12}
          fill="color-mix(in oklab, var(--accent-cyan) 5%, transparent)"
          stroke={cyan}
          strokeWidth={1}
        />
        <text
          x={500}
          y={445}
          textAnchor="middle"
          fill={cyan}
          fontSize={11}
          fontFamily="var(--font-mono)"
          letterSpacing="0.1em"
        >
          APPLICATION TRACKING PIPELINE
        </text>

        <Edge d="M 285 490 L 385 490" color={cyan} />
        <Edge d="M 435 490 L 535 490" color={cyan} />
        <Edge d="M 585 490 L 685 490" color={cyan} />
        <Edge d="M 560 500 L 560 530 L 685 530" color={warm} />

        <NodeDot cx={260} cy={490} r={15} color={cyan} label="Applied" />
        <NodeDot cx={410} cy={490} r={15} color={cyan} label="Interview" />
        <NodeDot cx={560} cy={490} r={15} color={cyan} label="Offer" />
        <NodeDot cx={710} cy={490} r={15} color={emerald} label="Accepted" />
        <NodeDot cx={710} cy={530} r={15} color={warm} label="Rejected" />

        <Edge d="M 890 165 L 890 470 L 850 470" active={active === "ui"} pulseDur={4} />
        <text
          x={900}
          y={300}
          fill="var(--text-secondary)"
          fontSize={8}
          fontFamily="var(--font-mono)"
          style={{ writingMode: "vertical-rl" }}
        >
          Kanban Synchronization
        </text>

        {/* Metrics */}
        <MetricTag x={40} y={40} label="Integration" value="7+ Sources" />
        <MetricTag x={VB.w - 180} y={40} label="Algorithm" value="Deterministic" />
      </svg>
    </VisualFrame>
  );
}
