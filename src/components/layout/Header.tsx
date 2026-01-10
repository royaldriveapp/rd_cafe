import { useState, useEffect, useRef, useCallback, memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Coffee } from "lucide-react";
import { steamAnimation, smoothTransition } from "@/lib/animations";

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
      >
        <nav 
          className={`
            mx-auto max-w-7xl rounded-2xl transition-all duration-700 ease-out
            ${isScrolled
              ? "bg-[hsl(40,30%,98%)]/95 backdrop-blur-xl shadow-[0_2px_24px_-4px_rgba(120,90,60,0.08),0_1px_6px_-1px_rgba(120,90,60,0.04)] border border-[hsl(35,20%,92%)]"
              : "bg-[hsl(40,25%,99%)]/80 backdrop-blur-lg shadow-[0_4px_30px_-8px_rgba(0,0,0,0.08)] border border-white/40"
            }
          `}
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
  <Link to="/" className="flex items-center gap-3 group">
    <motion.div
      className="relative"
      whileHover={{ rotate: [0, -5, 5, 0] }}
      transition={{ duration: 0.5 }}
    >
      <Coffee size={26} className="text-[hsl(25,45%,35%)] transition-all duration-500" />
      <motion.div
        variants={steamAnimation}
        animate="animate"
        className="absolute -top-2 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full blur-sm bg-[hsl(30,25%,75%)]"
      />
    </motion.div>
    <motion.span 
      className="text-xl md:text-2xl font-semibold tracking-wider text-[hsl(20,30%,20%)] transition-all duration-500"
      style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.12em' }}
    >
      RD <span className="text-[hsl(25,45%,40%)]">CAFE</span>
    </motion.span>
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
  <div className="hidden lg:flex items-center gap-8">
    {NAV_LINKS.map((link) => (
      <motion.div
        key={link.path}
        onHoverStart={() => onHoverStart(link.path)}
        onHoverEnd={onHoverEnd}
        className="relative"
      >
        <Link
          to={link.path}
          className={`relative text-[13px] font-medium tracking-[0.06em] uppercase transition-all duration-400 py-2 ${
            currentPath === link.path
              ? "text-[hsl(25,50%,35%)]" 
              : "text-[hsl(20,15%,40%)] hover:text-[hsl(20,30%,25%)]"
          }`}
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <span className="relative z-10">{link.name}</span>
          
          {currentPath === link.path && (
            <motion.div
              layoutId="activeNav"
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[hsl(25,50%,45%)]"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          
          <motion.span 
            className="absolute -bottom-1 left-0 h-[2px] rounded-full bg-[hsl(25,35%,55%)]"
            initial={{ width: 0, opacity: 0 }}
            animate={{ 
              width: hoveredLink === link.path && currentPath !== link.path ? "100%" : 0,
              opacity: hoveredLink === link.path && currentPath !== link.path ? 1 : 0
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </Link>
      </motion.div>
    ))}
  </div>
));

DesktopNav.displayName = "DesktopNav";

const CTAButton = memo(() => (
  <div className="hidden lg:block">
    <motion.div
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Link 
        to="/contact"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm tracking-wide bg-[hsl(28,45%,42%)] text-white shadow-[0_2px_12px_-3px_rgba(139,90,43,0.3)] hover:bg-[hsl(28,50%,38%)] hover:shadow-[0_4px_18px_-4px_rgba(139,90,43,0.4)] transition-all duration-400 ease-out"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <span>Visit Us</span>
        <motion.span
          animate={{ x: [0, 3, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          →
        </motion.span>
      </Link>
    </motion.div>
  </div>
));

CTAButton.displayName = "CTAButton";

interface MobileMenuToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

const MobileMenuToggle = memo(({ isOpen, onToggle }: MobileMenuToggleProps) => (
  <motion.button
    onClick={onToggle}
    className="lg:hidden p-2.5 rounded-xl text-[hsl(20,25%,30%)] hover:bg-[hsl(35,25%,94%)] transition-all duration-300"
    aria-label="Toggle menu"
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
          <X size={24} />
        </motion.div>
      ) : (
        <motion.div
          key="menu"
          initial={{ rotate: 90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: -90, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Menu size={24} />
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
      >
        <motion.div 
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
        
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute right-0 top-0 bottom-0 w-[280px] bg-[hsl(35,28%,97%)] shadow-[-10px_0_40px_-10px_rgba(0,0,0,0.15)]"
        >
          <div className="p-6 pt-8 space-y-1">
            {NAV_LINKS.map((link, index) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 + 0.1, duration: 0.4 }}
              >
                <Link
                  to={link.path}
                  className={`flex items-center gap-3 text-lg font-medium py-4 px-4 rounded-xl transition-all duration-300 ${
                    currentPath === link.path
                      ? "text-[hsl(30,50%,40%)] bg-[hsl(35,30%,92%)]"
                      : "text-[hsl(25,25%,30%)] hover:text-[hsl(30,50%,40%)] hover:bg-[hsl(35,25%,94%)] hover:pl-6"
                  }`}
                  style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.03em' }}
                >
                  {currentPath === link.path && (
                    <motion.span
                      layoutId="mobileActive"
                      className="w-1.5 h-1.5 rounded-full bg-[hsl(30,50%,45%)]"
                    />
                  )}
                  {link.name}
                </Link>
              </motion.div>
            ))}
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="pt-6"
            >
              <Link 
                to="/contact"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-[hsl(30,45%,40%)] text-white font-medium shadow-[0_4px_20px_-6px_rgba(139,90,43,0.4)] hover:bg-[hsl(30,50%,35%)] transition-all duration-300"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <Coffee size={18} />
                <span>Visit Us</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
));

MobileMenu.displayName = "MobileMenu";

export default Header;
