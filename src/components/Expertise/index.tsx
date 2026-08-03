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

  return (
    <section id="expertise" className="section-block">
      <div className="container-page">
        <p className="section-eyebrow">{t("title")}</p>
        <h2 className="section-heading">{t("title")}</h2>
        <p className="section-lead">{t("subtitle")}</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {expertiseKeys.map((key) => {
            const Icon = icons[key];
            return (
              <article key={key} className="glass-card p-5">
                <div className="mb-4 inline-flex rounded-lg border border-accent/20 bg-accent/10 p-2.5 text-accent">
                  <Icon size={18} />
                </div>
                <h3 className="font-display text-base font-semibold text-foreground">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {t(`items.${key}.desc`)}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-10 grid items-start gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="glass-card p-6 sm:p-8">
            <h3 className="font-display text-xl font-semibold text-foreground">
              {t("impactTitle")}
            </h3>
            <p className="mt-3 text-muted">{t("impactDesc")}</p>
            <ul className="mt-6 space-y-3">
              {expertiseHighlights.map((key) => (
                <li
                  key={key}
                  className="flex items-start gap-3 text-sm text-light-slate"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {t(`highlights.${key}`)}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card overflow-hidden">
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
                <span className="text-muted">{"// polished, fast UI"}</span>
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
          </div>
        </div>
      </div>
    </section>
  );
}
