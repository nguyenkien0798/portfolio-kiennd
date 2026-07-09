"use client";

import { useEffect } from "react";
import styles from "./MouseGlow.module.scss";

export default function MouseGlow() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const onMouseMove = (event: MouseEvent) => {
      document.documentElement.style.setProperty(
        "--mouse-x",
        `${event.clientX}px`
      );
      document.documentElement.style.setProperty(
        "--mouse-y",
        `${event.clientY}px`
      );
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return <div className={styles.glow} aria-hidden />;
}
