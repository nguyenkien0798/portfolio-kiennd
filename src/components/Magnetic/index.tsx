"use client";

import {
  useRef,
  type ReactNode,
  type MouseEvent as ReactMouseEvent,
} from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

export default function Magnetic({
  children,
  className = "",
  strength = 0.28,
}: MagneticProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const restRect = useRef<DOMRect | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const onEnter = () => {
    if (reduceMotion || !ref.current) return;
    // Capture the resting position once per hover so the offset math
    // doesn't compound with the element's own (already-applied) transform.
    restRect.current = ref.current.getBoundingClientRect();
  };

  const onMove = (event: ReactMouseEvent) => {
    if (reduceMotion || !restRect.current) return;
    const rect = restRect.current;
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;
    x.set(offsetX * strength);
    y.set(offsetY * strength);
  };

  const onLeave = () => {
    restRect.current = null;
    x.set(0);
    y.set(0);
  };

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      // Hug the content's own size (not the parent's), otherwise the
      // hover math is computed against an oversized box and the pull
      // looks disconnected from the cursor.
      style={{ display: "inline-block", x: springX, y: springY }}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}
