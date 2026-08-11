import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const tPersonal = useTranslations("personal");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/70 pb-[max(2rem,env(safe-area-inset-bottom))] pt-8">
      <div className="container-page flex flex-col gap-2 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <p className="font-mono text-xs text-muted">
          © {year} {tPersonal("name")}. {t("rights")}
        </p>
        <p className="font-mono text-xs text-muted">
          {t("builtBy")} {tPersonal("name")} · {t("builtWith")}
        </p>
      </div>
    </footer>
  );
}
