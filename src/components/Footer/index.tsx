import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const tPersonal = useTranslations("personal");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10 pb-[max(2rem,env(safe-area-inset-bottom))] font-mono text-xs text-muted sm:mt-12 lg:mt-20">
      <p>
        {t("builtBy")}{" "}
        <span className="text-foreground">{tPersonal("name")}</span>.{" "}
        {t("builtWith")}
      </p>
      <p className="mt-1">© {year}</p>
    </footer>
  );
}
