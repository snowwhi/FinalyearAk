
import { motion } from 'framer-motion';

const Organization = () => {
  const offices = [
    { name: 'Office of the Registrar', head: 'Prof. Muhammad Akram', icon: 'ri-file-text-line' },
    { name: 'Finance & Accounts', head: 'Mr. Khalid Mahmood', icon: 'ri-bank-card-line' },
    { name: 'Admissions Office', head: 'Dr. Sarah Khan', icon: 'ri-user-add-line' },
    { name: 'IT & Digital Services', head: 'Engr. Ahmad Raza', icon: 'ri-computer-line' },
    { name: 'Student Affairs', head: 'Ms. Maria Ali', icon: 'ri-heart-line' },
    { name: 'Research & ORIC', head: 'Dr. Usman Ghani', icon: 'ri-microscope-line' },
  ];

  return (
    <main className="min-h-screen bg-[#F8FAFC] font-sans">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-amber-500 font-black uppercase tracking-[0.4em] text-[10px] mb-4">University Structure</p>
          <h1 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tight uppercase">Organization <span className="text-amber-500">& Governance</span></h1>
          <div className="w-24 h-1.5 bg-slate-800 mx-auto mt-8 rounded-full" />
        </motion.div>
      </section>

      {/* University Council */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2" />
          <h2 className="text-3xl font-bold text-slate-800 mb-8 flex items-center gap-4">
            <i className="ri-government-line text-amber-500" /> University Council
          </h2>
          <div className="space-y-6">
            <p className="text-slate-600 leading-relaxed font-medium">
              The University Council is the supreme governing body of Thal University Bhakkar, responsible for the overall strategic direction, financial stability, and institutional integrity.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Academic Senate', 'Syndicate', 'Finance & Planning Committee', 'Selection Board'].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-amber-200 transition-all cursor-default">
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="font-bold text-slate-700 text-sm tracking-tight">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Administrative Offices Grid */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-center justify-between mb-16 px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">Administrative <span className="text-amber-500">Offices</span></h2>
          <div className="hidden md:block h-px bg-slate-200 flex-1 mx-12" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offices.map((office, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/20 group transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center text-2xl text-white mb-6 group-hover:bg-amber-500 transition-colors duration-500">
                <i className={office.icon} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">{office.name}</h3>
              <div className="flex items-center gap-2 text-slate-400">
                <i className="ri-user-star-line text-amber-500" />
                <span className="text-xs font-black uppercase tracking-widest">{office.head}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section Placeholder */}
      <section className="py-24 bg-slate-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Need to reach an office?</h2>
          <p className="text-slate-400 text-lg font-medium">For inquiries regarding admissions, academics, or administration, please visit our contact page or email us directly.</p>
          <div className="flex justify-center gap-6 pt-4">
            <button className="px-10 py-4 bg-amber-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-amber-600 transition-all shadow-xl shadow-amber-500/20">Contact Us</button>
            <button className="px-10 py-4 bg-white/5 border border-white/10 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all">Campus Directory</button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Organization;
