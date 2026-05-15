import { motion } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { Plus, Minus, RotateCcw } from "lucide-react";

export const EASE = [0.22, 1, 0.36, 1] as const;

export function AmbientGrid({ opacity = 0.18 }: { opacity?: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 grid-texture"
      style={{ opacity }}
    />
  );
}

export function PanelGlow({
  colors = ["var(--accent-cyan)", "var(--accent-indigo)"],
}: {
  colors?: [string, string] | string[];
}) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      style={{
        background:
          `radial-gradient(40% 60% at 18% 22%, color-mix(in oklab, ${colors[0]} 16%, transparent), transparent 70%),` +
          `radial-gradient(45% 60% at 82% 78%, color-mix(in oklab, ${colors[1]} 14%, transparent), transparent 72%)`,
      }}
    />
  );
}

/** Animated edge w/ optional traveling pulse */
export function Edge({
  d,
  active,
  dimmed,
  color = "color-mix(in oklab, white 16%, transparent)",
  pulse = true,
  pulseDur = 4.2,
  width = 0.8,
}: {
  d: string;
  active?: boolean;
  dimmed?: boolean;
  color?: string;
  pulse?: boolean;
  pulseDur?: number;
  width?: number;
}) {
  return (
    <g
      style={{
        opacity: dimmed ? 0.18 : 1,
        transition: "opacity 600ms cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <motion.path
        d={d}
        fill="none"
        stroke={active ? "color-mix(in oklab, white 70%, transparent)" : color}
        strokeWidth={active ? width + 0.6 : width}
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.1, ease: EASE }}
        style={{ transition: "stroke 500ms cubic-bezier(0.22,1,0.36,1)" }}
      />
      {pulse && (
        <circle r={active ? 2.4 : 1.4} fill={active ? "white" : "color-mix(in oklab, white 55%, transparent)"}>
          <animateMotion dur={`${active ? pulseDur * 0.45 : pulseDur}s`} repeatCount="indefinite" path={d} />
        </circle>
      )}
    </g>
  );
}

export function NodeDot({
  cx,
  cy,
  r,
  label,
  color = "var(--accent-cyan)",
  active,
  dimmed,
  hub,
  onEnter,
  onLeave,
  labelOffset,
}: {
  cx: number;
  cy: number;
  r: number;
  label?: string;
  color?: string;
  active?: boolean;
  dimmed?: boolean;
  hub?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
  labelOffset?: number;
}) {
  return (
    <g
      style={{
        opacity: dimmed ? 0.28 : 1,
        cursor: onEnter ? "pointer" : "default",
        transition: "opacity 500ms cubic-bezier(0.22,1,0.36,1)",
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      tabIndex={onEnter ? 0 : -1}
      onFocus={onEnter}
    >
      {(active || hub) && (
        <circle
          cx={cx}
          cy={cy}
          r={r * (active ? 2.6 : 2)}
          fill={color}
          opacity={active ? 0.32 : 0.16}
          style={{ filter: "blur(8px)" }}
        />
      )}
      <circle
        cx={cx}
        cy={cy}
        r={r + (active ? 4 : 2)}
        fill="none"
        stroke={active ? color : "color-mix(in oklab, white 16%, transparent)"}
        strokeWidth={active ? 1.2 : 0.6}
        style={{ transition: "all 500ms cubic-bezier(0.22,1,0.36,1)" }}
      />
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="color-mix(in oklab, black 50%, transparent)"
        stroke={color}
        strokeWidth={hub ? 1.4 : 1}
        style={{ transition: "all 500ms cubic-bezier(0.22,1,0.36,1)" }}
      />
      {label && (
        <text
          x={cx}
          y={cy + r + (labelOffset ?? (hub ? 18 : 14))}
          textAnchor="middle"
          fill={active ? "var(--text-primary)" : "var(--text-secondary)"}
          fontFamily="var(--font-mono)"
          fontSize={hub ? 10 : 9}
          style={{
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            transition: "fill 500ms cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {label}
        </text>
      )}
    </g>
  );
}

/** Inline contextual metric tag floating in SVG space */
export function MetricTag({
  x,
  y,
  label,
  value,
}: {
  x: number;
  y: number;
  label: string;
  value: string;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        rx={6}
        ry={6}
        width={Math.max(label.length, value.length) * 6.2 + 18}
        height={28}
        fill="color-mix(in oklab, black 55%, transparent)"
        stroke="color-mix(in oklab, white 10%, transparent)"
        strokeWidth={0.6}
      />
      <text
        x={x + 9}
        y={y + 11}
        fill="var(--text-tertiary)"
        fontFamily="var(--font-mono)"
        fontSize={6.5}
        style={{ letterSpacing: "0.22em", textTransform: "uppercase" }}
      >
        {label}
      </text>
      <text
        x={x + 9}
        y={y + 22}
        fill="var(--text-primary)"
        fontFamily="var(--font-mono)"
        fontSize={9.5}
      >
        {value}
      </text>
    </g>
  );
}

export function VisualFrame({
  children,
  aspect = "1000/620",
}: {
  children: React.ReactNode;
  aspect?: string;
}) {
  return (
    <div className="relative rounded-2xl border border-white/[0.06] bg-black/30 backdrop-blur-xl overflow-hidden">
      <PanelGlow />
      <AmbientGrid />
      <div
        className="relative w-full"
        style={{ aspectRatio: aspect.replace("/", " / ") }}
      >
        {children}
      </div>
    </div>
  );
}
