import { motion } from "framer-motion";
import { Sunrise, Moon, Calendar } from "lucide-react";

const timeSlots = [
  {
    icon: Sunrise,
    title: "Early Bird Breakfast",
    time: "From 7:00 AM",
    description: "Start your day with freshly brewed coffee and warm pastries",
    accent: "bg-gold/10",
  },
  {
    icon: Moon,
    title: "Late-Night Dining",
    time: "Until 2:00 AM",
    description: "Perfect for night owls, travellers, and those late-night cravings",
    accent: "bg-espresso/10",
  },
  {
    icon: Calendar,
    title: "Open Every Day",
    time: "7 Days a Week",
    description: "We're here for you, weekends and holidays included",
    accent: "bg-olive/10",
  },
];

const DiningHours = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      <div className="container-cafe relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-sm tracking-[0.2em] uppercase text-gold mb-4">
            Flexible Hours
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-6">
            Whenever You're Ready
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            From sunrise breakfasts to midnight snacks — our doors are always open.
          </p>
        </motion.div>

        {/* Timeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {timeSlots.map((slot, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              {/* Card */}
              <div className="relative p-8 rounded-2xl bg-background border border-border/50 shadow-soft h-full">
                {/* Time Badge */}
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${slot.accent} mb-6`}>
                  <slot.icon className="w-4 h-4 text-foreground" />
                  <span className="text-sm font-medium text-foreground">{slot.time}</span>
                </div>

                <h3 className="font-serif text-2xl font-medium text-foreground mb-3">
                  {slot.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {slot.description}
                </p>

                {/* Clock Visual */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full border-2 border-border/20 opacity-20" />
                <div className="absolute -bottom-2 -right-2 w-16 h-16 rounded-full border border-gold/20 opacity-30" />
              </div>

              {/* Connector Line (hidden on mobile) */}
              {index < timeSlots.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-border to-transparent" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom accent */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"
        />
      </div>
    </section>
  );
};

export default DiningHours;
