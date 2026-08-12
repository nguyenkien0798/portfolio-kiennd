"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  expertiseHighlights,
  expertiseKeys,
} from "@/data/portfolio";
import {
  Code2,
  Layers,
  Gauge,
  Smartphone,
  Workflow,
  Palette,
} from "lucide-react";
import ScrambleText from "@/components/ScrambleText";
import styles from "./Expertise.module.scss";

const icons = {
  uiux: Palette,
  react: Code2,
  state: Workflow,
  api: Layers,
  responsive: Smartphone,
  performance: Gauge,
} as const;

export default function Expertise() {
  const t = useTranslations("expertise");
  const reduceMotion = useReducedMotion();

  return (
    <section id="expertise" className="section-block">
      <div className="container-page">
        <p className="section-eyebrow">{t("title")}</p>
        <ScrambleText text={t("title")} className="section-heading" />
        <p className="section-lead">{t("subtitle")}</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {expertiseKeys.map((key, index) => {
            const Icon = icons[key];
            return (
              <motion.article
                key={key}
                className="glass-card p-5"
                initial={
                  reduceMotion ? false : { opacity: 0, y: 28 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{
                  delay: index * 0.07,
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={
                  reduceMotion
                    ? undefined
                    : { y: -6, transition: { duration: 0.25 } }
                }
              >
                <motion.div
                  className={styles.icon}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : { rotate: [-4, 4, 0], scale: 1.08 }
                  }
                  transition={{ duration: 0.45 }}
                >
                  <Icon size={18} />
                </motion.div>
                <h3 className="font-display text-base font-semibold text-foreground">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {t(`items.${key}.desc`)}
                </p>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-6 space-y-4">
          <motion.div
            className={`glass-card overflow-hidden ${styles.codePanel}`}
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
              <span className="ml-3 font-mono text-xs text-muted">
                {t("codeTitle")}
              </span>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-7 text-light-slate">
              <code>
                <span className="text-muted">{"// keep the UI quick"}</span>
                {"\n"}
                <span className="text-sky-300">import</span> {"{"} motion {"}"}{" "}
                <span className="text-sky-300">from</span>{" "}
                <span className="text-amber-200">&quot;framer-motion&quot;</span>
                ;{"\n\n"}
                <span className="text-sky-300">export function</span>{" "}
                <span className="text-accent">UI</span>() {"{"}
                {"\n"}
                {"  "}
                <span className="text-sky-300">const</span> ready ={" "}
                <span className="text-accent">useReady</span>();{"\n"}
                {"  "}
                <span className="text-sky-300">return</span> (
                {"\n"}
                {"    "}&lt;<span className="text-pink-300">section</span>{" "}
                className=
                <span className="text-amber-200">&quot;responsive&quot;</span>
                &gt;
                {"\n"}
                {"      "}&lt;<span className="text-pink-300">Header</span> /&gt;
                {"\n"}
                {"      "}&lt;<span className="text-pink-300">Motion</span>{" "}
                fadeIn /&gt;
                {"\n"}
                {"      "}&lt;<span className="text-pink-300">Performance</span>{" "}
                lazy /&gt;
                {"\n"}
                {"      "}&lt;<span className="text-pink-300">Accessible</span>{" "}
                /&gt;
                {"\n"}
                {"      "}
                {"{"}ready && &lt;<span className="text-pink-300">CTA</span> /&gt;
                {"}"}
                {"\n"}
                {"    "}&lt;/<span className="text-pink-300">section</span>&gt;
                {"\n"}
                {"  "});{"\n"}
                {"}"}
              </code>
            </pre>
          </motion.div>

          <motion.div
            className="glass-card p-6 sm:p-8"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="font-display text-xl font-semibold text-foreground">
              {t("impactTitle")}
            </h3>
            <p className="mt-3 text-muted">{t("impactDesc")}</p>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {expertiseHighlights.map((key, i) => (
                <motion.li
                  key={key}
                  className="flex items-start gap-3 text-sm text-light-slate"
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {t(`highlights.${key}`)}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
