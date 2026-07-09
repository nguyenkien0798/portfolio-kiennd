"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { navAnchors } from "@/data/portfolio";
import { scrollToSection, useActiveSection } from "@/components/ScrollLayout";
import sideNavStyles from "@/components/Sidebar/SideNav.module.scss";

export default function MobileNav() {
  const t = useTranslations("nav");
  const [isOpen, setIsOpen] = useState(false);
  const activeSection = useActiveSection();

  const handleNavClick = (href: string) => {
    scrollToSection(href);
    setIsOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="fixed inset-x-0 top-0 z-50 lg:hidden">
      <div className="flex items-center justify-between border-b border-border/60 bg-background/90 px-6 py-4 backdrop-blur-md">
        <span className="font-mono text-xs uppercase tracking-widest text-foreground">
          {navAnchors.find((l) => l.href === `#${activeSection}`)
            ? t(
                navAnchors.find((l) => l.href === `#${activeSection}`)!
                  .key
              )
            : t("about")}
        </span>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="text-foreground"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <nav
          className="border-b border-border bg-background px-6 py-6"
          aria-label="Mobile navigation"
        >
          <ul>
            {navAnchors.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className={`${sideNavStyles.link} ${
                      isActive ? sideNavStyles.linkActive : ""
                    }`}
                  >
                    <span className={sideNavStyles.line} aria-hidden />
                    <span>{t(link.key)}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </div>
  );
}
