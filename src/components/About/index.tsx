import { useTranslations } from "next-intl";
import { SectionTitle } from "@/components/SectionTitle";
import aboutStyles from "./About.module.scss";
import sectionStyles from "@/components/SectionTitle/Section.module.scss";

export default function About() {
  const t = useTranslations("nav");
  const tAbout = useTranslations("about");
  const tPersonal = useTranslations("personal");

  return (
    <section
      id="about"
      className={`${sectionStyles.block} ${sectionStyles.blockFirst}`}
    >
      <SectionTitle title={t("about")} />

      <div className={`space-y-4 ${aboutStyles.prose}`}>
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
