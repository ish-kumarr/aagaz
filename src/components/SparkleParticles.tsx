import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface SparkleParticlesProps {
  count?: number;
  className?: string;
}

export default function SparkleParticles({ count = 30, className = '' }: SparkleParticlesProps) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 5,
    }));
  }, [count]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        >
          <svg
            width={particle.size * 2}
            height={particle.size * 2}
            viewBox="0 0 24 24"
            className="text-gold"
          >
            <path
              fill="currentColor"
              d="M12 0L13.5 9.5L24 12L13.5 14.5L12 24L10.5 14.5L0 12L10.5 9.5L12 0Z"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
