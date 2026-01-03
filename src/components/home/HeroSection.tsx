import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-cafe.jpg";
import { CoffeeCup, CroissantSketch } from "@/components/illustrations/CafeLineArt";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // 3D spatial zoom transforms
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const z = useTransform(scrollYProgress, [0, 1], [0, -500]);
  
  // Text layers move at different speeds for depth
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const subtitleY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const buttonsY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const welcomeY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  
  // Decorative elements depth
  const leftDoodleX = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const rightDoodleX = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const doodleScale = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {/* Background Image with zoom effect */}
      <motion.div 
        className="absolute inset-0"
        style={{ 
          scale,
          transformStyle: "preserve-3d",
        }}
      >
        <img
          src={heroImage}
          alt="Cozy RD CAFE interior with warm lighting"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay" />
      </motion.div>

      {/* Decorative Line Art Elements with parallax depth */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{ 
          x: leftDoodleX, 
          scale: doodleScale,
          opacity 
        }}
        className="absolute left-8 md:left-16 top-1/3 pointer-events-none"
      >
        <CoffeeCup className="w-20 md:w-28 h-auto text-primary-foreground" strokeWidth={1} animate={true} />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ delay: 1.8, duration: 1 }}
        style={{ 
          x: rightDoodleX, 
          scale: doodleScale,
          opacity 
        }}
        className="absolute right-8 md:right-16 bottom-1/3 pointer-events-none"
      >
        <CroissantSketch className="w-24 md:w-32 h-auto text-primary-foreground" strokeWidth={1} animate={true} />
      </motion.div>

      {/* Content with 3D layered depth */}
      <motion.div 
        className="relative z-10 container-cafe text-center text-primary-foreground"
        style={{ 
          opacity,
          z,
          transformStyle: "preserve-3d",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mx-auto"
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{ y: welcomeY }}
            className="text-sm md:text-base tracking-[0.3em] uppercase mb-6 text-primary-foreground/80"
          >
            Welcome to
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{ y: titleY }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium mb-6"
          >
            RD CAFE
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{ y: subtitleY }}
            className="text-lg md:text-xl lg:text-2xl font-light text-primary-foreground/90 max-w-xl mx-auto mb-10 leading-relaxed"
          >
            Where every cup is a moment of calm. Experience warmth, comfort, and exceptional coffee.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            style={{ y: buttonsY }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button variant="hero" size="xl" asChild>
              <Link to="/menu">
                Explore Menu
                <ArrowRight size={18} />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="xl" 
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:border-primary-foreground/50"
              asChild
            >
              <Link to="/about">Our Story</Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center pt-2"
        >
          <div className="w-1.5 h-3 rounded-full bg-primary-foreground/50" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
