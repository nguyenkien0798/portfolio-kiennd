"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  ChevronDown,
  ExternalLink,
  Moon,
  Orbit,
  Rocket,
  Satellite,
  Telescope,
} from "lucide-react";
import { experienceCompanyUrls, experienceTech } from "@/data/portfolio";
import ScrambleText from "@/components/ScrambleText";
import styles from "./Experience.module.scss";

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

const PREVIEW_COUNT = 3;

const STOP_ICONS = [Orbit, Satellite, Moon, Telescope];

function extractYear(period: string) {
  const match = period.match(/\d{4}/);
  return match ? match[0] : period;
}

function ProjectHighlights({
  highlights,
  showMoreLabel,
  showLessLabel,
}: {
  highlights: string[];
  showMoreLabel: string;
  showLessLabel: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const needsToggle = highlights.length > PREVIEW_COUNT;
  const visible = expanded ? highlights : highlights.slice(0, PREVIEW_COUNT);

  return (
    <div>
      <ul className={styles.highlightList}>
        <AnimatePresence initial={false}>
          {visible.map((item) => (
            <motion.li
              key={item}
              className={styles.highlightItem}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22 }}
            >
              <span className={styles.highlightMark}>-</span>
              {item}
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      {needsToggle ? (
        <button
          type="button"
          className={styles.toggle}
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
        >
          {expanded ? showLessLabel : showMoreLabel}
          <ChevronDown
            size={13}
            className={expanded ? styles.chevronOpen : styles.chevron}
            aria-hidden
          />
        </button>
      ) : null}
    </div>
  );
}

export default function Experience() {
  const t = useTranslations("experience");
  const tRoot = useTranslations();
  const reduceMotion = useReducedMotion();
  const experiences = tRoot.raw("experiences") as ExperienceItem[];

  const jobs = useMemo(
    () => experiences.map((exp, index) => ({ exp, index })),
    [experiences]
  );

  return (
    <section id="experience" className="section-block">
      <div className="container-page">
        <p className="section-eyebrow">{t("title")}</p>
        <ScrambleText text={t("title")} className="section-heading" />
        <p className="section-lead">{t("subtitle")}</p>

        <div className={styles.spineWrap}>
          <span className={styles.glowA} aria-hidden />
          <span className={styles.glowB} aria-hidden />

          <ol className={styles.spine}>
            {jobs.map(({ exp, index }, visualIndex) => {
              const isRight = visualIndex % 2 === 0;
              const tint = visualIndex % 2 === 0 ? "a" : "b";
              const companyUrl = experienceCompanyUrls[index];

              const StopIcon = STOP_ICONS[index % STOP_ICONS.length];
              const bookend = (
                <div className={styles.bookend} data-tint={tint}>
                  <StopIcon size={20} strokeWidth={2.1} aria-hidden />
                </div>
              );

              const content = (
                <motion.article
                  className={styles.content}
                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, x: isRight ? 24 : -24 }
                  }
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    duration: 0.5,
                    delay: visualIndex * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <header className={styles.cardHeader}>
                    <div>
                      <p className={styles.role}>{exp.role}</p>
                      {companyUrl ? (
                        <a
                          href={companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.companyLink}
                        >
                          <h3>{exp.company}</h3>
                          <ExternalLink size={15} aria-hidden />
                        </a>
                      ) : (
                        <h3>{exp.company}</h3>
                      )}
                    </div>
                    <span className={styles.date}>{exp.period}</span>
                  </header>

                  <ul className={styles.projects}>
                    {exp.projects.map((project, projectIndex) => {
                      const tech =
                        experienceTech[index]?.[projectIndex] ?? [];
                      return (
                        <li key={project.name} className={styles.project}>
                          <h4>{project.name}</h4>
                          <div className={styles.meta}>
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
                          <ProjectHighlights
                            highlights={project.highlights}
                            showMoreLabel={t("showMore")}
                            showLessLabel={t("showLess")}
                          />
                          {tech.length > 0 ? (
                            <div className={styles.tech}>
                              {tech.map((item) => (
                                <span key={item} className={styles.techTag}>
                                  {item}
                                </span>
                              ))}
                            </div>
                          ) : null}
                        </li>
                      );
                    })}
                  </ul>
                </motion.article>
              );

              return (
                <li
                  key={`${exp.company}-${index}`}
                  className={styles.row}
                  data-tint={tint}
                >
                  {isRight ? bookend : content}

                  <div className={styles.center}>
                    <span
                      className={`${styles.badge} ${
                        isRight ? styles.badgeRight : styles.badgeLeft
                      }`}
                    >
                      {extractYear(exp.period)}
                    </span>
                  </div>

                  {isRight ? content : bookend}
                </li>
              );
            })}

            <li className={styles.finish} aria-hidden>
              <motion.span
                className={styles.rocket}
                animate={
                  reduceMotion
                    ? undefined
                    : { y: [0, -6, 0], rotate: [-6, -2, -6] }
                }
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Rocket size={21} strokeWidth={2.25} />
              </motion.span>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
