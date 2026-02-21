import { memo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { TeapotAndCup, KitchenUtensils } from "@/components/illustrations/CafeLineArt";
import { slideIn, viewportOnce } from "@/lib/animations";

const AboutPreview = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Decorative Line Art - Left side */}
      <div className="absolute left-0 top-1/4 opacity-[0.06] -translate-x-1/3 pointer-events-none">
        <TeapotAndCup className="w-80 h-auto text-foreground" strokeWidth={2} />
      </div>
      
      {/* Decorative Line Art - Right side */}
      <div className="absolute right-0 bottom-1/4 opacity-[0.06] translate-x-1/3 pointer-events-none">
        <KitchenUtensils className="w-48 h-auto text-foreground" strokeWidth={2} />
      </div>

      <div className="container-cafe relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div
            variants={slideIn("left")}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 block">
              Our Philosophy
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight">
              Crafted with <span className="text-primary italic">Care</span>
            </h2>
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              <p>
                At RD CAFE, we believe in doing things thoughtfully—sourcing only the finest ingredients, preparing each dish with intention, and creating a space where guests feel genuinely welcomed.
              </p>
              <p>
                From our signature beverages to our private lounges, every detail reflects our commitment to quality, warmth, and lasting impressions.
              </p>
            </div>
            <div className="mt-10">
              <Button variant="outline" size="lg" asChild className="group glow-hover">
                <Link to="/about">
                  Learn More About Us
                  <ArrowRight size={16} className="arrow-slide" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Visual Element with Line Art */}
          <motion.div
            variants={slideIn("right")}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-elevated bg-gradient-to-br from-cream to-secondary/50 border border-border/30">
              {/* Animated Line Art Illustration */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                <TeapotAndCup 
                  className="w-full max-w-xs h-auto text-primary/60 mb-6" 
                  strokeWidth={1.2}
                  animate={true}
                />
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.5, duration: 0.6 }}
                  className="text-center"
                >
                  <span className="text-7xl md:text-8xl font-serif text-primary mb-2 block">5</span>
                  <p className="text-lg md:text-xl font-serif text-foreground/80">Years of</p>
                  <p className="text-2xl md:text-3xl font-serif text-primary">Trusted Excellence</p>
                </motion.div>
              </div>
            </div>
            
            {/* Floating accents */}
            <div
              className="absolute -bottom-6 -left-6 w-24 h-24 rounded-2xl bg-caramel/20 backdrop-blur-sm border border-caramel/30 animate-[float-slow_4s_ease-in-out_infinite]"
            />
            <div
              className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-olive/15 backdrop-blur-sm border border-olive/25 animate-[float-reverse_3.5s_ease-in-out_0.5s_infinite]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default memo(AboutPreview);