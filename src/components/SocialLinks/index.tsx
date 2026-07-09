import { Facebook, Github, Linkedin } from "lucide-react";
import { contactInfo } from "@/data/portfolio";
import styles from "./SocialLinks.module.scss";

const socialLinks = [
  { href: contactInfo.facebook, label: "Facebook", icon: Facebook },
  { href: contactInfo.linkedin, label: "LinkedIn", icon: Linkedin },
  { href: contactInfo.github, label: "GitHub", icon: Github },
] as const;

export default function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`${styles.links} ${className}`.trim()}>
      {socialLinks.map(({ href, label, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={styles.link}
        >
          <Icon size={20} />
        </a>
      ))}
    </div>
  );
}
