import { motion } from 'framer-motion';
import { Phone, MapPin, Navigation } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const directionsUrl = 'https://maps.app.goo.gl/NRL3DvBNoaW5fokPA';

  return (
    <footer className="relative py-16 md:py-20 bg-background border-t border-border/10">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center">
          {/* Contact Info */}
          <motion.div
            className="flex flex-col md:flex-row items-center gap-6 md:gap-12 mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Address with Directions */}
            <a 
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-muted-foreground hover:text-gold transition-colors duration-300 group"
            >
              <MapPin className="w-4 h-4 text-gold/50 group-hover:text-gold transition-colors" />
              <span className="font-sans text-sm tracking-wide text-center md:text-left">
                The Banyan Retreat, Jim Corbett, Uttarakhand
              </span>
              <Navigation className="w-3 h-3 text-gold/30 group-hover:text-gold transition-colors" />
            </a>

            {/* Divider */}
            <div className="hidden md:block w-px h-5 bg-border/30" />

            {/* Phone */}
            <a 
              href="tel:+919876543210" 
              className="flex items-center gap-3 text-muted-foreground hover:text-gold transition-colors duration-300 group"
            >
              <Phone className="w-4 h-4 text-gold/50 group-hover:text-gold transition-colors" />
              <span className="font-sans text-sm tracking-wide">+91 98765 43210</span>
            </a>
          </motion.div>

          {/* Copyright */}
          <motion.p
            className="text-[10px] text-muted-foreground/30 font-sans tracking-[0.2em] uppercase"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            © {currentYear} AAGAZ
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
