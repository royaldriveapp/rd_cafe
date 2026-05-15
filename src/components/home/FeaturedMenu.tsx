import { memo, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { fadeUp, viewportOnce, viewportOnceSmall } from "@/lib/animations";
import MenuPreviewDialog from "@/components/menu/MenuPreviewDialog";
import type { MenuItem } from "@/types/menu";
import latteImage from "@/assets/coffee-latte.jpg";
import espressoImage from "@/assets/espresso.jpg";
import croissantImage from "@/assets/croissant.jpg";
import cakeImage from "@/assets/chocolate-cake.jpg";

const featuredItems: MenuItem[] = [
  { id: "f1", name: "Signature Latte", description: "Smooth espresso with velvety steamed milk, crafted with care", price: "₹280", image: latteImage, category: "coffee", videoUrl: "https://www.youtube.com/watch?v=fN_iiDCxjPo", ingredients: ["Espresso", "Steamed Milk", "Vanilla Syrup"], calories: 220, dietaryTags: ["Vegetarian", "Contains Dairy"] },
  { id: "f2", name: "Single Origin Espresso", description: "Bold and refined—our carefully sourced house blend", price: "₹200", image: espressoImage, category: "coffee", videoUrl: "https://www.youtube.com/watch?v=fN_iiDCxjPo", ingredients: ["Single Origin Beans", "Filtered Water"], calories: 5, dietaryTags: ["Vegan", "Gluten-Free"] },
  { id: "f3", name: "Buttery Croissant", description: "Freshly baked each morning with flaky, golden layers", price: "₹220", image: croissantImage, category: "desserts", videoUrl: "https://www.youtube.com/watch?v=fN_iiDCxjPo", ingredients: ["Flour", "Butter", "Yeast", "Sugar", "Salt"], calories: 280, dietaryTags: ["Vegetarian", "Contains Gluten"] },
  { id: "f4", name: "Chocolate Fondant", description: "Rich dark chocolate with a delicate finish", price: "₹360", image: cakeImage, category: "desserts", videoUrl: "https://www.youtube.com/watch?v=fN_iiDCxjPo", ingredients: ["Dark Chocolate", "Butter", "Eggs", "Sugar", "Flour"], calories: 420, dietaryTags: ["Vegetarian", "Contains Gluten"] },
];

const itemVariants = fadeUp(30, 0.6);

interface OfferingCardProps {
  item: MenuItem;
  variants?: Variants;
  onClick: (item: MenuItem) => void;
  featured?: boolean;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}

const OfferingCard = ({
  item,
  variants,
  onClick,
  featured = false,
  onHoverStart,
  onHoverEnd,
}: OfferingCardProps) => (
  <motion.button
    type="button"
    variants={variants}
    onClick={() => onClick(item)}
    onHoverStart={onHoverStart}
    onHoverEnd={onHoverEnd}
    className="group relative h-[260px] w-full overflow-hidden rounded-[12px] text-left shadow-[0_16px_36px_rgba(28,16,8,0.1)] sm:h-[280px]"
  >
    {item.image ? (
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition-transform [transition-duration:350ms] ease-out group-hover:scale-[1.04]"
          loading="lazy"
        />
    ) : (
      <div className="h-full w-full bg-[linear-gradient(135deg,#4A2414_0%,#2A140D_100%)]" />
    )}

    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.35)_0%,rgba(0,0,0,0.38)_46%,rgba(0,0,0,0.65)_100%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_34%,rgba(0,0,0,0.12)_100%)]" />

    <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
      <span className="mb-3 block translate-y-[10px] font-sohne text-[0.76rem] uppercase tracking-[0.18em] text-[#C49A3C] opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
        View details
      </span>

      <div className="flex items-end justify-between gap-4">
        <div className="min-w-0">
          <h3
            className={cn(
              "font-serif leading-none text-[#F5ECD7]",
              featured
                ? "text-[1.9rem] md:text-[2.05rem]"
                : "truncate text-[1rem] md:text-[1rem]"
            )}
          >
            {item.name}
          </h3>
        </div>
        <span
          className={cn(
            "shrink-0 font-serif leading-none text-[#C49A3C]",
            featured ? "text-[1.55rem]" : "text-[1rem]"
          )}
        >
          {item.price}
        </span>
      </div>
    </div>
  </motion.button>
);

const FeaturedMenu = () => {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);

  const handleCardClick = (item: MenuItem) => {
    setSelectedItem(item);
    setDialogOpen(true);
  };

  const items = featuredItems;

  const getFlexGrow = (itemId: string, featured: boolean) => {
    if (!hoveredItemId) {
      return featured ? 1.9 : 1;
    }

    if (hoveredItemId === itemId) {
      return featured ? 2.45 : 1.85;
    }

    return featured ? 1.2 : 0.82;
  };

  return (
    <section className="bg-[#FAF6F1] px-0 py-24 md:py-28">
      <div className="container-cafe">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-3xl text-left"
        >
          <span className="mb-4 block font-sohne text-sm uppercase tracking-[0.28em] text-[#C49A3C]">
            From Our Kitchen
          </span>
          <h2 className="font-serif text-4xl text-[#1C1008] md:text-5xl lg:text-6xl">
            Signature Offerings
          </h2>
          <p className="mt-5 max-w-2xl font-display text-[1.2rem] italic leading-relaxed text-[#8C7B6B] md:text-[1.32rem]">
            Handcrafted favourites, seasonal pours, and pastry rituals chosen to feel more like a quiet recommendation than a catalogue.
          </p>
          <div className="mt-6 h-px w-[60px] bg-[#C49A3C]" />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnceSmall}
          className="flex flex-col gap-4 lg:flex-row lg:items-stretch"
        >
          {items.map((item, index) => {
            const featured = index === 0;

            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
            className="lg:min-w-0"
                animate={{
                  flexGrow: getFlexGrow(item.id, featured),
                }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <OfferingCard
                  item={item}
                  onClick={handleCardClick}
                  featured={featured}
                  onHoverStart={() => setHoveredItemId(item.id)}
                  onHoverEnd={() => setHoveredItemId((current) => (current === item.id ? null : current))}
                />
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-10 text-left sm:mt-12"
        >
          <Link
            to="/menu"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#1C1008] bg-transparent px-7 py-3 font-sohne text-[0.9rem] font-medium tracking-[0.14em] text-[#1C1008] transition-all duration-300 hover:bg-[#1C1008] hover:text-[#F5ECD7] sm:w-auto"
          >
            Explore Full Menu
            <ArrowRight size={16} />
          </Link>
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
