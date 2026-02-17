import { Zap } from "lucide-react";

export function FooterSection() {
  return (
    <footer
      className="py-8 px-6"
      style={{
        background: "var(--bg-primary)",
        borderTop: "1px solid var(--border-card)",
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #7c3aed, #e879f9)" }}
          >
            <Zap className="w-3.5 h-3.5 text-white" />
          </div>
          <span
            className="font-syne font-bold text-base"
            style={{ color: "var(--text-primary)" }}
          >
            Dev<span className="glow-text">.</span>
          </span>
        </div>
        <p className="font-dm text-xs text-center" style={{ color: "var(--text-muted)" }}>
          Built by Amir MAjeed· 2024
        </p>
        <div className="flex gap-4">
          {["GitHub", "LinkedIn", "Twitter"].map((s) => (
            <a
              key={s}
              href="#"
              className="font-dm text-xs hover:underline transition-colors"
              style={{ color: "var(--text-muted)" }}
            >
              {s}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
