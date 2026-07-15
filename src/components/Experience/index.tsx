import { useTranslations } from "next-intl";
import { experienceTech } from "@/data/portfolio";
import { SectionTitle } from "@/components/SectionTitle";
import styles from "./Experience.module.scss";
import sectionStyles from "@/components/SectionTitle/Section.module.scss";

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
  const t = useTranslations("nav");
  const tExp = useTranslations("experience");
  const tRoot = useTranslations();
  const experiences = tRoot.raw("experiences") as ExperienceItem[];

  return (
    <section id="experience" className={sectionStyles.block}>
      <SectionTitle title={t("experience")} />

      <div className={styles.list}>
        {experiences.map((exp, companyIndex) => (
          <article
            key={`${exp.company}-${companyIndex}`}
            className={styles.company}
          >
            <header className={styles.companyHeader}>
              <div className={styles.companyMeta}>
                <h3 className={styles.companyName}>{exp.company}</h3>
                {exp.period ? (
                  <span className={styles.period}>{exp.period}</span>
                ) : null}
              </div>
              <p className={styles.role}>{exp.role}</p>
            </header>

            <div className={styles.projects}>
              {exp.projects.map((project, projectIndex) => {
                const tech =
                  experienceTech[companyIndex]?.[projectIndex] ?? [];

                return (
                  <div key={project.name} className={styles.project}>
                    <h4 className={styles.projectName}>{project.name}</h4>

                    {project.customer ? (
                      <p className={styles.meta}>
                        <span className={styles.metaLabel}>
                          {tExp("customer")}:
                        </span>{" "}
                        {project.customer}
                      </p>
                    ) : null}

                    {project.teamSize ? (
                      <p className={styles.meta}>
                        <span className={styles.metaLabel}>
                          {tExp("teamSize")}:
                        </span>{" "}
                        {project.teamSize}
                      </p>
                    ) : null}

                    <ul className={styles.highlights}>
                      {project.highlights.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>

                    {tech.length > 0 ? (
                      <p className={styles.technologies}>
                        <span className={styles.metaLabel}>
                          {tExp("technologies")}:
                        </span>{" "}
                        {tech.join(", ")}
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
