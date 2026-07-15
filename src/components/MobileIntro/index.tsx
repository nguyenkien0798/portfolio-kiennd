import { useTranslations } from "next-intl";
import { Mail, MapPin, Phone } from "lucide-react";
import { contactInfo } from "@/data/portfolio";
import SocialLinks from "@/components/SocialLinks";
import sidebarStyles from "@/components/Sidebar/Sidebar.module.scss";

export default function MobileIntro() {
  const tPersonal = useTranslations("personal");

  return (
    <header className="mb-8 pt-[calc(4.75rem+env(safe-area-inset-top))] sm:mb-10 lg:hidden">
      <h1 className="text-[clamp(1.75rem,7vw,2.25rem)] font-bold leading-tight tracking-tight text-foreground">
        {tPersonal("name")}
      </h1>
      <h2 className="mt-2 text-base font-medium text-foreground sm:mt-3 sm:text-lg">
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
