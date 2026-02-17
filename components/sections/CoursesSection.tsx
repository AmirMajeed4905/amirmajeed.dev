"use client";
import { motion } from "framer-motion";
import { courses } from "@/lib/data";
import { SectionLabel, SectionHeading, GradientText, FadeInUp } from "@/components/ui/Animated";
import { Clock, Users, ChevronRight, BookOpen } from "lucide-react";

export function CoursesSection() {
  return (
    <section
      id="courses"
      className="py-28 px-6 relative overflow-hidden"
      style={{ background: "var(--bg-secondary)" }}
    >
      {/* Decorative */}
      <div
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <FadeInUp>
          <SectionLabel>Learn</SectionLabel>
          <SectionHeading className="mb-4">
            My <GradientText>Courses</GradientText>
          </SectionHeading>
          <p className="max-w-lg font-dm text-base mb-12" style={{ color: "var(--text-secondary)" }}>
            Practical, project-based courses — from beginner to production-ready developer.
          </p>
        </FadeInUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, i) => (
            <motion.div
              key={course.id}
              className="glass-card rounded-2xl overflow-hidden flex flex-col group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
              whileHover={{ y: -8 }}
            >
              {/* Course Header */}
              <div
                className="relative p-8 text-center overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(232,121,249,0.1))",
                  borderBottom: "1px solid var(--border-card)",
                }}
              >
                {/* Glow effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(circle at center, rgba(168,85,247,0.2) 0%, transparent 70%)",
                  }}
                />
                <motion.div
                  className="text-5xl relative z-10"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3 + i, repeat: Infinity }}
                >
                  {course.emoji}
                </motion.div>
                <div
                  className="mt-2 text-xs font-semibold font-dm px-3 py-1 rounded-full inline-block relative z-10"
                  style={{
                    background: "rgba(124,58,237,0.2)",
                    color: "var(--violet-glow)",
                    border: "1px solid rgba(124,58,237,0.3)",
                  }}
                >
                  {course.level}
                </div>
              </div>

              {/* Course Body */}
              <div className="p-5 flex flex-col flex-1">
                <h3
                  className="font-syne font-bold text-base mb-2 leading-tight"
                  style={{ color: "var(--text-primary)" }}
                >
                  {course.name}
                </h3>
                <p
                  className="font-dm text-xs leading-relaxed mb-4 flex-1"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {course.desc}
                </p>

                {/* Topics */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {course.topics.slice(0, 3).map((topic) => (
                    <span
                      key={topic}
                      className="text-xs font-dm px-2 py-0.5 rounded-md"
                      style={{
                        background: "rgba(124,58,237,0.1)",
                        color: "var(--violet-glow)",
                      }}
                    >
                      {topic}
                    </span>
                  ))}
                  {course.topics.length > 3 && (
                    <span
                      className="text-xs font-dm px-2 py-0.5 rounded-md"
                      style={{ color: "var(--text-muted)" }}
                    >
                      +{course.topics.length - 3}
                    </span>
                  )}
                </div>

                {/* Meta */}
                <div
                  className="flex items-center justify-between text-xs font-dm mb-4"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" /> {course.students}
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3" /> {course.topics.length} modules
                  </span>
                </div>

                {/* Price + CTA */}
                <div className="flex items-center justify-between">
                  <span className="font-syne font-extrabold text-xl glow-text">
                    {course.price}
                  </span>
                  <motion.button
                    className="btn-shine flex items-center gap-1 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white text-xs font-semibold font-dm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Enroll
                    <ChevronRight className="w-3 h-3" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
