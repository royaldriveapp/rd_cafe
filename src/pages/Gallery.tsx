import { useState, useEffect, useCallback, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useGalleryPageContent } from "@/hooks/useContent";

const COLUMN_OFFSETS = [0, 28, 14];
const COLUMN_DELAYS = [0, 80, 40];
const ROTATIONS = [-2.4, 1.2, -1.6, 0.8, -2.8, 1.7, -1.2, 0.4, -2.1, 1.1, -0.9, 1.8];

const Gallery = () => {
  const { data: galleryPage } = useGalleryPageContent();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [revealedItems, setRevealedItems] = useState<Record<number, boolean>>({});
  const galleryImages = useMemo(() => galleryPage?.images ?? [], [galleryPage?.images]);

  const columnGroups = useMemo(() => {
    return [0, 1, 2].map((columnIndex) =>
      galleryImages
        .map((img, index) => ({ ...img, index }))
        .filter((item) => item.index % 3 === columnIndex)
    );
  }, [galleryImages]);

  const navigateImage = useCallback((direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    const newIndex = direction === 'next' 
      ? (selectedImage + 1) % galleryImages.length
      : (selectedImage - 1 + galleryImages.length) % galleryImages.length;
    setSelectedImage(newIndex);
  }, [selectedImage, galleryImages.length]);

  const closeLightbox = useCallback(() => {
    setSelectedImage(null);
  }, []);

  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-gallery-polaroid]"));
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const indexValue = Number(entry.target.getAttribute("data-gallery-index"));
          if (Number.isNaN(indexValue)) return;

          setRevealedItems((prev) => (prev[indexValue] ? prev : { ...prev, [indexValue]: true }));
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [galleryImages]);

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
      <div className="min-h-screen bg-[#120800] text-[#F5ECD7]">
        {/* Hero Header */}
        <header className="px-6 pb-14 pt-32 md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl"
          >
            <span className="mb-5 block text-sm uppercase tracking-[0.3em] text-[#C49A3C]">
              {galleryPage?.eyebrow ?? "Our Moments"}
            </span>
            <h1 className="mb-5 font-serif text-5xl text-[#F5ECD7] md:text-6xl lg:text-7xl">
              A Glimpse Inside
            </h1>
            <p className="max-w-2xl font-display text-[1.95rem] italic leading-tight text-[#8F7767] md:text-[2.2rem]">
              Quiet mornings, warm light, and the people who make us.
            </p>
            <div className="mt-10 h-px w-32 bg-[#8F641B]" aria-hidden="true" />
          </motion.div>
        </header>

        <section className="px-6 pb-24 md:px-12 lg:px-20" aria-label="Photo gallery">
          <div className="mb-10 flex items-center justify-center font-sans text-sm uppercase tracking-[0.24em] text-[#8F641B]">
            <span aria-hidden="true">↓</span>
            <span className="ml-3">Scroll to reveal</span>
          </div>

          <div className="grid gap-6 md:grid-cols-3 md:gap-6 xl:gap-8">
            {columnGroups.map((column, columnIndex) => (
              <div
                key={`column-${columnIndex}`}
                className="space-y-6 xl:space-y-8"
                style={{ marginTop: COLUMN_OFFSETS[columnIndex] }}
              >
                {column.map((img, rowIndex) => {
                  const isRevealed = Boolean(revealedItems[img.index]);
                  const delay = COLUMN_DELAYS[columnIndex] + rowIndex * 150;
                  const rotation = ROTATIONS[img.index % ROTATIONS.length];

                  return (
                    <article
                      key={img.index}
                      data-gallery-polaroid
                      data-gallery-index={img.index}
                      className="group"
                    >
                      <button
                        onClick={() => setSelectedImage(img.index)}
                        className="block w-full rounded-[0.35rem] p-2 pb-6 text-left shadow-[0_18px_42px_rgba(0,0,0,0.2)] transition-transform duration-300 ease-out focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#C49A3C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#120800]"
                        style={{
                          backgroundColor: "#F2E6C8",
                          opacity: isRevealed ? 1 : 0,
                          transform: isRevealed
                            ? `translateY(0) rotate(${rotation}deg)`
                            : `translateY(32px) rotate(${rotation}deg)`,
                          transition:
                            "opacity 0.6s ease, transform 0.6s ease",
                          transitionDelay: `${delay}ms`,
                        }}
                        onMouseEnter={(event) => {
                          event.currentTarget.style.transform = "rotate(0deg) scale(1.04) translateY(-4px)";
                        }}
                        onMouseLeave={(event) => {
                          event.currentTarget.style.transform = isRevealed
                            ? `translateY(0) rotate(${rotation}deg)`
                            : `translateY(32px) rotate(${rotation}deg)`;
                        }}
                        aria-label={`View larger: ${img.alt}`}
                      >
                        <div className="overflow-hidden rounded-[0.2rem] bg-[#2A140D]">
                          <div className="aspect-[4/3] overflow-hidden">
                            <img
                              src={img.src}
                              alt={img.alt}
                              loading="lazy"
                              className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
                            />
                          </div>
                        </div>
                        <div className="px-2 pt-4 text-center">
                          <p className="font-serif text-[1rem] italic text-[#5C3418] md:text-[1.15rem]">
                            {img.category.toLowerCase()}
                          </p>
                        </div>
                      </button>
                    </article>
                  );
                })}
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Section */}
        <section className="bg-[#1A0E06] py-24" aria-labelledby="gallery-tagline">
          <div className="text-center px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
            <h2 id="gallery-tagline" className="mb-6 font-serif text-4xl text-[#F5ECD7] md:text-5xl">
              {galleryPage?.taglineTitle}
            </h2>
            <p className="mx-auto max-w-xl text-lg text-[#9F8A7B]">
              {galleryPage?.taglineDescription}
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
