"use client";

import { useTranslations } from "next-intl";
import { Github, Mail, MapPin, Phone } from "lucide-react";
import { contactInfo, navAnchors } from "@/data/portfolio";
import { scrollToSection, useActiveSection } from "./ScrollLayout";

export default function Sidebar() {
  const t = useTranslations("nav");
  const tPersonal = useTranslations("personal");
  const activeSection = useActiveSection();

  return (
    <aside className="layout-sidebar" aria-label="Profile sidebar">
      <div className="layout-sidebar-inner">
        <div className="layout-sidebar-top">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground xl:text-4xl 2xl:text-5xl">
            {tPersonal("name")}
          </h1>
          <h2 className="mt-2 text-base font-medium text-foreground xl:mt-3 xl:text-lg">
            {tPersonal("title")}
          </h2>

          <ul className="sidebar-personal-info">
            <li>
              <MapPin size={14} className="shrink-0 text-accent" aria-hidden />
              <span>{tPersonal("location")}</span>
            </li>
            <li>
              <Phone size={14} className="shrink-0 text-accent" aria-hidden />
              <span>{contactInfo.phone}</span>
            </li>
            <li>
              <Mail size={14} className="shrink-0 text-accent" aria-hidden />
              <span>{contactInfo.email}</span>
            </li>
            <li>
              <Github size={14} className="shrink-0 text-accent" aria-hidden />
              <a
                href={contactInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="sidebar-personal-link"
              >
                {contactInfo.githubUsername}
              </a>
            </li>
          </ul>

          <nav className="mt-8 xl:mt-10" aria-label="Main navigation">
            <ul>
              {navAnchors.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className={`side-nav-link ${
                        isActive ? "side-nav-link-active" : ""
                      }`}
                    >
                      <span className="side-nav-line" aria-hidden />
                      <span>{t(link.key)}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </aside>
  );
}
