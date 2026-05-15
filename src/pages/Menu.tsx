import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import MenuPreviewDialog from "@/components/menu/MenuPreviewDialog";
import { useMenuItems } from "@/hooks/useMenuItems";
import { cn } from "@/lib/utils";
import type { MenuItem, MenuCategory } from "@/types/menu";

const categories: { value: MenuCategory | "all"; label: string }[] = [
  { value: "all", label: "ALL" },
  { value: "coffee", label: "COFFEE" },
  { value: "beverages", label: "BEVERAGES" },
  { value: "desserts", label: "DESSERTS" },
  { value: "bites", label: "LIGHT BITES" },
];

const sectionLabels: Record<MenuCategory, string> = {
  coffee: "COFFEE",
  beverages: "BEVERAGES",
  desserts: "DESSERTS",
  bites: "LIGHT BITES",
};

const sectionOrder: MenuCategory[] = ["coffee", "beverages", "desserts", "bites"];

const chefsPickName = "Signature Latte";

const fallbackThumbs: Record<MenuCategory, string> = {
  coffee: "bg-[linear-gradient(135deg,#4B2716_0%,#2A140D_100%)]",
  beverages: "bg-[linear-gradient(135deg,#C08A4D_0%,#A66C34_100%)]",
  desserts: "bg-[linear-gradient(135deg,#6A3520_0%,#3D2014_100%)]",
  bites: "bg-[linear-gradient(135deg,#C9A06A_0%,#A87B4A_100%)]",
};

function splitByCategory(items: MenuItem[]) {
  return sectionOrder
    .map((category) => ({
      category,
      items: items.filter((item) => item.category === category),
    }))
    .filter((section) => section.items.length > 0);
}

function shouldShowThumbnail() {
  return true;
}

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory | "all">("all");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: menuItems = [], isLoading } = useMenuItems(
    activeCategory === "all" ? undefined : activeCategory
  );

  const chefsPick = useMemo(
    () => menuItems.find((item) => item.name === chefsPickName) ?? menuItems[0],
    [menuItems]
  );

  const sections = useMemo(() => splitByCategory(menuItems), [menuItems]);

  const openItem = (item: MenuItem) => {
    setSelectedItem(item);
    setDialogOpen(true);
  };

  return (
    <Layout>
      <section className="bg-[#F5F1EB] pt-32 text-[#2A140D]">
        <div className="container-cafe">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="max-w-5xl pb-10"
          >
            <p className="mb-5 font-sohne text-sm font-medium tracking-[0.28em] text-[#C89A4B]">
              CRAFTED DAILY
            </p>
            <h1 className="font-serif text-[4.2rem] leading-[0.95] tracking-tight md:text-[5.8rem]">
              Our Menu
            </h1>
            <p className="mt-6 max-w-4xl font-display text-xl italic leading-9 text-[#8E7764] md:text-[2rem]">
              House favourites, seasonal pours &amp; pastry rituals — curated like a magazine, not a catalogue.
            </p>
          </motion.div>
        </div>

        <div className="sticky top-[5.4rem] z-20 border-y border-[#E5D8C7] bg-[#F5F1EB]/94 backdrop-blur-md">
          <div className="container-cafe">
            <div className="flex flex-wrap gap-x-10 gap-y-4 py-6 font-sohne text-[0.9rem] tracking-[0.15em] text-[#947E68]">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setActiveCategory(category.value)}
                  className={cn(
                    "relative pb-3 font-medium transition-[color,letter-spacing] duration-300 hover:text-[#2A140D] hover:tracking-[0.18em]",
                    activeCategory === category.value && "text-[#2A140D]"
                  )}
                >
                  {category.label}
                  <span
                    className={cn(
                      "absolute bottom-0 left-0 h-px w-full origin-left bg-[#C89A4B] transition-transform duration-500 ease-out",
                      activeCategory === category.value ? "scale-x-100" : "scale-x-0"
                    )}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F5F1EB] pb-24 pt-10 text-[#2A140D]">
        <div className="container-cafe">
          {isLoading ? (
            <div className="py-20 text-[#8E7764]">Loading menu…</div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-12"
              >
                {chefsPick && activeCategory !== "bites" ? (
                  <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55 }}
                    className="overflow-hidden rounded-[2rem] bg-[radial-gradient(circle_at_top_right,rgba(200,154,75,0.12),transparent_30%),linear-gradient(135deg,#4A2414_0%,#2A140D_100%)] px-7 py-7 text-[#F5F1EB] shadow-[0_20px_70px_rgba(42,20,13,0.12)] md:px-10 md:py-9"
                    onClick={() => openItem(chefsPick)}
                  >
                    <div className="flex items-start justify-between gap-6">
                      <span className="rounded-full bg-[#C89A4B] px-4 py-2 font-sohne text-[0.84rem] font-medium tracking-[0.18em] text-[#2A140D]">
                        CHEF&apos;S PICK
                      </span>
                      <span className="font-serif text-3xl text-[#C89A4B]">{chefsPick.price}</span>
                    </div>
                    <div className="mt-28 md:mt-32">
                      <h2 className="font-serif text-5xl leading-none md:text-6xl">{chefsPick.name}</h2>
                      <p className="mt-4 max-w-2xl font-sohne text-lg text-[#F5F1EB]/72">
                        {chefsPick.description}
                      </p>
                    </div>
                  </motion.article>
                ) : null}

                {sections.map((section, sectionIndex) => (
                  <motion.section
                    key={section.category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: sectionIndex * 0.05, duration: 0.45 }}
                  >
                    <div className="mb-7 flex items-center gap-5">
                      <h2 className="font-sohne text-sm font-medium tracking-[0.28em] text-[#C89A4B]">
                        {sectionLabels[section.category]}
                      </h2>
                      <div className="h-px flex-1 bg-[#E3D7C8]" />
                    </div>

                    <div className="space-y-0">
                      {section.items.map((item, index) => {
                        const withThumb = shouldShowThumbnail();

                        return (
                          <motion.article
                            key={item.id}
                            layout
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                            className="group cursor-pointer border-b border-[#E8DDD0] py-8 first:pt-0"
                            onClick={() => openItem(item)}
                          >
                            <div
                              className={cn(
                                "grid gap-6 transition-transform duration-300 group-hover:translate-x-[2px]",
                                withThumb
                                  ? "md:grid-cols-[20rem_minmax(0,1fr)] md:items-center"
                                  : "grid-cols-1"
                              )}
                            >
                              {withThumb ? (
                                <div className="overflow-hidden rounded-[1.2rem] border border-[#E3D5C6] bg-[#EEE3D8]">
                                  {item.image ? (
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                      loading="lazy"
                                    />
                                  ) : (
                                    <div
                                      className={cn(
                                        "aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-[1.03]",
                                        fallbackThumbs[item.category]
                                      )}
                                    />
                                  )}
                                </div>
                              ) : null}

                              <div className="min-w-0">
                                <div className="flex items-start justify-between gap-6">
                                  <h3 className="font-serif text-[2.05rem] leading-none transition-colors duration-300 group-hover:text-[#4B2716] md:text-[2.25rem]">
                                    {item.name}
                                  </h3>
                                  <span className="shrink-0 font-serif text-[2rem] leading-none text-[#C89A4B]">
                                    {item.price}
                                  </span>
                                </div>
                                <div className="mt-4 h-px bg-[#E4D6C7]" />
                                <p className="mt-4 font-display text-[1.06rem] italic leading-8 text-[#8E7764]">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          </motion.article>
                        );
                      })}
                    </div>
                  </motion.section>
                ))}

                <p className="pt-6 text-center font-sohne text-[0.95rem] font-medium tracking-[0.18em] text-[#B9A693]">
                  scroll to explore • hover items for details
                </p>
              </motion.div>
            </AnimatePresence>
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
