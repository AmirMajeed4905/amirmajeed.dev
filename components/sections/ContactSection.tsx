"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { SectionLabel, SectionHeading, GradientText, FadeInUp } from "@/components/ui/Animated";
import { Send, Github, Linkedin, Twitter, Youtube, Mail, MapPin, CheckCircle } from "lucide-react";

const socials = [
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
];

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    }, 1500);
  };

  return (
    <section
      id="contact"
      className="py-28 px-6 relative overflow-hidden"
      style={{ background: "var(--bg-secondary)" }}
    >
      {/* Spotlights */}
      <div
        className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)" }}
      />
      <div
        className="absolute -top-20 -right-20 w-60 h-60 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(232,121,249,0.08) 0%, transparent 70%)" }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <FadeInUp>
          <SectionLabel>Get In Touch</SectionLabel>
          <SectionHeading className="mb-14">
            Let's Build <GradientText>Together</GradientText>
          </SectionHeading>
        </FadeInUp>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Info */}
          <FadeInUp delay={0.1}>
            <div>
              <motion.div
                className="glass-card rounded-2xl p-8 mb-6"
                whileHover={{ y: -4 }}
              >
                <h3
                  className="font-syne font-bold text-2xl mb-4 leading-tight"
                  style={{ color: "var(--text-primary)" }}
                >
                  Got a project in mind? 🚀
                </h3>
                <p
                  className="font-dm text-sm leading-relaxed mb-6"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Available for freelance projects, full-time roles, and exciting collaborations.
                  Full-stack web apps, API development, cloud deployments — let's make something amazing.
                </p>
                <div className="flex flex-col gap-3">
                  <div
                    className="flex items-center gap-3 font-dm text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <Mail className="w-4 h-4" style={{ color: "var(--violet-glow)" }} />
                    dev@example.com
                  </div>
                  <div
                    className="flex items-center gap-3 font-dm text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <MapPin className="w-4 h-4" style={{ color: "var(--violet-glow)" }} />
                    Pakistan · Remote Worldwide
                  </div>
                </div>
              </motion.div>

              {/* Social Links */}
              <div className="grid grid-cols-2 gap-3">
                {socials.map(({ icon: Icon, label, href }) => (
                  <motion.a
                    key={label}
                    href={href}
                    className="glass-card rounded-xl p-4 flex items-center gap-3 group"
                    whileHover={{ y: -4, x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{
                        background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(232,121,249,0.15))",
                      }}
                    >
                      <Icon className="w-4 h-4" style={{ color: "var(--violet-glow)" }} />
                    </div>
                    <span
                      className="font-dm text-sm font-semibold"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </FadeInUp>

          {/* Right Form */}
          <FadeInUp delay={0.2}>
            <motion.form
              onSubmit={handleSubmit}
              className="glass-card rounded-2xl p-8 flex flex-col gap-5"
              whileHover={{ boxShadow: "0 20px 60px rgba(124,58,237,0.15)" }}
            >
              <div className="grid grid-cols-2 gap-4">
                {[
                  { key: "name", label: "Your Name", placeholder: "Ahmed Ali", type: "text" },
                  { key: "email", label: "Email", placeholder: "you@email.com", type: "email" },
                ].map((field) => (
                  <div key={field.key} className="flex flex-col gap-1.5">
                    <label
                      className="font-dm text-xs font-semibold"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      required
                      value={formData[field.key as keyof typeof formData]}
                      onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                      className="px-4 py-3 rounded-xl font-dm text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-violet-500/50"
                      style={{
                        background: "var(--bg-primary)",
                        border: "1px solid var(--border-card)",
                        color: "var(--text-primary)",
                      }}
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-dm text-xs font-semibold" style={{ color: "var(--text-muted)" }}>
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Project Idea / Collaboration / Job Offer"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="px-4 py-3 rounded-xl font-dm text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-violet-500/50"
                  style={{
                    background: "var(--bg-primary)",
                    border: "1px solid var(--border-card)",
                    color: "var(--text-primary)",
                  }}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-dm text-xs font-semibold" style={{ color: "var(--text-muted)" }}>
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell me about your project..."
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="px-4 py-3 rounded-xl font-dm text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-violet-500/50 resize-none"
                  style={{
                    background: "var(--bg-primary)",
                    border: "1px solid var(--border-card)",
                    color: "var(--text-primary)",
                  }}
                />
              </div>

              <motion.button
                type="submit"
                disabled={status !== "idle"}
                className="btn-shine flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold font-dm text-white"
                style={{
                  background:
                    status === "sent"
                      ? "linear-gradient(135deg, #10b981, #059669)"
                      : "linear-gradient(135deg, #7c3aed, #e879f9)",
                }}
                whileHover={{ y: -2, boxShadow: "0 12px 32px rgba(124,58,237,0.4)" }}
                whileTap={{ scale: 0.98 }}
              >
                {status === "idle" && (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
                {status === "sending" && (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                )}
                {status === "sent" && (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Message Sent! I'll reply soon.
                  </>
                )}
              </motion.button>
            </motion.form>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
}
