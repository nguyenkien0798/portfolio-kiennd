"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { useTranslations } from "next-intl";
import { ChevronDown, ExternalLink } from "lucide-react";
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
              transition={{ duration: 0.25 }}
            >
              <span className={styles.highlightDot} aria-hidden />
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
            size={14}
            className={expanded ? styles.toggleIconOpen : styles.toggleIcon}
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
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.8", "end 0.35"],
  });
  const lineProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
  });

  return (
    <section id="experience" className="section-block">
      <div className="container-page">
        <p className="section-eyebrow">{t("title")}</p>
        <ScrambleText text={t("title")} className="section-heading" />
        <p className="section-lead">{t("subtitle")}</p>

        <div ref={trackRef} className={styles.track}>
          <div className={styles.line} aria-hidden>
            <motion.span
              className={styles.lineFill}
              style={{ scaleY: reduceMotion ? 1 : lineProgress }}
            />
          </div>

          <ol className={styles.list}>
            {experiences.map((exp, companyIndex) => {
              const companyUrl = experienceCompanyUrls[companyIndex];
              const periodLabel = exp.period || t("ongoing");

              return (
                <motion.li
                  key={`${exp.company}-${companyIndex}`}
                  className={styles.item}
                  initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.55,
                    delay: companyIndex * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className={styles.periodCol}>
                    <span className={styles.period}>{periodLabel}</span>
                  </div>

                  <motion.span
                    className={styles.dot}
                    initial={reduceMotion ? false : { scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 340, damping: 16 }}
                    aria-hidden
                  >
                    <span className={styles.dotCore} />
                    <span className={styles.dotRing} />
                  </motion.span>

                  <article className={styles.card}>
                    <header className={styles.cardHeader}>
                      <div className={styles.cardTitleBlock}>
                        {companyUrl ? (
                          <a
                            href={companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.companyLink}
                          >
                            <h3>{exp.company}</h3>
                            <ExternalLink size={14} aria-hidden />
                          </a>
                        ) : (
                          <h3>{exp.company}</h3>
                        )}
                        <p className={styles.role}>{exp.role}</p>
                      </div>
                      <span className={styles.periodMobile}>{periodLabel}</span>
                    </header>

                    <ul className={styles.projects}>
                      {exp.projects.map((project, projectIndex) => {
                        const tech =
                          experienceTech[companyIndex]?.[projectIndex] ?? [];
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
                  </article>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
