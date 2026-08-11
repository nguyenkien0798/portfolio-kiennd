export const contactInfo = {
  phone: "0774041503",
  email: "kiennguyen0798@gmail.com",
  github: "https://github.com/nguyenkien0798",
  githubUsername: "nguyenkien0798",
  facebook: "https://www.facebook.com/nguyenkien.0907/",
  linkedin:
    "https://www.linkedin.com/in/nguy%E1%BB%85n-%C4%91%C3%ACnh-ki%C3%AAn-549b29243/",
  yearsOfExperience: "4+",
  cvPath: "/files/cv.pdf",
  whatsapp: "https://wa.me/84774041503",
};

export const skills = [
  { name: "ReactJS", category: "framework" },
  { name: "NextJS", category: "framework" },
  { name: "JavaScript / TypeScript", category: "language" },
  { name: "HTML5 / CSS3", category: "language" },
  { name: "Redux / Redux Saga", category: "state" },
  { name: "RxJS", category: "state" },
  { name: "React Query", category: "state" },
  { name: "RESTful API", category: "api" },
  { name: "GraphQL", category: "api" },
  { name: "Git", category: "tool" },
  { name: "Jira", category: "tool" },
  { name: "Agile / Scrum", category: "tool" },
  { name: "WordPress", category: "tool" },
  { name: "Responsive Design", category: "practice" },
  { name: "Performance Optimization", category: "practice" },
];

export const heroTechStack = [
  "React",
  "Next.js",
  "TypeScript",
  "Redux",
  "React Query",
];

/** Tech stack per company → per project */
export const experienceTech: string[][][] = [
  [
    ["C#", "JavaScript"],
    ["NextJS", "Redux Saga"],
    ["NextJS", "Redux Saga"],
  ],
  [
    ["NextJS", "GraphQL", "React Query"],
    ["ReactJS", "React Query"],
    ["ReactJS", "Redux Saga", "Axios", "Material UI"],
  ],
  [
    ["NextJS", "React Query", "CMS"],
    ["WordPress", "ACF"],
  ],
  [
    ["ReactJS", "RxJS"],
    ["ReactJS", "React Query"],
  ],
];

/** Illustration paths per company → per project */
export const experienceImages: string[][] = [
  [
    "/images/projects/intern_management.png",
    "/images/projects/phone_store.png",
    "/images/projects/car-rent.png",
  ],
  [
    "/images/projects/pgo.png",
    "/images/projects/game-config-admin.png",
    "/images/projects/papahub.png",
  ],
  ["/images/projects/sst.png", "/images/projects/aither.png"],
  ["/images/projects/procuva.png", "/images/projects/dttg.png"],
];

/** Company website URLs aligned with experiences[] order */
export const experienceCompanyUrls: (string | null)[] = [
  "https://github.com/nguyenkien0798",
  "https://papagroup.net/vi",
  "https://est-rouge.com/en",
  "https://fpt-is.com/",
];
export type ProjectLink = {
  live?: string;
  repo?: string;
  featured?: boolean;
};

export const experienceLinks: (ProjectLink | null)[][] = [
  [
    null,
    {
      repo: "https://github.com/nguyenkien0798/phone-app",
      featured: true,
    },
    {
      repo: "https://github.com/nguyenkien0798/car-rent",
      featured: true,
    },
  ],
  [{ featured: true }, null, { featured: true }],
  [{ featured: true }, { featured: true }],
  [{ featured: true }, { featured: true }],
];

export const githubRepos = [
  {
    name: "portfolio-kiennd",
    url: "https://github.com/nguyenkien0798/portfolio-kiennd",
    homepage: "https://portfolio-kiennd.vercel.app",
    description: "Personal portfolio — Next.js, TypeScript, Framer Motion",
    language: "TypeScript",
  },
  {
    name: "car-rent",
    url: "https://github.com/nguyenkien0798/car-rent",
    description: "Car rental web app with booking and PayPal flow",
    language: "JavaScript",
  },
  {
    name: "phone-app",
    url: "https://github.com/nguyenkien0798/phone-app",
    description: "Phone store e-commerce frontend with Redux Saga",
    language: "JavaScript",
  },
  {
    name: "pagetekup",
    url: "https://github.com/nguyenkien0798/pagetekup",
    description: "UI practice and landing page experiments",
    language: "HTML",
  },
] as const;

export const expertiseKeys = [
  "uiux",
  "react",
  "state",
  "api",
  "responsive",
  "performance",
] as const;

export const expertiseHighlights = [
  "interactive",
  "animations",
  "architecture",
  "pwa",
  "seo",
] as const;

export const navAnchors = [
  { href: "#home", key: "home" as const },
  { href: "#projects", key: "projects" as const },
  { href: "#expertise", key: "expertise" as const },
  { href: "#experience", key: "experience" as const },
  { href: "#contact", key: "contact" as const },
];

export type FlatProject = {
  name: string;
  company: string;
  companyUrl?: string;
  customer?: string;
  teamSize?: string;
  highlights: string[];
  tech: string[];
  image?: string;
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
};

type ExperienceProject = {
  name: string;
  customer?: string;
  teamSize?: string;
  highlights: string[];
};

type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  projects: ExperienceProject[];
};

export function flattenProjects(
  experiences: ExperienceItem[]
): FlatProject[] {
  return experiences.flatMap((exp, companyIndex) =>
    exp.projects.map((project, projectIndex) => {
      const links = experienceLinks[companyIndex]?.[projectIndex];
      return {
        name: project.name,
        company: exp.company,
        companyUrl: experienceCompanyUrls[companyIndex] ?? undefined,
        customer: project.customer,
        teamSize: project.teamSize,
        highlights: project.highlights,
        tech: experienceTech[companyIndex]?.[projectIndex] ?? [],
        image: experienceImages[companyIndex]?.[projectIndex],
        liveUrl: links?.live,
        repoUrl: links?.repo,
        featured: links?.featured ?? false,
      };
    })
  );
}

/** Featured projects for the slider (newest companies first). */
export function flattenFeaturedProjects(
  experiences: ExperienceItem[]
): FlatProject[] {
  const featured = flattenProjects(experiences).filter((p) => p.featured);
  return featured.length > 0 ? featured.reverse() : flattenProjects(experiences);
}
