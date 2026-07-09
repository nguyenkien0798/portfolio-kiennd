import { useTranslations } from "next-intl";
import { Github, Mail, MapPin, Phone } from "lucide-react";
import { contactInfo } from "@/data/portfolio";

export default function Hero() {
  const t = useTranslations("hero");
  const tPersonal = useTranslations("personal");

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-grid">
      <div className="glow-orb -left-32 top-1/4 h-96 w-96 bg-indigo-600/20" />
      <div className="glow-orb -right-32 bottom-1/4 h-80 w-80 bg-violet-600/15" />

      <div className="section-padding relative z-10 mx-auto w-full max-w-6xl">
        <div className="animate-fade-in">
          <p className="mb-4 font-mono text-sm text-accent">{t("greeting")}</p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl">
            {tPersonal("name")}
          </h1>
          <h2 className="mb-6 text-2xl font-medium text-gradient sm:text-3xl">
            {tPersonal("title")}
          </h2>
          <p className="mb-8 max-w-2xl text-lg leading-relaxed text-muted">
            {tPersonal("tagline")}
          </p>

          <div className="mb-10 flex flex-wrap gap-4 text-sm text-muted">
            <span className="flex items-center gap-2">
              <MapPin size={16} className="text-accent" />
              {tPersonal("location")}
            </span>
            <span className="flex items-center gap-2">
              <Phone size={16} className="text-accent" />
              {contactInfo.phone}
            </span>
            <span className="flex items-center gap-2">
              <Mail size={16} className="text-accent" />
              {contactInfo.email}
            </span>
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href="#experience"
              className="rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white transition-all hover:bg-indigo-400 hover:shadow-lg hover:shadow-indigo-500/25"
            >
              {t("viewExperience")}
            </a>
            <a
              href={contactInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="glass flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-all hover:border-accent/50 hover:bg-white/5"
            >
              <Github size={18} />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
