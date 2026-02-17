export interface Project {
  id: number;
  name: string;
  desc: string;
  longDesc?: string;
  tags: string[];
  url: string;
  github: string;
  emoji: string;
  featured?: boolean;
}

export interface Course {
  id: number;
  name: string;
  desc: string;
  duration: string;
  students: number;
  price: string;
  emoji: string;
  level: string;
  topics: string[];
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  text: string;
  stars: number;
  color: string;
  initial: string;
}

export interface Skill {
  name: string;
  icon: string;
  category: string;
}

export const skills: Skill[] = [
  { name: "React", icon: "⚛️", category: "frontend" },
  { name: "Next.js", icon: "▲", category: "frontend" },
  { name: "TypeScript", icon: "📘", category: "frontend" },
  { name: "Tailwind CSS", icon: "🎨", category: "frontend" },
  { name: "Node.js", icon: "🟢", category: "backend" },
  { name: "Express.js", icon: "🚂", category: "backend" },
  { name: "NestJS", icon: "🐱", category: "backend" },
  { name: "REST API", icon: "🔌", category: "backend" },
  { name: "GraphQL", icon: "◈", category: "backend" },
  { name: "MongoDB", icon: "🍃", category: "database" },
  { name: "PostgreSQL", icon: "🐘", category: "database" },
  { name: "MySQL", icon: "🐬", category: "database" },
  { name: "Prisma", icon: "💎", category: "database" },
  { name: "Redis", icon: "🔴", category: "database" },
  { name: "Docker", icon: "🐳", category: "devops" },
  { name: "Git", icon: "🔀", category: "devops" },
  { name: "GitHub", icon: "🐙", category: "devops" },
  { name: "GitHub Actions", icon: "⚙️", category: "devops" },
  { name: "AWS", icon: "☁️", category: "devops" },
  { name: "Linux", icon: "🐧", category: "devops" },
  { name: "Nginx", icon: "🌐", category: "devops" },
  { name: "JWT/Auth", icon: "🔐", category: "other" },
  { name: "Socket.io", icon: "⚡", category: "other" },
  { name: "Stripe", icon: "💳", category: "other" },
];

export const projects: Project[] = [
  {
    id: 1,
    name: "EduFlow LMS",
    desc: "Full-featured Learning Management System with video courses, live quizzes, certificates & Stripe payments.",
    longDesc: "Built from scratch with Next.js App Router, NestJS backend, and PostgreSQL. Features include video streaming, quiz engine, progress tracking, and automated certificate generation.",
    tags: ["Next.js", "NestJS", "PostgreSQL", "Stripe", "Prisma"],
    url: "#",
    github: "#",
    emoji: "🎓",
    featured: true,
  },
  {
    id: 2,
    name: "DevConnect API",
    desc: "RESTful API platform for developers to collaborate, share projects, and get mentorship.",
    tags: ["NestJS", "PostgreSQL", "Prisma", "Docker", "JWT"],
    url: "#",
    github: "#",
    emoji: "🔗",
    featured: true,
  },
  {
    id: 3,
    name: "CloudStore App",
    desc: "AWS S3-powered cloud storage with drag-and-drop upload, sharing links, and version history.",
    tags: ["React", "Node.js", "AWS S3", "MongoDB", "JWT"],
    url: "#",
    github: "#",
    emoji: "☁️",
  },
  {
    id: 4,
    name: "ShopNext Commerce",
    desc: "Complete e-commerce with admin dashboard, inventory management, order tracking, and analytics.",
    tags: ["Next.js", "Prisma", "PostgreSQL", "Redis", "Stripe"],
    url: "#",
    github: "#",
    emoji: "🛒",
    featured: true,
  },
  {
    id: 5,
    name: "RealTime Chat",
    desc: "WhatsApp-style messaging with rooms, file sharing, emoji reactions, and end-to-end encryption.",
    tags: ["Socket.io", "React", "Node.js", "MongoDB"],
    url: "#",
    github: "#",
    emoji: "💬",
  },
  {
    id: 6,
    name: "CI/CD Pipeline Kit",
    desc: "GitHub Actions workflow templates for Node.js apps — auto test, build, Docker push, and AWS deploy.",
    tags: ["Docker", "GitHub Actions", "AWS EC2", "Nginx"],
    url: "#",
    github: "#",
    emoji: "⚙️",
  },
];

export const courses: Course[] = [
  {
    id: 1,
    name: "MERN Stack Mastery",
    desc: "Complete guide to MongoDB, Express, React & Node.js. Build 5 real-world projects from scratch.",
    duration: "30 hours",
    students: 247,
    price: "PKR 4,999",
    emoji: "⚡",
    level: "Beginner → Advanced",
    topics: ["React Hooks", "Node.js", "MongoDB", "Express", "JWT Auth", "Deployment"],
  },
  {
    id: 2,
    name: "Next.js 14 & TypeScript",
    desc: "Production-grade apps with Next.js App Router, Server Components, TypeScript & Prisma.",
    duration: "22 hours",
    students: 189,
    price: "PKR 5,499",
    emoji: "🚀",
    level: "Intermediate",
    topics: ["App Router", "Server Actions", "TypeScript", "Prisma", "Auth.js", "Vercel"],
  },
  {
    id: 3,
    name: "DevOps for Developers",
    desc: "Docker, GitHub Actions CI/CD, AWS deployment, Nginx reverse proxy, and Linux server management.",
    duration: "18 hours",
    students: 132,
    price: "PKR 5,999",
    emoji: "🐳",
    level: "Intermediate",
    topics: ["Docker & Compose", "GitHub Actions", "AWS EC2/S3", "Nginx", "SSL", "Monitoring"],
  },
  {
    id: 4,
    name: "NestJS & PostgreSQL",
    desc: "Enterprise backend with NestJS, Prisma ORM, PostgreSQL, Guards, Pipes, and advanced patterns.",
    duration: "20 hours",
    students: 98,
    price: "PKR 4,499",
    emoji: "🐱",
    level: "Intermediate → Advanced",
    topics: ["NestJS Modules", "Prisma ORM", "Guards & Pipes", "WebSockets", "Testing", "Swagger"],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sara Ahmed",
    role: "Founder",
    company: "TechVenture PK",
    text: "Delivered our entire platform 2 weeks early with flawless code quality. Communication was outstanding throughout. Easily the best developer I've worked with.",
    stars: 5,
    color: "#7c3aed",
    initial: "S",
  },
  {
    id: 2,
    name: "Ali Hassan",
    role: "Tech Lead",
    company: "StartupX",
    text: "The API architecture was incredibly clean, scalable, and well-documented. He understood our requirements better than we did. Highly recommended!",
    stars: 5,
    color: "#e879f9",
    initial: "A",
  },
  {
    id: 3,
    name: "Maria Khan",
    role: "Product Manager",
    company: "Digital Agency",
    text: "Our Next.js app runs at 98/100 on Lighthouse. Perfect Core Web Vitals. The attention to performance details was impressive beyond expectations.",
    stars: 5,
    color: "#06b6d4",
    initial: "M",
  },
  {
    id: 4,
    name: "Usman Farooq",
    role: "CEO",
    company: "CloudSoft",
    text: "Not just a developer — a true architect. Helped us rethink our entire system design and saved us months of technical debt. Will hire again and again.",
    stars: 5,
    color: "#f59e0b",
    initial: "U",
  },
  {
    id: 5,
    name: "Zainab Malik",
    role: "UI/UX Designer",
    company: "Freelancer",
    text: "Collaborated on a very complex project. Every component was pixel-perfect and the Docker setup worked on day one. Dream dev to work with.",
    stars: 5,
    color: "#10b981",
    initial: "Z",
  },
  {
    id: 6,
    name: "Bilal Qureshi",
    role: "Course Student",
    company: "Self-employed",
    text: "The MERN Stack course is genuinely the best I've taken — paid or free. Clear explanations, real projects, and the instructor actually replies to questions.",
    stars: 5,
    color: "#ec4899",
    initial: "B",
  },
  {
    id: 7,
    name: "Hamza Raza",
    role: "CTO",
    company: "FinTech PK",
    text: "Integrated Stripe and a complex subscription system perfectly. Zero bugs in production. This developer's attention to security and edge cases is exceptional.",
    stars: 5,
    color: "#8b5cf6",
    initial: "H",
  },
  {
    id: 8,
    name: "Noor Fatima",
    role: "Startup Co-founder",
    company: "EduTech Startup",
    text: "Built our entire LMS in 6 weeks. Video streaming, quizzes, certificates — everything worked. We raised seed funding partly because of how polished the product looked.",
    stars: 5,
    color: "#f97316",
    initial: "N",
  },
];
