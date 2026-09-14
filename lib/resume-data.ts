export interface PersonalInfo {
  name: string;
  role: string;
  tagline: string;
  linkedin: string;
  github: string;
  website?: string;
  location: string;
  bio: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
  technologies: string[];
  palette?: string[];
}

export interface Project {
  title: string;
  description: string;
  highlights: string[];
  technologies: string[];
  link?: string;
  github?: string;
  image?: string;
  palette?: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  honors?: string[];
  gpa?: string;
}

export interface Award {
  title: string;
  organization: string;
  year: string;
  description?: string;
}

export const personalInfo = {
  name: "Rafael Amiel Gan",
  role: "Software Engineer",
  tagline: "AI Agents · .NET/Blazor · React/TypeScript | Accessibility Focused",
  linkedin: "https://linkedin.com/in/ganrafael",
  github: "https://github.com/rafaelgan0",
  website: "https://rafaelgan.vercel.app/",
  location: "Tempe, AZ",
  bio: "I’m an Arizona-based software engineer building modern healthcare software with a focus on calm, reliable UX. At Cognizant I work in .NET and Blazor with Syncfusion, and I architect AI agent pipelines that modernize legacy screens, encoding our design system, theming, and accessibility standards into agent skills so the generated code is production-ready. I’m the person who’ll chase down the “why does this feel slow” moments and make sure the experience works for everyone, especially with screen readers in mind. Outside of work, I’m building Coachlink, a Flutter + Supabase platform connecting high school students with coaches and recruiters, and pursuing an M.S. in Computer Science (AI specialization) at Georgia Tech.",
};
// Software Engineer (Blazor/.NET + React/TypeScript) focused on performance and accessibility; cut initial load time 30%, reduced upload time up to 90%, and improved WAVE accessibility score 5/10 → 9.9/10.
export const experiences: Experience[] = [
  {
    company: "Cognizant, TriZetto Healthcare Products (QNXT Modernization)",
    role: "Associate Software Engineer",
    period: "Aug 2024 - Present",
    location: "Mesa, AZ",
    highlights: [
      // AI Agents
      "Architected an agentic pipeline that migrates legacy Web Forms screens to Blazor (.NET 10)",
      "Automates **80–90%** of each screen’s migration, leaving engineers to final review",
      "Authored agent skills that encode our design system, theming, and SCSS standards",
      // Accessibility
      "Led ADA remediation that raised a module’s WAVE score from **5 → 9.9**",
      "Agent-generated pages score **8–10** on WAVE using Syncfusion’s built-in accessibility",
      "Building a Playwright + axe-core agent that detects WCAG violations and generates fixes",
      // Performance & Delivery
      "Cut large-file upload time by up to **90%** with a JS interop workaround for SignalR limits",
      "Improved initial load time by **30%** through lazy loading, caching, and refactoring",
      "Shipped features for a platform handling **~400K claims/day** with **85%+** xUnit coverage",
    ],
    technologies: ["AI Agents", ".NET 10", "ASP.NET Core", "Blazor", "Syncfusion", "C#", "SCSS", "SQL", "Playwright", "axe-core", "xUnit", "WCAG 2.1 AA", "NVDA"],
    palette: ['#0A2463', '#1E6091', '#3E92CC', '#D4AF37'],
  },
  {
    company: "Cognizant, TriZetto Healthcare Products (QNXT Modernization)",
    role: "Software Engineer Intern",
    period: "Jun 2023 - Aug 2023",
    location: "Mesa, AZ",
    highlights: [
      "Built a Blazor + Syncfusion proof-of-concept",
      "Replicated core QNXT UI workflows end-to-end",
      "Packaged it into a stakeholder demo with documented tradeoffs",
      "Leadership used it to approve and fund the modernization initiative",
    ],
    technologies: [".NET 8", "Blazor", "Syncfusion", "C#"],
    palette: ['#2D1B69', '#573B8A', '#8B5FBF', '#D4A5FF'],
  },
];

export const projects: Project[] = [
  {
    title: "Coachlink",
    description: "Founder & sole engineer (beta): a platform connecting high school students with coaches and recruiters",
    highlights: [
      // Product
      "Founded and operate a platform connecting high school students with coaches and recruiters",
      "Ship iOS, Android, and web clients from a single Flutter codebase",
      "Built with AI-assisted development, currently in beta",
      // Full Stack
      "Designed the Postgres data model on Supabase",
      "Integrated Firebase authentication and Stripe payments",
      "Own hosting and deployment on Vercel",
    ],
    technologies: ["Flutter", "Dart", "Supabase", "Postgres", "Firebase Auth", "Stripe", "Vercel"],
    palette: ['#1B1F3B', '#E4572E', '#F3A712', '#FDF0D5'],
  },
  {
    title: "IQity Brain Performance Report",
    description: "Multi-section cognitive performance report UI for medical data visualization",
    highlights: [
      // Report UI
      "Built a multi-section cognitive performance report",
      "Visualized structured medical data with Recharts",
      "Deployed to Vercel for live stakeholder review",
      // Data Integrity
      "Enforced a runtime JSON contract with Zod",
      "Blocked invalid payloads before they hit the UI",
      "Surfaced actionable schema errors instead of silent failures",
      // Architecture
      "Wired up config-driven dual data sources",
      "Local fixtures for demos, HTTP API for production",
      "Kept the UI fully decoupled from the backend",
      // Migration
      "Migrated the app from React to Vue with full feature parity",
      "Re-established the build environment (PHP, Composer, NPM, Vite)",
    ],
    technologies: ["React 18", "TypeScript", "Vue", "Vite", "Tailwind", "Radix UI", "Recharts", "Zod", "Vitest"],
    link: "https://iquity-report-project.vercel.app/",
    image: "/images/iqity-project.png",
    palette: ['#0B3D2E', '#1A7A5C', '#2EC4B6', '#CBF3F0'],
  },
];

export const education: Education[] = [
  {
    institution: "Georgia Institute of Technology",
    degree: "Master of Science in Computer Science (OMSCS), AI Specialization",
    period: "2026 - Present",
    honors: [],
  },
  {
    institution: "Arizona State University",
    degree: "Bachelor of Science in Computer Science",
    period: "2020 - 2024",
    honors: ["Summa Cum Laude", "President's Scholar", "Minor in Business"],
  },
];

export const awards: Award[] = [
  {
    title: "Raise the Bar Award",
    organization: "Cognizant",
    year: "2025",
    description: "Delivered key workflows for the HSC 2025 client demo within a 3-week deadline",
  },
];

export const skills = {
  "AI/Agents": ["Agentic Pipelines", "Agent Skills", "Context Engineering", "AI-Assisted Development", "Legacy Modernization"],
  "Front End": ["React", "Next.js", "TypeScript", "JavaScript", "Vue", "Flutter", "HTML/CSS/SCSS", "Tailwind CSS", "Vite", "Syncfusion"],
  "Platform": [".NET 10", "ASP.NET Core", "Blazor", "C#", "SQL", "Supabase", "Firebase", "Stripe", "Vercel"],
  "Tools/Testing": ["Playwright", "axe-core", "xUnit", "Vitest", "Zod", "Azure DevOps", "Git", "Postman", "SSMS"],
  "Accessibility": ["WCAG 2.1 AA", "ARIA", "Semantic HTML", "WAVE", "NVDA"],
};

