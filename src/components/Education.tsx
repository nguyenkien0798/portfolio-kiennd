import { useTranslations } from "next-intl";
import { SectionTitle } from "./SectionTitle";

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
    <section id="education" className="section-block">
      <SectionTitle title={t("education")} />

      <ul className="education-list">
        {items.map((item) => (
          <li key={`${item.school}-${item.period}`} className="education-item">
            <div className="education-item-header">
              <span className="education-school">{item.school}</span>
              <span className="education-period">{item.period}</span>
            </div>
            <p className="education-degree">{item.degree}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
