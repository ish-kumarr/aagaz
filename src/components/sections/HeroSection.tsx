import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import ScrollIndicator from '@/components/ScrollIndicator';
import LogoImage from '@/components/LogoImage';
import heroVideo from '@/assets/hero-bg-video.mp4';
import { Link } from 'react-router-dom';

interface HeroSectionProps {
  onRegisterClick?: () => void;
}

export default function HeroSection({ onRegisterClick }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-40"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-background/60" />
      </div>

      {/* Simple gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background z-[1]" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-20 pb-32">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Logo Image - Centered and Prominent */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="mb-12"
          >
            <LogoImage className="w-80 md:w-[26rem] lg:w-[32rem] mx-auto" />
          </motion.div>

          {/* Event Date */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <div className="inline-flex items-center justify-center w-full">
              <div className="flex flex-col items-center gap-2">
                <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground tracking-wider">
                  17th January 2026
                </p>
                <p className="font-sans text-sm md:text-base text-muted-foreground tracking-widest uppercase">
                  4 PM Onwards
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="flex flex-col items-center gap-4"
          >
            <Link to="/register">
              <Button 
                variant="gold" 
                size="xl"
                className="text-xs tracking-[0.25em] uppercase px-14 py-6 h-auto rounded-none"
              >
                Register for AAGAZ
              </Button>
            </Link>
            <p className="text-xs text-muted-foreground/50 tracking-wider">
              Limited seats available
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator />

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-[3]" />
    </section>
  );
}
