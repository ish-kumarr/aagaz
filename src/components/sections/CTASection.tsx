import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import LogoImage from '@/components/LogoImage';
import { Link } from 'react-router-dom';

interface CTASectionProps {
  onRegisterClick?: () => void;
}

export default function CTASection({ onRegisterClick }: CTASectionProps) {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden bg-background">
      {/* Subtle radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(43,74%,49%,0.02)_0%,transparent_70%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-10"
          >
            <LogoImage className="w-36 md:w-44 mx-auto" showGlow={false} />
          </motion.div>

          {/* Headline */}
          <motion.h2
            className="font-serif text-2xl md:text-4xl lg:text-5xl font-light leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="text-foreground">Your Invitation to</span>
            <br />
            <span className="text-gradient-gold">Financial Excellence</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            className="font-sans text-base md:text-lg text-muted-foreground/70 max-w-xl mx-auto mb-10 leading-relaxed font-light"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Join an exclusive gathering of industry leaders at The Banyan Retreat. 
            Experience the future of FX trading in an unparalleled setting.
          </motion.p>

          {/* Event Date Reminder */}
          <motion.div
            className="mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <p className="text-sm text-gold/70 tracking-wide">
              17th January 2026 · 4 PM Onwards
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col items-center gap-5"
          >
            <Link to="/register">
              <Button 
                variant="gold" 
                size="xl"
                className="text-xs tracking-[0.25em] uppercase px-12 py-6 h-auto rounded-none shadow-[0_0_30px_hsla(43,74%,49%,0.15)] hover:shadow-[0_0_50px_hsla(43,74%,49%,0.25)]"
              >
                Secure Your Place
              </Button>
            </Link>
            
            <div className="flex items-center gap-3 mt-2">
              <div className="w-6 h-px bg-border/50" />
              <p className="text-[10px] text-muted-foreground/40 tracking-[0.2em] uppercase">
                By invitation only
              </p>
              <div className="w-6 h-px bg-border/50" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
