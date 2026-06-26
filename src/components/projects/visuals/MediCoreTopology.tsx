import { useState } from "react";
import { motion } from "framer-motion";
import { Edge, MetricTag, NodeDot, VisualFrame } from "./primitives";

const VB = { w: 1000, h: 620 };
const CX = 500;
const CY = 310;

const SERVICES = [
  { id: "auth", label: "Auth · JWT", angle: -90, r: 200 },
  { id: "records", label: "Records", angle: -30, r: 200 },
  { id: "billing", label: "Billing", angle: 30, r: 210 },
  { id: "notify", label: "Notifications", angle: 90, r: 200 },
  { id: "reports", label: "Reports", angle: 150, r: 210 },
  { id: "admin", label: "Admin", angle: 210, r: 200 },
];

const WORKERS = Array.from({ length: 5 }).map((_, i) => ({
  id: `w${i}`,
  angle: -120 + i * 60,
  r: 110,
}));

function polar(cx: number, cy: number, r: number, angle: number) {
  const a = (angle * Math.PI) / 180;
  return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r };
}

export function MediCoreTopology() {
  const [active, setActive] = useState<string | null>(null);

  const services = SERVICES.map((s) => ({ ...s, ...polar(CX, CY, s.r, s.angle) }));
  const workers = WORKERS.map((w) => ({ ...w, ...polar(CX, CY, w.r, w.angle) }));

  return (
    <VisualFrame aspect="1000/620">
      <svg viewBox={`0 0 ${VB.w} ${VB.h}`} className="absolute inset-0 h-full w-full" onMouseLeave={() => setActive(null)}>
        {/* outer service mesh ring */}
        <circle cx={CX} cy={CY} r={205} fill="none" stroke="color-mix(in oklab, white 4%, transparent)" strokeDasharray="2 6" />
        <circle cx={CX} cy={CY} r={108} fill="none" stroke="color-mix(in oklab, var(--accent-indigo) 14%, transparent)" strokeDasharray="1 5" />

        {/* postgres persistence base */}
        <g>
          <ellipse cx={CX} cy={560} rx={260} ry={22} fill="none" stroke="color-mix(in oklab, var(--accent-warm) 22%, transparent)" />
          <ellipse cx={CX} cy={560} rx={260} ry={22} fill="color-mix(in oklab, var(--accent-warm) 6%, transparent)" />
          <text x={CX} y={596} textAnchor="middle" fill="var(--text-tertiary)" fontFamily="var(--font-mono)" fontSize={9} style={{ letterSpacing: "0.28em", textTransform: "uppercase" }}>
            PostgreSQL · Persistence Layer
          </text>
        </g>

        {/* service edges */}
        {services.map((s) => (
          <Edge
            key={`e-${s.id}`}
            d={`M ${CX} ${CY} L ${s.x} ${s.y}`}
            active={active === s.id || active === "gateway"}
            dimmed={!!active && active !== s.id && active !== "gateway"}
            color="color-mix(in oklab, var(--accent-indigo) 28%, transparent)"
            pulseDur={3.6}
          />
        ))}

        {/* gateway → postgres */}
        <Edge d={`M ${CX} ${CY + 18} Q ${CX} 460 ${CX} 560`} color="color-mix(in oklab, var(--accent-warm) 30%, transparent)" pulseDur={5} />
        {services.map((s) => (
          <path key={`p-${s.id}`} d={`M ${s.x} ${s.y} Q ${(s.x + CX) / 2} ${s.y + (560 - s.y) * 0.4} ${CX + (s.x - CX) * 0.35} 560`} fill="none" stroke="color-mix(in oklab, var(--accent-warm) 10%, transparent)" strokeDasharray="1 4" />
        ))}

        {/* worker cluster ring */}
        {workers.map((w) => (
          <Edge
            key={`we-${w.id}`}
            d={`M ${CX} ${CY} L ${w.x} ${w.y}`}
            color="color-mix(in oklab, var(--accent-cyan) 24%, transparent)"
            pulseDur={2.8}
            width={0.6}
          />
        ))}

        {/* redis event arcs (around gateway) */}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={`redis-${i}`}
            cx={CX}
            cy={CY}
            r={56 + i * 6}
            fill="none"
            stroke="color-mix(in oklab, var(--accent-cyan) 25%, transparent)"
            strokeWidth={0.6}
            strokeDasharray="3 7"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 18 + i * 6, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: `${CX}px ${CY}px` }}
          />
        ))}

        {/* worker nodes */}
        {workers.map((w) => (
          <NodeDot
            key={w.id}
            cx={w.x}
            cy={w.y}
            r={5}
            color="var(--accent-cyan)"
            label="Celery"
            labelOffset={12}
          />
        ))}

        {/* service nodes */}
        {services.map((s) => (
          <NodeDot
            key={s.id}
            cx={s.x}
            cy={s.y}
            r={9}
            color="var(--accent-indigo)"
            label={s.label}
            active={active === s.id}
            dimmed={!!active && active !== s.id && active !== "gateway"}
            onEnter={() => setActive(s.id)}
            onLeave={() => setActive(null)}
          />
        ))}

        {/* central gateway */}
        <g>
          <circle cx={CX} cy={CY} r={48} fill="color-mix(in oklab, var(--accent-indigo) 18%, transparent)" style={{ filter: "blur(10px)" }} />
          <NodeDot
            cx={CX}
            cy={CY}
            r={18}
            color="var(--accent-cyan)"
            hub
            label="API Gateway"
            active={active === "gateway"}
            onEnter={() => setActive("gateway")}
            onLeave={() => setActive(null)}
          />
        </g>

        {/* inline contextual metrics */}
        <MetricTag x={40} y={40} label="p95 latency" value="<150ms" />
        <MetricTag x={40} y={84} label="endpoints" value="~40 REST" />
        <MetricTag x={VB.w - 150} y={40} label="rbac tiers" value="3-tier" />
        <MetricTag x={VB.w - 150} y={84} label="event bus" value="Redis" />
      </svg>
    </VisualFrame>
  );
}
