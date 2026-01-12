import { Link } from "react-router-dom";
import { Instagram, Facebook, MapPin, Phone, Mail, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-espresso text-espresso-foreground" role="contentinfo">
      <div className="container-cafe section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6" aria-label="RD CAFE - Go to homepage">
              <span className="font-serif text-3xl font-semibold tracking-tight">
                RD <span className="text-gold">CAFE</span>
              </span>
            </Link>
            <p className="text-espresso-foreground/70 leading-relaxed mb-6">
              A cozy haven where every cup tells a story. Experience warmth, comfort, and exceptional coffee.
            </p>
            <div className="flex gap-4" role="list" aria-label="Social media links">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-espresso-foreground/10 hover:bg-espresso-foreground/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-espresso"
                aria-label="Follow us on Instagram (opens in new tab)"
                role="listitem"
              >
                <Instagram size={20} aria-hidden="true" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-espresso-foreground/10 hover:bg-espresso-foreground/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-espresso"
                aria-label="Follow us on Facebook (opens in new tab)"
                role="listitem"
              >
                <Facebook size={20} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <nav aria-label="Footer navigation">
            <h2 className="font-serif text-lg mb-6">Explore</h2>
            <ul className="space-y-3">
              {["Home", "Menu", "About", "Gallery", "Contact"].map((link) => (
                <li key={link}>
                  <Link
                    to={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                    className="text-espresso-foreground/70 hover:text-espresso-foreground transition-colors focus-visible:outline-none focus-visible:underline focus-visible:text-espresso-foreground"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Hours */}
          <div>
            <h2 className="font-serif text-lg mb-6">Opening Hours</h2>
            <ul className="space-y-3 text-espresso-foreground/70" aria-label="Business hours">
              <li className="flex items-start gap-3">
                <Clock size={18} className="mt-0.5 text-gold flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-medium text-espresso-foreground">Monday to Friday</p>
                  <p>7:00 AM – 9:00 PM</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={18} className="mt-0.5 text-gold flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-medium text-espresso-foreground">Saturday to Sunday</p>
                  <p>8:00 AM – 10:00 PM</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="font-serif text-lg mb-6">Contact</h2>
            <address className="not-italic">
              <ul className="space-y-3 text-espresso-foreground/70">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="mt-0.5 text-gold flex-shrink-0" aria-hidden="true" />
                  <span>123 Cozy Lane, Downtown District, City 10001</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-gold flex-shrink-0" aria-hidden="true" />
                  <a 
                    href="tel:+15551234567" 
                    className="hover:text-espresso-foreground transition-colors focus-visible:outline-none focus-visible:underline"
                  >
                    +1 (555) 123-4567
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-gold flex-shrink-0" aria-hidden="true" />
                  <a 
                    href="mailto:hello@rdcafe.com"
                    className="hover:text-espresso-foreground transition-colors focus-visible:outline-none focus-visible:underline"
                  >
                    hello@rdcafe.com
                  </a>
                </li>
              </ul>
            </address>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-espresso-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-espresso-foreground/60">
            © {new Date().getFullYear()} RD CAFE. All rights reserved.
          </p>
          <p className="text-sm text-espresso-foreground/60">
            Crafted with love for coffee lovers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
