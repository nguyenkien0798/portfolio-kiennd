"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ExternalLink, Github } from "lucide-react";
import { flattenFeaturedProjects } from "@/data/portfolio";
import ScrambleText from "@/components/ScrambleText";
import styles from "./Projects.module.scss";

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

const AUTOPLAY_MS = 5000;
const SWIPE_THRESHOLD = 48;
const VISIBLE_RANGE = 2;

function getCircularOffset(index: number, active: number, total: number) {
  let diff = index - active;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
}

function coverTransform(offset: number, reduceMotion: boolean | null) {
  const abs = Math.abs(offset);

  if (reduceMotion) {
    return {
      x: offset * 230,
      scale: offset === 0 ? 1 : 0.88,
      opacity: abs > VISIBLE_RANGE ? 0 : offset === 0 ? 1 : 0.55,
      zIndex: 20 - abs,
      rotateY: 0,
      filter: abs === 0 ? "brightness(1)" : "brightness(0.72)",
    };
  }

  return {
    x: offset * 210,
    rotateY: offset * -38,
    scale: Math.max(0.74, 1 - abs * 0.11),
    z: -abs * 140,
    opacity: abs > VISIBLE_RANGE ? 0 : Math.max(0.4, 1 - abs * 0.25),
    zIndex: 20 - abs,
    filter:
      abs === 0
        ? "brightness(1)"
        : `brightness(${Math.max(0.55, 1 - abs * 0.18)})`,
  };
}

export default function Projects() {
  const t = useTranslations("projects");
  const tExp = useTranslations("experience");
  const tRoot = useTranslations();
  const reduceMotion = useReducedMotion();

  const experiences = tRoot.raw("experiences") as ExperienceItem[];
  const projects = flattenFeaturedProjects(experiences);
  const total = projects.length;

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const dragStartX = useRef<number | null>(null);
  const didDrag = useRef(false);

  const goTo = useCallback(
    (next: number) => {
      if (total === 0) return;
      setIndex(((next % total) + total) % total);
    },
    [total]
  );

  useEffect(() => {
    if (reduceMotion || paused || total < 2) return;

    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(id);
  }, [paused, reduceMotion, total, index]);

  const onKeyDown = (event: ReactKeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(index - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(index + 1);
    }
  };

  const onPointerDown = (event: ReactPointerEvent) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    dragStartX.current = event.clientX;
    didDrag.current = false;
  };

  const onPointerMove = (event: ReactPointerEvent) => {
    if (dragStartX.current == null) return;
    if (Math.abs(event.clientX - dragStartX.current) > SWIPE_THRESHOLD) {
      didDrag.current = true;
    }
  };

  const onPointerUp = (event: ReactPointerEvent) => {
    if (dragStartX.current == null) return;
    const delta = event.clientX - dragStartX.current;
    dragStartX.current = null;
    if (Math.abs(delta) < SWIPE_THRESHOLD) return;
    didDrag.current = true;
    if (delta < 0) goTo(index + 1);
    else goTo(index - 1);
  };

  const onStageClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (didDrag.current) {
      didDrag.current = false;
      return;
    }
    const target = event.target as HTMLElement;
    if (target.closest("a")) return;
    if (target.closest(`.${styles.card}:not(.${styles.cardActive})`)) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = (event.clientX - rect.left) / rect.width;
    if (ratio < 0.4) goTo(index - 1);
    else if (ratio > 0.6) goTo(index + 1);
  };

  if (total === 0) return null;

  const activeProject = projects[index];

  return (
    <section id="projects" className="section-block">
      <div className="container-page">
        <p className="section-eyebrow">{t("title")}</p>
        <ScrambleText text={t("title")} className="section-heading" />
        <p className="section-lead">{t("subtitle")}</p>

        <div
          className={styles.slider}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
              setPaused(false);
            }
          }}
        >
          <div
            className={styles.stage}
            tabIndex={0}
            onKeyDown={onKeyDown}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={() => {
              dragStartX.current = null;
            }}
            onClick={onStageClick}
            role="region"
            aria-roledescription="carousel"
            aria-label={t("title")}
          >
            <p className="sr-only" aria-live="polite">
              {t("slideOf", {
                current: index + 1,
                total,
              })}
              {activeProject ? `: ${activeProject.name}` : ""}
            </p>

            <div className={styles.scene}>
              {projects.map((project, i) => {
                const offset = getCircularOffset(i, index, total);
                const abs = Math.abs(offset);
                const active = offset === 0;
                const hidden = abs > VISIBLE_RANGE;
                const transform = coverTransform(offset, reduceMotion);

                return (
                  <motion.article
                    key={`${project.company}-${project.name}`}
                    className={`${styles.card} ${active ? styles.cardActive : ""}`}
                    style={{ zIndex: transform.zIndex }}
                    animate={transform}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 28,
                      mass: 0.85,
                    }}
                    aria-hidden={hidden || undefined}
                    aria-current={active ? "true" : undefined}
                    onClick={(event) => {
                      if (active || hidden) return;
                      event.stopPropagation();
                      goTo(i);
                    }}
                  >
                    <div className={styles.cardMedia}>
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={project.name}
                          fill
                          sizes="(max-width: 768px) 70vw, 320px"
                          className={styles.cardImage}
                          priority={i === 0}
                          draggable={false}
                        />
                      ) : null}
                      <div className={styles.cardTags}>
                        {project.companyUrl ? (
                          <a
                            href={project.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.tag}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {project.company}
                          </a>
                        ) : (
                          <span className={styles.tag}>{project.company}</span>
                        )}
                        {project.tech.slice(0, 2).map((tech) => (
                          <span key={tech} className={styles.tagMuted}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className={styles.cardBody}>
                      <h3 className={styles.cardTitle}>{project.name}</h3>
                      <p className={styles.cardDesc}>{project.highlights[0]}</p>

                      {(project.customer || project.teamSize) && (
                        <div className={styles.cardMeta}>
                          {project.customer ? (
                            <span>
                              {tExp("customer")}: {project.customer}
                            </span>
                          ) : null}
                          {project.teamSize ? (
                            <span>
                              {tExp("teamSize")}: {project.teamSize}
                            </span>
                          ) : null}
                        </div>
                      )}

                      {active && (project.liveUrl || project.repoUrl) ? (
                        <div className={styles.cardActions}>
                          {project.liveUrl ? (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.action}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink size={14} aria-hidden />
                              {t("viewLive")}
                            </a>
                          ) : null}
                          {project.repoUrl ? (
                            <a
                              href={project.repoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`${styles.action} ${styles.actionGhost}`}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Github size={14} aria-hidden />
                              {t("viewCode")}
                            </a>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
