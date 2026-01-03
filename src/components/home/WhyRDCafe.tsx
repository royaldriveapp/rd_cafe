import { motion } from "framer-motion";
import { 
  Zap, 
  Car, 
  MapPin, 
  TreePine, 
  Baby, 
  Clock 
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "EV Charging Station",
    description: "Power up your electric vehicle while you enjoy your meal",
  },
  {
    icon: Car,
    title: "Vast Parking Space",
    description: "Ample parking for cars, bikes, and buses — stress-free arrival every time",
  },
  {
    icon: MapPin,
    title: "Highway Accessible",
    description: "Conveniently located right off the highway for easy access",
  },
  {
    icon: TreePine,
    title: "Silent & Peaceful",
    description: "Escape the noise and unwind in our tranquil environment",
  },
  {
    icon: Baby,
    title: "Kids Play Area",
    description: "Safe and fun play zone to keep little ones entertained",
  },
  {
    icon: Clock,
    title: "Modern Ordering",
    description: "State-of-the-art ordering and billing for a seamless experience",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const WhyRDCafe = () => {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-cafe">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-sm tracking-[0.2em] uppercase text-gold mb-4">
            Why Choose Us
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-6">
            What Makes RD CAFE Different
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            More than just a café — we've created a destination designed for your comfort and convenience.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative p-8 rounded-2xl bg-background border border-border/50 hover:border-gold/30 hover:shadow-card transition-all duration-400"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors duration-300">
                <feature.icon className="w-7 h-7 text-gold" />
              </div>
              
              {/* Content */}
              <h3 className="font-serif text-xl font-medium text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Subtle accent line */}
              <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyRDCafe;
