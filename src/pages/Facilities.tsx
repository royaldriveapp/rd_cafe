import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  Car, 
  MapPin, 
  TreePine, 
  Baby, 
  Clock,
  DoorOpen,
  Heart,
  Moon,
  ShieldCheck,
  Sunrise,
  Calendar,
  Award,
  Ban,
  Leaf,
  Sparkles,
  Users,
  ArrowRight
} from "lucide-react";

const convenienceFeatures = [
  {
    icon: MapPin,
    title: "Highway Accessible",
    description: "Conveniently located right off the highway for easy access — perfect for travellers and locals alike.",
  },
  {
    icon: Car,
    title: "Vast Parking Space",
    description: "Ample parking for cars, bikes, and buses. Stress-free arrival every time, no matter your vehicle.",
  },
  {
    icon: Zap,
    title: "EV Charging Station",
    description: "Power up your electric vehicle while you enjoy your meal — modern convenience for eco-conscious guests.",
  },
  {
    icon: Clock,
    title: "Modern Ordering System",
    description: "State-of-the-art ordering and billing for a seamless, efficient dining experience.",
  },
];

const comfortFeatures = [
  {
    icon: DoorOpen,
    title: "Private Lounges & Boardroom",
    description: "Exclusive spaces available for hourly or daily rental — perfect for meetings, events, or private gatherings.",
    highlight: "Book for your next event",
  },
  {
    icon: Heart,
    title: "Feeding Room",
    description: "A comfortable, private space for nursing mothers — because every guest deserves care and convenience.",
    highlight: "Designed for comfort",
  },
  {
    icon: Moon,
    title: "Prayer Room",
    description: "A dedicated, serene space for prayer and reflection, available to all guests throughout the day.",
    highlight: "Open to all faiths",
  },
  {
    icon: ShieldCheck,
    title: "24/7 Security",
    description: "Round-the-clock security ensures a safe environment for you and your family, day or night.",
    highlight: "Your safety, our priority",
  },
];

const diningHours = [
  {
    icon: Sunrise,
    title: "Early Bird Breakfast",
    time: "From 7:00 AM",
    description: "Start your day with freshly brewed coffee and warm pastries",
  },
  {
    icon: Moon,
    title: "Late-Night Dining",
    time: "Until 2:00 AM",
    description: "Perfect for night owls, travellers, and those late-night cravings",
  },
  {
    icon: Calendar,
    title: "Open Every Day",
    time: "7 Days a Week",
    description: "We're here for you, weekends and holidays included",
  },
];

const qualityPrinciples = [
  {
    icon: Award,
    title: "Premium Ingredients",
    description: "We source only the finest, high-quality imported ingredients to ensure exceptional taste.",
  },
  {
    icon: Ban,
    title: "No Artificial Flavours",
    description: "We never use artificial tastemakers or flavour enhancers — just pure, authentic taste.",
  },
  {
    icon: Leaf,
    title: "Fresh & Natural",
    description: "From farm to table, we prioritize freshness and natural goodness in every preparation.",
  },
  {
    icon: Sparkles,
    title: "Crafted with Care",
    description: "Every dish is thoughtfully prepared by our skilled chefs who take pride in their craft.",
  },
];

const familyFeatures = [
  {
    icon: Baby,
    title: "Kids Play Area",
    description: "A safe and fun play zone to keep little ones entertained while you relax and enjoy your meal.",
  },
  {
    icon: Users,
    title: "Family-Friendly Dining",
    description: "Spacious seating and a welcoming atmosphere designed for families of all sizes.",
  },
  {
    icon: TreePine,
    title: "Peaceful Environment",
    description: "Escape the noise and unwind in our tranquil, beautifully landscaped surroundings.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

const Facilities = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-b from-secondary/50 to-background">
        <div className="container-cafe text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm tracking-[0.2em] uppercase text-gold mb-4"
          >
            Facilities & Experiences
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-6"
          >
            Everything You Need
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto"
          >
            Discover all the amenities and services that make RD CAFE more than just a dining destination.
          </motion.p>
        </div>
      </section>

      {/* Convenience & Accessibility */}
      <section className="section-padding">
        <div className="container-cafe">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <p className="text-sm tracking-[0.2em] uppercase text-gold mb-3">Convenience</p>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground">
              Easy Access & Modern Amenities
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {convenienceFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex gap-5 p-6 rounded-2xl bg-secondary/40 border border-border/50"
              >
                <div className="w-14 h-14 flex-shrink-0 rounded-xl bg-gold/10 flex items-center justify-center">
                  <feature.icon className="w-7 h-7 text-gold" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-medium text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Dining Hours */}
      <section className="section-padding bg-secondary/30">
        <div className="container-cafe">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-sm tracking-[0.2em] uppercase text-gold mb-3">Flexible Hours</p>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground">
              Open When You Need Us
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {diningHours.map((slot, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center p-8 rounded-2xl bg-background border border-border/50"
              >
                <div className="w-14 h-14 mx-auto rounded-full bg-gold/10 flex items-center justify-center mb-4">
                  <slot.icon className="w-7 h-7 text-gold" />
                </div>
                <p className="text-sm font-medium text-gold mb-2">{slot.time}</p>
                <h3 className="font-serif text-xl font-medium text-foreground mb-2">
                  {slot.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {slot.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Comfort & Private Spaces */}
      <section className="section-padding bg-espresso text-espresso-foreground">
        <div className="container-cafe">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-sm tracking-[0.2em] uppercase text-gold mb-3">Comfort & Privacy</p>
            <h2 className="font-serif text-3xl md:text-4xl font-medium">
              Thoughtfully Designed Spaces
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {comfortFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex gap-5 p-6 rounded-2xl bg-espresso-foreground/5 border border-espresso-foreground/10"
              >
                <div className="w-14 h-14 flex-shrink-0 rounded-xl bg-gold/20 flex items-center justify-center">
                  <feature.icon className="w-7 h-7 text-gold" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-medium mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-espresso-foreground/70 leading-relaxed mb-2">
                    {feature.description}
                  </p>
                  <span className="text-sm text-gold font-medium">{feature.highlight}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Family Focus */}
      <section className="section-padding">
        <div className="container-cafe">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-sm tracking-[0.2em] uppercase text-gold mb-3">Family-Friendly</p>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground">
              A Place for Everyone
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {familyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center p-8 rounded-2xl bg-secondary/40 border border-border/50"
              >
                <div className="w-14 h-14 mx-auto rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-serif text-xl font-medium text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quality Standards */}
      <section className="section-padding bg-gradient-to-b from-secondary/30 to-background">
        <div className="container-cafe">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-sm tracking-[0.2em] uppercase text-gold mb-3">Quality Standards</p>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground">
              Purity You Can Trust
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {qualityPrinciples.map((principle, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-6 rounded-2xl bg-background border border-border/50"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                  <principle.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-serif text-lg font-medium text-foreground mb-2">
                  {principle.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-espresso text-espresso-foreground">
        <div className="container-cafe text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-medium mb-4">
              Ready to Experience RD CAFE?
            </h2>
            <p className="text-espresso-foreground/80 text-lg mb-8 max-w-xl mx-auto">
              Plan your visit today and discover why we're the perfect stop for families, travellers, and food lovers.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="gold" size="lg" asChild>
                <Link to="/contact">
                  Get Directions
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="border-espresso-foreground/30 text-espresso-foreground hover:bg-espresso-foreground/10">
                <Link to="/menu">View Menu</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Facilities;
