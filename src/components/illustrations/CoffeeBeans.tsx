import { motion } from "framer-motion";
import type { Easing } from "framer-motion";

interface CoffeeBeansProps {
  className?: string;
  strokeColor?: string;
  strokeWidth?: number;
}

const easeInOut: Easing = [0.42, 0, 0.58, 1];

export const CoffeeBeans = ({
  className = "",
  strokeColor = "currentColor",
  strokeWidth = 1.5,
}: CoffeeBeansProps) => {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 2, ease: easeInOut },
    },
  };

  return (
    <svg
      viewBox="0 0 100 120"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Bean 1 */}
      <motion.path
        d="M25 25 C20 15 30 5 45 10 C55 12 55 25 50 35 C45 45 30 45 25 35 C22 30 22 28 25 25 Z"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        variants={pathVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      />
      <motion.path
        d="M35 15 C38 22 38 30 35 38"
        stroke={strokeColor}
        strokeWidth={strokeWidth * 0.7}
        strokeLinecap="round"
        variants={pathVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      />

      {/* Bean 2 */}
      <motion.path
        d="M55 55 C50 45 60 35 75 40 C85 42 85 55 80 65 C75 75 60 75 55 65 C52 60 52 58 55 55 Z"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        variants={pathVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      />
      <motion.path
        d="M65 45 C68 52 68 60 65 68"
        stroke={strokeColor}
        strokeWidth={strokeWidth * 0.7}
        strokeLinecap="round"
        variants={pathVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      />

      {/* Bean 3 */}
      <motion.path
        d="M20 80 C15 70 25 60 40 65 C50 67 50 80 45 90 C40 100 25 100 20 90 C17 85 17 83 20 80 Z"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        variants={pathVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      />
      <motion.path
        d="M30 70 C33 77 33 85 30 93"
        stroke={strokeColor}
        strokeWidth={strokeWidth * 0.7}
        strokeLinecap="round"
        variants={pathVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      />
    </svg>
  );
};

export const LeafSprig = ({
  className = "",
  strokeColor = "currentColor",
  strokeWidth = 1.5,
}: CoffeeBeansProps) => {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1.8, ease: easeInOut },
    },
  };

  return (
    <svg
      viewBox="0 0 80 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main stem */}
      <motion.path
        d="M40 95 C40 80 40 60 40 40 C40 30 38 20 40 10"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        variants={pathVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      />
      {/* Left leaves */}
      <motion.path
        d="M40 75 C30 70 20 72 18 65 C16 58 25 52 35 58 C38 60 40 65 40 70"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        variants={pathVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      />
      <motion.path
        d="M40 50 C30 45 22 47 20 40 C18 33 27 27 37 33 C39 35 40 40 40 45"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        variants={pathVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      />
      {/* Right leaves */}
      <motion.path
        d="M40 62 C50 57 58 59 60 52 C62 45 53 39 43 45 C41 47 40 52 40 57"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        variants={pathVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      />
      <motion.path
        d="M40 35 C50 30 56 32 58 25 C60 18 51 12 41 18 C39 20 40 25 40 30"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        variants={pathVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      />
    </svg>
  );
};
