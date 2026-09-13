"use client";

import type { CSSProperties } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import "./folk-rosette.css";

type FolkRosetteProps = {
  className?: string;
  variant?: "petals" | "asset";
};

export function FolkRosette({ className = "", variant = "petals" }: FolkRosetteProps) {
  if (variant === "asset") {
    return (
      <span className={`folk-rosette-image ${className}`.trim()} aria-hidden="true">
        <img src="/rozeta-tlo.svg" alt="" />
      </span>
    );
  }

  return (
    <span className={`folk-rosette ${className}`.trim()} aria-hidden="true">
      {Array.from({ length: 8 }, (_, index) => (
        <i key={index} style={{ "--petal": index } as CSSProperties} />
      ))}
      <b />
    </span>
  );
}

export function ScrollRosettes() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [-18, 170]);
  const rotateReverse = useTransform(scrollYProgress, [0, 1], [38, -130]);
  const drift = useTransform(scrollYProgress, [0, 1], [-80, 170]);
  const driftReverse = useTransform(scrollYProgress, [0, 1], [110, -160]);
  const scale = useTransform(scrollYProgress, [0, 0.52, 1], [0.9, 1.08, 0.94]);

  return (
    <div className="scroll-rosettes" aria-hidden="true">
      <motion.div className="scroll-rosettes-item scroll-rosettes-main" style={reduce ? undefined : { rotate, y: drift, scale }}>
        <FolkRosette variant="asset" />
      </motion.div>
      <motion.div className="scroll-rosettes-item scroll-rosettes-secondary" style={reduce ? undefined : { rotate: rotateReverse, y: driftReverse }}>
        <FolkRosette variant="asset" />
      </motion.div>
    </div>
  );
}
