import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Users, TreePine, Clock, ArrowRight } from "lucide-react";

const highlights = [
  { icon: Users, text: "Family-friendly dining" },
  { icon: Heart, text: "Safe kids play area" },
  { icon: TreePine, text: "Peaceful atmosphere" },
  { icon: Clock, text: "Perfect for long stays" },
];

const FamilyFocus = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-secondary/30 via-background to-background">
      <div className="container-cafe">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm tracking-[0.2em] uppercase text-gold mb-4">
              A Place for Everyone
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-6">
              Bring the Whole Family
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto mb-12">
              RD CAFE is designed with families in mind. Whether you're celebrating a milestone, 
              catching up with loved ones, or simply enjoying a peaceful meal together — 
              we've created the perfect space for you.
            </p>
          </motion.div>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12"
          >
            {highlights.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-5 py-3 rounded-full bg-background border border-border/50 shadow-soft"
              >
                <item.icon className="w-5 h-5 text-gold" />
                <span className="text-sm font-medium text-foreground">{item.text}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button variant="warm" size="lg" asChild>
              <Link to="/contact">
                Plan Your Visit
                <ArrowRight size={18} />
              </Link>
            </Button>
          </motion.div>

          {/* Decorative Elements */}
          <div className="relative mt-16">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"
            />
            
            {/* Floating badges */}
            <div className="flex justify-center gap-8 mt-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="flex flex-col items-center"
              >
                <span className="text-3xl font-serif font-medium text-primary">7+</span>
                <span className="text-xs text-muted-foreground uppercase tracking-wide">Years Trusted</span>
              </motion.div>
              <div className="w-px bg-border" />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="flex flex-col items-center"
              >
                <span className="text-3xl font-serif font-medium text-primary">1000+</span>
                <span className="text-xs text-muted-foreground uppercase tracking-wide">Happy Families</span>
              </motion.div>
              <div className="w-px bg-border" />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.7 }}
                className="flex flex-col items-center"
              >
                <span className="text-3xl font-serif font-medium text-primary">24/7</span>
                <span className="text-xs text-muted-foreground uppercase tracking-wide">Safe & Secure</span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FamilyFocus;
