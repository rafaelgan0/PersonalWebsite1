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
}

export interface Project {
  title: string;
  description: string;
  highlights: string[];
  technologies: string[];
  link?: string;
  github?: string;
  image?: string;
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
  role: "Front-End Software Engineer",
  tagline: "Building accessible, component-driven UI with React, TypeScript, and modern web technologies",
  linkedin: "https://linkedin.com/in/ganrafael",
  github: "https://github.com/ganrafael",
  website: "https://rafaelgan.vercel.app/",
  location: "Tempe, AZ",
  bio: "Front-end Software Engineer with 2 years of experience focused on accessible, component-driven UI engineering. Experienced in shipping production features with Blazor + Syncfusion and building scalable React + TypeScript applications. Strong in modern UI architecture, performance optimization, and testing with a focus on delivering accessible, high-quality user interfaces.",
};

export const experiences: Experience[] = [
  {
    company: "Cognizant, TriZetto QNXT Modernization Team",
    role: "Software Engineer",
    period: "Aug 2024 - Present",
    location: "Remote",
    highlights: [
      "Built modular, reusable UI components for QNXT modernization; patterns adopted for future modules",
      "Implemented WCAG/ARIA semantics raising WAVE accessibility score from **1/10 → 9.9/10**",
      "Partnered with Product and Solution Owners to translate business workflows into scalable, maintainable UI",
      "Delivered key UI flows for the **HSC 2025** demo under a three-week deadline",
      "Maintained **85%+** unit test coverage; validated accessibility via WAVE and NVDA",
    ],
    technologies: ["Blazor", "Syncfusion", "C#", ".NET", "UI Architecture", "WCAG 2.1 AA", "ARIA", "WAVE", "NVDA"],
  },
  {
    company: "Cognizant, TriZetto QNXT Modernization Team",
    role: "Software Engineer Intern",
    period: "Jun 2023 - Aug 2023",
    location: "Remote",
    highlights: [
      "Built the **Blazor + Syncfusion** POC validating modernization feasibility",
      "Developed core console page for performance and integration testing",
      "Implemented initial UI/architecture patterns influencing long-term design",
      "Delivered functional demo used to secure modernization approval",
    ],
    technologies: ["Blazor", "Syncfusion", "C#", ".NET", "UI Architecture"],
  },
];

export const projects: Project[] = [
  {
    title: "IQity Brain Performance Report",
    description: "Production SPA for medical data visualization used in live client presentations",
    highlights: [
      "Built **8 typed, reusable modules** (executive summary, biomarkers, cognitive foundations, recommendations)",
      "Implemented REST + JSON data pipelines with strict **Zod runtime validation**",
      "Used **useMemo/useCallback/useEffect** to optimize rendering for large datasets",
      "Delivered WCAG-compliant UI and automated tests with **Vitest + RTL**",
      "Production application used in live medical presentations",
    ],
    technologies: ["React", "TypeScript", "Vite", "Tailwind", "Radix UI", "Recharts", "Zod", "Vitest", "RTL"],
    link: "https://iquity-report-project.vercel.app/",
    image: "/images/iqity-project.png",
  },
  {
    title: "Personal Portfolio Website",
    description: "Modern, dessert-themed portfolio website with smooth animations and elegant design",
    highlights: [
      "Built with **Next.js 15** and **TypeScript**",
      "Implemented smooth scroll animations with **Framer Motion**",
      "Custom dessert-themed design system with **Tailwind CSS**",
      "Fully responsive and optimized for performance",
    ],
    technologies: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
    link: "https://rafaelgan.vercel.app/",
    github: "https://github.com/ganrafael/PersonalWebsite1",
  },
];

export const education: Education[] = [
  {
    institution: "Georgia Institute of Technology",
    degree: "Master of Science in Computer Science (OMSCS)",
    period: "Spring 2026 - 2030 (Expected)",
    honors: ["Enrolling Spring 2026"],
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
    year: "2024",
    description: "Recognized for high-impact UI delivery, accessibility uplift, and engineering excellence",
  },
  {
    title: "President's Scholar",
    organization: "Arizona State University",
    year: "2020 - 2024",
    description: "Merit scholarship for academic excellence",
  },
  {
    title: "Summa Cum Laude",
    organization: "Arizona State University",
    year: "2024",
    description: "Graduated with highest honors",
  },
];

export const skills = {
  "Languages & Frameworks": ["JavaScript", "TypeScript", "React", "Next.js", "Blazor", "Syncfusion", "HTML/CSS", "Tailwind", "Vite"],
  "Frontend Specialization": ["Component Architecture", "Context API", "Accessibility (WCAG 2.1 AA)", "Performance Optimization", "Design Systems"],
  "Testing & Tools": ["Vitest", "React Testing Library", "Unit Testing (85%+)", "Zod", "DevTools", "WAVE", "NVDA"],
  "Practices": ["Code Reviews", "Agile", "API Integration", "ARIA Semantics", "Responsive Design"],
};

