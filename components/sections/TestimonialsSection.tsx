"use client";
import { motion } from "framer-motion";
import { testimonials } from "@/lib/data";
import { SectionLabel, SectionHeading, GradientText, FadeInUp } from "@/components/ui/Animated";
import { Star, Quote } from "lucide-react";

function TestiCard({ t }: { t: (typeof testimonials)[0] }) {
  return (
    <motion.div
      className="glass-card rounded-2xl p-6 w-[320px] flex-shrink-0 relative group cursor-default"
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.3 }}
    >
      {/* Shadow glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: `0 20px 60px ${t.color}30`,
        }}
      />

      {/* Quote icon */}
      <div
        className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity"
        style={{ color: t.color }}
      >
        <Quote className="w-8 h-8 fill-current" />
      </div>

      {/* Stars */}
      <div className="flex gap-0.5 mb-3">
        {[...Array(t.stars)].map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
        ))}
      </div>

      {/* Text */}
      <p
        className="font-dm text-sm leading-relaxed mb-5 italic relative z-10"
        style={{ color: "var(--text-secondary)" }}
      >
        "{t.text}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-syne font-bold text-base flex-shrink-0 shadow-lg"
          style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}99)` }}
        >
          {t.initial}
        </div>
        <div>
          <div
            className="font-syne font-semibold text-sm"
            style={{ color: "var(--text-primary)" }}
          >
            {t.name}
          </div>
          <div className="font-dm text-xs" style={{ color: "var(--text-muted)" }}>
            {t.role} · {t.company}
          </div>
        </div>
      </div>

      {/* Bottom accent bar */}
      <div
        className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, ${t.color}, transparent)` }}
      />
    </motion.div>
  );
}

export function TestimonialsSection() {
  // Duplicate for seamless loop
  const items = [...testimonials, ...testimonials];

  return (
    <section
      id="testimonials"
      className="py-28 relative overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(124,58,237,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 mb-12 relative z-10">
        <FadeInUp>
          <SectionLabel>Reviews</SectionLabel>
          <SectionHeading>
            What Clients <GradientText>Say</GradientText>
          </SectionHeading>
        </FadeInUp>
      </div>

      {/* Infinite scroll — no padding/margin so it bleeds edge to edge */}
      <div className="relative overflow-hidden">
        {/* Left fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-32 z-20 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, var(--bg-primary), transparent)",
          }}
        />
        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-32 z-20 pointer-events-none"
          style={{
            background:
              "linear-gradient(-90deg, var(--bg-primary), transparent)",
          }}
        />

        <div className="testimonial-track px-6 py-4">
          {items.map((t, i) => (
            <TestiCard key={`${t.id}-${i}`} t={t} />
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <FadeInUp delay={0.2}>
        <div className="max-w-2xl mx-auto px-6 mt-12">
          <div className="glass-card rounded-2xl p-6 flex flex-wrap justify-around gap-6 text-center">
            {[
              { num: "50+", label: "Happy Clients" },
              { num: "5.0★", label: "Average Rating" },
              { num: "100%", label: "On-time Delivery" },
              { num: "20+", label: "Projects Done" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-syne font-extrabold text-2xl glow-text">{s.num}</div>
                <div className="font-dm text-xs mt-1" style={{ color: "var(--text-secondary)" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeInUp>
    </section>
  );
}
