import { motion } from "framer-motion";
import { Leaf, Ban, Award, Sparkles } from "lucide-react";

const principles = [
  {
    icon: Award,
    title: "Premium Ingredients",
    description: "We source only the finest, high-quality imported ingredients to ensure exceptional taste in every dish.",
  },
  {
    icon: Ban,
    title: "No Artificial Flavours",
    description: "We never use artificial tastemakers or flavour enhancers — just pure, authentic taste.",
  },
  {
    icon: Leaf,
    title: "Fresh & Natural",
    description: "From farm to table, we prioritize freshness and natural goodness in every preparation.",
  },
  {
    icon: Sparkles,
    title: "Crafted with Care",
    description: "Every dish is thoughtfully prepared by our skilled chefs who take pride in their craft.",
  },
];

const QualityPhilosophy = () => {
  return (
    <section className="section-padding relative">
      <div className="container-cafe">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm tracking-[0.2em] uppercase text-gold mb-4">
              Our Promise
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-6">
              Quality You Can Taste, Purity You Can Trust
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              At RD CAFE, we believe great food starts with great ingredients. 
              That's why we go the extra mile to source premium, imported ingredients 
              and prepare everything without artificial additives — because you deserve 
              nothing but the best.
            </p>

            {/* Quality Badge */}
            <div className="inline-flex items-center gap-4 p-4 rounded-xl bg-gold/10 border border-gold/20">
              <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                <Award className="w-6 h-6 text-gold" />
              </div>
              <div>
                <p className="font-medium text-foreground">Quality Assured</p>
                <p className="text-sm text-muted-foreground">100% Pure Ingredients</p>
              </div>
            </div>
          </motion.div>

          {/* Right - Principles Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {principles.map((principle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="p-6 rounded-2xl bg-secondary/40 border border-border/50 hover:shadow-soft transition-shadow duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center mb-4 shadow-soft">
                  <principle.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-serif text-lg font-medium text-foreground mb-2">
                  {principle.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default QualityPhilosophy;
