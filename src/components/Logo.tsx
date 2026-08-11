"use client";

import { motion } from "framer-motion";

type LogoProps = {
  /** Rendered width/height in px. */
  size?: number;
  /** Replay the draw-on animation whenever the component mounts. */
  animate?: boolean;
  className?: string;
};

const NAVY = "#0b1b3f";
const TEAL = "#3ec8c4";

// Shared "draw the outline, then fill" transition for each stroke.
const draw = (delay: number) => ({
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1 },
  transition: {
    pathLength: { duration: 1.1, delay, ease: "easeInOut" as const },
    opacity: { duration: 0.01, delay },
  },
});

/**
 * Animated "PM" monogram logo.
 *
 * The letterforms and the rounded-square frame are drawn as strokes so the
 * whole mark can "write itself" via Framer Motion's pathLength animation,
 * then the teal fill fades in underneath.
 */
const Logo = ({ size = 96, animate = true, className }: LogoProps) => {
  const anim = animate ? "animate" : false;

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      initial="initial"
      animate={anim}
      whileHover="hover">
      {/* Navy rounded-square background */}
      <rect x="1" y="1" width="98" height="98" rx="26" fill={NAVY} />

      {/* Animated frame outline */}
      <motion.rect
        x="1"
        y="1"
        width="98"
        height="98"
        rx="26"
        stroke={TEAL}
        strokeOpacity={0.35}
        strokeWidth={2}
        variants={{
          initial: { pathLength: 0 },
          animate: { pathLength: 1 },
        }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
      />

      {/* P — vertical stem */}
      <motion.path
        d="M28 28 L28 74"
        stroke={TEAL}
        strokeWidth={10}
        strokeLinecap="round"
        {...draw(0.2)}
      />
      {/* P — bowl */}
      <motion.path
        d="M28 28 C 46 28 53 35 53 43 C 53 51 46 56 30 56"
        stroke={TEAL}
        strokeWidth={10}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...draw(0.9)}
      />
      {/* M */}
      <motion.path
        d="M48 74 L48 33 L62 56 L76 33 L76 74"
        stroke={TEAL}
        strokeWidth={10}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...draw(1.5)}
      />
    </motion.svg>
  );
};

export default Logo;
