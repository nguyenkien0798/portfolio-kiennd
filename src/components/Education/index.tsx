"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import ScrambleText from "@/components/ScrambleText";

type EducationItem = {
  school: string;
  degree: string;
  period: string;
};

export default function Education() {
  const t = useTranslations("educationSection");
  const tRoot = useTranslations();
  const items = tRoot.raw("education") as EducationItem[];
  const reduceMotion = useReducedMotion();

  return (
    <section id="education" className="section-block !pt-0">
      <div className="container-page">
        <p className="section-eyebrow">{t("title")}</p>
        <ScrambleText text={t("title")} className="section-heading" />
        <p className="section-lead">{t("subtitle")}</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {items.map((item, index) => (
            <motion.article
              key={item.school}
              className="glass-card p-5 sm:p-6"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={reduceMotion ? undefined : { y: -4 }}
            >
              <p className="font-mono text-xs text-accent">{item.period}</p>
              <h3 className="mt-2 font-display text-lg font-semibold text-foreground">
                {item.school}
              </h3>
              <p className="mt-1 text-sm text-muted">{item.degree}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
