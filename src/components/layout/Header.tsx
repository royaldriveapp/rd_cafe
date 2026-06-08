import { useState, useEffect, useRef, useCallback, memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { smoothTransition } from "@/lib/animations";
import cafeLogo from "@/assets/cafe-logo-cropped.png";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Menu", path: "/menu" },
  { name: "Facilities", path: "/facilities" },
  { name: "Bookings", path: "/bookings" },
  { name: "About", path: "/about" },
  { name: "Blog", path: "/blog" },
  { name: "Gallery", path: "/gallery" },
  { name: "Contact", path: "/contact" },
] as const;

const SCROLL_THRESHOLD = 10;
type HeaderTone = "light" | "dark";

const ROUTE_TOP_TONES: Record<string, HeaderTone> = {
  "/": "dark",
  "/gallery": "dark",
  "/menu": "light",
  "/about": "light",
  "/facilities": "light",
  "/bookings": "light",
  "/contact": "light",
  "/blog": "light",
  "/cafe-admin": "light",
  "/admin": "light",
};

function getTopTone(pathname: string): HeaderTone {
  if (pathname.startsWith("/blog/")) {
    return "dark";
  }

  return ROUTE_TOP_TONES[pathname] ?? "light";
}

function isLinkActive(currentPath: string, linkPath: string) {
  if (linkPath === "/") {
    return currentPath === "/";
  }

  return currentPath === linkPath || currentPath.startsWith(`${linkPath}/`);
}

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const location = useLocation();
  const lastScrollY = useRef(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const scrollDelta = currentScrollY - lastScrollY.current;
    
    setIsScrolled(currentScrollY > 50);
    
    if (currentScrollY < 50) {
      setIsVisible(true);
    } else if (scrollDelta > SCROLL_THRESHOLD) {
      setIsVisible(false);
    } else if (scrollDelta < -SCROLL_THRESHOLD) {
      setIsVisible(true);
    }
    
    lastScrollY.current = currentScrollY;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) setIsVisible(true);
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const topTone = getTopTone(location.pathname);
  const tone: HeaderTone = isScrolled ? "dark" : topTone;
  const isScrolledShell = isScrolled;

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
        transition={smoothTransition}
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 pt-5"
        role="banner"
      >
        <nav 
          className={`
            mx-auto max-w-7xl transition-all duration-700 ease-out
            ${isScrolledShell
              ? "rounded-full border border-[#C49A3C]/22 bg-[rgba(88,76,66,0.88)] shadow-elevated backdrop-blur-xl"
              : "border border-transparent bg-transparent"
            }
          `}
          aria-label="Main navigation"
        >
          <div className="flex h-16 items-center justify-between gap-4 px-4 lg:grid lg:grid-cols-[auto_1fr_auto] lg:gap-6 lg:px-6">
            <Logo tone={tone} />
            <DesktopNav 
              currentPath={location.pathname} 
              hoveredLink={hoveredLink}
              onHoverStart={setHoveredLink}
              onHoverEnd={() => setHoveredLink(null)}
              tone={tone}
            />
            <CTAButton tone={tone} />
            <MobileMenuToggle isOpen={isMobileMenuOpen} onToggle={toggleMobileMenu} tone={tone} />
          </div>
        </nav>
      </motion.header>

      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        currentPath={location.pathname}
        onClose={closeMobileMenu}
      />
    </>
  );
};

const Logo = memo(({ tone }: { tone: HeaderTone }) => (
  <Link 
    to="/" 
    className="flex items-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg"
    aria-label="RD CAFE - Go to homepage"
  >
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <img 
        src={cafeLogo} 
        alt="RD CAFE Logo" 
        className="h-10 w-10 rounded-md object-cover shadow-[0_8px_24px_rgba(0,0,0,0.14)] transition-all duration-500 md:h-11 md:w-11"
      />
    </motion.div>
  </Link>
));

Logo.displayName = "Logo";

interface DesktopNavProps {
  currentPath: string;
  hoveredLink: string | null;
  onHoverStart: (path: string) => void;
  onHoverEnd: () => void;
  tone: HeaderTone;
}

const DesktopNav = memo(({ currentPath, hoveredLink, onHoverStart, onHoverEnd, tone }: DesktopNavProps) => (
  <ul className="hidden lg:flex items-center justify-center gap-5 xl:gap-7" role="menubar">
    {NAV_LINKS.map((link) => {
      const active = isLinkActive(currentPath, link.path);

      return (
        <motion.li
          key={link.path}
          onHoverStart={() => onHoverStart(link.path)}
          onHoverEnd={onHoverEnd}
          className="relative"
          role="none"
        >
          <Link
            to={link.path}
            className={`relative rounded px-1 py-2 text-[0.88rem] font-sohne font-medium tracking-[0.12em] transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
              active
                ? tone === "dark" ? "text-[#F5ECD7]" : "text-[#2A140D]"
                : tone === "dark"
                  ? "text-[#F5ECD7] hover:text-[#FFFFFF] hover:tracking-[0.14em]"
                  : "text-[#2A140D] hover:text-[#000000] hover:tracking-[0.14em]"
            }`}
            role="menuitem"
            aria-current={active ? "page" : undefined}
          >
            <span className="relative z-10">{link.name}</span>

            {active && (
              <motion.div
                layoutId="activeNav"
                className="absolute left-0 -bottom-1 h-[2px] w-full bg-[#C49A3C]"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                aria-hidden="true"
              />
            )}

            <motion.span
              className="absolute left-0 -bottom-1 h-[2px] w-full origin-left rounded-full bg-[#C49A3C]"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{
                scaleX: hoveredLink === link.path && !active ? 1 : 0,
                opacity: hoveredLink === link.path && !active ? 1 : 0
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              aria-hidden="true"
            />
          </Link>
        </motion.li>
      );
    })}
  </ul>
));

DesktopNav.displayName = "DesktopNav";

const CTAButton = memo(({ tone }: { tone: HeaderTone }) => {
  const ctaClass = tone === "dark"
    ? "border-[#C49A3C] bg-[rgba(28,16,8,0.14)] text-[#F7E7C6] hover:bg-[#C49A3C] hover:text-[#1C1008]"
    : "border-[#B98B39] bg-[rgba(250,246,241,0.82)] text-[#1F120A] shadow-[0_10px_28px_rgba(28,16,8,0.08)] backdrop-blur-sm hover:bg-[#C49A3C] hover:text-[#1C1008]";
  
  return (
    <div className="hidden lg:flex items-center justify-end">
      <motion.div
        whileHover={{ scale: 1.03, y: -1 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <Link 
          to="/bookings"
          className={`inline-flex items-center gap-2 rounded-full border px-6 py-3 text-[0.8rem] font-sohne font-medium tracking-[0.14em] transition-all duration-400 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5ECD7] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1C1008] ${ctaClass}`}
        >
          <span>Reserve a Table</span>
        </Link>
      </motion.div>
    </div>
  );
});

CTAButton.displayName = "CTAButton";

interface MobileMenuToggleProps {
  isOpen: boolean;
  onToggle: () => void;
  tone: HeaderTone;
}

const MobileMenuToggle = memo(({ isOpen, onToggle, tone }: MobileMenuToggleProps) => (
  <motion.button
    onClick={onToggle}
    className={`lg:hidden rounded-xl p-2.5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
      tone === "dark"
        ? "text-[#F5ECD7] hover:bg-white/8"
        : "text-[#2A140D] hover:bg-[#2A140D]/6"
    }`}
    aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
    aria-expanded={isOpen}
    aria-controls="mobile-menu"
    whileTap={{ scale: 0.9 }}
    whileHover={{ scale: 1.05 }}
  >
    <AnimatePresence mode="wait">
      {isOpen ? (
        <motion.div
          key="close"
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <X size={24} aria-hidden="true" />
        </motion.div>
      ) : (
        <motion.div
          key="menu"
          initial={{ rotate: 90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: -90, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Menu size={24} aria-hidden="true" />
        </motion.div>
      )}
    </AnimatePresence>
  </motion.button>
));

MobileMenuToggle.displayName = "MobileMenuToggle";

interface MobileMenuProps {
  isOpen: boolean;
  currentPath: string;
  onClose: () => void;
}

const MobileMenu = memo(({ isOpen, currentPath, onClose }: MobileMenuProps) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 top-20 z-40 lg:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <motion.div 
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          aria-hidden="true"
        />
        
        <motion.nav
          id="mobile-menu"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute right-0 top-0 bottom-0 w-[280px] bg-background shadow-elevated"
          aria-label="Mobile navigation"
        >
          <ul className="p-6 pt-8 space-y-1" role="menu">
            {NAV_LINKS.map((link, index) => (
              <motion.li
                key={link.path}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 + 0.1, duration: 0.4 }}
                role="none"
              >
                <Link
                  to={link.path}
                  className={`flex items-center gap-3 rounded-xl px-4 py-4 font-sohne text-lg font-medium tracking-[0.04em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                    currentPath === link.path
                      ? "bg-secondary text-primary"
                      : "text-foreground hover:bg-muted hover:pl-6 hover:text-primary"
                  }`}
                  role="menuitem"
                  aria-current={currentPath === link.path ? "page" : undefined}
                >
                  {currentPath === link.path && (
                    <motion.span
                      layoutId="mobileActive"
                      className="w-1.5 h-1.5 rounded-full bg-primary"
                      aria-hidden="true"
                    />
                  )}
                  {link.name}
                </Link>
              </motion.li>
            ))}

            <motion.li
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.48, duration: 0.4 }}
              className="pt-2"
              role="none"
            >
              <Link 
                to="/bookings"
                className="flex w-full items-center justify-center gap-2 rounded-full border border-[#C49A3C] py-3.5 font-sohne font-medium tracking-[0.14em] text-[#F7E7C6] transition-all duration-300 hover:bg-[#C49A3C] hover:text-[#1C1008] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1C1008]"
                role="menuitem"
              >
                <span>Reserve a Table</span>
              </Link>
            </motion.li>
          </ul>
        </motion.nav>
      </motion.div>
    )}
  </AnimatePresence>
));

MobileMenu.displayName = "MobileMenu";

export default Header;
