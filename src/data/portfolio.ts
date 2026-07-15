export const contactInfo = {
  phone: "0774041503",
  email: "kiennguyen0798@gmail.com",
  github: "https://github.com/nguyenkien0798",
  githubUsername: "nguyenkien0798",
  facebook: "https://www.facebook.com/",
  linkedin: "https://www.linkedin.com/in/",
  yearsOfExperience: "4+",
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

export const navAnchors = [
  { href: "#about", key: "about" as const, number: "01" },
  { href: "#education", key: "education" as const, number: "02" },
  { href: "#experience", key: "experience" as const, number: "03" },
  { href: "#skills", key: "skills" as const, number: "04" },
];
