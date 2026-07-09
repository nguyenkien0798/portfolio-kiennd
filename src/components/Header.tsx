"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { navAnchors } from "@/data/portfolio";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const t = useTranslations("nav");
  const tPersonal = useTranslations("personal");
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const brandName = tPersonal("name").split(" ").pop();

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "glass shadow-lg shadow-black/20" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#" className="text-lg font-semibold tracking-tight">
          <span className="text-gradient">{brandName}</span>
          <span className="text-muted">.dev</span>
        </a>

        <div className="hidden items-center gap-6 md:flex">
          <ul className="flex items-center gap-8">
            {navAnchors.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  {t(link.key)}
                </a>
              </li>
            ))}
          </ul>
          <LanguageSwitcher />
          <a
            href="#contact"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-400"
          >
            {t("contactCta")}
          </a>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="glass border-t border-border md:hidden">
          <ul className="flex flex-col gap-1 px-4 py-4">
            {navAnchors.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block rounded-lg px-3 py-2 text-muted transition-colors hover:bg-white/5 hover:text-foreground"
                  onClick={() => setIsOpen(false)}
                >
                  {t(link.key)}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                className="block rounded-lg px-3 py-2 text-accent"
                onClick={() => setIsOpen(false)}
              >
                {t("contactCta")}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
