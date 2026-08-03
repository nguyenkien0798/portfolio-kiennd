"use client";

import { motion } from "framer-motion";
import { Layers } from "lucide-react";
import styles from "./ProfessionalBadge.module.scss";

type ProfessionalBadgeProps = {
  text: string;
};

export default function ProfessionalBadge({ text }: ProfessionalBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99], delay: 0.1 }}
      className={styles.badge}
    >
      <span className={styles.glow} />
      <span className={styles.shimmer} />
      <motion.span
        className={styles.icon}
        animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Layers size={15} />
      </motion.span>
      <span className={styles.text}>{text}</span>
    </motion.div>
  );
}
