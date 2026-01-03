import { motion } from "framer-motion";
import type { Easing } from "framer-motion";

interface LineArtProps {
  className?: string;
  strokeColor?: string;
  strokeWidth?: number;
  animate?: boolean;
}

const easeInOut: Easing = [0.42, 0, 0.58, 1];

export const TeapotAndCup = ({ 
  className = "", 
  strokeColor = "currentColor", 
  strokeWidth = 1.5,
  animate = true 
}: LineArtProps) => {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { duration: 2, ease: easeInOut }
    }
  };

  return (
    <svg 
      viewBox="0 0 200 120" 
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Teapot body */}
      <motion.path
        d="M30 85 C30 85 25 70 35 55 C45 40 70 35 85 40 C100 45 105 55 105 70 C105 85 95 95 75 95 C55 95 35 95 30 85 Z"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={animate ? pathVariants : undefined}
        initial={animate ? "hidden" : undefined}
        whileInView={animate ? "visible" : undefined}
        viewport={{ once: true }}
      />
      {/* Teapot spout */}
      <motion.path
        d="M30 65 C20 60 10 55 8 45 C6 35 15 30 20 35"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        variants={animate ? pathVariants : undefined}
        initial={animate ? "hidden" : undefined}
        whileInView={animate ? "visible" : undefined}
        viewport={{ once: true }}
      />
      {/* Teapot handle */}
      <motion.path
        d="M100 55 C115 50 125 55 125 70 C125 85 115 90 105 85"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        variants={animate ? pathVariants : undefined}
        initial={animate ? "hidden" : undefined}
        whileInView={animate ? "visible" : undefined}
        viewport={{ once: true }}
      />
      {/* Teapot lid */}
      <motion.path
        d="M55 40 C55 35 60 32 67 32 C74 32 80 35 80 40"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        variants={animate ? pathVariants : undefined}
        initial={animate ? "hidden" : undefined}
        whileInView={animate ? "visible" : undefined}
        viewport={{ once: true }}
      />
      {/* Lid knob */}
      <motion.path
        d="M65 32 C65 28 67 25 70 25 C73 25 75 28 72 32"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        variants={animate ? pathVariants : undefined}
        initial={animate ? "hidden" : undefined}
        whileInView={animate ? "visible" : undefined}
        viewport={{ once: true }}
      />
      
      {/* Coffee cup */}
      <motion.path
        d="M140 95 C140 95 138 75 145 65 C152 55 165 55 172 65 C179 75 177 95 177 95"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={animate ? pathVariants : undefined}
        initial={animate ? "hidden" : undefined}
        whileInView={animate ? "visible" : undefined}
        viewport={{ once: true }}
      />
      {/* Cup handle */}
      <motion.path
        d="M172 72 C182 70 188 75 188 82 C188 89 182 92 175 90"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        variants={animate ? pathVariants : undefined}
        initial={animate ? "hidden" : undefined}
        whileInView={animate ? "visible" : undefined}
        viewport={{ once: true }}
      />
      {/* Steam from cup */}
      <motion.path
        d="M152 60 C150 52 155 45 152 38 M160 58 C162 50 158 42 162 35 M168 60 C166 52 170 45 167 38"
        stroke={strokeColor}
        strokeWidth={strokeWidth * 0.8}
        strokeLinecap="round"
        variants={animate ? pathVariants : undefined}
        initial={animate ? "hidden" : undefined}
        whileInView={animate ? "visible" : undefined}
        viewport={{ once: true }}
      />
      
      {/* Base line connecting both */}
      <motion.path
        d="M25 95 L195 95"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        variants={animate ? pathVariants : undefined}
        initial={animate ? "hidden" : undefined}
        whileInView={animate ? "visible" : undefined}
        viewport={{ once: true }}
      />
    </svg>
  );
};

export const KitchenUtensils = ({ 
  className = "", 
  strokeColor = "currentColor", 
  strokeWidth = 1.5,
  animate = true 
}: LineArtProps) => {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { duration: 2, ease: easeInOut }
    }
  };

  return (
    <svg 
      viewBox="0 0 160 200" 
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Bowl/container at bottom */}
      <motion.path
        d="M25 160 C25 175 45 185 80 185 C115 185 135 175 135 160 C135 150 120 145 80 145 C40 145 25 150 25 160 Z"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={animate ? pathVariants : undefined}
        initial={animate ? "hidden" : undefined}
        whileInView={animate ? "visible" : undefined}
        viewport={{ once: true }}
      />
      
      {/* Rolling pin */}
      <motion.path
        d="M100 145 L115 35 M108 40 C108 32 112 28 118 30 C124 32 126 40 122 45 L115 35 M115 35 L108 40"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={animate ? pathVariants : undefined}
        initial={animate ? "hidden" : undefined}
        whileInView={animate ? "visible" : undefined}
        viewport={{ once: true }}
      />
      
      {/* Whisk */}
      <motion.path
        d="M65 145 L55 80 M55 80 L50 45 C48 35 52 30 55 30 C58 30 62 35 60 45 L55 80 M55 80 C45 75 42 55 48 40 M55 80 C65 75 68 55 62 40"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={animate ? pathVariants : undefined}
        initial={animate ? "hidden" : undefined}
        whileInView={animate ? "visible" : undefined}
        viewport={{ once: true }}
      />
      
      {/* Spatula */}
      <motion.path
        d="M85 145 L75 60 M75 60 L72 25 C72 18 76 15 80 15 C84 15 88 18 88 25 L82 55 C82 55 90 50 92 55 C94 60 88 65 82 62 L75 60"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={animate ? pathVariants : undefined}
        initial={animate ? "hidden" : undefined}
        whileInView={animate ? "visible" : undefined}
        viewport={{ once: true }}
      />
    </svg>
  );
};

export const CoffeeCup = ({ 
  className = "", 
  strokeColor = "currentColor", 
  strokeWidth = 1.5,
  animate = true 
}: LineArtProps) => {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { duration: 1.5, ease: easeInOut }
    }
  };

  return (
    <svg 
      viewBox="0 0 80 100" 
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cup body */}
      <motion.path
        d="M15 85 C15 85 12 50 20 35 C28 20 52 20 60 35 C68 50 65 85 65 85"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={animate ? pathVariants : undefined}
        initial={animate ? "hidden" : undefined}
        whileInView={animate ? "visible" : undefined}
        viewport={{ once: true }}
      />
      {/* Cup rim */}
      <motion.path
        d="M12 35 C12 30 25 28 40 28 C55 28 68 30 68 35"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        variants={animate ? pathVariants : undefined}
        initial={animate ? "hidden" : undefined}
        whileInView={animate ? "visible" : undefined}
        viewport={{ once: true }}
      />
      {/* Handle */}
      <motion.path
        d="M65 45 C75 42 82 48 82 58 C82 68 75 72 67 70"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        variants={animate ? pathVariants : undefined}
        initial={animate ? "hidden" : undefined}
        whileInView={animate ? "visible" : undefined}
        viewport={{ once: true }}
      />
      {/* Saucer */}
      <motion.path
        d="M5 88 C5 92 20 95 40 95 C60 95 75 92 75 88"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        variants={animate ? pathVariants : undefined}
        initial={animate ? "hidden" : undefined}
        whileInView={animate ? "visible" : undefined}
        viewport={{ once: true }}
      />
      {/* Steam */}
      <motion.path
        d="M30 25 C28 18 32 12 30 5 M40 23 C42 16 38 10 42 3 M50 25 C48 18 52 12 50 5"
        stroke={strokeColor}
        strokeWidth={strokeWidth * 0.7}
        strokeLinecap="round"
        variants={animate ? pathVariants : undefined}
        initial={animate ? "hidden" : undefined}
        whileInView={animate ? "visible" : undefined}
        viewport={{ once: true }}
      />
    </svg>
  );
};

export const CroissantSketch = ({ 
  className = "", 
  strokeColor = "currentColor", 
  strokeWidth = 1.5,
  animate = true 
}: LineArtProps) => {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { duration: 1.5, ease: easeInOut }
    }
  };

  return (
    <svg 
      viewBox="0 0 120 60" 
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        d="M10 45 C15 35 25 25 40 25 C50 25 55 30 60 30 C65 30 70 25 80 25 C95 25 105 35 110 45 C100 50 80 52 60 50 C40 52 20 50 10 45 Z"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={animate ? pathVariants : undefined}
        initial={animate ? "hidden" : undefined}
        whileInView={animate ? "visible" : undefined}
        viewport={{ once: true }}
      />
      {/* Croissant layers */}
      <motion.path
        d="M25 40 C35 35 50 33 60 35 C70 33 85 35 95 40"
        stroke={strokeColor}
        strokeWidth={strokeWidth * 0.7}
        strokeLinecap="round"
        variants={animate ? pathVariants : undefined}
        initial={animate ? "hidden" : undefined}
        whileInView={animate ? "visible" : undefined}
        viewport={{ once: true }}
      />
      <motion.path
        d="M35 35 C45 32 55 31 60 32 C65 31 75 32 85 35"
        stroke={strokeColor}
        strokeWidth={strokeWidth * 0.6}
        strokeLinecap="round"
        variants={animate ? pathVariants : undefined}
        initial={animate ? "hidden" : undefined}
        whileInView={animate ? "visible" : undefined}
        viewport={{ once: true }}
      />
    </svg>
  );
};

export const DecorativeLine = ({ 
  className = "", 
  strokeColor = "currentColor", 
  strokeWidth = 1,
}: LineArtProps) => {
  return (
    <svg 
      viewBox="0 0 200 20" 
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <motion.path
        d="M0 10 C20 5 40 15 60 10 C80 5 100 15 120 10 C140 5 160 15 180 10 L200 10"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: easeInOut }}
      />
    </svg>
  );
};
