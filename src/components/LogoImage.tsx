import { motion } from 'framer-motion';
import aagaz_logo from '@/assets/aagaz-logo.png';

interface LogoImageProps {
  className?: string;
  showGlow?: boolean;
}

export default function LogoImage({ className = '', showGlow = true }: LogoImageProps) {
  return (
    <motion.div
      className={`relative inline-block ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Subtle glow behind logo */}
      {showGlow && (
        <div className="absolute inset-0 blur-2xl opacity-20 bg-gold/30 scale-110" />
      )}
      
      {/* Logo image */}
      <img 
        src={aagaz_logo} 
        alt="AAGAZ" 
        className="relative w-full h-auto object-contain"
      />
    </motion.div>
  );
}
