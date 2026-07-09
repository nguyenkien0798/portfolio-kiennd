import { useTranslations } from "next-intl";
import { experienceTech } from "@/data/portfolio";
import { SectionTitle } from "./SectionTitle";

type Project = {
  name: string;
  highlights: string[];
};

type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  projects: Project[];
};

export default function Experience() {
  const t = useTranslations("nav");
  const tRoot = useTranslations();
  const experiences = tRoot.raw("experiences") as ExperienceItem[];

  return (
    <section id="experience" className="section-block">
      <SectionTitle title={t("experience")} />

      <div className="experience-list">
        {experiences.map((exp, companyIndex) => {
          const highlights = exp.projects.flatMap((project) => project.highlights);
          const techStack = [
            ...new Set(
              exp.projects.flatMap(
                (_, projectIndex) =>
                  experienceTech[companyIndex]?.[projectIndex] ?? []
              )
            ),
          ];

          return (
            <article
              key={`${exp.company}-${companyIndex}`}
              className="experience-row"
            >
              <div className="experience-date">{exp.period}</div>

              <div className="experience-content">
                <h3 className="experience-title">
                  <span>{exp.role}</span>
                  <span className="text-muted"> · </span>
                  <span>{exp.company}</span>
                </h3>

                {exp.projects.length > 1 ? (
                  <div className="space-y-6">
                    {exp.projects.map((project, projectIndex) => (
                      <div key={project.name}>
                        <h4 className="mb-2 text-sm font-medium text-foreground">
                          {project.name}
                        </h4>
                        <p className="experience-description">
                          {project.highlights.join(" ")}
                        </p>
                        {(experienceTech[companyIndex]?.[projectIndex] ?? [])
                          .length > 0 && (
                          <ul className="experience-tech">
                            {(
                              experienceTech[companyIndex]?.[projectIndex] ?? []
                            ).map((tech) => (
                              <li key={tech} className="tech-tag">
                                {tech}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <p className="experience-description">
                      {highlights.join(" ")}
                    </p>
                    {techStack.length > 0 && (
                      <ul className="experience-tech">
                        {techStack.map((tech) => (
                          <li key={tech} className="tech-tag">
                            {tech}
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
