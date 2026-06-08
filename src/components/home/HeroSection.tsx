import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/bookings-lounge.jpg";

const HeroSection = () => {
  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={heroImage}
          alt=""
          className="h-full w-full object-cover"
          loading="eager"
          fetchpriority="high"
          decoding="async"
          width={1920}
          height={1080}
          role="presentation"
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute inset-0 hero-grain opacity-70 mix-blend-soft-light" />
      </div>

      <div className="relative z-10 flex min-h-screen w-full items-center">
        <div className="container-cafe">
          <div className="hero-copy max-w-[640px] text-center text-primary-foreground md:text-left">
            <p className="hero-tagline font-display">Where every visit is an occasion.</p>

            <h1
              id="hero-heading"
              className="hero-title font-serif"
            >
              RD CAFÉ
            </h1>

            <p className="hero-subtext font-sohne">
              Private lounges. Business facilities. Signature offerings.
            </p>

            <div className="hero-actions">
              <Link to="/menu" className="hero-cta-primary font-sohne">
                <span>Explore the Menu</span>
                <ArrowRight size={18} aria-hidden="true" />
              </Link>

              <Link to="/about" className="hero-cta-secondary font-sohne">
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 sm:block"
        aria-hidden="true"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-[#F5ECD7]/28 pt-2 animate-[float-reverse_1.5s_ease-in-out_infinite]">
          <div className="h-3 w-1.5 rounded-full bg-[#C49A3C]/70" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
