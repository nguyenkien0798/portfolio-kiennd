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
      className="flex items-center gap-1 rounded-full border border-border bg-card/60 p-1 font-mono text-xs"
      role="group"
      aria-label="Language switcher"
    >
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => switchLocale(loc)}
          className={`inline-flex min-h-8 min-w-8 items-center justify-center rounded-full px-2.5 transition-all ${
            locale === loc
              ? "bg-accent text-background shadow-[0_0_12px_rgba(122,144,255,0.35)]"
              : "text-muted hover:bg-white/5 hover:text-accent"
          }`}
          aria-pressed={locale === loc}
        >
          {localeLabels[loc]}
        </button>
      ))}
    </div>
  );
}
