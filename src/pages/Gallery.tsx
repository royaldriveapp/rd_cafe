import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import heroImage from "@/assets/hero-cafe.jpg";
import latteImage from "@/assets/coffee-latte.jpg";
import espressoImage from "@/assets/espresso.jpg";
import croissantImage from "@/assets/croissant.jpg";
import cakeImage from "@/assets/chocolate-cake.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";

const galleryImages = [
  { src: heroImage, alt: "RD Cafe Interior", category: "Interior" },
  { src: gallery1, alt: "Reading corner", category: "Ambiance" },
  { src: gallery2, alt: "Barista craft", category: "Coffee" },
  { src: latteImage, alt: "Signature latte", category: "Coffee" },
  { src: espressoImage, alt: "Espresso shot", category: "Coffee" },
  { src: gallery3, alt: "Pastry display", category: "Food" },
  { src: croissantImage, alt: "Morning croissant", category: "Food" },
  { src: cakeImage, alt: "Chocolate cake", category: "Food" },
  { src: gallery4, alt: "Coffee beans", category: "Coffee" },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    const newIndex = direction === 'next' 
      ? (selectedImage + 1) % galleryImages.length
      : (selectedImage - 1 + galleryImages.length) % galleryImages.length;
    setSelectedImage(newIndex);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero Header */}
        <header className="pt-32 pb-16 px-6 md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 block">
              Visual Stories
            </span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-6 text-foreground">
              Gallery
            </h1>
            <p className="text-muted-foreground max-w-md text-lg leading-relaxed">
              Moments captured at RD CAFE — where every cup tells a story
            </p>
          </motion.div>
        </header>

        {/* Gallery Grid */}
        <main className="px-6 md:px-12 lg:px-20 pb-20">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {galleryImages.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative overflow-hidden rounded-xl cursor-pointer group ${
                  index === 0 ? 'col-span-2 md:col-span-2 row-span-2' : ''
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <div className={`${index === 0 ? 'aspect-[4/3]' : 'aspect-[4/5]'}`}>
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                  <span className="text-xs tracking-wider uppercase text-primary-foreground/70">
                    {img.category}
                  </span>
                  <h3 className="text-primary-foreground font-medium mt-1">
                    {img.alt}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </main>

        {/* Bottom Section */}
        <section className="py-24 bg-secondary/30">
          <div className="text-center px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
                Every cup tells a story
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                From the first pour to the last sip, we craft moments worth remembering.
              </p>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-espresso/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 text-primary-foreground/80 hover:text-primary-foreground transition-colors z-10"
              onClick={() => setSelectedImage(null)}
              aria-label="Close lightbox"
            >
              <X size={32} />
            </button>
            
            <button
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-primary-foreground/60 hover:text-primary-foreground transition-colors z-10 p-2"
              onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
              aria-label="Previous image"
            >
              <ChevronLeft size={40} />
            </button>
            <button
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-primary-foreground/60 hover:text-primary-foreground transition-colors z-10 p-2"
              onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
              aria-label="Next image"
            >
              <ChevronRight size={40} />
            </button>

            <motion.div
              key={selectedImage}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].alt}
                className="w-full max-h-[85vh] object-contain rounded-2xl shadow-elevated"
              />
              <div className="mt-4 text-center">
                <span className="text-xs tracking-wider uppercase text-primary-foreground/50">
                  {galleryImages[selectedImage].category}
                </span>
                <h3 className="text-primary-foreground font-medium mt-1">
                  {galleryImages[selectedImage].alt}
                </h3>
              </div>
            </motion.div>
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-primary-foreground/60 text-sm tracking-wide">
              {selectedImage + 1} / {galleryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Gallery;
