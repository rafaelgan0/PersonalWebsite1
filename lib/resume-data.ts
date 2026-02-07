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
  tagline: "Blazor/.NET + React/TypeScript | Performance & Accessibility Focused",
  linkedin: "https://linkedin.com/in/ganrafael",
  github: "https://github.com/rafaelgan0",
  website: "https://rafaelgan.vercel.app/",
  location: "Tempe, AZ",
  bio: "Software Engineer (Blazor/.NET + React/TypeScript) focused on performance and accessibility; cut initial load time 30%, reduced upload time up to 90%, and improved WAVE accessibility score 5/10 → 9.9/10.",
};

export const experiences: Experience[] = [
  {
    company: "Cognizant, TriZetto QNXT Modernization Team (Healthcare Tech)",
    role: "Software Engineer",
    period: "Aug 2024 - Present",
    location: "Mesa, AZ",
    highlights: [
      // Performance
      "Tuned Blazor lifecycles to speed up initial page loads",
      "Built a JS interop pipeline to bypass SignalR bottlenecks",
      "Making uploads and rendering significantly faster",
      // Accessibility & UI
      "Reworked semantic HTML and ARIA across the app",
      "Configured Syncfusion components for full screen reader support",
      "Built a reusable grid system that standardized UI development",
      // Delivery & Quality
      "Shipped 10+ features for the HSC 2025 conference demo",
      "Maintained strong test coverage with xUnit",
      "Validated accessibility end-to-end with WAVE and NVDA",
    ],
    technologies: [".NET 8", "Blazor", "Syncfusion", "C#", "JavaScript", "SignalR", "xUnit", "WCAG 2.1 AA", "ARIA", "WAVE", "NVDA"],
    palette: ['#0A2463', '#1E6091', '#3E92CC', '#D4AF37'],
  },
  {
    company: "Cognizant, TriZetto QNXT Modernization Team",
    role: "Software Engineer Intern",
    period: "Jun 2023 - Aug 2023",
    location: "Mesa, AZ",
    highlights: [
      "Built a Blazor + Syncfusion proof-of-concept",
      "Replicated core QNXT UI workflows end-to-end",
      "Packaged it into a stakeholder demo with documented tradeoffs",
      "Helped move the project from exploration to funded",
    ],
    technologies: [".NET", "Blazor", "Syncfusion", "C#"],
    palette: ['#2D1B69', '#573B8A', '#8B5FBF', '#D4A5FF'],
  },
];

export const projects: Project[] = [
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
    ],
    technologies: ["React 18", "TypeScript", "Vite", "Tailwind", "Radix UI", "Recharts", "Zod", "Vitest"],
    link: "https://iquity-report-project.vercel.app/",
    image: "/images/iqity-project.png",
    palette: ['#0B3D2E', '#1A7A5C', '#2EC4B6', '#CBF3F0'],
  },
];

export const education: Education[] = [
  {
    institution: "Georgia Institute of Technology",
    degree: "Master of Science in Computer Science (OMSCS)",
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
    description: "Shipped key UI components for the HSC 2025 client demo within a 3-week deadline",
  },
];

export const skills = {
  "Front End": ["React", "Next.js", "TypeScript", "JavaScript", "HTML/CSS", "Vite", "Radix UI", "Recharts", "Syncfusion"],
  "Platform": [".NET 8", "Blazor"],
  "Tools/Testing": ["Git", "Chrome DevTools", "xUnit", "Vitest", "Zod", "VsCode", "Visual Studio"],
  "Accessibility": ["WAVE", "NVDA", "WCAG 2.1 AA"],
};

