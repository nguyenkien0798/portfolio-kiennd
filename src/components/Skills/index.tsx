import { useTranslations } from "next-intl";
import { skills } from "@/data/portfolio";
import { SectionTitle } from "@/components/SectionTitle";
import styles from "./Skills.module.scss";
import sectionStyles from "@/components/SectionTitle/Section.module.scss";

export default function Skills() {
  const t = useTranslations("nav");
  const tSkills = useTranslations("skills");

  const grouped = skills.reduce<Record<string, typeof skills>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className={sectionStyles.block}>
      <SectionTitle title={t("skills")} />

      <div className={styles.groups}>
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category}>
            <h3 className={styles.category}>
              {tSkills(`categories.${category}`)}
            </h3>
            <ul className={styles.list}>
              {items.map((skill) => (
                <li key={skill.name} className={styles.tag}>
                  {skill.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
