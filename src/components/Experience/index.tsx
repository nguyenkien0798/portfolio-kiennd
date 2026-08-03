"use client";

import { useTranslations } from "next-intl";
import { experienceTech } from "@/data/portfolio";

type Project = {
  name: string;
  customer?: string;
  teamSize?: string;
  highlights: string[];
};

type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  projects: Project[];
};

export default function Experience() {
  const t = useTranslations("experience");
  const tRoot = useTranslations();
  const experiences = tRoot.raw("experiences") as ExperienceItem[];

  return (
    <section id="experience" className="section-block">
      <div className="container-page">
        <p className="section-eyebrow">{t("title")}</p>
        <h2 className="section-heading">{t("title")}</h2>
        <p className="section-lead">{t("subtitle")}</p>

        <div className="relative mt-12 space-y-8 before:absolute before:bottom-2 before:left-[11px] before:top-2 before:w-px before:bg-border sm:before:left-[15px]">
          {experiences.map((exp, companyIndex) => (
            <article
              key={`${exp.company}-${companyIndex}`}
              className="relative pl-10 sm:pl-12"
            >
              <span className="absolute left-0 top-2 flex h-6 w-6 items-center justify-center rounded-full border border-accent/40 bg-background sm:h-8 sm:w-8">
                <span className="h-2 w-2 rounded-full bg-accent" />
              </span>

              <div className="glass-card p-5 sm:p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {exp.company}
                  </h3>
                  {exp.period ? (
                    <span className="font-mono text-xs text-muted">
                      {exp.period}
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 text-sm font-medium text-accent">{exp.role}</p>

                <ul className="mt-5 space-y-4">
                  {exp.projects.map((project, projectIndex) => {
                    const tech =
                      experienceTech[companyIndex]?.[projectIndex] ?? [];
                    return (
                      <li
                        key={project.name}
                        className="border-t border-border/70 pt-4 first:border-0 first:pt-0"
                      >
                        <h4 className="text-sm font-semibold text-foreground">
                          {project.name}
                        </h4>
                        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
                          {project.customer ? (
                            <span>
                              {t("customer")}: {project.customer}
                            </span>
                          ) : null}
                          {project.teamSize ? (
                            <span>
                              {t("teamSize")}: {project.teamSize}
                            </span>
                          ) : null}
                        </div>
                        <ul className="mt-2 space-y-1.5">
                          {project.highlights.slice(0, 3).map((item) => (
                            <li
                              key={item}
                              className="flex gap-2 text-sm text-muted"
                            >
                              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/70" />
                              {item}
                            </li>
                          ))}
                        </ul>
                        {tech.length > 0 ? (
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {tech.map((item) => (
                              <span key={item} className="tech-chip">
                                {item}
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
