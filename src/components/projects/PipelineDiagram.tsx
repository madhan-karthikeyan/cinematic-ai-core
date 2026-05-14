import { motion } from "framer-motion";

export function PipelineDiagram({ nodes }: { nodes: string[] }) {
  return (
    <div className="glass rounded-2xl p-5 md:p-6 overflow-x-auto">
      <div className="flex items-center gap-2 md:gap-3 min-w-max">
        {nodes.map((n, i) => (
          <div key={n + i} className="flex items-center gap-2 md:gap-3">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
              className="rounded-lg px-3 py-2 font-mono text-[11px] md:text-xs text-text-primary border border-white/10 bg-white/[0.03]"
              style={{
                boxShadow: "0 0 0 1px rgba(255,255,255,0.02), 0 8px 24px -12px rgba(79,70,229,0.4)",
              }}
            >
              {n}
            </motion.div>
            {i < nodes.length - 1 && (
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 + 0.15 }}
                className="h-px w-6 md:w-10 origin-left bg-gradient-to-r from-accent-indigo via-accent-cyan to-accent-violet"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
