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
      <ul className="mt-2 space-y-1.5">
        <AnimatePresence initial={false}>
          {visible.map((item) => (
            <motion.li
              key={item}
              className="flex gap-2 text-sm text-muted"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
            >
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/70" />
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
    offset: ["start 0.75", "end 0.35"],
  });
  const lineProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
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
              style={{
                scaleY: reduceMotion ? 1 : lineProgress,
              }}
            />
          </div>

          <div className="space-y-8">
            {experiences.map((exp, companyIndex) => (
              <motion.article
                key={`${exp.company}-${companyIndex}`}
                className={styles.item}
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, y: 28 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.65,
                  delay: companyIndex * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <motion.span
                  className={styles.dot}
                  initial={reduceMotion ? false : { scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 320, damping: 18 }}
                >
                  <span />
                </motion.span>

                <div className={`glass-card p-5 sm:p-6 ${styles.card}`}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    {experienceCompanyUrls[companyIndex] ? (
                      <a
                        href={experienceCompanyUrls[companyIndex]!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.companyLink}
                      >
                        <h3 className="font-display text-xl font-semibold text-foreground">
                          {exp.company}
                        </h3>
                        <ExternalLink size={14} aria-hidden />
                      </a>
                    ) : (
                      <h3 className="font-display text-xl font-semibold text-foreground">
                        {exp.company}
                      </h3>
                    )}
                    {exp.period ? (
                      <span className="font-mono text-xs text-muted">
                        {exp.period}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-sm font-medium text-accent">
                    {exp.role}
                  </p>

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
                          <ProjectHighlights
                            highlights={project.highlights}
                            showMoreLabel={t("showMore")}
                            showLessLabel={t("showLess")}
                          />
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
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
