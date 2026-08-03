import { useTranslations } from "next-intl";
import { Mail, MapPin, Phone } from "lucide-react";
import { contactInfo } from "@/data/portfolio";
import SocialLinks from "@/components/SocialLinks";

export default function Contact() {
  const t = useTranslations("contact");
  const tPersonal = useTranslations("personal");

  return (
    <section id="contact" className="section-block">
      <div className="container-page">
        <div className="glass-card mx-auto max-w-3xl px-6 py-10 text-center sm:px-10 sm:py-14">
          <p className="section-eyebrow !mb-4">{t("subtitle")}</p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">{t("description")}</p>

          <div className="mt-8 flex flex-col items-center gap-3 text-sm text-light-slate sm:flex-row sm:justify-center sm:gap-6">
            <a
              href={`mailto:${contactInfo.email}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-accent"
            >
              <Mail size={16} className="text-accent" />
              {contactInfo.email}
            </a>
            <a
              href={`tel:${contactInfo.phone}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-accent"
            >
              <Phone size={16} className="text-accent" />
              {contactInfo.phone}
            </a>
            <span className="inline-flex items-center gap-2">
              <MapPin size={16} className="text-accent" />
              {tPersonal("location")}
            </span>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${contactInfo.email}`}
              className="btn-primary"
            >
              {t("sayHello")}
            </a>
            <SocialLinks />
          </div>
        </div>
      </div>
    </section>
  );
}
