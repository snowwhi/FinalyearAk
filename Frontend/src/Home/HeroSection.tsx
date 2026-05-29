import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import first from '../assets/1.jpg';
import Second from '../assets/2.jpg';
import third from '../assets/3.jpg';
import fourh from '../assets/4.jpg';
import eigth from '../assets/8.jpg';

const images = [first, Second, third, fourh, eigth];

const HeroSection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="relative h-[80vh] md:h-[calc(100vh-5rem)] w-full overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 z-0"
        >
          <motion.img
          
            src={images[index]}
            alt="University Campus"
            initial={{ scale: 1.05 }}
            animate={{ scale: 1.15 }}
            transition={{ duration: 10, ease: "linear" }}
            className="h-full w-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Professional Dark Overlay */}
      <div className="absolute inset-0 z-0 bg-slate-900/40" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none drop-shadow-2xl"
        >
          Building a <span className="text-amber-500">Brighter</span> Future
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-white/90 text-lg md:text-2xl max-w-3xl mx-auto font-medium tracking-tight"
        >
          Empowering the next generation of leaders at Thal University Bhakkar
        </motion.p>
      </div>
    </div>
  );
};

export default HeroSection;