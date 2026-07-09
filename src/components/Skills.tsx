import { useTranslations } from "next-intl";
import { skills } from "@/data/portfolio";
import { SectionTitle } from "./SectionTitle";

export default function Skills() {
  const t = useTranslations("nav");
  const tSkills = useTranslations("skills");

  const grouped = skills.reduce<Record<string, typeof skills>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="section-block">
      <SectionTitle title={t("skills")} />

      <div className="space-y-8">
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category}>
            <h3 className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">
              {tSkills(`categories.${category}`)}
            </h3>
            <ul className="experience-tech">
              {items.map((skill) => (
                <li key={skill.name} className="tech-tag">
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
