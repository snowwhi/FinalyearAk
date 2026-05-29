import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import graphImage from '../assets/research.jpg';
import molecularBackground from '../assets/R2.jpg';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 }
  }
};

const leftVariants: Variants = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.4, ease: [0.25, 1, 0.5, 1] }
  }
};

const rightVariants: Variants = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.4, ease: [0.25, 1, 0.5, 1] }
  }
};

const ResearchHighlight: React.FC = () => {
  const sectionRef = useRef(null);

  // Only fires when section is at least 160px above the bottom of the viewport
  const isInView = useInView(sectionRef, {
    once: false,
    margin: '0px 0px -160px 0px',
  });

  return (
    <section className="bg-white py-16 md:py-24 overflow-hidden">
      <motion.div
        ref={sectionRef}
        className="container max-w-7xl mx-auto px-6"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={containerVariants}
      >
        {/* ── Section Header ── */}
        <div className="mb-10">
          <p className="text-amber-500 font-black uppercase tracking-[0.4em] text-[10px] mb-2">Scientific Impact</p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight uppercase">
            Research & <span className="text-amber-500">Publications</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-y-10 lg:gap-0">
          <motion.div
            className="lg:col-span-7 z-20 lg:-mr-16"
            variants={leftVariants}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-linear-to-r from-amber-500 to-transparent opacity-20 blur group-hover:opacity-40 transition-opacity duration-700" />
              <div className="relative bg-white p-2 shadow-2xl rounded-sm border border-slate-100">
                <img
                  src={graphImage}
                  alt="Research Analysis"
                  className="w-full h-auto object-cover rounded-sm aspect-video lg:aspect-4/3"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
          <motion.div
            className="lg:col-span-5 z-10 min-w-0"
            variants={rightVariants}
          >
            <div className="relative rounded-2xl shadow-2xl overflow-hidden bg-slate-950 flex flex-col justify-center min-h-[480px]
                            px-8 py-10 lg:pl-24 lg:pr-10">
              <div className="absolute inset-0 z-0">
                <img
                  src={molecularBackground}
                  className="w-full h-full object-cover opacity-30 mix-blend-overlay"
                  alt=""
                />
                <div className="absolute inset-0 bg-linear-to-br from-slate-950 via-slate-950/90 to-transparent" />
              </div>
              <div className="relative z-10 text-white">
                <header className="mb-6">
                  <span className="inline-block text-[10px] md:text-xs font-bold text-amber-400 uppercase tracking-[0.4em] mb-3">
                    Research Excellence
                  </span>
                  <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-none uppercase">
                    ADVANCED <br /> MATERIALS
                  </h2>
                </header>

                <article className="space-y-4 text-slate-300">
                  <p className="font-bold text-white text-base leading-snug border-l-4 border-amber-500 pl-4 italic">
                    "Hydrogen Embrittlement-Like Assisted Thermal Activation Strategy."
                  </p>
                  <p className="text-sm md:text-base opacity-80 leading-relaxed">
                    This collaborative study, published in{' '}
                    <span className="text-white font-medium">RSC Sustainability</span>,
                    proposes a breakthrough in molecular activation energies.
                    Led by Thal University, the research optimizes materials
                    for critical thermal environments.
                  </p>
                </article>

                <footer className="mt-8">
                  <Link
                    to="/research-news"
                    className="inline-flex items-center gap-3 px-7 py-3 bg-white text-slate-950 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-amber-400 transition-colors duration-300 group"
                  >
                    View Full Paper
                    <i className="ri-external-link-line text-lg transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </footer>
              </div>

            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};

export default ResearchHighlight;