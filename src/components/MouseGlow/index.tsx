"use client";

import { useEffect } from "react";
import styles from "./MouseGlow.module.scss";

export default function MouseGlow() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;

    if (prefersReducedMotion || !hasFinePointer) return;

    document.documentElement.dataset.cursorGlow = "on";

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
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      delete document.documentElement.dataset.cursorGlow;
    };
  }, []);

  return <div className={styles.glow} aria-hidden />;
}
