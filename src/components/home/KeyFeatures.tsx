import { memo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap, Car, TreePine, Baby, Clock, Utensils, ArrowRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { staggerContainer, fadeUpVariants, viewportOnceSmall } from "@/lib/animations";

const features = [
  { icon: Car, title: "Highway Access & Parking", description: "Right off the highway with vast parking for cars, bikes & buses" },
  { icon: Zap, title: "EV Charging", description: "Power up your electric vehicle while you dine" },
  { icon: TreePine, title: "Peaceful Ambience", description: "Escape the noise in our tranquil environment" },
  { icon: Baby, title: "Family-Friendly", description: "Safe kids play area & comfortable spaces for all" },
  { icon: Clock, title: "7 AM – 2 AM", description: "Extended hours for early birds & night owls" },
  { icon: Utensils, title: "Quality-First Food", description: "Premium ingredients, no artificial additives" },
] as const;

interface FeatureCardProps {
  icon: typeof Car;
  title: string;
  description: string;
}

const FeatureCard = memo(({ icon: Icon, title, description }: FeatureCardProps) => (
  <motion.div
    variants={fadeUpVariants}
    className="group p-5 md:p-6 rounded-2xl bg-background border border-border/50 hover:border-gold/30 hover:shadow-card transition-all duration-300 text-center"
  >
    <div className="w-12 h-12 mx-auto rounded-xl bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors duration-300">
      <Icon className="w-6 h-6 text-gold" />
    </div>
    <h3 className="font-serif text-base md:text-lg font-medium text-foreground mb-2">
      {title}
    </h3>
    <p className="text-muted-foreground text-sm leading-relaxed">
      {description}
    </p>
  </motion.div>
));

FeatureCard.displayName = "FeatureCard";

const KeyFeatures = () => {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-cafe">
        <SectionHeader
          label="Why Choose Us"
          title="What Makes RD CAFE Different"
          description="More than just a café — a destination designed for your comfort."
          showDecorativeLine
          className="mb-12"
        />

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnceSmall}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 mb-12"
        >
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </motion.div>

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

export default memo(KeyFeatures);
