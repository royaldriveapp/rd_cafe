import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import latteImage from "@/assets/coffee-latte.jpg";
import espressoImage from "@/assets/espresso.jpg";
import croissantImage from "@/assets/croissant.jpg";
import cakeImage from "@/assets/chocolate-cake.jpg";

const featuredItems = [
  {
    name: "Signature Latte",
    description: "Smooth espresso with silky steamed milk and artisan latte art",
    price: "$5.50",
    image: latteImage,
    category: "Coffee",
  },
  {
    name: "Classic Espresso",
    description: "Rich, bold, and perfectly extracted single origin beans",
    price: "$4.00",
    image: espressoImage,
    category: "Coffee",
  },
  {
    name: "Fresh Croissant",
    description: "Buttery, flaky layers baked fresh every morning",
    price: "$4.50",
    image: croissantImage,
    category: "Pastry",
  },
  {
    name: "Chocolate Fondant",
    description: "Decadent dark chocolate cake with velvety cocoa dust",
    price: "$7.00",
    image: cakeImage,
    category: "Dessert",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const FeaturedMenu = () => {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-cafe">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 block">
            Our Selection
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
            Featured Delights
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Carefully crafted beverages and treats that define our café experience
          </p>
        </motion.div>

        {/* Menu Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {featuredItems.map((item) => (
            <motion.div key={item.name} variants={itemVariants}>
              <Card variant="menu" className="h-full overflow-hidden">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-xs tracking-wide uppercase bg-background/90 backdrop-blur-sm rounded-full text-foreground">
                      {item.category}
                    </span>
                  </div>
                </div>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-serif text-xl">{item.name}</h3>
                    <span className="text-primary font-medium">{item.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-12"
        >
          <Button variant="default" size="lg" asChild>
            <Link to="/menu">
              View Full Menu
              <ArrowRight size={16} />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedMenu;
