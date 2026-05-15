export function BackgroundFX() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base black */}
      <div className="absolute inset-0 bg-[var(--bg-primary)]" />

      {/* gradient mesh */}
      <div
        className="absolute inset-0 opacity-[0.55]"
        style={{
          background:
            "radial-gradient(60% 40% at 15% 10%, color-mix(in oklab, var(--accent-indigo) 22%, transparent), transparent 70%)," +
            "radial-gradient(50% 35% at 85% 15%, color-mix(in oklab, var(--accent-cyan) 16%, transparent), transparent 70%)," +
            "radial-gradient(55% 40% at 70% 90%, color-mix(in oklab, var(--accent-violet) 18%, transparent), transparent 70%)",
        }}
      />

      {/* grid texture */}
      <div className="absolute inset-0 grid-texture opacity-[0.35]" />

      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* film grain */}
      <div className="absolute inset-0 noise opacity-[0.06] mix-blend-overlay" />
    </div>
  );
}
