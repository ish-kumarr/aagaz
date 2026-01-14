import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TimeUnitProps {
  value: number;
  label: string;
  isUrgent: boolean;
}

function TimeUnit({ value, label, isUrgent }: TimeUnitProps) {
  const paddedValue = String(value).padStart(2, '0');
  const textColor = isUrgent ? 'text-red-500' : 'text-gold';
  const bgColor = isUrgent ? 'from-red-500/20 to-red-500/10' : 'from-gold/10 to-gold/5';

  return (
    <div className="flex flex-col items-center">
      <div className={`relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br ${bgColor} border ${isUrgent ? 'border-red-500/50' : 'border-gold/20'} shadow-lg`}>
        <AnimatePresence mode="wait">
          <motion.span
            key={paddedValue}
            initial={{ y: '50%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '-50%', opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`absolute font-sans text-3xl md:text-4xl font-bold ${textColor} tracking-tighter`}
          >
            {paddedValue}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-2 text-xs text-muted-foreground tracking-widest uppercase">
        {label}
      </span>
    </div>
  );
}

export default function RegistrationCountdown() {
  const registrationEndDate = new Date('2026-01-16T18:00:00'); // January 16th, 6 PM
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(true);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = registrationEndDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsRegistrationOpen(false);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isRegistrationOpen) {
    return (
      <div className="text-center text-xl font-bold text-red-500">
        Registration Closed!
      </div>
    );
  }

  const isUrgent = timeLeft.days < 1 && timeLeft.hours < 6; // Less than 6 hours left

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <h3 className="text-xl md:text-2xl font-serif text-gold tracking-wide">
        Registration Closes In:
      </h3>
      <div className="flex items-start justify-center gap-3 md:gap-6">
        <TimeUnit value={timeLeft.days} label="Days" isUrgent={isUrgent} />
        <span className="text-gold/60 text-2xl md:text-4xl font-light pt-4">:</span>
        <TimeUnit value={timeLeft.hours} label="Hours" isUrgent={isUrgent} />
        <span className="text-gold/60 text-2xl md:text-4xl font-light pt-4">:</span>
        <TimeUnit value={timeLeft.minutes} label="Minutes" isUrgent={isUrgent} />
        <span className="text-gold/60 text-2xl md:text-4xl font-light pt-4">:</span>
        <TimeUnit value={timeLeft.seconds} label="Seconds" isUrgent={isUrgent} />
      </div>
    </div>
  );
}
