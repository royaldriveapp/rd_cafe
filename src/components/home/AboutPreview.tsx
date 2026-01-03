import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const AboutPreview = () => {
  return (
    <section className="section-padding">
      <div className="container-cafe">
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

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-elevated">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-caramel/30" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <span className="text-8xl md:text-9xl font-serif text-primary mb-4">5</span>
                <p className="text-xl md:text-2xl font-serif text-foreground mb-2">Years of</p>
                <p className="text-3xl md:text-4xl font-serif text-primary">Excellence</p>
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
