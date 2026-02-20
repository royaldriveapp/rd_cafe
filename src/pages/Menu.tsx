import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import MenuItemCard from "@/components/menu/MenuItemCard";
import MenuPreviewDialog from "@/components/menu/MenuPreviewDialog";
import { useMenuItems } from "@/hooks/useMenuItems";
import type { MenuItem, MenuCategory } from "@/types/menu";

const categories: { value: MenuCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "coffee", label: "Coffee" },
  { value: "beverages", label: "Beverages" },
  { value: "desserts", label: "Desserts" },
  { value: "bites", label: "Light Bites" },
];

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory | "all">("all");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: menuItems = [], isLoading } = useMenuItems(
    activeCategory === "all" ? undefined : activeCategory
  );

  const handleCardClick = (item: MenuItem) => {
    setSelectedItem(item);
    setDialogOpen(true);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-secondary/30">
        <div className="container-cafe text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 block">
              Explore
            </span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-6">
              Our Menu
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              Crafted with care, served with love. Every item on our menu is made with the finest ingredients.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="section-padding">
        <div className="container-cafe">
          {/* Category Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setActiveCategory(category.value)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.value
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {category.label}
              </button>
            ))}
          </motion.div>

          {/* Menu Grid */}
          {isLoading ? (
            <div className="text-center text-muted-foreground py-12">Loading menu…</div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.04, duration: 0.4 }}
                >
                  <MenuItemCard item={item} onClick={handleCardClick} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <MenuPreviewDialog
        item={selectedItem}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </Layout>
  );
};

export default Menu;
