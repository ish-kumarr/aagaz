import { motion } from 'framer-motion';

interface InfiniteMarqueeProps {
  items: string[];
  direction?: 'left' | 'right';
  speed?: number;
  className?: string;
}

export default function InfiniteMarquee({ 
  items, 
  direction = 'left', 
  speed = 30,
  className = '' 
}: InfiniteMarqueeProps) {
  const duplicatedItems = [...items, ...items, ...items, ...items];
  
  return (
    <div className={`relative overflow-hidden py-8 ${className}`}>
      {/* Softer fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />
      
      <motion.div
        className="flex items-center gap-16 whitespace-nowrap"
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {duplicatedItems.map((item, index) => (
          <div 
            key={`${item}-${index}`}
            className="flex items-center gap-16"
          >
            <span className="font-serif text-3xl md:text-4xl text-gold/80 hover:text-gold transition-colors duration-500 cursor-default tracking-wide">
              {item}
            </span>
            <span className="text-gold/60 text-sm">✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
