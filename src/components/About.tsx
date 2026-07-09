import { useTranslations } from "next-intl";
import { SectionTitle } from "./SectionTitle";

export default function About() {
  const t = useTranslations("nav");
  const tAbout = useTranslations("about");
  const tPersonal = useTranslations("personal");

  return (
    <section id="about" className="section-block">
      <SectionTitle title={t("about")} />

      <div className="space-y-4 prose-muted">
        <p>{tPersonal("summary")}</p>
        <p>
          {tAbout("currently")}{" "}
          <strong className="font-medium text-foreground">
            {tPersonal("title")}
          </strong>{" "}
          {tAbout("currentlyAt")}{" "}
          <strong className="font-medium text-foreground">
            {tPersonal("location")}
          </strong>
          .{tAbout("currentlySuffix")}
        </p>
        <p>{tAbout("passion")}</p>
      </div>
    </section>
  );
}
