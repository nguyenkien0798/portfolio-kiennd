"use client";

import type { CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Layers } from "lucide-react";
import styles from "./ProfessionalBadge.module.scss";

type ProfessionalBadgeProps = {
  text: string;
};

export default function ProfessionalBadge({ text }: ProfessionalBadgeProps) {
  const reduceMotion = useReducedMotion();
  const letters = text.split("");
  const entranceDelay = 0.35;

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, scale: 0.92, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.6, -0.05, 0.01, 0.99], delay: 0.1 }}
      className={styles.shell}
    >
      {!reduceMotion ? <span className={styles.beam} aria-hidden /> : null}
      <span className={styles.glow} aria-hidden />

      <div className={styles.badge}>
        {!reduceMotion ? <span className={styles.innerShimmer} aria-hidden /> : null}

        <motion.span
          className={styles.icon}
          animate={
            reduceMotion
              ? undefined
              : {
                  scale: [1, 1.1, 1],
                  rotate: [0, 4, -4, 0],
                }
          }
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Layers size={15} />
        </motion.span>

        <span className={styles.text} aria-label={text}>
          {letters.map((char, index) => (
            <motion.span
              key={`${char}-${index}`}
              className={styles.letter}
              style={{ "--i": index } as CSSProperties}
              data-motion={reduceMotion ? "off" : "on"}
              initial={
                reduceMotion ? false : { opacity: 0, y: 10, filter: "blur(4px)" }
              }
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.45,
                delay: entranceDelay + index * 0.035,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </span>
      </div>
    </motion.div>
  );
}
