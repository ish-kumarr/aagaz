import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import banyanRetreat1 from '@/assets/banyan-retreat-1.jpg';
import banyanRetreat2 from '@/assets/banyan-retreat-2.jpg';
import banyanRetreat3 from '@/assets/banyan-retreat-3.jpg';

const slides = [
  {
    src: banyanRetreat1,
    alt: 'Exclusive AAGAZ Event Venue',
    subtitle: 'A New Beginning',
    title: 'The Genesis of Financial Mastery',
    description: 'Witness the dawn of a new era in trading. AAGAZ is more than an event; it\'s the start of your legacy.',
  },
  {
    src: banyanRetreat2,
    alt: 'Elite Networking at AAGAZ',
    subtitle: 'Forge Your Alliance',
    title: 'Connect with Market Shapers',
    description: 'Engage with an elite circle of traders, brokers, and visionaries. Your next big opportunity starts with a handshake.',
  },
  {
    src: banyanRetreat3,
    alt: 'Luxurious and Insightful AAGAZ Experience',
    subtitle: 'Beyond the Charts',
    title: 'An Experience in Excellence',
    description: 'Immerse yourself in an atmosphere of luxury where groundbreaking insights and strategic collaborations come to life.',
  },
];

const slideVariants = {
  enter: {
    opacity: 0,
    scale: 1.05,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
  center: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const textVariants = {
  enter: { opacity: 0, y: 30 },
  center: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut', delay: 0.4 } },
  exit: { opacity: 0, y: -30, transition: { duration: 0.5, ease: 'easeIn' } },
};

export default function BrandingCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentIndex}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          <img
            src={slides[currentIndex].src}
            alt={slides[currentIndex].alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex flex-col justify-end h-full p-6 md:p-12 text-white"> {/* Adjusted padding */}
        <AnimatePresence mode="out-in">
          <motion.div
            key={currentIndex}
            variants={textVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-2"> {/* Adjusted margin-bottom */}
              {slides[currentIndex].subtitle}
            </p>
            <h3 className="font-serif text-2xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight"> {/* Adjusted text size */}
              {slides[currentIndex].title}
            </h3>
            <p className="text-white/80 max-w-md text-base font-light">
              {slides[currentIndex].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-6 right-6 z-10 flex gap-2.5"> {/* Adjusted bottom/right */}
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className="w-2 h-2 rounded-full ring-1 ring-white/50 ring-offset-2 ring-offset-black/50 transition-all duration-300"
            style={{ backgroundColor: currentIndex === index ? '#D4AF37' : 'transparent' }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
