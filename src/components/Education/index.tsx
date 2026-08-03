"use client";

import { useTranslations } from "next-intl";

type EducationItem = {
  school: string;
  degree: string;
  period: string;
};

export default function Education() {
  const t = useTranslations("educationSection");
  const tRoot = useTranslations();
  const items = tRoot.raw("education") as EducationItem[];

  return (
    <section id="education" className="section-block !pt-0">
      <div className="container-page">
        <p className="section-eyebrow">{t("title")}</p>
        <h2 className="section-heading">{t("title")}</h2>
        <p className="section-lead">{t("subtitle")}</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <article key={item.school} className="glass-card p-5 sm:p-6">
              <p className="font-mono text-xs text-accent">{item.period}</p>
              <h3 className="mt-2 font-display text-lg font-semibold text-foreground">
                {item.school}
              </h3>
              <p className="mt-1 text-sm text-muted">{item.degree}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
