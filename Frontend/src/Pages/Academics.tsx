import { Link } from 'react-router-dom';
const Academics = () => {
  const programs = [
    { 
      id: 'undergraduate',
      title: 'Undergraduate Programs', 
      desc: 'Building strong foundations in engineering, sciences, and management with 24+ specialized degree tracks.',
      icon: 'ri-graduation-cap-line',
      highlights: ['4-Year Honors', '24+ Departments', 'Scholarships']
    },
    { 
      id: 'graduate',
      title: 'Graduate Studies', 
      desc: 'Advanced research programs for specialized professional development and academic mastery.',
      icon: 'ri-book-open-line',
      highlights: ['M.Phil & MS', 'Executive MBA', 'Evening Classes']
    },
    { 
      id: 'doctoral',
      title: 'Doctoral Programs', 
      desc: 'High-impact PhD research opportunities with access to world-class faculty and global partnerships.',
      icon: 'ri-medal-line',
      highlights: ['Pure Research', 'Global Partners', 'Funded Slots']
    },
  ];

  const faculties = [
    'Faculty of Computing & IT', 'Faculty of Management Sciences', 
    'Faculty of Social Sciences', 'Faculty of Engineering & Tech',
    'Faculty of Life Sciences', 'Faculty of Arts & Humanities'
  ];

  return (
    <main className="inter min-h-screen bg-[#F8FAFC]">
      
      {/* ── Header (Sophisticated Banner) ── */}
      <div className="bg-slate-950 px-6 md:px-16 pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(233,163,25,0.1),transparent)]" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/10 blur-[100px] rounded-full" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-slate-600 mb-8 flex-wrap">
            <Link to="/" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
              <i className="ri-home-4-fill text-amber-500 text-xs" /> Home
            </Link>
            <span className="text-slate-800">/</span>
            <span className="text-white/40">Academics</span>
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
             <div className="space-y-4">
                <span className="inline-block text-amber-500 font-black uppercase tracking-[0.4em] text-[10px]">Thal University Academic Portal</span>
                <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase leading-tight">
                   Shaping <br/> <span className="text-amber-500">Excellence</span>
                </h1>
             </div>
             <div className="max-w-xs pb-2">
                <p className="text-white/50 text-sm font-medium leading-relaxed border-l-2 border-amber-500/30 pl-6">
                   Explore our diverse academic pathways designed for the next generation of global leaders.
                </p>
             </div>
          </div>
        </div>
      </div>

      {/* ── Main Programs (High-Energy Cards) ── */}
      <section className="py-20 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
              {programs.map((prog, i) => (
                <Link 
                  key={i} 
                  to={`/academics/${prog.id}`}
                  className="group relative bg-white rounded-[3rem] p-10 border border-slate-100 shadow-2xl shadow-slate-900/0.04 transition-all duration-700 hover:-translate-y-4 block"
                >
                   {/* Background Glow */}
                   <div className="absolute inset-0 bg-linear-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[3rem]" />
                   
                   <div className="relative z-10 flex flex-col h-full">
                      <div className="w-16 h-16 bg-slate-900 rounded-1.5rem flex items-center justify-center text-3xl text-white mb-8 group-hover:bg-amber-500 group-hover:rotate-10deg transition-all duration-700 shadow-2xl shadow-slate-950/20">
                         <i className={prog.icon} />
                      </div>
                      
                      <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-4 leading-tight group-hover:text-amber-600 transition-colors">
                        {prog.title.split(' ')[0]} <br/>
                        <span className="text-amber-500 group-hover:text-slate-900">{prog.title.split(' ').slice(1).join(' ')}</span>
                      </h3>
                      
                      <p className="text-slate-400 font-medium text-sm leading-relaxed mb-8 flex-1">{prog.desc}</p>
                      
                      <div className="space-y-3 mb-8">
                         {prog.highlights.map((h, j) => (
                           <div key={j} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                              <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">{h}</span>
                           </div>
                         ))}
                      </div>

                      <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
                         <span className="text-slate-900 font-black text-[10px] uppercase tracking-[0.3em]">Learn More</span>
                         <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white group-hover:bg-amber-500 transition-all duration-500">
                            <i className="ri-arrow-right-up-line text-lg" />
                         </div>
                      </div>
                   </div>
                </Link>
              ))}
           </div>
        </div>
      </section>

      {/* ── Faculties (Sophisticated Dark Section) ── */}
      <section className="py-20 px-6 md:px-16">
         <div className="max-w-7xl mx-auto">
            <div className="bg-slate-950 rounded-[3rem] p-10 md:p-20 text-white relative overflow-hidden shadow-2xl">
               <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_90%_10%,rgba(233,163,25,0.08),transparent)]" />
               
               <div className="relative z-10 grid grid-cols-1 xl:grid-cols-2 gap-16 items-center">
                  <div className="space-y-8">
                     <div className="space-y-2">
                        <span className="text-amber-500 font-black uppercase tracking-[0.4em] text-[10px]">Academic Divisions</span>
                        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-tight">World Class <br/><span className="text-amber-500">Faculties</span></h2>
                     </div>
                     <p className="text-slate-400 font-medium text-lg leading-relaxed max-w-xl">
                        Our specialized faculties are equipped with state-of-the-art research labs and industry-standard resources.
                     </p>
                     <Link 
                       to="/faculty"
                       className="inline-flex items-center gap-4 px-10 py-5 bg-amber-500 text-white font-black text-xs uppercase tracking-widest rounded-[1.2rem] hover:bg-white hover:text-slate-950 transition-all group"
                     >
                       Explore Our Faculty <i className="ri-arrow-right-line group-hover:translate-x-2 transition-transform" />
                     </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {faculties.map((fac, i) => (
                       <Link 
                         key={i} 
                         to="/faculty"
                         className="flex items-center gap-5 p-5 rounded-1.5rem bg-white/5 border border-white/10 hover:border-amber-500/50 hover:bg-white/10 transition-all group"
                       >
                          <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-all">
                             <i className="ri-building-line text-sm" />
                          </div>
                          <span className="font-bold text-white/90 text-[10px] uppercase tracking-widest leading-tight group-hover:text-amber-500 transition-colors">{fac}</span>
                       </Link>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* ── Student Success (Refined) ── */}
      <section className="py-24 px-6 md:px-16">
         <div className="max-w-5xl mx-auto text-center">
            <div className="space-y-16">
               <div className="space-y-4">
                  <span className="text-amber-500 font-black uppercase tracking-[0.4em] text-[10px]">Student Resources</span>
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tight">Your <span className="text-amber-500">Journey</span></h2>
                  <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full" />
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
                  {[
                    { title: 'Academic Calendar', desc: 'Stay updated with semesters, exams, and key events.', icon: 'ri-calendar-todo-line', to: '/academics/calendar' },
                    { title: 'Financial Aid', desc: 'Merit-based scholarships and student support systems.', icon: 'ri-bank-card-line', to: '/contact' }
                  ].map((item, i) => (
                    <Link 
                      key={i} 
                      to={item.to}
                      className="group flex flex-col items-center space-y-6"
                    >
                       <div className="w-20 h-20 bg-white rounded-2rem flex items-center justify-center text-3xl text-slate-900 shadow-xl shadow-slate-200 group-hover:bg-amber-500 group-hover:text-white transition-all duration-700">
                          <i className={item.icon} />
                       </div>
                       <div className="space-y-2">
                          <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter group-hover:text-amber-600 transition-colors">{item.title}</h3>
                          <p className="text-slate-400 font-medium text-sm max-w-240px mx-auto">{item.desc}</p>
                       </div>
                    </Link>
                  ))}
               </div>
            </div>
         </div>
      </section>

    </main>
  );
};

export default Academics;