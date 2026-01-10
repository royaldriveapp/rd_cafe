import type { Variants, Transition, Easing } from "framer-motion";

// Shared easing curves
export const easeInOut: Easing = [0.42, 0, 0.58, 1];
export const easeOut: Easing = [0.25, 0.1, 0.25, 1];

// Standard stagger container for lists/grids
export const staggerContainer = (staggerChildren = 0.1): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren },
  },
});

// Fade up animation for cards/items
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// Fade up with configurable distance
export const fadeUp = (y = 20, duration = 0.5): Variants => ({
  hidden: { opacity: 0, y },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, ease: "easeOut" },
  },
});

// Slide in from side
export const slideIn = (direction: "left" | "right" = "left", distance = 30): Variants => ({
  hidden: { opacity: 0, x: direction === "left" ? -distance : distance },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
});

// Path drawing animation for SVGs
export const pathDraw = (duration = 2): Variants => ({
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration, ease: easeInOut },
  },
});

// Viewport settings for whileInView animations
export const viewportOnce = { once: true, margin: "-100px" };
export const viewportOnceSmall = { once: true, margin: "-50px" };

// Common transition presets
export const springTransition: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 30,
};

export const smoothTransition: Transition = {
  duration: 0.4,
  ease: easeOut,
};

// Steam animation for coffee elements
export const steamAnimation: Variants = {
  animate: {
    y: [0, -3, 0],
    opacity: [0.6, 1, 0.6],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Floating animation
export const floatAnimation = (duration = 4, distance = 15): Variants => ({
  animate: {
    y: [0, -distance, 0],
    transition: {
      duration,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
});
