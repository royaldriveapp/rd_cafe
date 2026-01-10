import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Menu", path: "/menu" },
  { name: "Facilities", path: "/facilities" },
  { name: "Bookings", path: "/bookings" },
  { name: "About", path: "/about" },
  { name: "Gallery", path: "/gallery" },
  { name: "Contact", path: "/contact" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md shadow-soft border-b border-border/50"
            : "bg-gradient-to-b from-black/40 to-transparent"
        }`}
      >
        <nav className="container-cafe">
          <div className="flex items-center justify-between h-18 lg:h-22">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <motion.span 
                className={`text-2xl md:text-3xl font-semibold tracking-wide transition-all duration-500 ${
                  isScrolled 
                    ? "text-foreground" 
                    : "text-white"
                }`}
                style={{ 
                  fontFamily: "'Cormorant Garamond', serif",
                  textShadow: isScrolled ? 'none' : '0 2px 12px rgba(0,0,0,0.9), 0 4px 24px rgba(0,0,0,0.6)'
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                RD{" "}
                <span 
                  className={`transition-all duration-500 ${
                    isScrolled 
                      ? "text-primary" 
                      : "text-amber-400"
                  }`}
                  style={{ 
                    textShadow: isScrolled ? 'none' : '0 2px 12px rgba(0,0,0,0.9), 0 0 20px rgba(251, 191, 36, 0.4)'
                  }}
                >
                  CAFE
                </span>
              </motion.span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative text-sm font-medium tracking-wide transition-all duration-300 py-2 ${
                    location.pathname === link.path
                      ? isScrolled ? "text-primary" : "text-amber-400"
                      : isScrolled 
                        ? "text-muted-foreground hover:text-foreground" 
                        : "text-white/90 hover:text-white"
                  }`}
                  style={{
                    textShadow: isScrolled ? 'none' : '0 1px 8px rgba(0,0,0,0.8)'
                  }}
                >
                  <span className="relative z-10">{link.name}</span>
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="activeNav"
                      className={`absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full ${
                        isScrolled ? "bg-primary" : "bg-amber-400"
                      }`}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {location.pathname !== link.path && (
                    <span className={`absolute -bottom-0.5 left-0 w-full h-0.5 rounded-full origin-left scale-x-0 transition-transform duration-300 hover:scale-x-100 ${
                      isScrolled ? "bg-primary/50" : "bg-white/50"
                    }`} />
                  )}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Button 
                  variant="warm" 
                  asChild 
                  className={`transition-all duration-300 ${
                    !isScrolled && "shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50"
                  }`}
                >
                  <Link to="/contact">Visit Us</Link>
                </Button>
              </motion.div>
            </div>

            {/* Mobile Menu Toggle */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 transition-colors duration-300 ${
                isScrolled ? "text-foreground" : "text-white"
              }`}
              aria-label="Toggle menu"
              whileTap={{ scale: 0.9 }}
              style={{
                textShadow: isScrolled ? 'none' : '0 1px 8px rgba(0,0,0,0.8)'
              }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 top-18 z-40 lg:hidden bg-espresso"
          >
            <div className="container-cafe py-8 space-y-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <Link
                    to={link.path}
                    className={`block text-xl font-medium py-4 transition-all duration-300 border-b border-espresso-foreground/10 hover:pl-4 ${
                      location.pathname === link.path
                        ? "text-gold"
                        : "text-espresso-foreground hover:text-gold"
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <Button variant="warm" className="w-full mt-6" size="lg" asChild>
                  <Link to="/contact">Visit Us</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
