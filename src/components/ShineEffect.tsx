import { motion } from 'framer-motion';

interface ShineEffectProps {
  className?: string;
}

export default function ShineEffect({ className = '' }: ShineEffectProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Diagonal shine sweep */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/10 to-transparent"
        style={{ 
          width: '200%',
          transform: 'skewX(-20deg)',
        }}
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 4,
          ease: 'easeInOut',
        }}
      />
      
      {/* Corner sparkles */}
      <motion.div
        className="absolute top-0 right-0 w-32 h-32"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <radialGradient id="sparkle-gradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(43, 74%, 52%)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="hsl(43, 74%, 52%)" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="40" fill="url(#sparkle-gradient)" />
        </svg>
      </motion.div>
    </div>
  );
}
