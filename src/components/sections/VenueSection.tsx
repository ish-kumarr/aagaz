import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock } from 'lucide-react';
import VenueCarousel from '@/components/VenueCarousel';

export default function VenueSection() {
  const eventDate = new Date('2026-01-17T16:00:00'); // Assuming 17th January 2026, 4 PM

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(eventDate);

  const formattedTime = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(eventDate) + " Onwards";

  const venueDetails = [
    { icon: <Calendar className="w-4 h-4" />, label: "Date", value: formattedDate },
    { icon: <Clock className="w-4 h-4" />, label: "Time", value: formattedTime },
    { icon: <MapPin className="w-4 h-4" />, label: "Location", value: "Jim Corbett, India" },
  ];

  return (
    <section className="relative py-28 md:py-36 overflow-hidden bg-card/20">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs tracking-[0.3em] uppercase text-gold/70 mb-5">The Venue</p>
            
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-gradient-gold mb-3">
              The Banyan Retreat
            </h2>
            
            <p className="text-base md:text-lg text-muted-foreground/70 font-light">
              Jim Corbett, Uttarakhand
            </p>
          </motion.div>

          {/* Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mb-14"
          >
            <VenueCarousel />
          </motion.div>

          {/* Description */}
          <motion.p
            className="max-w-2xl mx-auto text-center text-muted-foreground/80 leading-relaxed mb-12 text-base md:text-lg font-light"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            A sanctuary of exclusivity where nature meets sophistication. 
            The perfect backdrop for decisions that move markets.
          </motion.p>

          {/* Venue details */}
          <motion.div 
            className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {venueDetails.map((detail, index) => (
              <div
                key={detail.label}
                className="flex items-center gap-3 group"
              >
                <div className="text-gold/60 group-hover:text-gold transition-colors duration-300">
                  {detail.icon}
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
                    {detail.label}
                  </p>
                  <p className="text-foreground font-light text-sm group-hover:text-gold transition-colors duration-300">
                    {detail.value}
                  </p>
                </div>
                {index < venueDetails.length - 1 && (
                  <div className="hidden md:block w-px h-8 bg-border/50 ml-6" />
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
