import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TimeUnitProps {
  value: number;
  label: string;
}

function TimeUnit({ value, label }: TimeUnitProps) {
  const paddedValue = String(value).padStart(2, '0');

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-16 h-16 md:w-24 md:h-24 flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-gold/10 to-gold/5 shadow-lg">
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm" />
        <AnimatePresence mode="wait">
          <motion.span
            key={paddedValue}
            initial={{ y: '100%', opacity: 0, rotateX: -90 }}
            animate={{ y: '0%', opacity: 1, rotateX: 0 }}
            exit={{ y: '-100%', opacity: 0, rotateX: 90 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="absolute font-sans text-3xl md:text-5xl font-bold text-gold tracking-tighter"
          >
            {paddedValue}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-3 text-xs text-muted-foreground tracking-widest uppercase">
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer() {
  const eventDate = new Date('2026-01-17T16:00:00');
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = eventDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-start justify-center gap-4 md:gap-8">
      <TimeUnit value={timeLeft.days} label="Days" />
      <span className="text-gold/40 text-3xl md:text-5xl font-light pt-5">:</span>
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <span className="text-gold/40 text-3xl md:text-5xl font-light pt-5">:</span>
      <TimeUnit value={timeLeft.minutes} label="Minutes" />
      <span className="text-gold/40 text-3xl md:text-5xl font-light pt-5">:</span>
      <TimeUnit value={timeLeft.seconds} label="Seconds" />
    </div>
  );
}
