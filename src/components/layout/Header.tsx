import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Coffee } from "lucide-react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Menu", path: "/menu" },
  { name: "Facilities", path: "/facilities" },
  { name: "Bookings", path: "/bookings" },
  { name: "About", path: "/about" },
  { name: "Gallery", path: "/gallery" },
  { name: "Contact", path: "/contact" },
];

// Steam animation for coffee icon
const steamVariants = {
  animate: {
    y: [0, -3, 0],
    opacity: [0.6, 1, 0.6],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  }
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
          isScrolled
            ? "bg-white/90 backdrop-blur-xl shadow-[0_4px_30px_-10px_rgba(139,90,43,0.15)] border-b border-[hsl(35,25%,88%)]"
            : "bg-transparent"
        }`}
      >
        <nav className="container-cafe">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              {/* Coffee cup icon with steam effect */}
              <motion.div
                className="relative"
                whileHover={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.5 }}
              >
                <Coffee 
                  size={28} 
                  className={`transition-all duration-500 ${
                    isScrolled 
                      ? "text-[hsl(30,50%,45%)]" 
                      : "text-white"
                  }`}
                  style={{
                    filter: isScrolled ? 'none' : 'drop-shadow(0 2px 8px rgba(0,0,0,0.6))'
                  }}
                />
                {/* Steam effect */}
                <motion.div
                  variants={steamVariants}
                  animate="animate"
                  className={`absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full blur-sm ${
                    isScrolled ? "bg-[hsl(30,30%,70%)]" : "bg-white/40"
                  }`}
                />
              </motion.div>
              
              <motion.span 
                className={`text-2xl md:text-3xl font-semibold tracking-wider transition-all duration-500 ${
                  isScrolled 
                    ? "text-[hsl(25,35%,25%)]" 
                    : "text-white"
                }`}
                style={{ 
                  fontFamily: "'Cormorant Garamond', serif",
                  letterSpacing: '0.12em',
                  filter: isScrolled ? 'none' : 'drop-shadow(0 2px 12px rgba(0,0,0,0.7))'
                }}
              >
                RD{" "}
                <span 
                  className={`transition-all duration-500 ${
                    isScrolled 
                      ? "text-[hsl(30,50%,45%)]" 
                      : "text-[hsl(35,80%,85%)]"
                  }`}
                >
                  CAFE
                </span>
              </motion.span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <motion.div
                  key={link.path}
                  onHoverStart={() => setHoveredLink(link.path)}
                  onHoverEnd={() => setHoveredLink(null)}
                  className="relative"
                >
                  <Link
                    to={link.path}
                    className={`relative text-[13px] font-medium tracking-[0.08em] uppercase transition-all duration-500 py-2 ${
                      location.pathname === link.path
                        ? isScrolled 
                          ? "text-[hsl(30,50%,40%)]" 
                          : "text-white"
                        : isScrolled 
                          ? "text-[hsl(25,15%,45%)] hover:text-[hsl(25,35%,25%)]" 
                          : "text-white/80 hover:text-white"
                    }`}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      filter: isScrolled ? 'none' : 'drop-shadow(0 1px 6px rgba(0,0,0,0.5))'
                    }}
                  >
                    <span className="relative z-10">{link.name}</span>
                    
                    {/* Active indicator - coffee drop style */}
                    {location.pathname === link.path && (
                      <motion.div
                        layoutId="activeNav"
                        className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${
                          isScrolled ? "bg-[hsl(30,50%,45%)]" : "bg-white"
                        }`}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    
                    {/* Hover underline reveal - slow fade */}
                    <motion.span 
                      className={`absolute -bottom-1 left-0 h-[2px] rounded-full ${
                        isScrolled ? "bg-[hsl(30,40%,55%)]" : "bg-white/70"
                      }`}
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ 
                        width: hoveredLink === link.path && location.pathname !== link.path ? "100%" : 0,
                        opacity: hoveredLink === link.path && location.pathname !== link.path ? 1 : 0
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Link 
                  to="/contact"
                  className={`
                    inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-medium text-sm tracking-wide
                    transition-all duration-500 ease-out
                    ${isScrolled 
                      ? "bg-[hsl(30,45%,40%)] text-white shadow-[0_4px_20px_-6px_rgba(139,90,43,0.4)] hover:shadow-[0_8px_30px_-6px_rgba(139,90,43,0.5)] hover:bg-[hsl(30,50%,35%)]" 
                      : "bg-white/95 text-[hsl(25,35%,25%)] shadow-[0_4px_20px_-6px_rgba(0,0,0,0.3)] hover:bg-white hover:shadow-[0_8px_30px_-6px_rgba(0,0,0,0.4)]"
                    }
                  `}
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

            {/* Mobile Menu Toggle */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2.5 rounded-full transition-all duration-300 ${
                isScrolled 
                  ? "text-[hsl(25,35%,25%)] hover:bg-[hsl(35,25%,92%)]" 
                  : "text-white hover:bg-white/10"
              }`}
              aria-label="Toggle menu"
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              style={{
                filter: isScrolled ? 'none' : 'drop-shadow(0 1px 6px rgba(0,0,0,0.5))'
              }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
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
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-20 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div 
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 top-0 bottom-0 w-[280px] bg-[hsl(35,28%,97%)] shadow-[-10px_0_40px_-10px_rgba(0,0,0,0.15)]"
            >
              <div className="p-6 pt-8 space-y-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 + 0.1, duration: 0.4 }}
                  >
                    <Link
                      to={link.path}
                      className={`flex items-center gap-3 text-lg font-medium py-4 px-4 rounded-xl transition-all duration-300 ${
                        location.pathname === link.path
                          ? "text-[hsl(30,50%,40%)] bg-[hsl(35,30%,92%)]"
                          : "text-[hsl(25,25%,30%)] hover:text-[hsl(30,50%,40%)] hover:bg-[hsl(35,25%,94%)] hover:pl-6"
                      }`}
                      style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.03em' }}
                    >
                      {location.pathname === link.path && (
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
    </>
  );
};

export default Header;