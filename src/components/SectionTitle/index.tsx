import sectionStyles from "./Section.module.scss";

export function SectionTitle({ title }: { title: string }) {
  return <h2 className={sectionStyles.heading}>{title}</h2>;
}
