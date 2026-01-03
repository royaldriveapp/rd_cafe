import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Layout from "@/components/layout/Layout";
import heroImage from "@/assets/hero-cafe.jpg";
import { CoffeeCup, CroissantSketch, TeapotAndCup, DecorativeLine } from "@/components/illustrations/CafeLineArt";
import { CoffeeBeans, LeafSprig } from "@/components/illustrations/CoffeeBeans";
import CoffeeScrollIndicator from "@/components/illustrations/CoffeeScrollIndicator";

const About = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  
  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [0.2, 0.05]);

  return (
    <Layout>
      <CoffeeScrollIndicator />
      
      {/* Hero */}
      <section ref={heroRef} className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: heroImageY }}
        >
          <motion.img
            src={heroImage}
            alt="RD CAFE Interior"
            className="w-full h-full object-cover"
            style={{ opacity: heroOpacity }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        </motion.div>
        
        {/* Decorative doodles */}
        <CoffeeCup 
          className="absolute top-24 left-8 w-16 h-20 text-primary/15 hidden lg:block" 
          strokeWidth={1}
        />
        <CroissantSketch 
          className="absolute top-32 right-12 w-24 h-12 text-primary/15 hidden lg:block" 
          strokeWidth={1}
        />
        
        <div className="container-cafe relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 block">
              Our Story
            </span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-6">
              About RD CAFE
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              More than coffee. A place where moments become memories.
            </p>
            
            {/* Decorative line under heading */}
            <DecorativeLine 
              className="w-48 h-4 mx-auto mt-8 text-primary/40" 
              strokeWidth={1.5}
            />
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding relative">
        {/* Background doodles */}
        <CoffeeBeans 
          className="absolute top-20 right-8 w-20 h-24 text-primary/10 hidden lg:block" 
          strokeWidth={1}
        />
        <LeafSprig 
          className="absolute bottom-32 left-4 w-16 h-20 text-primary/10 hidden lg:block" 
          strokeWidth={1}
        />
        
        <div className="container-cafe">
          <div className="max-w-4xl mx-auto relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="space-y-8 text-lg leading-relaxed"
            >
              <div className="text-center mb-16 relative">
                <motion.h2 
                  className="font-serif text-4xl md:text-5xl mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  Where Every Cup Tells a <span className="text-primary italic">Story</span>
                </motion.h2>
                
                {/* Doodle accent */}
                <TeapotAndCup 
                  className="absolute -right-16 top-0 w-32 h-20 text-primary/15 hidden xl:block" 
                  strokeWidth={1}
                />
              </div>
              
              <motion.p 
                className="text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                RD CAFE was born from a simple belief: that everyone deserves a place where they can pause, breathe, and savor the moment. In 2020, amidst a world that seemed to be moving faster than ever, we opened our doors as a sanctuary—a cozy corner where time slows down.
              </motion.p>
              
              <motion.p 
                className="text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Our founders, passionate about both exceptional coffee and creating meaningful spaces, designed every element of RD CAFE with intention. From the soft lighting that welcomes you at the door to the carefully curated playlist that sets the mood, every detail is crafted to make you feel at home.
              </motion.p>

              <motion.blockquote 
                className="border-l-4 border-primary pl-6 py-4 my-12 italic text-xl font-serif text-foreground relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.25 }}
              >
                "We don't just serve coffee. We serve comfort, connection, and a moment of calm in your busy day."
                
                {/* Small doodle accent */}
                <CoffeeCup 
                  className="absolute -right-4 -bottom-4 w-10 h-12 text-primary/20 hidden md:block" 
                  strokeWidth={1}
                  animate={false}
                />
              </motion.blockquote>

              <motion.p 
                className="text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Our coffee is sourced from sustainable farms around the world, roasted locally in small batches to ensure peak freshness. But beyond the beans, it's the care and attention our baristas put into every cup that makes the difference.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-secondary/30 relative overflow-hidden">
        {/* Background doodle */}
        <CroissantSketch 
          className="absolute top-16 left-8 w-28 h-14 text-primary/10 hidden lg:block" 
          strokeWidth={1}
        />
        
        <div className="container-cafe">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 block">
              What We Stand For
            </span>
            <h2 className="font-serif text-4xl md:text-5xl">Our Values</h2>
            <DecorativeLine 
              className="w-32 h-3 mx-auto mt-6 text-primary/30" 
              strokeWidth={1}
            />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Quality First",
                description: "Every ingredient, every process, every detail is held to the highest standard. We never compromise on quality.",
                icon: "☕",
              },
              {
                title: "Warm Welcome",
                description: "You're not just a customer—you're part of our family. We create spaces where everyone belongs.",
                icon: "🏠",
              },
              {
                title: "Sustainable Future",
                description: "From ethically sourced beans to eco-friendly packaging, we're committed to doing right by our planet.",
                icon: "🌱",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="p-8 rounded-2xl bg-card border border-border/50 shadow-soft text-center group hover:shadow-lg transition-shadow duration-300"
              >
                <motion.span 
                  className="text-5xl mb-6 block"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {value.icon}
                </motion.span>
                <h3 className="font-serif text-2xl mb-4">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Quote */}
      <section className="section-padding bg-espresso text-espresso-foreground relative overflow-hidden">
        {/* Decorative elements */}
        <CoffeeBeans 
          className="absolute top-8 left-12 w-16 h-20 text-gold/20 hidden lg:block" 
          strokeWidth={1}
        />
        <LeafSprig 
          className="absolute bottom-8 right-12 w-14 h-18 text-gold/20 hidden lg:block" 
          strokeWidth={1}
        />
        
        <div className="container-cafe text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <motion.p 
              className="font-serif text-3xl md:text-4xl lg:text-5xl leading-relaxed mb-8 italic"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              "We don't just make coffee. We craft experiences that become cherished rituals."
            </motion.p>
            <motion.p 
              className="text-gold text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              — The RD CAFE Team
            </motion.p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
