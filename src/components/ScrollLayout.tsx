"use client";

import { useEffect, useState, type ReactNode } from "react";

const MAIN_SCROLL_ID = "main-scroll";

function getScrollOffset(
  section: HTMLElement,
  container: HTMLElement
): number {
  return (
    section.getBoundingClientRect().top -
    container.getBoundingClientRect().top +
    container.scrollTop
  );
}

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const updateActiveSection = () => {
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      const container = document.getElementById(MAIN_SCROLL_ID);
      const sections =
        container?.querySelectorAll<HTMLElement>("section[id]") ?? [];

      if (!sections.length) return;

      const scrollY =
        isDesktop && container
          ? container.scrollTop + 120
          : window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const offset =
          isDesktop && container
            ? getScrollOffset(section, container)
            : section.offsetTop;

        if (offset <= scrollY) {
          setActiveSection(section.id);
          return;
        }
      }

      setActiveSection("about");
    };

    const container = document.getElementById(MAIN_SCROLL_ID);

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    container?.addEventListener("scroll", updateActiveSection, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      container?.removeEventListener("scroll", updateActiveSection);
    };
  }, []);

  return activeSection;
}

export function scrollToSection(href: string) {
  const section = document.querySelector<HTMLElement>(href);
  if (!section) return;

  const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
  const container = document.getElementById(MAIN_SCROLL_ID);

  if (isDesktop && container) {
    const top = getScrollOffset(section, container);
    container.scrollTo({ top: top - 32, behavior: "smooth" });
    return;
  }

  section.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function MainScroll({ children }: { children: ReactNode }) {
  return (
    <main id={MAIN_SCROLL_ID} className="layout-main">
      {children}
    </main>
  );
}
