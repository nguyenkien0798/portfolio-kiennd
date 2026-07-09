import { useTranslations } from "next-intl";
import { Mail, MapPin, Phone } from "lucide-react";
import { contactInfo } from "@/data/portfolio";
import SocialLinks from "@/components/SocialLinks";
import sidebarStyles from "@/components/Sidebar/Sidebar.module.scss";

export default function MobileIntro() {
  const tPersonal = useTranslations("personal");

  return (
    <header className="mb-10 pt-20 lg:hidden">
      <h1 className="text-4xl font-bold tracking-tight text-foreground">
        {tPersonal("name")}
      </h1>
      <h2 className="mt-3 text-lg font-medium text-foreground">
        {tPersonal("title")}
      </h2>

      <ul className={`${sidebarStyles.personalInfo} mt-4`}>
        <li>
          <MapPin size={14} className="shrink-0 text-accent" aria-hidden />
          <span>{tPersonal("location")}</span>
        </li>
        <li>
          <Phone size={14} className="shrink-0 text-accent" aria-hidden />
          <span>{contactInfo.phone}</span>
        </li>
        <li>
          <Mail size={14} className="shrink-0 text-accent" aria-hidden />
          <span>{contactInfo.email}</span>
        </li>
      </ul>

      <SocialLinks className="mt-6" />
    </header>
  );
}
