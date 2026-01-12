import { memo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { staggerContainer, fadeUp, viewportOnce, viewportOnceSmall } from "@/lib/animations";
import latteImage from "@/assets/coffee-latte.jpg";
import espressoImage from "@/assets/espresso.jpg";
import croissantImage from "@/assets/croissant.jpg";
import cakeImage from "@/assets/chocolate-cake.jpg";

const featuredItems = [
  { name: "Signature Latte", description: "Smooth espresso with velvety steamed milk, crafted with care", price: "$5.50", image: latteImage, category: "Signature" },
  { name: "Single Origin Espresso", description: "Bold and refined—our carefully sourced house blend", price: "$4.00", image: espressoImage, category: "Signature" },
  { name: "Buttery Croissant", description: "Freshly baked each morning with flaky, golden layers", price: "$4.50", image: croissantImage, category: "Pastry" },
  { name: "Chocolate Fondant", description: "Rich dark chocolate with a delicate finish", price: "$7.00", image: cakeImage, category: "Dessert" },
] as const;

const itemVariants = fadeUp(30, 0.6);

interface MenuItemCardProps {
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
}

const MenuItemCard = memo(({ name, description, price, image, category }: MenuItemCardProps) => (
  <motion.div variants={itemVariants}>
    <Card variant="menu" className="h-full overflow-hidden card-interactive">
      <div className="relative aspect-square img-zoom">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-xs tracking-wide uppercase bg-background/90 backdrop-blur-sm rounded-full text-foreground badge-pop">
            {category}
          </span>
        </div>
      </div>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-serif text-xl">{name}</h3>
          <span className="text-primary font-medium">{price}</span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  </motion.div>
));

MenuItemCard.displayName = "MenuItemCard";

const FeaturedMenu = () => {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-cafe">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 block">
            From Our Kitchen
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
            Signature Offerings
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Handcrafted beverages and thoughtfully prepared dishes that reflect our dedication to quality.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnceSmall}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {featuredItems.map((item) => (
            <MenuItemCard key={item.name} {...item} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-12"
        >
          <Button variant="default" size="lg" asChild className="glow-hover group">
            <Link to="/menu">
              Explore Full Menu
              <ArrowRight size={16} className="arrow-slide" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(FeaturedMenu);