import { memo } from "react";
import { motion, type Variants } from "framer-motion";
import { Play } from "lucide-react";
import type { MenuItem } from "@/types/menu";

interface MenuItemCardProps {
  item: MenuItem;
  variants?: Variants;
  onClick?: (item: MenuItem) => void;
}

const MenuItemCard = memo(({ item, variants, onClick }: MenuItemCardProps) => {
  const hasImage = !!item.image;
  const hasVideo = !!item.videoUrl;

  return (
    <motion.div
      variants={variants}
      layout
      className="group cursor-pointer"
      onClick={() => onClick?.(item)}
    >
      {hasImage ? (
        /* Card with image + gradient overlay */
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-shadow duration-300">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

          {/* Play icon hint */}
          {hasVideo && (
            <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full p-1.5 opacity-70 group-hover:opacity-100 transition-opacity">
              <Play size={14} className="text-foreground fill-foreground" />
            </div>
          )}

          {/* Text over gradient */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-end justify-between gap-2 mb-1">
              <h3 className="font-serif font-semibold text-lg text-white leading-tight">
                {item.name}
              </h3>
              <span className="font-semibold text-white/90 shrink-0">
                {item.price}
              </span>
            </div>
            <p className="text-xs text-white/70 leading-relaxed line-clamp-2">
              {item.description}
            </p>
          </div>
        </div>
      ) : (
        /* Card without image — minimal gradient feel */
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border/40 bg-gradient-to-t from-secondary to-card shadow-soft hover:shadow-card transition-shadow duration-300 flex flex-col justify-end p-4">
          {hasVideo && (
            <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full p-1.5 opacity-70 group-hover:opacity-100 transition-opacity">
              <Play size={14} className="text-foreground fill-foreground" />
            </div>
          )}
          <div className="flex items-end justify-between gap-2 mb-1">
            <h3 className="font-serif font-semibold text-lg text-foreground leading-tight">
              {item.name}
            </h3>
            <span className="font-semibold text-primary shrink-0">
              {item.price}
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {item.description}
          </p>
        </div>
      )}
    </motion.div>
  );
});

MenuItemCard.displayName = "MenuItemCard";

export default MenuItemCard;
