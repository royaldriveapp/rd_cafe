import { useState, useEffect } from "react";
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

// Layer 1: outer corners
const layer1Images = [
  { src: gallery1, alt: "Reading corner" },
  { src: gallery2, alt: "Barista craft" },
  { src: gallery3, alt: "Pastry display" },
  { src: gallery4, alt: "Coffee beans" },
];

// Layer 2: inner positions
const layer2Images = [
  { src: latteImage, alt: "Signature latte" },
  { src: espressoImage, alt: "Espresso shot" },
  { src: croissantImage, alt: "Morning croissant" },
  { src: cakeImage, alt: "Chocolate cake" },
];

// Center hero image
const centerImage = { src: heroImage, alt: "RD Cafe Interior" };

const allImages = [...layer1Images, ...layer2Images, centerImage];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isEnhanced, setIsEnhanced] = useState(false);

  useEffect(() => {
    // Check for scroll-driven animation support
    const supportsScrollTimeline = CSS.supports('animation-timeline: scroll()');
    setIsEnhanced(supportsScrollTimeline);
  }, []);

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    const newIndex = direction === 'next' 
      ? (selectedImage + 1) % allImages.length
      : (selectedImage - 1 + allImages.length) % allImages.length;
    setSelectedImage(newIndex);
  };

  return (
    <Layout>
      <div 
        className="gallery-scroll-container" 
        data-enhanced={isEnhanced}
        data-center="true"
        data-layers="true"
        data-stagger="range"
      >
        {/* Hero Header */}
        <header className="gallery-header">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 block">
              Visual Stories
            </span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-6 text-foreground">
              Gallery
            </h1>
            <p className="text-muted-foreground max-w-md text-lg leading-relaxed">
              Scroll to explore moments captured at RD CAFE
            </p>
          </motion.div>
        </header>

        {/* Main scroll section */}
        <main className="gallery-main">
          <section className="gallery-scroll-section">
            <div className="gallery-content">
              <div className="gallery-grid-layers">
                {/* Layer 1 - Outer corners */}
                <div className="layer">
                  {layer1Images.map((img, i) => (
                    <div key={`l1-${i}`} onClick={() => setSelectedImage(i)}>
                      <img src={img.src} alt={img.alt} loading="lazy" />
                    </div>
                  ))}
                </div>

                {/* Layer 2 - Inner positions */}
                <div className="layer">
                  {layer2Images.map((img, i) => (
                    <div key={`l2-${i}`} onClick={() => setSelectedImage(layer1Images.length + i)}>
                      <img src={img.src} alt={img.alt} loading="lazy" />
                    </div>
                  ))}
                </div>

                {/* Layer 3 - Center scaler */}
                <div className="layer">
                  <div className="scaler" onClick={() => setSelectedImage(allImages.length - 1)}>
                    <img src={centerImage.src} alt={centerImage.alt} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* End section */}
          <section className="gallery-end-section">
            <div className="text-center px-8">
              <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
                Every cup tells a story
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                From the first pour to the last sip, we craft moments worth remembering.
              </p>
            </div>
          </section>
        </main>
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

            <motion.img
              key={selectedImage}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={allImages[selectedImage].src}
              alt={allImages[selectedImage].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-elevated"
              onClick={(e) => e.stopPropagation()}
            />
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-primary-foreground/60 text-sm tracking-wide">
              {selectedImage + 1} / {allImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Gallery;
