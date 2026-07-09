import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const tPersonal = useTranslations("personal");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 pb-8 font-mono text-xs text-muted lg:mt-24">
      <p>
        {t("builtBy")}{" "}
        <span className="text-foreground">{tPersonal("name")}</span>.{" "}
        {t("builtWith")}
      </p>
      <p className="mt-1">© {year}</p>
    </footer>
  );
}
