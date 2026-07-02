import { useState } from "react";
import { Edge, MetricTag, NodeDot, VisualFrame } from "./primitives";

const VB = { w: 1000, h: 620 };

export function DecisionDriftVisual() {
  const [active, setActive] = useState<string | null>(null);

  const violet = "var(--accent-violet)";
  const cyan = "var(--accent-cyan)";
  const indigo = "var(--accent-indigo)";

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
          r={280}
          fill="color-mix(in oklab, var(--accent-violet) 8%, transparent)"
          style={{ filter: "blur(70px)" }}
        />

        {/* Input Sources */}
        <NodeDot
          cx={100}
          cy={280}
          r={15}
          color={cyan}
          label="Repository"
          active={active === "src"}
          onEnter={() => setActive("src")}
          hub
        />
        <NodeDot
          cx={100}
          cy={120}
          r={10}
          color={violet}
          label="RFCs / Notes"
          active={active === "src"}
          onEnter={() => setActive("src")}
        />

        {/* Governance / ADR Ecosystem (Top) */}
        <rect
          x={200}
          y={40}
          width={450}
          height={150}
          rx={12}
          fill="color-mix(in oklab, var(--accent-violet) 5%, transparent)"
          stroke={violet}
          strokeWidth={1}
          strokeDasharray="4 6"
          opacity={0.6}
        />
        <text
          x={425}
          y={65}
          textAnchor="middle"
          fill={violet}
          fontSize={10}
          fontFamily="var(--font-mono)"
          letterSpacing="0.1em"
        >
          ADR ECOSYSTEM WORKFLOW
        </text>

        <NodeDot cx={280} cy={120} r={8} color={violet} label="Ingest" />
        <Edge d="M 115 120 L 265 120" color={violet} />

        <NodeDot cx={280} cy={170} r={8} color={cyan} label="Bootstrap" />
        <Edge d="M 100 260 L 100 170 L 265 170" color={cyan} pulseDur={3} />

        <Edge d="M 295 120 L 350 145" color={violet} />
        <Edge d="M 295 170 L 350 145" color={cyan} />

        <NodeDot
          cx={360}
          cy={145}
          r={10}
          color={violet}
          label="Generation"
          active={active === "adr"}
          onEnter={() => setActive("adr")}
        />

        <Edge d="M 375 145 L 435 145" active={active === "adr" || active === "app"} />
        <NodeDot
          cx={450}
          cy={145}
          r={12}
          color={violet}
          label="Approval"
          hub
          active={active === "app"}
          onEnter={() => setActive("app")}
        />

        <Edge d="M 465 130 L 535 110" active={active === "app"} pulseDur={2} />
        <NodeDot cx={550} cy={110} r={8} color={indigo} label="Audit (Health)" />

        <Edge d="M 465 160 L 535 180" active={active === "app"} pulseDur={2} />
        <NodeDot cx={550} cy={180} r={8} color={indigo} label="Impact Analysis" />

        {/* Core Primary Path: Deterministic Engine (Center) */}
        <rect
          x={250}
          y={230}
          width={400}
          height={160}
          rx={12}
          fill="color-mix(in oklab, var(--accent-cyan) 8%, transparent)"
          stroke={cyan}
          strokeWidth={1}
        />
        <text
          x={450}
          y={255}
          textAnchor="middle"
          fill={cyan}
          fontSize={11}
          fontFamily="var(--font-mono)"
          letterSpacing="0.1em"
        >
          PRIMARY ENFORCEMENT ENGINE
        </text>

        <Edge d="M 450 160 L 450 285" active={active === "app" || active === "rule"} />
        <NodeDot
          cx={450}
          cy={300}
          r={10}
          color={violet}
          label="Rule Generation"
          active={active === "rule"}
          onEnter={() => setActive("rule")}
        />

        <Edge d="M 465 300 L 515 300" active={active === "rule" || active === "dre"} />
        <NodeDot
          cx={530}
          cy={300}
          r={14}
          color={cyan}
          label="Deterministic Engine"
          hub
          active={active === "dre"}
          onEnter={() => setActive("dre")}
        />

        <Edge
          d="M 120 280 L 530 280"
          active={active === "src" || active === "dre"}
          pulseDur={1.5}
          width={1.2}
        />

        <Edge d="M 545 300 L 735 300" active={active === "dre" || active === "vd"} width={1.5} />

        {/* LLM Optional Path (Bottom) */}
        <rect
          x={250}
          y={420}
          width={400}
          height={100}
          rx={12}
          fill="none"
          stroke="var(--text-tertiary)"
          strokeWidth={1}
          strokeDasharray="4 6"
          opacity={0.5}
        />
        <text
          x={450}
          y={445}
          textAnchor="middle"
          fill="var(--text-secondary)"
          fontSize={10}
          fontFamily="var(--font-mono)"
        >
          OPTIONAL ANALYSIS
        </text>

        <NodeDot cx={450} cy={480} r={10} color="var(--text-secondary)" label="LLM Review" />

        <path
          d="M 100 300 L 100 480 L 435 480"
          fill="none"
          stroke="var(--text-tertiary)"
          strokeWidth={1}
          strokeDasharray="6 6"
        />
        <path
          d="M 465 480 L 750 480 L 750 315"
          fill="none"
          stroke="var(--text-tertiary)"
          strokeWidth={1}
          strokeDasharray="6 6"
        />

        {/* Output & Reporting */}
        <NodeDot
          cx={750}
          cy={300}
          r={12}
          color={violet}
          label="Violation Detection"
          hub
          active={active === "vd"}
          onEnter={() => setActive("vd")}
        />

        <Edge d="M 765 290 L 835 240" active={active === "vd"} pulseDur={3} />
        <NodeDot cx={850} cy={240} r={10} color={cyan} label="CLI Tool" />

        <Edge d="M 765 310 L 835 360" active={active === "vd"} pulseDur={3} />
        <NodeDot cx={850} cy={360} r={10} color={cyan} label="GitHub Action" />

        {/* Metrics */}
        <MetricTag x={40} y={40} label="Recall@5" value="95.2%" />
        <MetricTag x={VB.w - 180} y={40} label="Rules" value="5 types" />
      </svg>
    </VisualFrame>
  );
}
