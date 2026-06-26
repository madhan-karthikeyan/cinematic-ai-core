import { motion } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
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
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragRef = useRef<{ x: number; y: number; px: number; py: number } | null>(null);
  const [lastTap, setLastTap] = useState(0);
  const [showHint, setShowHint] = useState(true);

  // Hide hint after a few seconds
  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 5000);
    return () => clearTimeout(t);
  }, []);
  
  const clampScale = (s: number) => Math.min(3, Math.max(1, s));

  const zoom = useCallback((delta: number) => {
    setScale((s) => {
      const next = clampScale(s + delta);
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });
  }, []);

  const reset = () => {
    setScale(1);
    setPan({ x: 0, y: 0 });
  };

  const onWheel = (e: React.WheelEvent) => {
    if (!e.ctrlKey && !e.metaKey) return;
    e.preventDefault();
    zoom(e.deltaY > 0 ? -0.2 : 0.2);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    const now = Date.now();
    if (now - lastTap < 300) {
      if (scale === 1) zoom(1); // Zoom to 2.0x
      else reset();
      setLastTap(0);
      setShowHint(false);
      return;
    }
    setLastTap(now);

    if (scale === 1) return;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    dragRef.current = { x: e.clientX, y: e.clientY, px: pan.x, py: pan.y };
  };
  
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    setPan({
      x: dragRef.current.px + (e.clientX - dragRef.current.x),
      y: dragRef.current.py + (e.clientY - dragRef.current.y),
    });
  };
  const onPointerUp = () => {
    dragRef.current = null;
  };

  return (
    <div className="relative rounded-2xl border border-white/[0.06] bg-black/30 backdrop-blur-xl overflow-hidden group">
      <PanelGlow />
      <AmbientGrid />
      <div
        className="relative w-full overflow-hidden aspect-square md:!aspect-[var(--desktop-aspect)]"
        style={Object.assign(
          { "--desktop-aspect": aspect.replace("/", " / ") } as React.CSSProperties,
          { 
            cursor: scale > 1 ? (dragRef.current ? "grabbing" : "grab") : "default",
            touchAction: scale > 1 ? "none" : "pan-y"
          }
        )}
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          className="absolute inset-0"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
            transformOrigin: "center center",
            transition: dragRef.current ? "none" : "transform 400ms cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {children}
        </div>
      </div>

      {/* Mobile Hint */}
      {showHint && scale === 1 && (
        <div className="absolute inset-x-0 bottom-6 flex justify-center pointer-events-none md:hidden opacity-0 animate-[fadeIn_0.5s_1s_forwards]">
          <div className="bg-black/60 backdrop-blur-xl border border-white/10 text-white/80 text-[9px] px-3 py-1.5 rounded-full uppercase tracking-wider">
            Double tap to explore
          </div>
        </div>
      )}

      {/* Zoom controls */}
      <div className="absolute right-3 bottom-3 z-10 flex items-center gap-1 rounded-full border border-white/10 bg-black/60 backdrop-blur-md p-1">
        <button
          type="button"
          aria-label="Zoom out"
          onClick={() => zoom(-0.25)}
          disabled={scale <= 1}
          className="h-7 w-7 grid place-items-center rounded-full text-text-secondary hover:text-text-primary hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span className="font-mono text-[10px] tracking-[0.18em] text-text-tertiary px-1.5 tabular-nums w-10 text-center">
          {Math.round(scale * 100)}%
        </span>
        <button
          type="button"
          aria-label="Zoom in"
          onClick={() => zoom(0.25)}
          disabled={scale >= 3}
          className="h-7 w-7 grid place-items-center rounded-full text-text-secondary hover:text-text-primary hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          aria-label="Reset zoom"
          onClick={reset}
          disabled={scale === 1 && pan.x === 0 && pan.y === 0}
          className="h-7 w-7 grid place-items-center rounded-full text-text-secondary hover:text-text-primary hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
