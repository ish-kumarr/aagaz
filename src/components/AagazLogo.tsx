import { motion } from 'framer-motion';
import aagazLogo from '@/assets/aagaz-logo.png';

export default function AagazLogo({ className = "" }: { className?: string }) {
  return (
    <motion.img
      src={aagazLogo}
      alt="AAGAZ Logo"
      className={className}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    />
  );
}
