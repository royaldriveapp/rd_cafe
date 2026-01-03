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
  { src: heroImage, alt: "Cozy café interior", category: "Interior", span: "large" },
  { src: gallery1, alt: "Reading corner with armchair", category: "Interior", span: "medium" },
  { src: gallery2, alt: "Barista crafting latte art", category: "Craft", span: "medium" },
  { src: gallery3, alt: "Fresh pastry display", category: "Food", span: "small" },
  { src: gallery4, alt: "Artisan coffee beans", category: "Craft", span: "small" },
  { src: latteImage, alt: "Signature latte art", category: "Drinks", span: "medium" },
  { src: espressoImage, alt: "Classic espresso shot", category: "Drinks", span: "small" },
  { src: croissantImage, alt: "Fresh morning croissant", category: "Food", span: "medium" },
  { src: cakeImage, alt: "Chocolate fondant dessert", category: "Food", span: "large" },
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
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-secondary/30">
        <div className="container-cafe text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 block">
              Visual Stories
            </span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-6">
              Gallery
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              Moments captured at RD CAFE. Each image tells a story of warmth, craft, and connection.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid with CSS Scroll Animation */}
      <section className="section-padding overflow-hidden">
        <div className="container-cafe">
          <div className="gallery-grid">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className={`gallery-item gallery-item-${image.span}`}
                style={{ '--item-index': index } as React.CSSProperties}
                onClick={() => setSelectedImage(index)}
              >
                <div className="gallery-card group cursor-pointer">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="gallery-image"
                    loading="lazy"
                  />
                  <div className="gallery-overlay">
                    <span className="text-xs tracking-widest text-primary-foreground/80 uppercase">
                      {image.category}
                    </span>
                    <p className="text-primary-foreground font-serif text-lg mt-1">
                      {image.alt}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
            
            {/* Navigation arrows */}
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

            <motion.img
              key={selectedImage}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={galleryImages[selectedImage].src}
              alt={galleryImages[selectedImage].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-elevated"
              onClick={(e) => e.stopPropagation()}
            />
            
            {/* Image counter */}
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
