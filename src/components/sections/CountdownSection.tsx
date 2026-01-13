import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';
import CountdownTimer from '@/components/CountdownTimer';
import { Button } from '@/components/ui/button';

export default function CountdownSection() {
  const directionsUrl = 'https://maps.app.goo.gl/NRL3DvBNoaW5fokPA';

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-background">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(43,74%,49%,0.03)_0%,transparent_60%)]" />
      
      {/* Decorative lines */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-gold/60 mb-4">
            Mark Your Calendar
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light">
            <span className="text-foreground">Event Begins In</span>
          </h2>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-16"
        >
          <CountdownTimer />
        </motion.div>

        {/* Event Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="inline-flex flex-col items-center gap-6 p-8 border border-border/10 bg-background/50 backdrop-blur-sm">
            {/* Date & Time */}
            <div className="text-center">
              <p className="font-serif text-xl md:text-2xl text-foreground mb-1">
                17<sup className="text-sm">th</sup> January 2026
              </p>
              <p className="text-sm text-muted-foreground tracking-wide">
                4:00 PM Onwards
              </p>
            </div>

            <div className="w-16 h-px bg-gold/20" />

            {/* Venue */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-gold/60" />
                <p className="font-serif text-lg text-foreground">
                  The Banyan Retreat
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                Jim Corbett, Uttarakhand
              </p>
            </div>

            {/* Get Directions Button */}
            <a 
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="mt-2 border-gold/30 hover:bg-gold/5 hover:border-gold/50 transition-all duration-300 group"
              >
                <Navigation className="w-4 h-4 mr-2 text-gold/70 group-hover:text-gold transition-colors" />
                <span className="text-sm tracking-wide">Get Directions</span>
              </Button>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
    </section>
  );
}
