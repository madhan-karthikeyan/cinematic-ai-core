import { motion } from "framer-motion";
import { MetricTag, VisualFrame } from "./primitives";

const VB = { w: 1000, h: 620 };

function makeWave(amp: number, freq: number, phase: number, baseY: number, noise = 0) {
  const pts: string[] = [];
  for (let x = 0; x <= 1000; x += 8) {
    const n = noise ? Math.sin(x * 0.31 + phase * 2) * noise : 0;
    const y = baseY + Math.sin(x * freq + phase) * amp + n;
    pts.push(`${x === 0 ? "M" : "L"} ${x} ${y.toFixed(1)}`);
  }
  return pts.join(" ");
}

const FORECASTS = [
  { d: makeWave(28, 0.018, 0.2, 220), color: "var(--accent-cyan)" },
  { d: makeWave(34, 0.022, 1.1, 240), color: "var(--accent-indigo)" },
  { d: makeWave(22, 0.026, 2.0, 200), color: "var(--accent-violet)" },
];

const ACTUAL = makeWave(46, 0.02, 0.6, 320, 8);

const DRIFT_EVENTS = [240, 460, 680, 850];
const RETRAIN = [260, 480, 700];

export function DriftBenchTemporal() {
  return (
    <VisualFrame aspect="1000/620">
      <svg viewBox={`0 0 ${VB.w} ${VB.h}`} className="absolute inset-0 h-full w-full">
        {/* time grid */}
        {Array.from({ length: 11 }).map((_, i) => (
          <line
            key={i}
            x1={i * 100}
            x2={i * 100}
            y1={80}
            y2={520}
            stroke="color-mix(in oklab, white 4%, transparent)"
          />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1={0}
            x2={1000}
            y1={100 + i * 70}
            y2={100 + i * 70}
            stroke="color-mix(in oklab, white 3%, transparent)"
          />
        ))}

        {/* forecast streams */}
        {FORECASTS.map((f, i) => (
          <motion.path
            key={i}
            d={f.d}
            fill="none"
            stroke={f.color}
            strokeWidth={1.2}
            strokeOpacity={0.55}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}

        {/* actual signal */}
        <motion.path
          d={ACTUAL}
          fill="none"
          stroke="color-mix(in oklab, white 70%, transparent)"
          strokeWidth={1.6}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* drift event pulses */}
        {DRIFT_EVENTS.map((x, i) => (
          <g key={`de-${i}`}>
            <line
              x1={x}
              x2={x}
              y1={80}
              y2={520}
              stroke="color-mix(in oklab, var(--accent-warm) 50%, transparent)"
              strokeDasharray="2 4"
            />
            <motion.circle
              cx={x}
              cy={300}
              r={6}
              fill="color-mix(in oklab, var(--accent-warm) 80%, transparent)"
              animate={{ scale: [1, 1.8, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
              style={{ transformOrigin: `${x}px 300px` }}
            />
            <text
              x={x}
              y={70}
              textAnchor="middle"
              fill="var(--accent-warm)"
              fontFamily="var(--font-mono)"
              fontSize={7}
              style={{ letterSpacing: "0.22em", textTransform: "uppercase" }}
            >
              drift
            </text>
          </g>
        ))}

        {/* retrain triggers (below) */}
        {RETRAIN.map((x, i) => (
          <g key={`rt-${i}`}>
            <line
              x1={x}
              x2={x}
              y1={520}
              y2={560}
              stroke="color-mix(in oklab, var(--accent-cyan) 50%, transparent)"
            />
            <circle cx={x} cy={560} r={3} fill="var(--accent-cyan)" />
            <text
              x={x}
              y={580}
              textAnchor="middle"
              fill="var(--text-tertiary)"
              fontFamily="var(--font-mono)"
              fontSize={7}
              style={{ letterSpacing: "0.22em", textTransform: "uppercase" }}
            >
              retrain
            </text>
          </g>
        ))}

        {/* benchmark grid corner */}
        <g transform="translate(820, 470)">
          <text
            x={0}
            y={-10}
            fill="var(--text-tertiary)"
            fontFamily="var(--font-mono)"
            fontSize={7}
            style={{ letterSpacing: "0.22em", textTransform: "uppercase" }}
          >
            6 datasets · 5 forecasters
          </text>
          {Array.from({ length: 6 }).map((_, i) =>
            Array.from({ length: 5 }).map((__, j) => {
              const v = ((i * 7 + j * 3) % 9) / 9;
              return (
                <rect
                  key={`g-${i}-${j}`}
                  x={j * 14}
                  y={i * 12}
                  width={11}
                  height={9}
                  rx={1}
                  fill={`color-mix(in oklab, var(--accent-cyan) ${20 + v * 50}%, transparent)`}
                />
              );
            }),
          )}
        </g>

        {/* axis labels */}
        <text
          x={20}
          y={520}
          fill="var(--text-tertiary)"
          fontFamily="var(--font-mono)"
          fontSize={8}
          style={{ letterSpacing: "0.24em", textTransform: "uppercase" }}
        >
          rolling window →
        </text>

        <MetricTag x={40} y={40} label="forecasters" value="5+ algorithms" />
        <MetricTag x={210} y={40} label="detectors" value="8+ drift" />
      </svg>
    </VisualFrame>
  );
}
