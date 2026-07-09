"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

const localeLabels: Record<Locale, string> = {
  en: "EN",
  vi: "VI",
};

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (nextLocale: Locale) => {
    if (nextLocale === locale) return;
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <div
      className="ml-auto flex items-center gap-1 font-mono text-xs lg:ml-0"
      role="group"
      aria-label="Language switcher"
    >
      {routing.locales.map((loc, index) => (
        <span key={loc} className="flex items-center">
          {index > 0 && <span className="mx-1 text-border">/</span>}
          <button
            type="button"
            onClick={() => switchLocale(loc)}
            className={`transition-colors ${
              locale === loc
                ? "text-accent"
                : "text-muted hover:text-accent"
            }`}
            aria-pressed={locale === loc}
          >
            {localeLabels[loc]}
          </button>
        </span>
      ))}
    </div>
  );
}
