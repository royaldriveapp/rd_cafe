import { memo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DoorOpen, Car, Zap, ShieldCheck, Clock, Award, ArrowRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { staggerContainer, fadeUpVariants, viewportOnceSmall } from "@/lib/animations";

const features = [
  { icon: DoorOpen, title: "Private Lounges & Boardroom", description: "Rentable spaces for meetings, events, or quiet gatherings" },
  { icon: Car, title: "Ample Parking", description: "Spacious parking for cars, bikes, and buses—arrive with ease" },
  { icon: Zap, title: "EV Charging", description: "Charge your electric vehicle while you dine" },
  { icon: ShieldCheck, title: "24/7 Security", description: "A safe, secure environment for you and your family" },
  { icon: Clock, title: "7 AM – 2 AM", description: "Extended hours for early mornings and late evenings" },
  { icon: Award, title: "Premium Ingredients", description: "Thoughtfully sourced, free from artificial additives" },
] as const;

interface FeatureCardProps {
  icon: typeof DoorOpen;
  title: string;
  description: string;
}

const FeatureCard = memo(({ icon: Icon, title, description }: FeatureCardProps) => (
  <motion.article
    variants={fadeUpVariants}
    className="group p-5 md:p-6 card-feature-gradient card-interactive text-center"
  >
    <div className="w-12 h-12 mx-auto rounded-xl bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors duration-300" aria-hidden="true">
      <Icon className="w-6 h-6 text-gold icon-bounce" aria-hidden="true" />
    </div>
    <h3 className="font-serif text-base md:text-lg font-medium text-foreground mb-2">
      {title}
    </h3>
    <p className="text-muted-foreground text-sm leading-relaxed">
      {description}
    </p>
  </motion.article>
));

FeatureCard.displayName = "FeatureCard";

const KeyFeatures = () => {
  return (
    <section className="section-padding bg-secondary/30" aria-labelledby="facilities-heading">
      <div className="container-cafe">
        <SectionHeader
          label="Our Facilities"
          title="Designed for Your Comfort"
          description="Private spaces, modern conveniences, and thoughtful amenities for every guest."
          showDecorativeLine
          className="mb-12"
          headingId="facilities-heading"
        />

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnceSmall}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 mb-12"
          role="list"
          aria-label="Café facilities and amenities"
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
          <Button variant="outline" size="lg" asChild className="group glow-hover">
            <Link to="/facilities">
              View All Facilities
              <ArrowRight className="w-4 h-4 ml-2 arrow-slide" aria-hidden="true" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(KeyFeatures);