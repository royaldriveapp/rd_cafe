import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { TeapotAndCup, KitchenUtensils } from "@/components/illustrations/CafeLineArt";

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
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 block">
              Our Story
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight">
              A Place to Call <span className="text-primary italic">Home</span>
            </h2>
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              <p>
                Born from a passion for exceptional coffee and the belief that everyone deserves a cozy corner to call their own, RD CAFE opened its doors as a sanctuary from the busy world outside.
              </p>
              <p>
                Every detail—from our carefully sourced beans to the soft lighting that welcomes you—is designed to create moments of calm and connection.
              </p>
            </div>
            <div className="mt-10">
              <Button variant="outline" size="lg" asChild>
                <Link to="/about">
                  Read Our Full Story
                  <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Visual Element with Line Art */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
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
                  <p className="text-2xl md:text-3xl font-serif text-primary">Excellence</p>
                </motion.div>
              </div>
            </div>
            
            {/* Floating accent */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 w-24 h-24 rounded-2xl bg-caramel/20 backdrop-blur-sm border border-caramel/30"
            />
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-olive/15 backdrop-blur-sm border border-olive/25"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
