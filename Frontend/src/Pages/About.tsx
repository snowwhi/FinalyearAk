import { motion } from 'framer-motion';
import t1 from '../assets/t1 (1).jpg';
import t2 from '../assets/t2 (1).jpg';
import t3 from '../assets/t3 (1).jpg';
import t4 from '../assets/t4 (1).jpg'

const About = () => {
  const leadership = [
    { name: 'Saeed Ahmad Buzdar', role: 'Vice Chancellor', image: t1 },
    { name: 'Rizwan Paracha', role: 'President', image: t2 },
    { name: 'Kabeer Hassan', role: 'Executive Vice Chair', image: t3 },
    { name: 'Waqas Tariq Paracha', role: 'Vice President', image: t4 },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }
  };

  return (
    <main className="min-h-screen bg-white font-sans text-slate-800">

      {/* ── 1. Introduction Section (HIT Style) ── */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-b border-slate-100">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-3xl font-bold text-slate-900 uppercase tracking-tight">University Introduction</h2>
            <div className="h-1 w-20 bg-amber-500" />
            <p className="text-slate-600 leading-relaxed text-lg font-medium">
              Thal University Bhakkar, overseen by the Ministry of Higher Education, is renowned for its academic excellence.
              Founded with a mission to serve as a hub for innovation and regional development, the university has
              consistently maintained high standards in engineering, science, and the arts.
            </p>
            <p className="text-slate-600 leading-relaxed text-lg font-medium">
              Our campus maintains a commitment to research and global collaboration, preparing the next generation
              of leaders to face complex international challenges with integrity and skill.
            </p>
          </div>
          <div className="lg:col-span-4 bg-slate-900 p-10 rounded-3xl text-white shadow-2xl">
            <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4">The Motto</p>
            <blockquote className="text-2xl font-bold italic leading-tight tracking-tight">
              "Being strict in qualifications for graduates; making every endeavor in educating students."
            </blockquote>
          </div>
        </motion.div>
      </section>

      {/* ── 2. Leadership Section (Exact HIT Grid) ── */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-3xl font-bold text-slate-900 uppercase mb-16">Leadership & Administration</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((person, i) => (
              <div key={i} className="group">
                <div className="aspect-3/4 bg-slate-100 rounded-sm overflow-hidden mb-6 border border-slate-200">
                  <img
                   loading="lazy"  
                    src={person.image}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    alt={person.name}
                  />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{person.name}</h3>
                <p className="text-slate-500 text-xs leading-tight font-black uppercase tracking-widest">{person.role}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── 3. Administrative Offices ── */}
      <section className="bg-slate-50 py-24 px-6 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 uppercase mb-12">Administrative Offices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-6">
            {[
              'Administration Office', 'Undergraduate College', 'Graduate College',
              'Research Institute', 'Student Affairs Department', 'Human Resource Department',
              'International Cooperation Division', 'Planning and Finance Department'
            ].map((office, i) => (
              <a
                key={i}
                href="#"
                className="text-slate-500 hover:text-amber-600 hover:pl-2 text-sm font-bold py-3 transition-all duration-300 border-b border-slate-200 flex justify-between items-center group"
              >
                {office}
                <i className="ri-arrow-right-s-line opacity-0 group-hover:opacity-100 transition-opacity text-amber-500" />
              </a>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
};

export default About;