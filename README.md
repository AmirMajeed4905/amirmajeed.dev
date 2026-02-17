# 🚀 Portfolio — Next.js 14 + Framer Motion

A production-grade, animated portfolio website with a full admin dashboard.

---

## ✨ Features

### 🎨 Visual Effects
- **Animated Spotlights** — Canvas-based GPU-accelerated spotlight that follows mouse
- **Parallax Scrolling** — Framer Motion `useScroll` + `useTransform` for depth layers
- **Typing Animation** — Rotating text typewriter effect
- **Infinite Testimonials** — CSS auto-scrolling carousel, pauses on hover
- **Animated Border Cards** — Conic-gradient rotating border on hover
- **Glass Morphism** — Frosted glass cards throughout
- **Grain Overlay** — Subtle film grain texture for depth
- **Cursor Glow** — Soft spotlight that follows your cursor (desktop)
- **Scroll Reveal** — Framer Motion viewport animations on every section
- **Shimmer Gradient Text** — Animated gradient text with `background-position`
- **Floating Tech Badges** — Parallax floating labels in hero

### 📋 Sections
- **Hero** — Spotlights, typing animation, CTA buttons, stats, parallax orbs
- **Skills** — Filterable by category (Frontend / Backend / Database / DevOps), DevOps progress bars
- **Projects** — Animated border cards with hover glow shadow effects
- **Courses** — Floating emoji, price, topics, enroll CTA
- **Testimonials** — Infinite auto-scroll with shadow glow per card
- **Contact** — Form with sending state, success animation, social links
- **Footer** — Clean minimal

### ⚡ Dashboard (`/dashboard`)
- **Overview** — Stats cards (projects, courses, students, featured)
- **Projects CRUD** — Add / Edit / Delete projects with form
- **Courses CRUD** — Add / Edit / Delete courses with form
- **Delete Confirmation** — Modal with backdrop blur
- **localStorage persistence** — All data saves to browser storage

### 🌙 Theme
- Dark / Light toggle persisted to localStorage
- CSS custom properties for consistent theming

---

## 🛠️ Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Dev Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### 3. Build for Production
```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx          # Root layout (fonts, providers)
│   ├── page.tsx            # Home — assembles all sections
│   ├── globals.css         # Global styles + CSS animations
│   └── dashboard/
│       └── page.tsx        # Admin dashboard
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # Sticky glassmorphism navbar
│   │   └── ThemeProvider.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx         # Canvas spotlights + parallax
│   │   ├── SkillsSection.tsx       # Filterable skills grid
│   │   ├── ProjectsSection.tsx     # Animated border project cards
│   │   ├── CoursesSection.tsx      # Course cards with pricing
│   │   ├── TestimonialsSection.tsx # Infinite scroll testimonials
│   │   ├── ContactSection.tsx      # Contact form + socials
│   │   └── FooterSection.tsx
│   └── ui/
│       ├── Animated.tsx    # FadeInUp, ScaleIn, SectionLabel, etc.
│       ├── CursorGlow.tsx  # Mouse-tracking cursor effect
│       ├── GlowDivider.tsx # Section divider line
│       └── GrainOverlay.tsx
├── lib/
│   └── data.ts             # All projects, courses, skills, testimonials
└── tailwind.config.ts      # Custom theme, animations, colors
```

---

## 🎨 Customization

### Add Your Info
Edit `lib/data.ts` to add your real projects, courses, and testimonials.

### Colors
The violet/fuchsia/cyan palette is defined in `tailwind.config.ts` and `globals.css` CSS variables.

### Dashboard
Visit `/dashboard` to manage content via UI — no code editing needed.
All changes persist to `localStorage`.

---

## 📦 Key Dependencies

| Package | Purpose |
|---------|---------|
| `next@14` | Framework with App Router |
| `framer-motion@11` | Animations, parallax, layout |
| `tailwindcss@3` | Utility CSS |
| `lucide-react` | Icons |

---

Built with 💜 — Full Stack Dev Portfolio
