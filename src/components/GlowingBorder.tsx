import { motion } from 'framer-motion';

interface GlowingBorderProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlowingBorder({ children, className = '' }: GlowingBorderProps) {
  return (
    <div className={`relative group ${className}`}>
      {/* Animated border gradient */}
      <motion.div
        className="absolute -inset-[1px] rounded-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(90deg, transparent, hsl(43, 74%, 52%), transparent)',
          backgroundSize: '200% 100%',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '200% 0%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      {/* Content container */}
      <div className="relative bg-card rounded-2xl overflow-hidden">
        {children}
      </div>
      
      {/* Outer glow */}
      <motion.div
        className="absolute -inset-2 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(43, 74%, 52%), transparent 70%)',
        }}
        animate={{
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}
