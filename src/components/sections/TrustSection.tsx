import { motion } from 'framer-motion';
import InfiniteMarquee from '@/components/InfiniteMarquee';
import TrustCard from '@/components/TrustCard';
import { Shield, TrendingUp, Globe, Users } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile'; // Import useIsMobile

export default function TrustSection() {
  const isMobile = useIsMobile(); // Get mobile status

  // Define speeds based on device
  const marqueeSpeed1 = isMobile ? 30 : 50; // Faster for mobile
  const marqueeSpeed2 = isMobile ? 35 : 55; // Faster for mobile
  const trustPoints = [
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: "Innovation First",
      description: "Pioneering trading solutions that redefine how global markets operate.",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Institutional Trust",
      description: "Built on decades of financial expertise with regulatory compliance.",
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: "Global Reach",
      description: "Access markets across continents with seamless execution.",
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Elite Network",
      description: "A curated community of high-net-worth individuals and traders.",
    },
  ];

  const marqueeItems = [
    'Innovation',
    'Excellence', 
    'Trust',
    'Global Markets',
    'Elite Trading',
    'Premium FX',
    'Precision',
    'Performance',
  ];

  return (
    <section id="trust" className="relative py-28 md:py-36 bg-background overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--gold)) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Top Marquee */}
      <div className="mb-20">
        <InfiniteMarquee items={marqueeItems} direction="left" speed={marqueeSpeed1} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-gold/70 mb-5">The Foundation</p>
          
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-5">
            <span className="text-foreground">Built on </span>
            <span className="text-gradient-gold">Excellence</span>
          </h2>
          
          <p className="text-muted-foreground/70 max-w-xl mx-auto text-base md:text-lg font-light">
            A professional trading ecosystem where innovation meets institutional-grade security
          </p>
        </motion.div>

        {/* Trust cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {trustPoints.map((point, index) => (
            <TrustCard
              key={point.title}
              icon={point.icon}
              title={point.title}
              description={point.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>

      {/* Bottom Marquee */}
      <div className="mt-20">
        <InfiniteMarquee items={marqueeItems} direction="right" speed={marqueeSpeed2} />
      </div>
    </section>
  );
}