"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Mail, MapPin, Phone } from "lucide-react";
import { contactInfo } from "@/data/portfolio";
import SocialLinks from "@/components/SocialLinks";
import Magnetic from "@/components/Magnetic";
import ScrambleText from "@/components/ScrambleText";

export default function Contact() {
  const t = useTranslations("contact");
  const tPersonal = useTranslations("personal");
  const reduceMotion = useReducedMotion();

  return (
    <section id="contact" className="section-block">
      <div className="container-page">
        <motion.div
          className="glass-card mx-auto max-w-3xl px-6 py-10 text-center sm:px-10 sm:py-14"
          initial={
            reduceMotion
              ? false
              : { opacity: 0, y: 28 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="section-eyebrow !mb-4">{t("subtitle")}</p>
          <ScrambleText
            text={t("title")}
            className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          />
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
            <Magnetic>
              <a href={`mailto:${contactInfo.email}`} className="btn-primary">
                {t("sayHello")}
              </a>
            </Magnetic>
            <SocialLinks />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
