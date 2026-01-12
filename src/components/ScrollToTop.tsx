import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop component - resets scroll position on route change
 * WCAG 2.4.3 Focus Order - ensures predictable navigation behavior
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
