import { motion } from "framer-motion";
import { 
  DoorOpen, 
  Heart, 
  Moon as MoonIcon,
  ShieldCheck 
} from "lucide-react";

const amenities = [
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
    icon: MoonIcon,
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

const ComfortAmenities = () => {
  return (
    <section className="section-padding bg-espresso text-espresso-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

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
            Thoughtfully Designed
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium mb-6">
            Comfort for Every Guest
          </h2>
          <p className="text-espresso-foreground/80 text-lg leading-relaxed">
            We've thought of everything — private spaces, family-friendly amenities, and a safe environment for all.
          </p>
        </motion.div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {amenities.map((amenity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex gap-6 p-6 lg:p-8 rounded-2xl bg-espresso-foreground/5 border border-espresso-foreground/10 hover:bg-espresso-foreground/10 hover:border-gold/20 transition-all duration-300"
            >
              {/* Icon */}
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gold/20 flex items-center justify-center group-hover:bg-gold/30 transition-colors duration-300">
                <amenity.icon className="w-7 h-7 text-gold" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="font-serif text-xl font-medium mb-2">
                  {amenity.title}
                </h3>
                <p className="text-espresso-foreground/70 leading-relaxed mb-3">
                  {amenity.description}
                </p>
                <span className="inline-block text-sm text-gold font-medium">
                  {amenity.highlight}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComfortAmenities;
