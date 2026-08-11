"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Layers } from "lucide-react";
import styles from "./ProfessionalBadge.module.scss";

type ProfessionalBadgeProps = {
  text: string;
};

export default function ProfessionalBadge({ text }: ProfessionalBadgeProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, scale: 0.9, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.6, -0.05, 0.01, 0.99], delay: 0.1 }}
      className={styles.badge}
    >
      <span className={styles.glow} aria-hidden />
      {!reduceMotion ? <span className={styles.shimmer} aria-hidden /> : null}

      <motion.span
        className={styles.icon}
        animate={
          reduceMotion
            ? undefined
            : { rotate: [0, 5, -5, 0], scale: [1, 1.08, 1] }
        }
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Layers size={15} />
      </motion.span>

      <motion.span
        className={styles.text}
        initial={false}
        animate={
          reduceMotion
            ? undefined
            : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }
        }
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {text}
      </motion.span>
    </motion.div>
  );
}
