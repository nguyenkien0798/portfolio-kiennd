"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { Download, Mail, Plus, X } from "lucide-react";
import { contactInfo, heroTechStack, skills } from "@/data/portfolio";
import SocialLinks from "@/components/SocialLinks";
import Magnetic from "@/components/Magnetic";
import ProfessionalBadge from "./ProfessionalBadge";
import styles from "./Hero.module.scss";

function highlightCode(code: string) {
  if (!code) return "";
  return code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/(\/\/.*)/g, '<span class="code-comment">$1</span>')
    .replace(/\b(const|return)\b/g, '<span class="code-keyword">$1</span>')
    .replace(
      /\b(developer|createUI|ship|idea)\b/g,
      '<span class="code-fn">$1</span>'
    )
    .replace(/('(?:\\.|[^'\\])*')/g, '<span class="code-string">$1</span>');
}

export default function Hero() {
  const t = useTranslations("hero");
  const tPersonal = useTranslations("personal");
  const reduceMotion = useReducedMotion();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const codeRef = useRef<HTMLElement>(null);
  const [expanded, setExpanded] = useState(false);

  const displayName = t("displayName");
  const personalName = tPersonal("name");
  const featured = heroTechStack;
  const moreCount = Math.max(skills.length - featured.length, 0);
  const extraSkills = skills
    .map((item) => item.name)
    .filter(
      (name) =>
        !featured.some((tech) =>
          name.toLowerCase().includes(tech.toLowerCase().replace(".", ""))
        )
    );

  const codeText = useMemo(
    () => `// Frontend. Mostly product UI.
const developer = {
  name: '${personalName}',
  skills: {
    frontend: ['React', 'Next.js', 'TypeScript'],
    state: ['Redux', 'React Query', 'RxJS'],
    api: ['REST', 'GraphQL']
  },
  createUI: (idea) => ship(idea)
};`,
    [personalName]
  );

  const highlighted = useMemo(() => highlightCode(codeText), [codeText]);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;

    const letters = displayName.split("");
    el.innerHTML = "";
    letters.forEach((letter) => {
      const span = document.createElement("span");
      span.textContent = letter === " " ? "\u00A0" : letter;
      span.style.opacity = "0";
      span.style.display = "inline-block";
      span.style.transform = "translateY(18px)";
      el.appendChild(span);
    });

    if (reduceMotion) {
      gsap.set(el.children, { opacity: 1, y: 0 });
      return;
    }

    gsap.to(el.children, {
      opacity: 1,
      y: 0,
      stagger: 0.045,
      duration: 0.5,
      ease: "power3.out",
      delay: 0.25,
    });
  }, [displayName, reduceMotion]);

  useEffect(() => {
    const el = codeRef.current;
    if (!el) return;

    if (reduceMotion) {
      el.innerHTML = highlighted;
      return;
    }

    const tween = gsap.to(
      {},
      {
        duration: 5.5,
        delay: 0.9,
        ease: "power1.inOut",
        onUpdate() {
          const len = Math.floor(tween.progress() * codeText.length);
          el.textContent = codeText.slice(0, len);
        },
        onComplete() {
          el.innerHTML = highlighted;
        },
      }
    );

    return () => {
      tween.kill();
    };
  }, [codeText, highlighted, reduceMotion]);

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.orbA} aria-hidden />
      <div className={styles.orbB} aria-hidden />
      <div className={styles.gridLines} aria-hidden />

      <div className={`container-page ${styles.grid}`}>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className={styles.copy}
        >
          <div className={styles.badgeWrap}>
            <ProfessionalBadge text={t("role")} />
          </div>

          <h1 ref={titleRef} className={styles.title}>
            {displayName}
          </h1>

          <motion.p
            className={styles.lead}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
          >
            {t.rich("lead", {
              highlight: (chunks) => (
                <span className={styles.highlight}>{chunks}</span>
              ),
            })}
          </motion.p>

          <motion.div
            className={styles.actions}
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.55 }}
          >
            <Magnetic>
              <a href="#contact" className="btn-primary">
                <Mail size={16} />
                {t("contactMe")}
              </a>
            </Magnetic>
            <Magnetic>
              <a href={contactInfo.cvPath} download className={styles.cvBtn}>
                <Download size={16} />
                {t("downloadCv")}
              </a>
            </Magnetic>
          </motion.div>

          <motion.div
            className={styles.tech}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.68, duration: 0.55 }}
          >
            <div className={styles.techHead}>
              <p className={styles.techLabel}>{t("techStack")}</p>
              {expanded ? (
                <button
                  type="button"
                  onClick={() => setExpanded(false)}
                  className={styles.iconBtn}
                  aria-label={t("collapseTech")}
                >
                  <X size={14} />
                </button>
              ) : null}
            </div>

            <div className={styles.techList}>
              {featured.map((tech, i) => (
                <motion.span
                  key={tech}
                  className="tech-chip"
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.75 + i * 0.06, duration: 0.35 }}
                >
                  {tech}
                </motion.span>
              ))}

              {!expanded && moreCount > 0 ? (
                <button
                  type="button"
                  onClick={() => setExpanded(true)}
                  className={styles.moreBtn}
                >
                  <Plus size={12} />
                  {t("moreTech", { count: moreCount })}
                </button>
              ) : null}

              <AnimatePresence>
                {expanded
                  ? extraSkills.slice(0, 12).map((tech, i) => (
                      <motion.span
                        key={tech}
                        className="tech-chip"
                        initial={{ opacity: 0, scale: 0.8, y: 6 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ delay: i * 0.03, duration: 0.25 }}
                      >
                        {tech}
                      </motion.span>
                    ))
                  : null}
              </AnimatePresence>
            </div>
          </motion.div>

          <div className={styles.socials}>
            <SocialLinks />
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className={styles.visual}
        >
          <div className={styles.watermarkAnchor} aria-hidden>
            <p className={styles.watermark}>
              <span>SOFTWARE</span>
              <span>ENGINEER</span>
            </p>
          </div>

          <div className={styles.portraitWrap}>
            <div
              className={`${styles.portraitFloat} ${
                reduceMotion ? "" : styles.portraitFloatAnim
              }`}
            >
              {/* Native img avoids Next/Image wrapper that can paint an opaque box */}
              <img
                src="/images/hero-portrait.png"
                alt={personalName}
                width={520}
                height={640}
                className={styles.portrait}
                decoding="async"
                fetchPriority="high"
                draggable={false}
              />

              <motion.div
                className={styles.codeWindow}
                initial={
                  reduceMotion ? false : { opacity: 0, y: 24, rotate: -1.5 }
                }
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{
                  delay: 0.85,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className={styles.codeBar}>
                  <span className={styles.dotRed} />
                  <span className={styles.dotYellow} />
                  <span className={styles.dotGreen} />
                </div>
                <pre className={styles.codeBody}>
                  <code ref={codeRef}>{t("codeLoading")}</code>
                </pre>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
