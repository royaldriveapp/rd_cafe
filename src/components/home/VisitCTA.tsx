import { memo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { fadeUp } from "@/lib/animations";

const cardVariants = fadeUp(30, 0.8);

interface InfoCardProps {
  icon: typeof MapPin;
  title: string;
  children: React.ReactNode;
}

const InfoCard = memo(({ icon: Icon, title, children }: InfoCardProps) => (
  <div className="p-6 lg:p-8 rounded-2xl bg-espresso-foreground/5 border border-espresso-foreground/10 backdrop-blur-sm">
    <div className="flex items-start gap-4">
      <div className="p-3 rounded-xl bg-gold/20">
        <Icon className="text-gold" size={24} />
      </div>
      <div>
        <h3 className="font-serif text-xl mb-2">{title}</h3>
        <div className="text-espresso-foreground/70">{children}</div>
      </div>
    </div>
  </div>
));

InfoCard.displayName = "InfoCard";

const VisitCTA = () => {
  return (
    <section className="section-padding bg-espresso text-espresso-foreground overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="200" cy="200" r="140" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="200" cy="200" r="100" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div className="container-cafe relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="text-sm tracking-[0.3em] uppercase text-gold mb-4 block">
              Visit Us
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight">
              Your Table is <span className="text-gold italic">Waiting</span>
            </h2>
            <p className="text-espresso-foreground/70 text-lg leading-relaxed mb-10 max-w-lg">
              Whether it's your morning ritual or an afternoon escape, we're here to make every visit memorable. Come experience the warmth of RD CAFE.
            </p>
            
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">
                Get Directions
                <ArrowRight size={18} />
              </Link>
            </Button>
          </motion.div>

          {/* Info Cards */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <InfoCard icon={MapPin} title="Location">
              <p>
                123 Cozy Lane, Downtown District<br />
                City 10001
              </p>
            </InfoCard>

            <InfoCard icon={Clock} title="Opening Hours">
              <div className="space-y-1">
                <p>Mon - Fri: 7:00 AM - 9:00 PM</p>
                <p>Sat - Sun: 8:00 AM - 10:00 PM</p>
              </div>
            </InfoCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default memo(VisitCTA);
