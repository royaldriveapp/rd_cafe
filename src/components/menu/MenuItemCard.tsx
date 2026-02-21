import { memo, useState, useCallback } from "react";
import { motion, type Variants } from "framer-motion";
import { Play, Flame, Leaf, Info } from "lucide-react";
import type { MenuItem } from "@/types/menu";

interface MenuItemCardProps {
  item: MenuItem;
  variants?: Variants;
  onClick?: (item: MenuItem) => void;
}

const MenuItemCard = memo(({ item, variants, onClick }: MenuItemCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const hasImage = !!item.image;
  const hasVideo = !!item.videoUrl;
  const hasNutrition = item.ingredients || item.calories !== undefined || item.dietaryTags;

  const handleFlip = useCallback((e: React.MouseEvent) => {
    if (!hasNutrition) return;
    e.stopPropagation();
    setIsFlipped((prev) => !prev);
  }, [hasNutrition]);

  const handleBackClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onClick?.(item);
  }, [onClick, item]);

  return (
    <motion.div variants={variants} layout className="group">
      <div
        className="aspect-[4/3] cursor-pointer"
        style={{ perspective: "1200px" }}
        onClick={handleFlip}
      >
        <div
          className="relative w-full h-full"
          style={{
            transformStyle: "preserve-3d",
            transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* ===== FRONT FACE ===== */}
          <div
            className="absolute inset-0"
            style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
          >
            {hasImage ? (
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-shadow duration-300">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                {hasVideo && (
                  <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full p-1.5 opacity-70 group-hover:opacity-100 transition-opacity">
                    <Play size={14} className="text-foreground fill-foreground" />
                  </div>
                )}
                {hasNutrition && (
                  <div className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm rounded-full p-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                    <Info size={12} className="text-foreground" />
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-end justify-between gap-2 mb-1">
                    <h3 className="font-serif font-semibold text-lg text-white leading-tight">{item.name}</h3>
                    <span className="font-semibold text-white/90 shrink-0">{item.price}</span>
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed line-clamp-2">{item.description}</p>
                </div>
              </div>
            ) : (
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-border/40 bg-gradient-to-t from-secondary to-card shadow-soft hover:shadow-card transition-shadow duration-300 flex flex-col justify-end p-4">
                {hasVideo && (
                  <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full p-1.5 opacity-70 group-hover:opacity-100 transition-opacity">
                    <Play size={14} className="text-foreground fill-foreground" />
                  </div>
                )}
                {hasNutrition && (
                  <div className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm rounded-full p-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                    <Info size={12} className="text-foreground" />
                  </div>
                )}
                <div className="flex items-end justify-between gap-2 mb-1">
                  <h3 className="font-serif font-semibold text-lg text-foreground leading-tight">{item.name}</h3>
                  <span className="font-semibold text-primary shrink-0">{item.price}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{item.description}</p>
              </div>
            )}
          </div>

          {/* ===== BACK FACE ===== */}
          <div
            className="absolute inset-0"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div
              className="w-full h-full rounded-2xl overflow-hidden border border-border/40 bg-card shadow-soft flex flex-col justify-between p-5"
              onClick={handleBackClick}
            >
              <div className="overflow-hidden">
                <h4 className="font-serif font-semibold text-base text-foreground mb-3 leading-tight">{item.name}</h4>

                {item.ingredients && item.ingredients.length > 0 && (
                  <div className="mb-3">
                    <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1.5 flex items-center gap-1">
                      <Leaf size={10} /> Ingredients
                    </p>
                    <ul className="space-y-0.5">
                      {item.ingredients.map((ing, i) => (
                        <li key={i} className="text-xs text-foreground/80 leading-relaxed">• {ing}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {item.calories !== undefined && (
                  <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary rounded-full px-2.5 py-1">
                    <Flame size={12} />
                    <span className="text-xs font-medium">{item.calories} kcal</span>
                  </div>
                )}
              </div>

              <div>
                {item.dietaryTags && item.dietaryTags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {item.dietaryTags.map((tag, i) => (
                      <span key={i} className="text-[10px] bg-accent/15 text-accent-foreground rounded-full px-2 py-0.5 border border-accent/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-[10px] text-muted-foreground text-center">Tap for details</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

MenuItemCard.displayName = "MenuItemCard";

export default MenuItemCard;
