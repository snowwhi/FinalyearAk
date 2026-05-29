
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProgramDetail = () => {
  const { programId } = useParams();

  const programData = {
    undergraduate: {
      title: 'Undergraduate Programs',
      count: '24+ Specializations',
      subjects: [
        { name: 'BS Computer Science', icon: 'ri-computer-line', duration: '4 Years', credits: '136', desc: 'Core software engineering, AI, and cybersecurity foundations.' },
        { name: 'BS Physics', icon: 'ri-atom-line', duration: '4 Years', credits: '132', desc: 'Exploration of physical laws, from quantum to astrophysics.' },
        { name: 'BBA Honors', icon: 'ri-briefcase-line', duration: '4 Years', credits: '144', desc: 'Modern business leadership, marketing, and finance.' },
        { name: 'BS Mathematics', icon: 'ri-functions', duration: '4 Years', credits: '130', desc: 'Advanced calculus, modeling, and statistical theory.' },
        { name: 'BS Economics', icon: 'ri-line-chart-line', duration: '4 Years', credits: '132', desc: 'Market analysis, global policy, and financial systems.' },
        { name: 'BS Sociology', icon: 'ri-team-line', duration: '4 Years', credits: '128', desc: 'Human behavior, social structures, and cultural analysis.' },
        { name: 'BS Software Engineering', icon: 'ri-code-s-slash-line', duration: '4 Years', credits: '138', desc: 'Application development, QA, and systems architecture.' },
        { name: 'BS Information Tech', icon: 'ri-shield-flash-line', duration: '4 Years', credits: '134', desc: 'Network security, cloud computing, and IT infrastructure.' },
        { name: 'BS Chemistry', icon: 'ri-test-tube-line', duration: '4 Years', credits: '132', desc: 'Organic, inorganic, and analytical chemical research.' },
        { name: 'BS Botany', icon: 'ri-leaf-line', duration: '4 Years', credits: '130', desc: 'Plant biology, genetics, and environmental ecosystems.' },
        { name: 'BS Zoology', icon: 'ri-bug-line', duration: '4 Years', credits: '130', desc: 'Animal behavior, physiology, and evolutionary biology.' },
        { name: 'BS Biotechnology', icon: 'ri-dna-line', duration: '4 Years', credits: '136', desc: 'Genetic engineering and medical tech innovations.' },
        { name: 'BS Psychology', icon: 'ri-mental-health-line', duration: '4 Years', credits: '132', desc: 'Clinical psychology and human cognitive development.' },
        { name: 'BS English', icon: 'ri-quill-pen-line', duration: '4 Years', credits: '128', desc: 'Linguistic study and global literature analysis.' },
        { name: 'BS Education', icon: 'ri-book-3-line', duration: '4 Years', credits: '132', desc: 'Pedagogy, curriculum design, and academic leadership.' },
        { name: 'BS Political Science', icon: 'ri-government-line', duration: '4 Years', credits: '130', desc: 'Political theory, governance, and international relations.' },
        { name: 'BS Mass Comm', icon: 'ri-broadcast-line', duration: '4 Years', credits: '134', desc: 'Journalism, digital media, and public relations.' },
        { name: 'BS Fine Arts', icon: 'ri-palette-line', duration: '4 Years', credits: '140', desc: 'Visual arts, design history, and creative expression.' },
        { name: 'BS Agriculture', icon: 'ri-seedling-line', duration: '4 Years', credits: '144', desc: 'Modern farming tech and crop resource management.' },
        { name: 'BS Food Science', icon: 'ri-restaurant-2-line', duration: '4 Years', credits: '138', desc: 'Nutrition, food safety, and processing technology.' },
        { name: 'BS Statistics', icon: 'ri-pie-chart-line', duration: '4 Years', credits: '130', desc: 'Data probability, actuarial science, and analysis.' },
        { name: 'BS Archeology', icon: 'ri-ancient-gate-line', duration: '4 Years', credits: '132', desc: 'Historical excavations and cultural heritage study.' },
        { name: 'BS Geology', icon: 'ri-landscape-line', duration: '4 Years', credits: '134', desc: 'Earth sciences, mineralogy, and tectonic research.' },
        { name: 'BS Law (LLB)', icon: 'ri-scales-3-line', duration: '5 Years', credits: '166', desc: 'Jurisprudence, constitutional law, and legal ethics.' }
      ]
    },
    graduate: {
      title: 'Graduate Studies',
      count: '12+ Specializations',
      subjects: [
        { name: 'MS Computer Science', icon: 'ri-database-2-line', duration: '2 Years', credits: '30', desc: 'Advanced algorithms, ML, and distributed systems.' },
        { name: 'MBA Executive', icon: 'ri-p2p-line', duration: '2 Years', credits: '66', desc: 'Strategic leadership and global market management.' },
        { name: 'MS Physics', icon: 'ri-lightbulb-flash-line', duration: '2 Years', credits: '32', desc: 'Advanced quantum mechanics and material research.' },
        { name: 'M.Phil Education', icon: 'ri-presentation-line', duration: '2 Years', credits: '30', desc: 'Research in higher education and curriculum policy.' },
        { name: 'MS Mathematics', icon: 'ri-formula', duration: '2 Years', credits: '30', desc: 'Applied mathematics and theoretical computation.' },
        { name: 'MS Chemistry', icon: 'ri-flask-line', duration: '2 Years', credits: '32', desc: 'Industrial chemical research and synthesis.' },
        { name: 'MS Botany', icon: 'ri-plant-line', duration: '2 Years', credits: '32', desc: 'Phytochemistry and plant resource management.' },
        { name: 'MS Zoology', icon: 'ri-microscope-line', duration: '2 Years', credits: '32', desc: 'Wildlife conservation and molecular biology.' },
        { name: 'MS Economics', icon: 'ri-funds-line', duration: '2 Years', credits: '30', desc: 'Econometrics and developmental policy research.' },
        { name: 'MS Sociology', icon: 'ri-earth-line', duration: '2 Years', credits: '30', desc: 'Social policy analysis and demographic studies.' },
        { name: 'MS English Lit', icon: 'ri-book-open-fill', duration: '2 Years', credits: '30', desc: 'Critical theory and contemporary world literature.' },
        { name: 'MS Statistics', icon: 'ri-bar-chart-grouped-line', duration: '2 Years', credits: '30', desc: 'Big data analytics and predictive modeling.' }
      ]
    },
    doctoral: {
      title: 'Doctoral Research',
      count: '6+ Specializations',
      subjects: [
        { name: 'Ph.D. Computing', icon: 'ri-microchip-line', duration: '3-5 Years', credits: '18', desc: 'Original research in AI and systems architecture.' },
        { name: 'Ph.D. Management', icon: 'ri-shake-hands-line', duration: '3-5 Years', credits: '18', desc: 'Policy theory and global organizational behavior.' },
        { name: 'Ph.D. Physics', icon: 'ri-radar-line', duration: '3-5 Years', credits: '18', desc: 'Pioneering research in particle and astro physics.' },
        { name: 'Ph.D. Mathematics', icon: 'ri-infinity-line', duration: '3-5 Years', credits: '18', desc: 'Contribution to pure and applied math foundations.' },
        { name: 'Ph.D. Chemistry', icon: 'ri-haze-2-line', duration: '3-5 Years', credits: '18', desc: 'Breakthroughs in chemical synthesis and green tech.' },
        { name: 'Ph.D. Life Sciences', icon: 'ri-service-line', duration: '3-5 Years', credits: '18', desc: 'Advanced biological research and health genetics.' }
      ]
    }
  };

  const currentProgram = programData[programId as keyof typeof programData] || programData.undergraduate;

  return (
    <main className="inter min-h-screen bg-slate-50">
      {/* ── Header ── */}
      <div className="bg-slate-950 px-6 md:px-16 pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-500px h-500px bg-amber-500/5 blur-[120px] rounded-full translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-10 flex-wrap">
            <Link to="/" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
              <i className="ri-home-4-fill text-amber-500 text-xs" /> Home
            </Link>
            <span className="text-slate-700">/</span>
            <Link to="/academics" className="hover:text-amber-400">Academics</Link>
            <span className="text-slate-700">/</span>
            <span className="text-white/40">{programId}</span>
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
                 <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                 <span className="text-amber-500 font-black uppercase tracking-widest text-[9px]">{currentProgram.count}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase leading-tight">
                {currentProgram.title.split(' ')[0]} <br/>
                <span className="text-amber-500">{currentProgram.title.split(' ').slice(1).join(' ')}</span>
              </h1>
            </div>
            <div className="hidden lg:block pb-4">
               <div className="w-24 h-1px bg-white/20 mb-4" />
               <p className="text-white/40 text-xs font-bold uppercase tracking-[0.2em] max-w-200px">Empowering Academic Excellence through Research</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Subjects Grid (Energy Infused) ── */}
      <section className="py-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-10">
            {currentProgram.subjects.map((sub, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group relative bg-white rounded-[3rem] p-1 border border-slate-100 shadow-2xl shadow-slate-900/[0.03] overflow-hidden flex flex-col h-full hover:shadow-amber-500/10 transition-all duration-700"
              >
                {/* Decorative Background Element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[5rem] group-hover:bg-amber-50 transition-colors duration-700" />
                
                <div className="relative z-10 p-8 md:p-10 flex-1 flex flex-col">
                   <div className="flex justify-between items-start mb-8">
                      <div className="w-16 h-16 bg-slate-950 rounded-[1.8rem] flex items-center justify-center text-3xl text-white group-hover:bg-amber-500 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 shadow-2xl shadow-slate-950/20">
                        <i className={sub.icon} />
                      </div>
                      <div className="text-right">
                         <span className="block text-[10px] font-black text-slate-300 uppercase tracking-widest">Duration</span>
                         <span className="block text-slate-900 font-black text-sm">{sub.duration}</span>
                      </div>
                   </div>

                   <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-4 leading-none group-hover:text-amber-600 transition-colors">{sub.name}</h3>
                   <p className="text-slate-400 font-medium text-sm leading-relaxed mb-8 flex-1">{sub.desc}</p>
                   
                   <div className="grid grid-cols-2 gap-4 pt-8 border-t border-slate-100 mt-auto">
                      <div className="space-y-1">
                         <span className="block text-[9px] font-black text-slate-300 uppercase tracking-widest">Credits</span>
                         <span className="block text-slate-800 font-bold text-xs uppercase tracking-tight">{sub.credits} CH</span>
                      </div>
                      <div className="space-y-1">
                         <span className="block text-[9px] font-black text-slate-300 uppercase tracking-widest">Type</span>
                         <span className="block text-slate-800 font-bold text-xs uppercase tracking-tight">Full-Time</span>
                      </div>
                   </div>
                </div>

                {/* Footer Action */}
                <Link to="/contact" className="bg-slate-50 py-6 px-10 flex items-center justify-between group-hover:bg-amber-500 transition-all duration-500">
                   <span className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] group-hover:text-white">View Curriculum</span>
                   <i className="ri-arrow-right-up-line text-slate-400 group-hover:text-white text-xl" />
                </Link>
              </motion.div>
            ))}
          </div>
          
          {/* Enhanced CTA */}
          <div className="mt-32 relative group">
             <div className="absolute inset-0 bg-amber-500 rounded-[4rem] translate-x-3 translate-y-3 -z-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-700" />
             <div className="bg-slate-950 rounded-[4rem] p-16 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_20%,rgba(233,163,25,0.1),transparent)] pointer-events-none" />
                <div className="relative z-10">
                   <span className="inline-block text-amber-500 font-black uppercase tracking-[0.4em] text-[10px] mb-8">Admission Inquiry</span>
                   <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-8 leading-none">Your Future <br/><span className="text-amber-500">Starts Here</span></h2>
                   <p className="text-slate-400 mb-12 max-w-2xl mx-auto text-lg font-medium leading-relaxed">Join a community of scholars and innovators. Our admissions team is ready to help you find the perfect academic path.</p>
                   <div className="flex flex-wrap justify-center gap-6">
                      <Link to="/contact" className="px-12 py-6 bg-amber-500 text-white font-black text-xs uppercase tracking-widest rounded-[1.5rem] hover:bg-amber-600 hover:scale-105 transition-all shadow-2xl shadow-amber-500/20">Apply Now</Link>
                      <button className="px-12 py-6 border-2 border-white/10 text-white font-black text-xs uppercase tracking-widest rounded-[1.5rem] hover:bg-white/5 transition-all">Download Catalog</button>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProgramDetail;
