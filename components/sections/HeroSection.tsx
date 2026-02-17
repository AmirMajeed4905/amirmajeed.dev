"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Github, Linkedin, Download, Star } from "lucide-react";

const typingWords = [
  "Full Stack Web Apps",
  "REST APIs with Node.js",
  "Next.js Applications",
  "Scalable Backends",
  "Cloud Deployments ☁️",
  "Real-time Features",
  "Clean & Fast UIs",
];

const stats = [
  { num: "20+", label: "Projects" },
  { num: "3+", label: "Years Exp" },
  { num: "50+", label: "Clients" },
  { num: "5.0", label: "Avg Rating" },
];

const techBadges = ["Next.js", "NestJS", "Docker", "AWS", "PostgreSQL", "Prisma"];

function SpotlightCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const spots = useRef([
    { x: 0.2, y: 0.3, vx: 0.0003, vy: 0.0002, r: 350, color: "124,58,237", alpha: 0.22 },
    { x: 0.7, y: 0.2, vx: -0.0002, vy: 0.0003, r: 280, color: "232,121,249", alpha: 0.16 },
    { x: 0.5, y: 0.7, vx: 0.0002, vy: -0.0002, r: 220, color: "6,182,212", alpha: 0.12 },
    { x: 0.85, y: 0.6, vx: -0.0003, vy: -0.0002, r: 200, color: "124,58,237", alpha: 0.1 },
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    let w = 0, h = 0;

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e: MouseEvent) => {
      mouse.current.x = e.clientX / window.innerWidth;
      mouse.current.y = e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const sp = spots.current;

      // Nudge first spot slightly toward mouse
      sp[0].x += (mouse.current.x - sp[0].x) * 0.004;
      sp[0].y += (mouse.current.y - sp[0].y) * 0.004;

      sp.forEach((s, i) => {
        if (i > 0) {
          s.x += s.vx;
          s.y += s.vy;
          if (s.x < 0 || s.x > 1) s.vx *= -1;
          if (s.y < 0 || s.y > 1) s.vy *= -1;
        }
        const grad = ctx.createRadialGradient(s.x * w, s.y * h, 0, s.x * w, s.y * h, s.r);
        grad.addColorStop(0, `rgba(${s.color},${s.alpha})`);
        grad.addColorStop(1, `rgba(${s.color},0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      });

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

function TypingText() {
  const [wordIdx, setWordIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = typingWords[wordIdx];
    let timeout: NodeJS.Timeout;

    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % typingWords.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, wordIdx]);

  return (
    <span
      className="font-semibold"
      style={{ color: "var(--fuchsia, #e879f9)" }}
    >
      {displayed}
      <span className="typing-cursor" />
    </span>
  );
}

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();

  // Parallax transforms
  const y1 = useTransform(scrollY, [0, 600], [0, -120]);
  const y2 = useTransform(scrollY, [0, 600], [0, -60]);
  const y3 = useTransform(scrollY, [0, 600], [0, -200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const springY1 = useSpring(y1, { stiffness: 60, damping: 20 });
  const springY2 = useSpring(y2, { stiffness: 40, damping: 20 });

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Animated spotlight canvas */}
      <SpotlightCanvas />

      {/* Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(124,58,237,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.06) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          zIndex: 1,
        }}
      />

      {/* Floating orbs - parallax layers */}
      <motion.div
        style={{ y: springY1, zIndex: 2 }}
        className="absolute top-24 right-[10%] w-72 h-72 pointer-events-none"
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-violet-600/20 to-fuchsia-500/10 border border-violet-500/20 animate-float" />
        <div className="absolute inset-6 rounded-full bg-gradient-to-br from-violet-700/10 to-transparent animate-spin-slow" />
        {/* Orbit dots */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="orbit-element absolute w-3 h-3 rounded-full bg-violet-400 shadow-glow" />
          <div className="orbit-element-2 absolute w-2 h-2 rounded-full bg-fuchsia-400" />
          <div className="orbit-element-3 absolute w-2 h-2 rounded-full bg-cyan-400" />
        </div>
      </motion.div>

      <motion.div
        style={{ y: springY2, zIndex: 2 }}
        className="absolute bottom-24 left-[8%] w-48 h-48 pointer-events-none"
      >
        <div className="w-full h-full rounded-2xl border border-violet-500/15 bg-violet-600/5 animate-float-slow" />
      </motion.div>

      {/* Floating tech badges - parallax */}
      <motion.div
        style={{ y: useSpring(useTransform(scrollY, [0, 600], [0, -30])), zIndex: 2 }}
        className="absolute top-40 left-[5%] hidden xl:flex flex-col gap-2 pointer-events-none"
      >
        {techBadges.slice(0, 3).map((t, i) => (
          <motion.div
            key={t}
            className="glass-card px-3 py-1.5 rounded-lg text-xs font-semibold font-dm"
            style={{ color: "var(--violet-glow)" }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.7 }}
          >
            {t}
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        style={{ y: useSpring(useTransform(scrollY, [0, 600], [0, -50])), zIndex: 2 }}
        className="absolute top-48 right-[4%] hidden xl:flex flex-col gap-2 pointer-events-none"
      >
        {techBadges.slice(3).map((t, i) => (
          <motion.div
            key={t}
            className="glass-card px-3 py-1.5 rounded-lg text-xs font-semibold font-dm"
            style={{ color: "var(--violet-glow)" }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
          >
            {t}
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content */}
      <motion.div
        style={{ opacity, zIndex: 10 }}
        className="relative text-center max-w-5xl mx-auto px-6"
      >
        {/* Tag */}
        <motion.div
          className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full text-xs font-semibold font-dm mb-8"
          style={{ color: "var(--violet-glow)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-pulse" />
          Available for Freelance & Full-Time Roles
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" style={{ animationDelay: "0.5s" }} />
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          className="font-syne font-extrabold leading-[1.02] tracking-tight mb-6"
          style={{ fontSize: "clamp(2.8rem, 8vw, 6rem)" }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
        >
          <span className="block" style={{ color: "var(--text-primary)" }}>
            Full Stack
          </span>
          <span className="block glow-text">JavaScript Dev</span>
        </motion.h1>

        {/* Typing */}
        <motion.p
          className="text-lg md:text-xl mb-8 font-dm"
          style={{ color: "var(--text-secondary)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          I build&nbsp;
          <TypingText />
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap gap-4 justify-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <a
            href="#projects"
            className="btn-shine group flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-semibold font-dm text-base shadow-violet-lg hover:-translate-y-1 transition-all duration-300"
          >
            View Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#contact"
            className="group flex items-center gap-2 px-7 py-3.5 rounded-2xl glass-card text-base font-semibold font-dm hover:-translate-y-1 transition-all duration-300"
            style={{ color: "var(--text-primary)" }}
          >
            Contact Me
          </a>
          <a
            href="#"
            className="group flex items-center gap-2 px-5 py-3.5 rounded-2xl glass-card text-sm font-semibold font-dm hover:-translate-y-1 transition-all duration-300"
            style={{ color: "var(--violet-glow)" }}
          >
            <Download className="w-4 h-4" />
            Resume
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex gap-3 justify-center mb-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
        >
          {[
            { icon: Github, label: "GitHub", href: "#" },
            { icon: Linkedin, label: "LinkedIn", href: "#" },
          ].map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              className="flex items-center gap-2 glass-card px-4 py-2 rounded-xl text-xs font-semibold font-dm hover:-translate-y-0.5 transition-transform"
              style={{ color: "var(--text-secondary)" }}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </a>
          ))}
          <div
            className="flex items-center gap-1 glass-card px-4 py-2 rounded-xl text-xs font-semibold font-dm"
            style={{ color: "#f59e0b" }}
          >
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-current" />
            ))}
            <span className="ml-1" style={{ color: "var(--text-secondary)" }}>5.0</span>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="glass-card rounded-2xl p-4 text-center"
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="font-syne font-extrabold text-2xl glow-text">{s.num}</div>
              <div className="text-xs font-dm mt-1" style={{ color: "var(--text-secondary)" }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity, zIndex: 10 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <span className="text-xs font-dm" style={{ color: "var(--text-muted)" }}>
          scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-violet-500 to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}
