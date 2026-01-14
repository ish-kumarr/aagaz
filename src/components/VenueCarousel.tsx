import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import banyanRetreat1 from '@/assets/banyan-retreat-1.jpg';
import banyanRetreat2 from '@/assets/banyan-retreat-2.jpg';
import banyanRetreat3 from '@/assets/banyan-retreat-3.jpg';
import { useIsMobile } from '@/hooks/use-mobile'; // Import useIsMobile hook

const images = [
  { src: banyanRetreat1, alt: 'Luxury cottages at The Banyan Retreat', caption: 'Private Forest Cottages', subtitle: 'Nestled in nature' },
  { src: banyanRetreat2, alt: 'Infinity pool at sunset', caption: 'Infinity Pool & Spa', subtitle: 'Serene relaxation' },
  { src: banyanRetreat3, alt: 'Elegant outdoor dining', caption: 'Private Dining', subtitle: 'Culinary excellence' },
];

export default function VenueCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const isMobile = useIsMobile(); // Use the hook to detect mobile

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, []);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1.1,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <motion.div style={{ perspective: '1000px' }}>
      <motion.div 
        className="relative w-full aspect-[16/10] md:aspect-[21/9] rounded-xl overflow-hidden group cursor-pointer"
        whileHover={{ scale: 1.02, rotateY: 3 }}
        whileTap={{ scale: 0.98, rotateY: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {/* Images with Ken Burns effect */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0"
          >
            <motion.img
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              className="w-full h-full object-cover"
              initial={{ scale: 1 }}
              animate={{ scale: 1.05 }}
              transition={{ duration: 8, ease: "linear" }}
            />
            
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50" />
            
            {/* Vignette */}
            <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]" />
          </motion.div>
        </AnimatePresence>

        {/* Caption with animated underline */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={`caption-${currentIndex}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-md"
            >
              <p className="label-premium text-gold mb-2">
                {images[currentIndex].subtitle}
              </p>
              <h3 className="font-serif text-xl md:text-4xl text-foreground mb-3"> {/* Adjusted font size for mobile */}
                {images[currentIndex].caption}
              </h3>
              <motion.div 
                className="h-px bg-gradient-to-r from-gold via-gold to-transparent max-w-[200px]"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation arrows - always visible on mobile, hidden on hover for desktop */}
        <button
          onClick={prevSlide}
          className={`absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full border border-foreground/20 flex items-center justify-center text-foreground/60 transition-all duration-500 hover:border-gold hover:text-gold hover:scale-110 backdrop-blur-sm ${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} // Conditional opacity
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className={`absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full border border-foreground/20 flex items-center justify-center text-foreground/60 transition-all duration-500 hover:border-gold hover:text-gold hover:scale-110 backdrop-blur-sm ${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} // Conditional opacity
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Progress indicator */}
        <div className="absolute bottom-6 md:bottom-10 right-6 md:right-10 flex items-center gap-3">
          <span className="text-xs text-foreground/50 font-sans">
            {String(currentIndex + 1).padStart(2, '0')}
          </span>
          <div className="flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="relative h-0.5 overflow-hidden rounded-full transition-all duration-500"
                style={{ width: index === currentIndex ? '32px' : '16px' }}
                aria-label={`Go to slide ${index + 1}`}
              >
                <div className="absolute inset-0 bg-foreground/20" />
                {index === currentIndex && (
                  <motion.div
                    className="absolute inset-0 bg-gold"
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 6, ease: "linear" }}
                  />
                )}
              </button>
            ))}
          </div>
          <span className="text-xs text-foreground/50 font-sans">
            {String(images.length).padStart(2, '0')}
          </span>
        </div>

        {/* Subtle border */}
        <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-foreground/10 pointer-events-none" />
      </motion.div>
    </motion.div>
  );
}
