import { memo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { staggerContainer, fadeUp, viewportOnce, viewportOnceSmall } from "@/lib/animations";
import MenuItemCard from "@/components/menu/MenuItemCard";
import MenuPreviewDialog from "@/components/menu/MenuPreviewDialog";
import type { MenuItem } from "@/types/menu";
import latteImage from "@/assets/coffee-latte.jpg";
import espressoImage from "@/assets/espresso.jpg";
import croissantImage from "@/assets/croissant.jpg";
import cakeImage from "@/assets/chocolate-cake.jpg";

const featuredItems: MenuItem[] = [
  { id: "f1", name: "Signature Latte", description: "Smooth espresso with velvety steamed milk, crafted with care", price: "$5.50", image: latteImage, category: "coffee" },
  { id: "f2", name: "Single Origin Espresso", description: "Bold and refined—our carefully sourced house blend", price: "$4.00", image: espressoImage, category: "coffee" },
  { id: "f3", name: "Buttery Croissant", description: "Freshly baked each morning with flaky, golden layers", price: "$4.50", image: croissantImage, category: "desserts" },
  { id: "f4", name: "Chocolate Fondant", description: "Rich dark chocolate with a delicate finish", price: "$7.00", image: cakeImage, category: "desserts" },
];

const itemVariants = fadeUp(30, 0.6);

const FeaturedMenu = () => {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCardClick = (item: MenuItem) => {
    setSelectedItem(item);
    setDialogOpen(true);
  };

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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {featuredItems.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              variants={itemVariants}
              onClick={handleCardClick}
            />
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

      <MenuPreviewDialog
        item={selectedItem}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </section>
  );
};

export default memo(FeaturedMenu);
