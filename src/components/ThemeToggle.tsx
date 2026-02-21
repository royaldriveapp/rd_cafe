import { memo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = memo(() => {
  const { setTheme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [dimming, setDimming] = useState(false);

  const handleToggle = useCallback(() => {
    if (dimming) return;
    setDimming(true);

    // After overlay is fully opaque, switch theme instantly (no CSS transitions)
    setTimeout(() => {
      // Disable all transitions so the swap is invisible behind the overlay
      document.documentElement.style.setProperty("--theme-switching", "1");
      document.documentElement.classList.add("theme-switching");
      setTheme(isDark ? "light" : "dark");

      // Re-enable transitions after a frame so the new theme is painted
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document.documentElement.classList.remove("theme-switching");
          document.documentElement.style.removeProperty("--theme-switching");
          // Now fade the overlay out
          setDimming(false);
        });
      });
    }, 400); // matches overlay fade-in duration
  }, [isDark, setTheme, dimming]);

  return (
    <>
      <AnimatePresence>
        {dimming && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-[9999] pointer-events-none"
            style={{
              background: isDark
                ? "radial-gradient(ellipse at center, hsl(35 30% 96% / 0.85), hsl(35 25% 88% / 0.95))"
                : "radial-gradient(ellipse at center, hsl(25 25% 8% / 0.9), hsl(25 25% 5% / 0.97))",
              willChange: "opacity",
            }}
          />
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleToggle}
        className="relative p-2 rounded-full bg-secondary/60 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        style={{ transition: "background-color 0.3s cubic-bezier(0.4,0,0.2,1)" }}
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
