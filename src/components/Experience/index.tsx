import { useTranslations } from "next-intl";
import { experienceTech } from "@/data/portfolio";
import { SectionTitle } from "@/components/SectionTitle";
import styles from "./Experience.module.scss";
import sectionStyles from "@/components/SectionTitle/Section.module.scss";

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
    <section id="experience" className={sectionStyles.block}>
      <SectionTitle title={t("experience")} />

      <div className={styles.list}>
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
              className={styles.row}
            >
              <div className={styles.date}>{exp.period}</div>

              <div>
                <h3 className={styles.title}>
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
                        <p className={styles.description}>
                          {project.highlights.join(" ")}
                        </p>
                        {(experienceTech[companyIndex]?.[projectIndex] ?? [])
                          .length > 0 && (
                          <ul className={styles.techList}>
                            {(
                              experienceTech[companyIndex]?.[projectIndex] ?? []
                            ).map((tech) => (
                              <li key={tech} className={styles.tag}>
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
                    <p className={styles.description}>
                      {highlights.join(" ")}
                    </p>
                    {techStack.length > 0 && (
                      <ul className={styles.techList}>
                        {techStack.map((tech) => (
                          <li key={tech} className={styles.tag}>
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
