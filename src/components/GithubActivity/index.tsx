import { useTranslations } from "next-intl";
import { Github, ExternalLink } from "lucide-react";
import { contactInfo } from "@/data/portfolio";

export default function GithubActivity() {
  const t = useTranslations("github");

  return (
    <section id="github" className="section-block">
      <div className="container-page">
        <p className="section-eyebrow">{t("title")}</p>
        <h2 className="section-heading">{t("title")}</h2>
        <p className="section-lead">{t("subtitle")}</p>

        <div className="mt-8 glass-card overflow-hidden">
          <div className="grid gap-6 p-6 sm:grid-cols-[auto_1fr] sm:items-center sm:p-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-accent/25 bg-accent/10 text-accent">
              <Github size={28} />
            </div>
            <div>
              <p className="font-display text-xl font-semibold text-foreground">
                @{contactInfo.githubUsername}
              </p>
              <p className="mt-1 text-sm text-muted">{t("stack")}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <span className="tech-chip">{t("focus")}</span>
                <span className="tech-chip">{t("repos")}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-border px-6 py-4 sm:px-8">
            <a
              href={contactInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
            >
              {t("viewProfile")}
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
