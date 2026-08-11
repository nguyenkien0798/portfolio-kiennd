"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ExternalLink, Github } from "lucide-react";
import { contactInfo, githubRepos } from "@/data/portfolio";
import ScrambleText from "@/components/ScrambleText";
import Magnetic from "@/components/Magnetic";
import styles from "./GithubActivity.module.scss";

export default function GithubActivity() {
  const t = useTranslations("github");
  const reduceMotion = useReducedMotion();
  const chartUrl = `https://ghchart.rshah.org/7a90ff/${contactInfo.githubUsername}`;

  return (
    <section id="github" className="section-block">
      <div className="container-page">
        <p className="section-eyebrow">{t("title")}</p>
        <ScrambleText text={t("title")} className="section-heading" />
        <p className="section-lead">{t("subtitle")}</p>

        <motion.div
          className={`mt-8 glass-card overflow-hidden ${styles.panel}`}
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="grid gap-6 p-6 sm:grid-cols-[auto_1fr] sm:items-center sm:p-8">
            <motion.div
              className={styles.avatar}
              animate={
                reduceMotion
                  ? undefined
                  : { rotate: [0, -6, 6, 0], scale: [1, 1.04, 1] }
              }
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Github size={28} />
            </motion.div>
            <div>
              <p className="font-display text-xl font-semibold text-foreground">
                @{contactInfo.githubUsername}
              </p>
              <p className="mt-1 text-sm text-muted">{t("stack")}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <span className="tech-chip">{t("focus")}</span>
                <span className="tech-chip">{t("pinned")}</span>
              </div>
            </div>
          </div>

          <div className={styles.chartWrap}>
            <p className={styles.chartLabel}>{t("stars")}</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={chartUrl}
              alt={`${contactInfo.githubUsername} contribution chart`}
              className={styles.chart}
              loading="lazy"
            />
          </div>

          <div className={styles.repos}>
            {githubRepos.map((repo, index) => (
              <motion.article
                key={repo.name}
                className={styles.repoCard}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.4 }}
              >
                <div className={styles.repoTop}>
                  <h3 className={styles.repoName}>{repo.name}</h3>
                  <span className={styles.lang}>{repo.language}</span>
                </div>
                <p className={styles.repoDesc}>{repo.description}</p>
                <div className={styles.repoActions}>
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.repoLink}
                  >
                    {t("viewRepo")}
                    <ExternalLink size={13} aria-hidden />
                  </a>
                  {"homepage" in repo && repo.homepage ? (
                    <a
                      href={repo.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.repoLink}
                    >
                      {t("liveDemo")}
                      <ExternalLink size={13} aria-hidden />
                    </a>
                  ) : null}
                </div>
              </motion.article>
            ))}
          </div>

          <div className="border-t border-border px-6 py-4 sm:px-8">
            <Magnetic strength={0.2}>
              <a
                href={contactInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
              >
                {t("viewProfile")}
                <ExternalLink size={14} />
              </a>
            </Magnetic>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
