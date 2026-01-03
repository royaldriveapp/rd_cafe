import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  Car, 
  TreePine, 
  Baby, 
  Clock,
  Utensils,
  ArrowRight 
} from "lucide-react";

const features = [
  {
    icon: Car,
    title: "Highway Access & Parking",
    description: "Right off the highway with vast parking for cars, bikes & buses",
  },
  {
    icon: Zap,
    title: "EV Charging",
    description: "Power up your electric vehicle while you dine",
  },
  {
    icon: TreePine,
    title: "Peaceful Ambience",
    description: "Escape the noise in our tranquil environment",
  },
  {
    icon: Baby,
    title: "Family-Friendly",
    description: "Safe kids play area & comfortable spaces for all",
  },
  {
    icon: Clock,
    title: "7 AM – 2 AM",
    description: "Extended hours for early birds & night owls",
  },
  {
    icon: Utensils,
    title: "Quality-First Food",
    description: "Premium ingredients, no artificial additives",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
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

const KeyFeatures = () => {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-cafe">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <p className="text-sm tracking-[0.2em] uppercase text-gold mb-4">
            Why Choose Us
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-4">
            What Makes RD CAFE Different
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            More than just a café — a destination designed for your comfort.
          </p>
        </motion.div>

        {/* Compact Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 mb-12"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group p-5 md:p-6 rounded-2xl bg-background border border-border/50 hover:border-gold/30 hover:shadow-card transition-all duration-300 text-center"
            >
              {/* Icon */}
              <div className="w-12 h-12 mx-auto rounded-xl bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors duration-300">
                <feature.icon className="w-6 h-6 text-gold" />
              </div>
              
              {/* Content */}
              <h3 className="font-serif text-base md:text-lg font-medium text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <Button variant="outline" size="lg" asChild className="group">
            <Link to="/facilities">
              Explore All Facilities
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default KeyFeatures;
