"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>{}[]/#";

type ScrambleTextProps = {
  text: string;
  as?: "h2" | "h3" | "p" | "span";
  className?: string;
  delayMs?: number;
};

export default function ScrambleText({
  text,
  as: Tag = "h2",
  className = "",
  delayMs = 0,
}: ScrambleTextProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const [display, setDisplay] = useState(text);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    if (reduceMotion) {
      setDisplay(text);
      return;
    }

    let frame = 0;
    let raf = 0;
    let timeout = 0;
    const totalFrames = Math.min(18 + text.length, 42);

    const run = () => {
      frame += 1;
      const progress = frame / totalFrames;
      const revealCount = Math.floor(progress * text.length);

      const next = text
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < revealCount) return text[i];
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join("");

      setDisplay(next);

      if (frame < totalFrames) {
        raf = requestAnimationFrame(run);
      } else {
        setDisplay(text);
      }
    };

    timeout = window.setTimeout(() => {
      raf = requestAnimationFrame(run);
    }, delayMs);

    return () => {
      window.clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [started, text, delayMs, reduceMotion]);

  return (
    <Tag
      ref={ref as never}
      className={className}
      aria-label={text}
      data-text={text}
    >
      <span aria-hidden>{display}</span>
    </Tag>
  );
}
