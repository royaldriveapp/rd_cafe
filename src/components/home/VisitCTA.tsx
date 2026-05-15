import { memo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { fadeUp } from "@/lib/animations";
import { useSiteSettings } from "@/hooks/useContent";
import { getContentIcon } from "@/lib/contentIcons";
import { RD_CAFE_MAPS_URL } from "@/data/siteContent";

const cardVariants = fadeUp(30, 0.8);

interface InfoCardProps {
  icon: typeof MapPin;
  title: string;
  children: React.ReactNode;
}

const InfoCard = memo(({ icon: Icon, title, children }: InfoCardProps) => (
  <div className="group card-gradient-dark card-interactive p-5 sm:p-6 lg:p-8">
    <div className="flex items-start gap-4 relative z-10">
      <div className="p-3 rounded-xl bg-gold/20 transition-colors duration-300 group-hover:bg-gold/30">
        <Icon className="text-gold icon-bounce" size={24} />
      </div>
      <div>
        <h3 className="mb-2 font-serif text-lg text-espresso-foreground sm:text-xl">{title}</h3>
        <div className="text-sm leading-7 text-espresso-foreground/70 sm:text-base">{children}</div>
      </div>
    </div>
  </div>
));

InfoCard.displayName = "InfoCard";

const VisitCTA = () => {
  const { data: siteSettings } = useSiteSettings();
  if (!siteSettings) return null;

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
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          {/* Content */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <span className="mb-4 block text-sm uppercase tracking-[0.24em] text-gold sm:tracking-[0.3em]">
              {siteSettings.visitCta.eyebrow}
            </span>
            <h2 className="mb-6 font-serif text-[2.65rem] leading-[0.98] sm:text-5xl lg:mb-8 lg:text-6xl">
              {siteSettings.visitCta.title} <span className="text-gold italic">{siteSettings.visitCta.highlightedText}</span>
            </h2>
            <p className="mx-auto mb-8 max-w-lg text-base leading-relaxed text-espresso-foreground/70 sm:text-lg lg:mx-0 lg:mb-10">
              {siteSettings.visitCta.description}
            </p>
            
            <Button variant="hero" size="xl" asChild className="group glow-hover w-full sm:w-auto">
              <a
                href={siteSettings.visitCta.buttonLink || RD_CAFE_MAPS_URL}
                target="_blank"
                rel="noreferrer"
              >
                {siteSettings.visitCta.buttonLabel}
                <ArrowRight size={18} className="arrow-slide" />
              </a>
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
            {siteSettings.visitCta.infoCards.map((card) => {
              const Icon = getContentIcon(card.iconKey) as typeof MapPin;
              return (
                <InfoCard key={card.title} icon={Icon} title={card.title}>
                  <div className="space-y-1">
                    {card.lines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </InfoCard>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default memo(VisitCTA);
