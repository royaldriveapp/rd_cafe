import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import heroImage from "@/assets/hero-cafe.jpg";

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="RD CAFE Interior"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        </div>
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
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding">
        <div className="container-cafe">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8 text-lg leading-relaxed"
            >
              <div className="text-center mb-16">
                <h2 className="font-serif text-4xl md:text-5xl mb-8">
                  Where Every Cup Tells a <span className="text-primary italic">Story</span>
                </h2>
              </div>
              
              <p className="text-muted-foreground">
                RD CAFE was born from a simple belief: that everyone deserves a place where they can pause, breathe, and savor the moment. In 2020, amidst a world that seemed to be moving faster than ever, we opened our doors as a sanctuary—a cozy corner where time slows down.
              </p>
              
              <p className="text-muted-foreground">
                Our founders, passionate about both exceptional coffee and creating meaningful spaces, designed every element of RD CAFE with intention. From the soft lighting that welcomes you at the door to the carefully curated playlist that sets the mood, every detail is crafted to make you feel at home.
              </p>

              <blockquote className="border-l-4 border-primary pl-6 py-4 my-12 italic text-xl font-serif text-foreground">
                "We don't just serve coffee. We serve comfort, connection, and a moment of calm in your busy day."
              </blockquote>

              <p className="text-muted-foreground">
                Our coffee is sourced from sustainable farms around the world, roasted locally in small batches to ensure peak freshness. But beyond the beans, it's the care and attention our baristas put into every cup that makes the difference.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-secondary/30">
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
                className="p-8 rounded-2xl bg-card border border-border/50 shadow-soft text-center"
              >
                <span className="text-5xl mb-6 block">{value.icon}</span>
                <h3 className="font-serif text-2xl mb-4">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Quote */}
      <section className="section-padding bg-espresso text-espresso-foreground">
        <div className="container-cafe text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <p className="font-serif text-3xl md:text-4xl lg:text-5xl leading-relaxed mb-8 italic">
              "We don't just make coffee. We craft experiences that become cherished rituals."
            </p>
            <p className="text-gold text-lg">— The RD CAFE Team</p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
