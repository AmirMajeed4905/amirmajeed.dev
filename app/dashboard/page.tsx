"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects as defaultProjects, courses as defaultCourses, type Project, type Course } from "@/lib/data";
import {
  Zap, Plus, Edit3, Trash2, X, Save, BarChart2, BookOpen,
  Rocket, Users, ChevronLeft, AlertCircle,
} from "lucide-react";
import Link from "next/link";

const PROJ_KEY = "portfolio_projects";
const COURSE_KEY = "portfolio_courses";

type Tab = "overview" | "projects" | "courses";

function useLocalData<T>(key: string, defaults: T[]): [T[], (d: T[]) => void] {
  const [data, setData] = useState<T[]>(defaults);
  useEffect(() => {
    const stored = localStorage.getItem(key);
    if (stored) setData(JSON.parse(stored));
  }, [key]);
  const save = (d: T[]) => {
    setData(d);
    localStorage.setItem(key, JSON.stringify(d));
  };
  return [data, save];
}

// ==================== PROJECT FORM ====================
function ProjectForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: Project;
  onSave: (p: Project) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<Omit<Project, "id">>({
    name: initial?.name ?? "",
    desc: initial?.desc ?? "",
    tags: initial?.tags ?? [],
    url: initial?.url ?? "",
    github: initial?.github ?? "",
    emoji: initial?.emoji ?? "🚀",
    featured: initial?.featured ?? false,
  });
  const [tagsRaw, setTagsRaw] = useState((initial?.tags ?? []).join(", "));

  const handleSave = () => {
    if (!form.name.trim()) return alert("Project name required!");
    onSave({
      ...form,
      id: initial?.id ?? Date.now(),
      tags: tagsRaw.split(",").map((t) => t.trim()).filter(Boolean),
    });
  };

  return (
    <motion.div
      className="rounded-2xl p-6 mb-6 border"
      style={{
        background: "var(--bg-secondary)",
        borderColor: "rgba(124,58,237,0.3)",
      }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3
        className="font-syne font-bold text-lg mb-5"
        style={{ color: "var(--text-primary)" }}
      >
        {initial ? "✏️ Edit Project" : "➕ Add New Project"}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <InputField label="Project Name *" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="EduFlow LMS" />
        <InputField label="Emoji Icon" value={form.emoji ?? ""} onChange={(v) => setForm({ ...form, emoji: v })} placeholder="🚀" />
        <InputField label="Live URL" value={form.url} onChange={(v) => setForm({ ...form, url: v })} placeholder="https://..." />
        <InputField label="GitHub URL" value={form.github} onChange={(v) => setForm({ ...form, github: v })} placeholder="https://github.com/..." />
      </div>
      <TextareaField label="Description" value={form.desc} onChange={(v) => setForm({ ...form, desc: v })} />
      <InputField label="Tech Tags (comma separated)" value={tagsRaw} onChange={setTagsRaw} placeholder="React, Node.js, MongoDB" />
      <div className="flex items-center gap-3 mt-4">
        <input type="checkbox" id="featured" checked={!!form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })}
          className="w-4 h-4 accent-violet-600" />
        <label htmlFor="featured" className="font-dm text-sm" style={{ color: "var(--text-secondary)" }}>
          Featured project (shows star badge)
        </label>
      </div>
      <FormActions onSave={handleSave} onCancel={onCancel} />
    </motion.div>
  );
}

// ==================== COURSE FORM ====================
function CourseForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: Course;
  onSave: (c: Course) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<Omit<Course, "id">>({
    name: initial?.name ?? "",
    desc: initial?.desc ?? "",
    duration: initial?.duration ?? "",
    students: initial?.students ?? 0,
    price: initial?.price ?? "",
    emoji: initial?.emoji ?? "📚",
    level: initial?.level ?? "",
    topics: initial?.topics ?? [],
  });
  const [topicsRaw, setTopicsRaw] = useState((initial?.topics ?? []).join(", "));

  const handleSave = () => {
    if (!form.name.trim()) return alert("Course name required!");
    onSave({
      ...form,
      id: initial?.id ?? Date.now(),
      topics: topicsRaw.split(",").map((t) => t.trim()).filter(Boolean),
    });
  };

  return (
    <motion.div
      className="rounded-2xl p-6 mb-6 border"
      style={{ background: "var(--bg-secondary)", borderColor: "rgba(124,58,237,0.3)" }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="font-syne font-bold text-lg mb-5" style={{ color: "var(--text-primary)" }}>
        {initial ? "✏️ Edit Course" : "➕ Add New Course"}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <InputField label="Course Title *" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="MERN Stack Mastery" />
        <InputField label="Emoji Icon" value={form.emoji} onChange={(v) => setForm({ ...form, emoji: v })} placeholder="⚡" />
        <InputField label="Duration" value={form.duration} onChange={(v) => setForm({ ...form, duration: v })} placeholder="30 hours" />
        <InputField label="Students" value={String(form.students)} onChange={(v) => setForm({ ...form, students: Number(v) || 0 })} placeholder="0" type="number" />
        <InputField label="Price" value={form.price} onChange={(v) => setForm({ ...form, price: v })} placeholder="PKR 4,999" />
        <InputField label="Level" value={form.level} onChange={(v) => setForm({ ...form, level: v })} placeholder="Beginner → Advanced" />
      </div>
      <TextareaField label="Description" value={form.desc} onChange={(v) => setForm({ ...form, desc: v })} />
      <InputField label="Topics (comma separated)" value={topicsRaw} onChange={setTopicsRaw} placeholder="React, Node.js, Deployment..." />
      <FormActions onSave={handleSave} onCancel={onCancel} />
    </motion.div>
  );
}

// ==================== HELPERS ====================
function InputField({ label, value, onChange, placeholder, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-dm text-xs font-semibold" style={{ color: "var(--text-muted)" }}>{label}</label>
      <input
        type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="px-4 py-2.5 rounded-xl font-dm text-sm outline-none focus:ring-2 focus:ring-violet-500/40"
        style={{ background: "var(--bg-primary)", border: "1px solid var(--border-card)", color: "var(--text-primary)" }}
      />
    </div>
  );
}

function TextareaField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-1.5 mb-4">
      <label className="font-dm text-xs font-semibold" style={{ color: "var(--text-muted)" }}>{label}</label>
      <textarea
        rows={2} value={value} onChange={(e) => onChange(e.target.value)}
        className="px-4 py-2.5 rounded-xl font-dm text-sm outline-none focus:ring-2 focus:ring-violet-500/40 resize-none"
        style={{ background: "var(--bg-primary)", border: "1px solid var(--border-card)", color: "var(--text-primary)" }}
      />
    </div>
  );
}

function FormActions({ onSave, onCancel }: { onSave: () => void; onCancel: () => void }) {
  return (
    <div className="flex gap-3 mt-5">
      <button onClick={onSave}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold font-dm text-white"
        style={{ background: "linear-gradient(135deg, #7c3aed, #e879f9)" }}>
        <Save className="w-3.5 h-3.5" /> Save
      </button>
      <button onClick={onCancel}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold font-dm"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)", color: "var(--text-secondary)" }}>
        <X className="w-3.5 h-3.5" /> Cancel
      </button>
    </div>
  );
}

// ==================== MAIN DASHBOARD ====================
export default function DashboardPage() {
  const [tab, setTab] = useState<Tab>("overview");
  const [projects, setProjects] = useLocalData<Project>(PROJ_KEY, defaultProjects);
  const [courses, setCourses] = useLocalData<Course>(COURSE_KEY, defaultCourses);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ type: "project" | "course"; id: number } | null>(null);

  const saveProject = (p: Project) => {
    const updated = editingProject
      ? projects.map((x) => (x.id === p.id ? p : x))
      : [...projects, p];
    setProjects(updated);
    setEditingProject(null);
    setShowProjectForm(false);
  };

  const saveCourse = (c: Course) => {
    const updated = editingCourse
      ? courses.map((x) => (x.id === c.id ? c : x))
      : [...courses, c];
    setCourses(updated);
    setEditingCourse(null);
    setShowCourseForm(false);
  };

  const confirmDelete = () => {
    if (!deleteConfirm) return;
    if (deleteConfirm.type === "project") setProjects(projects.filter((p) => p.id !== deleteConfirm.id));
    else setCourses(courses.filter((c) => c.id !== deleteConfirm.id));
    setDeleteConfirm(null);
  };

  const totalStudents = courses.reduce((a, c) => a + (c.students || 0), 0);

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "overview", label: "Overview", icon: <BarChart2 className="w-4 h-4" /> },
    { key: "projects", label: "Projects", icon: <Rocket className="w-4 h-4" /> },
    { key: "courses", label: "Courses", icon: <BookOpen className="w-4 h-4" /> },
  ];

  return (
    <div
      className="min-h-screen pt-20 pb-12 px-4 sm:px-6"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 20% 30%, rgba(124,58,237,0.08) 0%, transparent 60%)" }} />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #7c3aed, #e879f9)" }}
              >
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h1 className="font-syne font-extrabold text-2xl" style={{ color: "var(--text-primary)" }}>
                Dashboard
              </h1>
            </div>
            <p className="font-dm text-sm ml-13" style={{ color: "var(--text-secondary)" }}>
              Manage your portfolio content
            </p>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 glass-card px-4 py-2.5 rounded-xl text-sm font-semibold font-dm hover:-translate-y-0.5 transition-transform"
            style={{ color: "var(--text-secondary)" }}
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {tabs.map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold font-dm transition-all duration-300 ${
                tab === key
                  ? "text-white shadow-violet-lg scale-105"
                  : "glass-card hover:scale-105"
              }`}
              style={
                tab === key
                  ? { background: "linear-gradient(135deg, #7c3aed, #e879f9)" }
                  : { color: "var(--text-secondary)" }
              }
            >
              {icon} {label}
            </button>
          ))}
        </div>

        {/* ===== OVERVIEW ===== */}
        <AnimatePresence mode="wait">
          {tab === "overview" && (
            <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {[
                  { num: projects.length, label: "Projects", icon: "🚀", color: "#7c3aed" },
                  { num: courses.length, label: "Courses", icon: "📚", color: "#e879f9" },
                  { num: totalStudents, label: "Students", icon: "👥", color: "#06b6d4" },
                  { num: projects.filter((p) => p.featured).length, label: "Featured", icon: "⭐", color: "#f59e0b" },
                ].map((s, i) => (
                  <motion.div
                    key={s.label}
                    className="glass-card rounded-2xl p-6 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -4 }}
                  >
                    <div className="text-3xl mb-2">{s.icon}</div>
                    <div className="font-syne font-extrabold text-3xl glow-text">{s.num}</div>
                    <div className="font-dm text-xs mt-1" style={{ color: "var(--text-secondary)" }}>{s.label}</div>
                  </motion.div>
                ))}
              </div>
              <div className="glass-card rounded-2xl p-6">
                <p className="font-dm text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  👋 Welcome to your portfolio dashboard. Use the tabs above to manage your Projects and Courses.
                  All data is saved in your browser's localStorage and syncs to the portfolio automatically.
                </p>
                <div className="flex gap-3 mt-4 flex-wrap">
                  <button onClick={() => setTab("projects")}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold font-dm text-white"
                    style={{ background: "linear-gradient(135deg, #7c3aed, #e879f9)" }}>
                    <Rocket className="w-3.5 h-3.5" /> Manage Projects
                  </button>
                  <button onClick={() => setTab("courses")}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold font-dm"
                    style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)", color: "var(--violet-glow)" }}>
                    <BookOpen className="w-3.5 h-3.5" /> Manage Courses
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ===== PROJECTS ===== */}
          {tab === "projects" && (
            <motion.div key="projects" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {(showProjectForm || editingProject) ? (
                <ProjectForm
                  initial={editingProject ?? undefined}
                  onSave={saveProject}
                  onCancel={() => { setShowProjectForm(false); setEditingProject(null); }}
                />
              ) : (
                <button
                  onClick={() => setShowProjectForm(true)}
                  className="flex items-center gap-2 mb-6 px-5 py-2.5 rounded-xl text-sm font-semibold font-dm text-white"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #e879f9)" }}
                >
                  <Plus className="w-4 h-4" /> Add New Project
                </button>
              )}
              <div className="flex flex-col gap-3">
                {projects.map((p, i) => (
                  <motion.div
                    key={p.id}
                    className="glass-card rounded-2xl p-5 flex items-center gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ x: 4 }}
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                      style={{ background: "rgba(124,58,237,0.15)" }}>
                      {p.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-syne font-semibold text-sm truncate" style={{ color: "var(--text-primary)" }}>
                          {p.name}
                        </span>
                        {p.featured && (
                          <span className="text-xs px-2 py-0.5 rounded-full font-dm"
                            style={{ background: "rgba(245,158,11,0.15)", color: "#f59e0b" }}>⭐ Featured</span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {p.tags.slice(0, 4).map((t) => (
                          <span key={t} className="text-xs px-2 py-0.5 rounded-md font-dm"
                            style={{ background: "rgba(124,58,237,0.1)", color: "var(--violet-glow)" }}>
                            {t}
                          </span>
                        ))}
                        {p.tags.length > 4 && (
                          <span className="text-xs font-dm" style={{ color: "var(--text-muted)" }}>+{p.tags.length - 4}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={() => { setEditingProject(p); setShowProjectForm(false); }}
                        className="p-2 rounded-xl transition-all hover:scale-110"
                        style={{ background: "rgba(124,58,237,0.15)", color: "var(--violet-glow)" }}>
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => setDeleteConfirm({ type: "project", id: p.id })}
                        className="p-2 rounded-xl transition-all hover:scale-110"
                        style={{ background: "rgba(239,68,68,0.12)", color: "#f87171" }}>
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ===== COURSES ===== */}
          {tab === "courses" && (
            <motion.div key="courses" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {(showCourseForm || editingCourse) ? (
                <CourseForm
                  initial={editingCourse ?? undefined}
                  onSave={saveCourse}
                  onCancel={() => { setShowCourseForm(false); setEditingCourse(null); }}
                />
              ) : (
                <button
                  onClick={() => setShowCourseForm(true)}
                  className="flex items-center gap-2 mb-6 px-5 py-2.5 rounded-xl text-sm font-semibold font-dm text-white"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #e879f9)" }}
                >
                  <Plus className="w-4 h-4" /> Add New Course
                </button>
              )}
              <div className="flex flex-col gap-3">
                {courses.map((c, i) => (
                  <motion.div
                    key={c.id}
                    className="glass-card rounded-2xl p-5 flex items-center gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ x: 4 }}
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                      style={{ background: "rgba(124,58,237,0.15)" }}>
                      {c.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-syne font-semibold text-sm mb-1 truncate" style={{ color: "var(--text-primary)" }}>
                        {c.name}
                      </div>
                      <div className="flex gap-2 font-dm text-xs" style={{ color: "var(--text-muted)" }}>
                        <span>⏱ {c.duration}</span>
                        <span>👥 {c.students} students</span>
                        <span className="font-semibold" style={{ color: "var(--violet-glow)" }}>{c.price}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={() => { setEditingCourse(c); setShowCourseForm(false); }}
                        className="p-2 rounded-xl transition-all hover:scale-110"
                        style={{ background: "rgba(124,58,237,0.15)", color: "var(--violet-glow)" }}>
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => setDeleteConfirm({ type: "course", id: c.id })}
                        className="p-2 rounded-xl transition-all hover:scale-110"
                        style={{ background: "rgba(239,68,68,0.12)", color: "#f87171" }}>
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Delete Confirm Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(10px)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              className="glass-card rounded-2xl p-8 max-w-sm w-full text-center"
              style={{ border: "1px solid rgba(239,68,68,0.3)" }}
              initial={{ scale: 0.85 }} animate={{ scale: 1 }} exit={{ scale: 0.85 }}
              onClick={(e) => e.stopPropagation()}
            >
              <AlertCircle className="w-12 h-12 mx-auto mb-4" style={{ color: "#f87171" }} />
              <h3 className="font-syne font-bold text-lg mb-2" style={{ color: "var(--text-primary)" }}>
                Delete {deleteConfirm.type === "project" ? "Project" : "Course"}?
              </h3>
              <p className="font-dm text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
                This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-center">
                <button onClick={confirmDelete}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold font-dm text-white"
                  style={{ background: "#ef4444" }}>
                  Delete
                </button>
                <button onClick={() => setDeleteConfirm(null)}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold font-dm glass-card"
                  style={{ color: "var(--text-secondary)" }}>
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
