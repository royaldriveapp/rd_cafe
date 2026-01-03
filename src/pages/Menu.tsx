import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import latteImage from "@/assets/coffee-latte.jpg";
import espressoImage from "@/assets/espresso.jpg";
import croissantImage from "@/assets/croissant.jpg";
import cakeImage from "@/assets/chocolate-cake.jpg";

type MenuCategory = "all" | "coffee" | "beverages" | "desserts" | "bites";

interface MenuItem {
  name: string;
  description: string;
  price: string;
  category: MenuCategory;
  image?: string;
}

const menuItems: MenuItem[] = [
  // Coffee
  { name: "Signature Latte", description: "Smooth espresso with silky steamed milk and artisan latte art", price: "$5.50", category: "coffee", image: latteImage },
  { name: "Classic Espresso", description: "Rich, bold, and perfectly extracted single origin beans", price: "$4.00", category: "coffee", image: espressoImage },
  { name: "Cappuccino", description: "Perfect balance of espresso, steamed milk, and velvety foam", price: "$5.00", category: "coffee" },
  { name: "Flat White", description: "Double ristretto with microfoam for a creamy finish", price: "$5.25", category: "coffee" },
  { name: "Pour Over", description: "Hand-crafted single origin coffee, brewed to perfection", price: "$6.00", category: "coffee" },
  { name: "Cold Brew", description: "Smooth, naturally sweet, steeped for 18 hours", price: "$5.50", category: "coffee" },
  { name: "Mocha", description: "Espresso meets rich chocolate and steamed milk", price: "$6.00", category: "coffee" },
  { name: "Affogato", description: "Creamy vanilla gelato drowned in hot espresso", price: "$7.00", category: "coffee" },
  
  // Beverages
  { name: "Matcha Latte", description: "Ceremonial grade matcha with oat milk", price: "$6.00", category: "beverages" },
  { name: "Chai Latte", description: "Spiced chai with warming cinnamon and cardamom", price: "$5.50", category: "beverages" },
  { name: "Hot Chocolate", description: "Rich Belgian chocolate with whipped cream", price: "$5.00", category: "beverages" },
  { name: "Fresh Juice", description: "Seasonal fruits pressed to order", price: "$6.50", category: "beverages" },
  { name: "Sparkling Water", description: "San Pellegrino 500ml", price: "$4.00", category: "beverages" },
  
  // Desserts
  { name: "Chocolate Fondant", description: "Decadent dark chocolate cake with velvety cocoa dust", price: "$7.00", category: "desserts", image: cakeImage },
  { name: "Fresh Croissant", description: "Buttery, flaky layers baked fresh every morning", price: "$4.50", category: "desserts", image: croissantImage },
  { name: "Tiramisu", description: "Classic Italian layers of mascarpone and espresso", price: "$8.00", category: "desserts" },
  { name: "Cheesecake", description: "New York style with berry compote", price: "$7.50", category: "desserts" },
  { name: "Cinnamon Roll", description: "Warm, gooey, with cream cheese glaze", price: "$5.00", category: "desserts" },
  
  // Light Bites
  { name: "Avocado Toast", description: "Smashed avocado on sourdough with chili flakes", price: "$9.00", category: "bites" },
  { name: "Egg Benedict", description: "Poached eggs, hollandaise, on English muffin", price: "$12.00", category: "bites" },
  { name: "Granola Bowl", description: "House-made granola with yogurt and seasonal fruits", price: "$8.00", category: "bites" },
  { name: "Grilled Cheese", description: "Aged cheddar and gruyère on artisan bread", price: "$9.50", category: "bites" },
  { name: "Caesar Salad", description: "Crisp romaine, parmesan, house-made croutons", price: "$10.00", category: "bites" },
];

const categories: { value: MenuCategory; label: string }[] = [
  { value: "all", label: "All" },
  { value: "coffee", label: "Coffee" },
  { value: "beverages", label: "Beverages" },
  { value: "desserts", label: "Desserts" },
  { value: "bites", label: "Light Bites" },
];

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("all");

  const filteredItems = activeCategory === "all" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

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
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.name}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
              >
                <Card variant="menu" className="h-full overflow-hidden">
                  {item.image && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  )}
                  <CardContent className={item.image ? "pt-6" : "py-6"}>
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-serif text-xl">{item.name}</h3>
                      <span className="text-primary font-semibold text-lg">{item.price}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Menu;
