"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { Moon, Sun, Menu, X, Zap } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Courses", href: "#courses" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 bg-[var(--bg-primary)]/80 backdrop-blur-2xl border-b border-[var(--border-card)] shadow-[0_4px_30px_rgba(124,58,237,0.1)]"
            : "py-5 bg-transparent"
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
            </div>
            <span
              className="font-syne font-bold text-xl tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Dev<span className="glow-text">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="nav-link font-dm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
              >
                {link.label}
              </motion.a>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggle}
              className="glass-card p-2.5 rounded-xl hover:scale-110 transition-transform duration-200"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" style={{ color: "var(--violet-glow)" }} />
              ) : (
                <Moon className="w-4 h-4" style={{ color: "var(--violet)" }} />
              )}
            </button>

            {/* Dashboard Button */}
            {/* <Link
              href="/dashboard"
              className="hidden sm:flex items-center gap-2 btn-shine px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white text-sm font-semibold font-dm shadow-violet-lg hover:-translate-y-0.5 transition-transform duration-200"
            >
              <Zap className="w-3.5 h-3.5" />
              Dashboard
            </Link> */}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden glass-card p-2.5 rounded-xl"
            >
              {mobileOpen ? (
                <X className="w-4 h-4" style={{ color: "var(--text-primary)" }} />
              ) : (
                <Menu className="w-4 h-4" style={{ color: "var(--text-primary)" }} />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 pt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-[var(--bg-primary)]/95 backdrop-blur-2xl"
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              className="relative flex flex-col items-center gap-6 pt-10"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-syne font-semibold text-2xl"
                  style={{ color: "var(--text-primary)" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="mt-4 px-8 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-semibold"
              >
                Dashboard ⚡
              </Link>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
