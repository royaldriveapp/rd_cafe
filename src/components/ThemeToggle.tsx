import { memo, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = memo(() => {
  const { setTheme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [dimming, setDimming] = useState(false);

  const handleToggle = useCallback(() => {
    setDimming(true);
    // Let the overlay fade in, then switch theme midway
    setTimeout(() => {
      setTheme(isDark ? "light" : "dark");
    }, 350);
    setTimeout(() => {
      setDimming(false);
    }, 700);
  }, [isDark, setTheme]);

  return (
    <>
      {/* Full-screen dimming overlay for smooth theme switch */}
      <AnimatePresence>
        {dimming && (
          <motion.div
            key="dim-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-[9999] pointer-events-none bg-black/60"
            style={{ willChange: "opacity" }}
          />
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleToggle}
        className="relative p-2 rounded-full bg-secondary/60 hover:bg-secondary transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="sun"
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Sun size={18} className="text-gold" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Moon size={18} className="text-primary" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
});

ThemeToggle.displayName = "ThemeToggle";

export default ThemeToggle;
