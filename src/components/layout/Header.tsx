import { useState, useEffect, useRef, useCallback, memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, LogIn } from "lucide-react";
import { smoothTransition } from "@/lib/animations";
import logoWhite from "@/assets/logo-white.png";
import { useAuth } from "@/contexts/AuthContext";
import ThemeToggle from "@/components/ThemeToggle";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Menu", path: "/menu" },
  { name: "Facilities", path: "/facilities" },
  { name: "Bookings", path: "/bookings" },
  { name: "About", path: "/about" },
  { name: "Gallery", path: "/gallery" },
  { name: "Contact", path: "/contact" },
] as const;

const SCROLL_THRESHOLD = 10;

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

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
        transition={smoothTransition}
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 pt-4"
        role="banner"
      >
        <nav 
          className={`
            mx-auto max-w-7xl rounded-2xl transition-all duration-700 ease-out
            ${isScrolled
              ? "bg-background/95 backdrop-blur-xl shadow-card border border-border"
              : "bg-background/80 backdrop-blur-lg shadow-soft border border-border/40"
            }
          `}
          aria-label="Main navigation"
        >
          <div className="flex items-center justify-between h-16 lg:h-18 px-6 lg:px-8">
            <Logo />
            <DesktopNav 
              currentPath={location.pathname} 
              hoveredLink={hoveredLink}
              onHoverStart={setHoveredLink}
              onHoverEnd={() => setHoveredLink(null)}
            />
            <CTAButton />
            <MobileMenuToggle isOpen={isMobileMenuOpen} onToggle={toggleMobileMenu} />
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

const Logo = memo(() => (
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
        src={logoWhite} 
        alt="RD CAFE Logo" 
        className="h-10 md:h-12 w-auto invert brightness-0 sepia saturate-[800%] hue-rotate-[345deg] opacity-80"
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
}

const DesktopNav = memo(({ currentPath, hoveredLink, onHoverStart, onHoverEnd }: DesktopNavProps) => (
  <ul className="hidden lg:flex items-center gap-8" role="menubar">
    {NAV_LINKS.map((link) => (
      <motion.li
        key={link.path}
        onHoverStart={() => onHoverStart(link.path)}
        onHoverEnd={onHoverEnd}
        className="relative"
        role="none"
      >
        <Link
          to={link.path}
          className={`relative text-sm font-serif font-medium tracking-wide transition-all duration-400 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded ${
            currentPath === link.path
              ? "text-primary" 
              : "text-muted-foreground hover:text-foreground"
          }`}
          role="menuitem"
          aria-current={currentPath === link.path ? "page" : undefined}
        >
          <span className="relative z-10">{link.name}</span>
          
          {currentPath === link.path && (
            <motion.div
              layoutId="activeNav"
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              aria-hidden="true"
            />
          )}
          
          <motion.span 
            className="absolute -bottom-1 left-0 h-[2px] rounded-full bg-primary/70"
            initial={{ width: 0, opacity: 0 }}
            animate={{ 
              width: hoveredLink === link.path && currentPath !== link.path ? "100%" : 0,
              opacity: hoveredLink === link.path && currentPath !== link.path ? 1 : 0
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            aria-hidden="true"
          />
        </Link>
      </motion.li>
    ))}
  </ul>
));

DesktopNav.displayName = "DesktopNav";

const CTAButton = memo(() => {
  const { user } = useAuth();
  
  return (
    <div className="hidden lg:flex items-center gap-2">
      {user ? (
        <motion.div
          whileHover={{ scale: 1.03, y: -1 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Link 
            to="/dashboard"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-serif font-medium text-sm tracking-wide bg-secondary text-foreground hover:bg-secondary/80 transition-all duration-400 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <User size={16} />
            <span>Dashboard</span>
          </Link>
        </motion.div>
      ) : (
        <motion.div
          whileHover={{ scale: 1.03, y: -1 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Link 
            to="/login"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-serif font-medium text-sm tracking-wide border border-border text-foreground hover:bg-secondary transition-all duration-400 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <LogIn size={16} />
            <span>Sign In</span>
          </Link>
        </motion.div>
      )}
      <motion.div
        whileHover={{ scale: 1.03, y: -1 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <Link 
          to="/contact"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-serif font-semibold text-sm tracking-wide bg-primary text-primary-foreground shadow-soft hover:bg-primary/90 hover:shadow-card transition-all duration-400 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
        >
          <span>Visit Us</span>
          <span
            className="inline-block animate-[nudge-right_1.5s_ease-in-out_infinite]"
            aria-hidden="true"
          >
            →
          </span>
        </Link>
      </motion.div>
      <ThemeToggle />
    </div>
  );
});

CTAButton.displayName = "CTAButton";

interface MobileMenuToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

const MobileMenuToggle = memo(({ isOpen, onToggle }: MobileMenuToggleProps) => (
  <motion.button
    onClick={onToggle}
    className="lg:hidden p-2.5 rounded-xl text-foreground hover:bg-secondary transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
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
                  className={`flex items-center gap-3 text-lg font-serif font-medium tracking-wide py-4 px-4 rounded-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                    currentPath === link.path
                      ? "text-primary bg-secondary"
                      : "text-foreground hover:text-primary hover:bg-muted hover:pl-6"
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
            
            <MobileAuthButton />

            <motion.li
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.48, duration: 0.4 }}
              className="flex justify-center pt-2"
              role="none"
            >
              <ThemeToggle />
            </motion.li>
            
            <motion.li
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.4 }}
              className="pt-2"
              role="none"
            >
              <Link 
                to="/contact"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-serif font-semibold tracking-wide bg-primary text-primary-foreground shadow-card hover:bg-primary/90 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                role="menuitem"
              >
                <span>Visit Us</span>
              </Link>
            </motion.li>
          </ul>
        </motion.nav>
      </motion.div>
    )}
  </AnimatePresence>
));

MobileMenu.displayName = "MobileMenu";

const MobileAuthButton = memo(() => {
  const { user } = useAuth();
  
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className="pt-4"
      role="none"
    >
      {user ? (
        <Link 
          to="/dashboard"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-serif font-medium tracking-wide border border-border text-foreground hover:bg-secondary transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          role="menuitem"
        >
          <User size={18} aria-hidden="true" />
          <span>My Dashboard</span>
        </Link>
      ) : (
        <Link 
          to="/login"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-serif font-medium tracking-wide border border-border text-foreground hover:bg-secondary transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          role="menuitem"
        >
          <LogIn size={18} aria-hidden="true" />
          <span>Sign In</span>
        </Link>
      )}
    </motion.li>
  );
});

MobileAuthButton.displayName = "MobileAuthButton";

export default Header;
