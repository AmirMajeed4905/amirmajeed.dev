"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { skills } from "@/lib/data";
import { SectionLabel, SectionHeading, GradientText, FadeInUp } from "@/components/ui/Animated";

const categories = ["all", "frontend", "backend", "database", "devops", "other"] as const;

const categoryLabels: Record<string, string> = {
  all: "All Skills",
  frontend: "🎨 Frontend",
  backend: "⚙️ Backend",
  database: "🗄️ Database",
  devops: "🚀 DevOps",
  other: "⚡ Other",
};

export function SkillsSection() {
  const [active, setActive] = useState<string>("all");

  const filtered = active === "all" ? skills : skills.filter((s) => s.category === active);

  return (
    <section
      id="skills"
      className="py-28 px-6 relative overflow-hidden"
      style={{ background: "var(--bg-secondary)" }}
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <FadeInUp>
          <SectionLabel>Tech Stack</SectionLabel>
          <SectionHeading className="mb-4">
            What I <GradientText>Build With</GradientText>
          </SectionHeading>
          <p className="max-w-lg font-dm text-base mb-10" style={{ color: "var(--text-secondary)" }}>
            Full-stack JavaScript ecosystem — from pixel-perfect frontends to robust backends
            and cloud infrastructure.
          </p>
        </FadeInUp>

        {/* Filter Tabs */}
        <FadeInUp delay={0.1}>
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold font-dm transition-all duration-300 ${
                  active === cat
                    ? "bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-violet-lg scale-105"
                    : "glass-card hover:scale-105"
                }`}
                style={active !== cat ? { color: "var(--text-secondary)" } : {}}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>
        </FadeInUp>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3"
          layout
        >
          {filtered.map((skill, i) => (
            <motion.div
              key={skill.name}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              whileHover={{ y: -6, scale: 1.05 }}
              className="skill-badge rounded-2xl p-4 text-center cursor-default"
            >
              <div className="text-2xl mb-2">{skill.icon}</div>
              <div
                className="text-xs font-semibold font-dm leading-tight"
                style={{ color: "var(--text-secondary)" }}
              >
                {skill.name}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* DevOps Banner */}
        <FadeInUp delay={0.3}>
          <motion.div
            className="mt-12 glass-card rounded-2xl p-6 border"
            style={{ borderColor: "rgba(6,182,212,0.3)" }}
            whileHover={{ y: -4 }}
          >
            <div className="flex flex-wrap items-start gap-4">
              <div className="flex-1 min-w-48">
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="px-3 py-1.5 rounded-full text-xs font-bold font-dm text-white"
                    style={{
                      background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                    }}
                  >
                    🚀 DevOps Journey
                  </span>
                  <span
                    className="text-xs font-dm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Currently learning & building
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["CI/CD Pipelines", "AWS EC2 & S3", "GitHub Actions", "Docker Compose", "Nginx", "SSL/TLS", "PM2", "Linux Admin"].map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 rounded-full text-xs font-semibold font-dm"
                      style={{
                        background: "rgba(6,182,212,0.1)",
                        border: "1px solid rgba(6,182,212,0.3)",
                        color: "#22d3ee",
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                {[
                  { label: "Cloud", value: 70 },
                  { label: "CI/CD", value: 75 },
                  { label: "Docker", value: 85 },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center gap-3 min-w-48">
                    <span className="text-xs font-dm w-14" style={{ color: "var(--text-muted)" }}>
                      {label}
                    </span>
                    <div
                      className="flex-1 h-1.5 rounded-full overflow-hidden"
                      style={{ background: "rgba(124,58,237,0.15)" }}
                    >
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background: "linear-gradient(90deg, #7c3aed, #06b6d4)",
                          width: `${value}%`,
                        }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                      />
                    </div>
                    <span className="text-xs font-dm" style={{ color: "var(--text-muted)" }}>
                      {value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </FadeInUp>
      </div>
    </section>
  );
}
