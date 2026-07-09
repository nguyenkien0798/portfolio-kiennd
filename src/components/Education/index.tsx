import { useTranslations } from "next-intl";
import { SectionTitle } from "@/components/SectionTitle";
import educationStyles from "./Education.module.scss";
import sectionStyles from "@/components/SectionTitle/Section.module.scss";

type EducationItem = {
  school: string;
  degree: string;
  period: string;
};

export default function Education() {
  const t = useTranslations("nav");
  const tRoot = useTranslations();
  const items = tRoot.raw("education") as EducationItem[];

  return (
    <section id="education" className={sectionStyles.block}>
      <SectionTitle title={t("education")} />

      <ul className={educationStyles.list}>
        {items.map((item) => (
          <li key={`${item.school}-${item.period}`} className={educationStyles.item}>
            <div className={educationStyles.itemHeader}>
              <span className={educationStyles.school}>{item.school}</span>
              <span className={educationStyles.period}>{item.period}</span>
            </div>
            <p className={educationStyles.degree}>{item.degree}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
