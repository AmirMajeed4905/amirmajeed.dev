"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/data";
import { SectionLabel, SectionHeading, GradientText, FadeInUp } from "@/components/ui/Animated";
import { ExternalLink, Github, Star } from "lucide-react";

export function ProjectsSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="projects" className="py-28 px-6 relative overflow-hidden"
      style={{ background: "var(--bg-primary)" }}>
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(232,121,249,0.06) 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <FadeInUp>
          <SectionLabel>Portfolio</SectionLabel>
          <SectionHeading className="mb-4">
            Featured <GradientText>Projects</GradientText>
          </SectionHeading>
          <p className="max-w-lg font-dm text-base mb-12" style={{ color: "var(--text-secondary)" }}>
            Real-world applications built with modern stacks. From idea to deployment.
          </p>
        </FadeInUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {projects.map((project, i) => (
    <motion.div
      key={project.id}
      className="border-animated h-full"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
      onHoverStart={() => setHoveredId(project.id)}
      onHoverEnd={() => setHoveredId(null)}
    >
      <div className="border-animated-inner p-6 flex flex-col h-full group">
        {/* Card glow on hover */}
        <motion.div
          className="absolute inset-0 rounded-[18px] pointer-events-none"
          animate={{
            boxShadow: hoveredId === project.id
              ? "0 20px 60px rgba(124,58,237,0.3), inset 0 1px 0 rgba(168,85,247,0.1)"
              : "none",
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="relative">
            <motion.div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
              style={{
                background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(232,121,249,0.15))",
                border: "1px solid rgba(124,58,237,0.3)",
              }}
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
              transition={{ duration: 0.4 }}
            >
              {project.emoji}
            </motion.div>
            {project.featured && (
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-fuchsia-500 flex items-center justify-center">
                <Star className="w-2.5 h-2.5 text-white fill-white" />
              </div>
            )}
          </div>
          <div className="flex gap-2">
            {project.url !== "#" && (
              <a href={project.url} target="_blank" rel="noreferrer"
                className="glass-card p-2 rounded-xl hover:scale-110 transition-transform"
                style={{ color: "var(--violet-glow)" }}>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {project.github !== "#" && (
              <a href={project.github} target="_blank" rel="noreferrer"
                className="glass-card p-2 rounded-xl hover:scale-110 transition-transform"
                style={{ color: "var(--violet-glow)" }}>
                <Github className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="font-syne font-bold text-lg mb-2" style={{ color: "var(--text-primary)" }}>
            {project.name}
          </h3>
          <p className="font-dm text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
            {project.desc}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold font-dm"
              style={{
                background: "rgba(124,58,237,0.12)",
                color: "var(--violet-glow)",
                border: "1px solid rgba(124,58,237,0.2)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Bottom hover bar */}
        <motion.div
          className="mt-4 h-px rounded-full"
          style={{
            background: "linear-gradient(90deg, #7c3aed, #e879f9, #06b6d4)",
            transformOrigin: "left",
          }}
          animate={{ scaleX: hoveredId === project.id ? 1 : 0 }}
          initial={{ scaleX: 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  ))}
</div>

        {/* CTA */}
        <FadeInUp delay={0.3}>
          <div className="text-center mt-12">
            <a
              href="https://github.com/AmirMajeed4905"
              target="_blank"
              rel="noreferrer"
              className="btn-shine inline-flex items-center gap-2 px-8 py-4 rounded-2xl glass-card font-semibold font-dm hover:-translate-y-1 transition-all duration-300"
              style={{ color: "var(--violet-glow)" }}
            >
              <Github className="w-4 h-4" />
              View All on GitHub
            </a>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
