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
      <div className="relative w-16 h-16 md:w-24 md:h-24 flex items-center justify-center overflow-hidden rounded-lg bg-gray-800 border border-gold/20 shadow-lg"> {/* Refined background and border */}
        <AnimatePresence mode="wait">
          <motion.span
            key={paddedValue}
            initial={{ y: '50%', opacity: 0 }} // Subtle slide up and fade in
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '-50%', opacity: 0 }} // Subtle slide down and fade out
            transition={{ duration: 0.3, ease: 'easeOut' }} // Faster and smoother transition
            className="absolute font-sans text-3xl md:text-5xl font-bold text-gold tracking-tighter"
          >
            {paddedValue}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-3 text-xs md:text-sm text-muted-foreground tracking-widest uppercase"> {/* Slightly larger text on md screens */}
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer() {
  const eventDate = new Date('2026-01-17T16:00:00'); // Ensure this date is accurate for the event
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
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); // Ensure it stops at 0
        // Optionally, trigger an event or hide the timer when it's over
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-start justify-center gap-4 md:gap-8">
      <TimeUnit value={timeLeft.days} label="Days" />
      <span className="text-gold/60 text-3xl md:text-5xl font-light pt-5">:</span> {/* Adjusted color for better contrast */}
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <span className="text-gold/60 text-3xl md:text-5xl font-light pt-5">:</span> {/* Adjusted color */}
      <TimeUnit value={timeLeft.minutes} label="Minutes" />
      <span className="text-gold/60 text-3xl md:text-5xl font-light pt-5">:</span> {/* Adjusted color */}
      <TimeUnit value={timeLeft.seconds} label="Seconds" />
    </div>
  );
}
