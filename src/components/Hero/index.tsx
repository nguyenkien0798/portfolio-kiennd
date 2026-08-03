"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Download, Mail, Plus, X } from "lucide-react";
import { contactInfo, heroTechStack, skills } from "@/data/portfolio";
import SocialLinks from "@/components/SocialLinks";
import ProfessionalBadge from "./ProfessionalBadge";
import styles from "./Hero.module.scss";

function highlightCode(code: string) {
  return code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(
      /(\/\/.*)/g,
      '<span class="code-comment">$1</span>'
    )
    .replace(
      /\b(const|return)\b/g,
      '<span class="code-keyword">$1</span>'
    )
    .replace(
      /\b(developer|createUI|polishedAndFast|idea)\b/g,
      '<span class="code-fn">$1</span>'
    )
    .replace(
      /('(?:\\.|[^'\\])*')/g,
      '<span class="code-string">$1</span>'
    );
}

export default function Hero() {
  const t = useTranslations("hero");
  const tPersonal = useTranslations("personal");
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
    () => `// Front-end engineer with product focus
const developer = {
  name: '${personalName}',
  skills: {
    frontend: ['React', 'Next.js', 'TypeScript'],
    state: ['Redux', 'React Query', 'RxJS'],
    api: ['REST', 'GraphQL']
  },
  createUI: (idea) => polishedAndFast(idea)
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

    gsap.to(el.children, {
      opacity: 1,
      y: 0,
      stagger: 0.055,
      duration: 0.45,
      ease: "power2.out",
      delay: 0.35,
    });
  }, [displayName]);

  useEffect(() => {
    const el = codeRef.current;
    if (!el) return;

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
  }, [codeText, highlighted]);

  return (
    <section id="home" className={styles.hero}>
      <div className={`container-page ${styles.grid}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className={styles.copy}
        >
          <div className={styles.badgeWrap}>
            <ProfessionalBadge text={t("role")} />
          </div>

          <h1 ref={titleRef} className={styles.title}>
            {displayName}
          </h1>

          <p className={styles.lead}>
            {t.rich("lead", {
              highlight: (chunks) => (
                <span className={styles.highlight}>{chunks}</span>
              ),
            })}
          </p>

          <div className={styles.actions}>
            <a href="#contact" className="btn-primary">
              <Mail size={16} />
              {t("contactMe")}
            </a>
            <a href={contactInfo.cvPath} download className={styles.cvBtn}>
              <Download size={16} />
              {t("downloadCv")}
            </a>
          </div>

          <div className={styles.tech}>
            <div className={styles.techHead}>
              <p className={styles.techLabel}>{t("techStack")}</p>
              {expanded ? (
                <button
                  type="button"
                  onClick={() => setExpanded(false)}
                  className={styles.iconBtn}
                  aria-label="Collapse tech stack"
                >
                  <X size={14} />
                </button>
              ) : null}
            </div>

            <div className={styles.techList}>
              {featured.map((tech) => (
                <span key={tech} className="tech-chip">
                  {tech}
                </span>
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

              {expanded
                ? extraSkills.slice(0, 12).map((tech) => (
                    <span key={tech} className="tech-chip">
                      {tech}
                    </span>
                  ))
                : null}
            </div>
          </div>

          <div className={styles.socials}>
            <SocialLinks />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.15 }}
          className={styles.visual}
        >
          <p className={styles.watermark} aria-hidden>
            <span>SOFTWARE</span>
            <span>ENGINEER</span>
          </p>

          <motion.div
            animate={{ y: [0, -18, 0] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
            className={styles.portraitWrap}
          >
            <Image
              src="/images/hero-portrait-v4.png"
              alt={personalName}
              width={520}
              height={640}
              priority
              className={styles.portrait}
            />

            <div className={styles.codeWindow}>
              <div className={styles.codeBar}>
                <span className={styles.dotRed} />
                <span className={styles.dotYellow} />
                <span className={styles.dotGreen} />
              </div>
              <pre className={styles.codeBody}>
                <code ref={codeRef}>{t("codeLoading")}</code>
              </pre>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
