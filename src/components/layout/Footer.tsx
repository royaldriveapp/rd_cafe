import { Link } from "react-router-dom";
import { Instagram, Facebook, MapPin, Phone, Mail, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-espresso text-espresso-foreground">
      <div className="container-cafe section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <span className="font-serif text-3xl font-semibold tracking-tight">
                RD <span className="text-gold">CAFE</span>
              </span>
            </Link>
            <p className="text-espresso-foreground/70 leading-relaxed mb-6">
              A cozy haven where every cup tells a story. Experience warmth, comfort, and exceptional coffee.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-espresso-foreground/10 hover:bg-espresso-foreground/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-espresso-foreground/10 hover:bg-espresso-foreground/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg mb-6">Explore</h4>
            <ul className="space-y-3">
              {["Home", "Menu", "About", "Gallery", "Contact"].map((link) => (
                <li key={link}>
                  <Link
                    to={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                    className="text-espresso-foreground/70 hover:text-espresso-foreground transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-serif text-lg mb-6">Opening Hours</h4>
            <ul className="space-y-3 text-espresso-foreground/70">
              <li className="flex items-start gap-3">
                <Clock size={18} className="mt-0.5 text-gold" />
                <div>
                  <p className="font-medium text-espresso-foreground">Mon - Fri</p>
                  <p>7:00 AM - 9:00 PM</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={18} className="mt-0.5 text-gold" />
                <div>
                  <p className="font-medium text-espresso-foreground">Sat - Sun</p>
                  <p>8:00 AM - 10:00 PM</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg mb-6">Contact</h4>
            <ul className="space-y-3 text-espresso-foreground/70">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 text-gold flex-shrink-0" />
                <span>123 Cozy Lane, Downtown District, City 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-gold" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-gold" />
                <span>hello@rdcafe.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-espresso-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-espresso-foreground/50">
            © {new Date().getFullYear()} RD CAFE. All rights reserved.
          </p>
          <p className="text-sm text-espresso-foreground/50">
            Crafted with love for coffee lovers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
