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
      className="flex items-center gap-0.5 font-mono text-xs"
      role="group"
      aria-label="Language switcher"
    >
      {routing.locales.map((loc, index) => (
        <span key={loc} className="flex items-center">
          {index > 0 && <span className="mx-0.5 text-border">/</span>}
          <button
            type="button"
            onClick={() => switchLocale(loc)}
            className={`inline-flex min-h-9 min-w-9 items-center justify-center rounded-sm px-1.5 transition-colors ${
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
