"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { flattenProjects } from "@/data/portfolio";

type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  projects: {
    name: string;
    customer?: string;
    teamSize?: string;
    highlights: string[];
  }[];
};

export default function Projects() {
  const t = useTranslations("projects");
  const tRoot = useTranslations();
  const experiences = tRoot.raw("experiences") as ExperienceItem[];
  const projects = flattenProjects(experiences);

  return (
    <section id="projects" className="section-block">
      <div className="container-page">
        <p className="section-eyebrow">{t("title")}</p>
        <h2 className="section-heading">{t("title")}</h2>
        <p className="section-lead">{t("subtitle")}</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="glass-card p-5">
            <h3 className="font-display text-lg font-semibold text-foreground">
              {t("frontEnd")}
            </h3>
            <p className="mt-2 text-sm text-muted">{t("frontEndDesc")}</p>
          </div>
          <div className="glass-card p-5">
            <h3 className="font-display text-lg font-semibold text-foreground">
              {t("delivery")}
            </h3>
            <p className="mt-2 text-sm text-muted">{t("deliveryDesc")}</p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <article
              key={`${project.company}-${project.name}`}
              className="group glass-card overflow-hidden"
            >
              {project.image ? (
                <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-card">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
              ) : null}

              <div className="p-5">
                <p className="font-mono text-[11px] uppercase tracking-wider text-accent">
                  {project.company}
                </p>
                <h3 className="mt-1 font-display text-lg font-semibold text-foreground">
                  {project.name}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted">
                  {project.highlights[0]}
                </p>
                {project.tech.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tech.map((tech) => (
                      <span key={tech} className="tech-chip">
                        {tech}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
