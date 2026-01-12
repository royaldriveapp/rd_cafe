import { useState, useEffect, useCallback } from "react";
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
  { src: heroImage, alt: "RD Cafe Interior - Warm and inviting space with comfortable seating", category: "Interior" },
  { src: gallery1, alt: "Cozy reading corner with natural lighting", category: "Ambiance" },
  { src: gallery2, alt: "Barista crafting specialty coffee drinks", category: "Coffee" },
  { src: latteImage, alt: "Signature latte with intricate latte art", category: "Coffee" },
  { src: espressoImage, alt: "Fresh espresso shot in ceramic cup", category: "Coffee" },
  { src: gallery3, alt: "Fresh pastry display with croissants and cakes", category: "Food" },
  { src: croissantImage, alt: "Freshly baked golden croissant", category: "Food" },
  { src: cakeImage, alt: "Rich chocolate cake with ganache topping", category: "Food" },
  { src: gallery4, alt: "Premium roasted coffee beans close-up", category: "Coffee" },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const navigateImage = useCallback((direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    const newIndex = direction === 'next' 
      ? (selectedImage + 1) % galleryImages.length
      : (selectedImage - 1 + galleryImages.length) % galleryImages.length;
    setSelectedImage(newIndex);
  }, [selectedImage]);

  const closeLightbox = useCallback(() => {
    setSelectedImage(null);
  }, []);

  // Keyboard navigation for lightbox - WCAG 2.1.1
  useEffect(() => {
    if (selectedImage === null) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          navigateImage('prev');
          break;
        case 'ArrowRight':
          navigateImage('next');
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    // Trap focus within lightbox
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedImage, navigateImage, closeLightbox]);

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
        <section className="px-6 md:px-12 lg:px-20 pb-20" aria-label="Photo gallery">
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 list-none p-0" role="list">
            {galleryImages.map((img, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative overflow-hidden rounded-xl group ${
                  index === 0 ? 'col-span-2 md:col-span-2 row-span-2' : ''
                }`}
              >
                <button
                  onClick={() => setSelectedImage(index)}
                  className="w-full h-full text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl"
                  aria-label={`View larger: ${img.alt}`}
                >
                  <div className={`${index === 0 ? 'aspect-[4/3]' : 'aspect-[4/5]'}`}>
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                    <span className="text-xs tracking-wider uppercase text-primary-foreground/70">
                      {img.category}
                    </span>
                    <p className="text-primary-foreground font-medium mt-1">
                      {img.alt}
                    </p>
                  </div>
                </button>
              </motion.li>
            ))}
          </ul>
        </section>

        {/* Bottom Section */}
        <section className="py-24 bg-secondary/30" aria-labelledby="gallery-tagline">
          <div className="text-center px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 id="gallery-tagline" className="font-serif text-4xl md:text-5xl text-foreground mb-6">
                Every cup tells a story
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                From the first pour to the last sip, we craft moments worth remembering.
              </p>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Lightbox - WCAG 2.4.3 Focus Order, 2.1.2 No Keyboard Trap */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-espresso/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label={`Image ${selectedImage + 1} of ${galleryImages.length}: ${galleryImages[selectedImage].alt}`}
          >
            <button
              className="absolute top-6 right-6 text-primary-foreground/80 hover:text-primary-foreground transition-colors z-10 p-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              onClick={closeLightbox}
              aria-label="Close gallery lightbox (Press Escape)"
              autoFocus
            >
              <X size={32} aria-hidden="true" />
            </button>
            
            <button
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-primary-foreground/60 hover:text-primary-foreground transition-colors z-10 p-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
              aria-label="Previous image (Left arrow key)"
            >
              <ChevronLeft size={40} aria-hidden="true" />
            </button>
            <button
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-primary-foreground/60 hover:text-primary-foreground transition-colors z-10 p-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
              aria-label="Next image (Right arrow key)"
            >
              <ChevronRight size={40} aria-hidden="true" />
            </button>

            <motion.figure
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
              <figcaption className="mt-4 text-center">
                <span className="text-xs tracking-wider uppercase text-primary-foreground/50">
                  {galleryImages[selectedImage].category}
                </span>
                <p className="text-primary-foreground font-medium mt-1">
                  {galleryImages[selectedImage].alt}
                </p>
              </figcaption>
            </motion.figure>
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-primary-foreground/60 text-sm tracking-wide" aria-live="polite">
              {selectedImage + 1} / {galleryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Gallery;
