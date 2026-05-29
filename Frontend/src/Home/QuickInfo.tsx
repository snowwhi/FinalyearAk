import React from 'react';
import { motion } from 'framer-motion';

const QuickInfo = () => {
  const stats = [
    { label: 'Academic Excellence', val: '50+', sub: 'Degrees Offered', icon: 'ri-medal-line' },
    { label: 'Student Community', val: '15k+', sub: 'Active Students', icon: 'ri-group-line' },
    { label: 'Global Ranking', val: 'Top 5', sub: 'Regional Universities', icon: 'ri-global-line' },
    { label: 'Faculty', val: '500+', sub: 'Expert Professors', icon: 'ri-user-star-line' },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div className="space-y-4">
              <p className="text-amber-500 font-black uppercase tracking-[0.4em] text-[10px]">Thal University Bhakkar</p>
              <h2 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tighter leading-none uppercase">
                Shape Your <br/> <span className="text-amber-500">Future</span> With Us
              </h2>
            </div>
            <p className="text-slate-600 text-lg leading-relaxed font-medium">
              Join a community of scholars, innovators, and leaders. We provide a dynamic learning environment that 
              combines rigorous academic programs with real-world experience, preparing you for the challenges of tomorrow.
            </p>
            <div className="flex gap-4 pt-4">
              <button className="px-8 py-4 bg-slate-900 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20">Explore Programs</button>
              <button className="px-8 py-4 border border-slate-200 text-slate-800 font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-slate-50 transition-all">Learn More</button>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-[2.5rem] bg-[#FDFBF7] border border-slate-100 hover:border-amber-200 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 group text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center text-2xl text-slate-800 mb-6 mx-auto group-hover:bg-amber-500 group-hover:text-white transition-all duration-500">
                  <i className={s.icon} />
                </div>
                <h3 className="text-3xl font-black text-slate-800 mb-1 tracking-tighter group-hover:text-amber-600 transition-colors">{s.val}</h3>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">{s.label}</p>
                <p className="text-slate-400 text-[10px] font-medium">{s.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickInfo;
