"use client";
import { motion } from "framer-motion";

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest mb-3"
      style={{ color: "var(--violet-glow)" }}
    >
      <span className="w-5 h-px bg-gradient-to-r from-violet-500 to-fuchsia-400" />
      {children}
    </div>
  );
}

export function SectionHeading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`font-syne font-extrabold leading-tight tracking-tight ${className}`}
      style={{
        fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
        color: "var(--text-primary)",
      }}
    >
      {children}
    </h2>
  );
}

export function GradientText({ children }: { children: React.ReactNode }) {
  return <span className="glow-text">{children}</span>;
}

export function FadeInUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
