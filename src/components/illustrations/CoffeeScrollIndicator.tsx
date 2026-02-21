import { useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CoffeeScrollIndicator = () => {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const steamOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isMobile) return null;

  return (
    <motion.div
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40 pointer-events-none"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: isVisible ? 0.6 : 0, x: isVisible ? 0 : 20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative w-6 h-32">
        {/* Steam lines — CSS animated */}
        <motion.div
          className="absolute -top-6 left-1/2 -translate-x-1/2"
          style={{ opacity: steamOpacity }}
        >
          <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
            <path
              d="M5 20 C4 16 6 12 5 8 C4 4 6 0 5 0"
              stroke="hsl(var(--primary))"
              strokeWidth="1"
              strokeLinecap="round"
              className="animate-[draw-steam_2s_ease-in-out_infinite]"
              style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
            />
            <path
              d="M10 22 C11 17 9 13 10 9 C11 5 9 1 10 1"
              stroke="hsl(var(--primary))"
              strokeWidth="1"
              strokeLinecap="round"
              className="animate-[draw-steam_2.5s_ease-in-out_0.3s_infinite]"
              style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
            />
            <path
              d="M15 20 C14 16 16 12 15 8 C14 4 16 0 15 0"
              stroke="hsl(var(--primary))"
              strokeWidth="1"
              strokeLinecap="round"
              className="animate-[draw-steam_2.2s_ease-in-out_0.6s_infinite]"
              style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
            />
          </svg>
        </motion.div>

        {/* Cup outline */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 24 128"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M2 10 L2 115 C2 120 6 124 12 124 C18 124 22 120 22 115 L22 10"
            stroke="hsl(var(--primary))"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
          <ellipse cx="12" cy="10" rx="10" ry="4" stroke="hsl(var(--primary))" strokeWidth="1.5" fill="none" />
        </svg>

        {/* Coffee fill */}
        <div className="absolute bottom-1 left-1 right-1 overflow-hidden" style={{ height: 'calc(100% - 16px)' }}>
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/80 to-primary/40 rounded-b-lg"
            style={{ height: fillHeight }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default CoffeeScrollIndicator;
