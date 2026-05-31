import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Import Faculty Portraits
import f1 from '../assets/t1 (1).jpg';
import f2 from '../assets/f2 (1).jpg';
import f3 from '../assets/f1 (1).jpg';
import f4 from '../assets/f4 (1).jpg';
import f5 from '../assets/f5 (1).jpg';
import f7 from '../assets/f7 (1).jpg';
import f8 from '../assets/f8 (1).jpg';
import f9 from '../assets/f9 (1).jpg';
import f10 from '../assets/f10 (1).jpg';
import f11 from '../assets/f11 (1).jpg';
import f12 from '../assets/f12 (1).jpg';
import f13 from '../assets/f13 (1).jpg';
import f14 from '../assets/f14 (1).jpg';
import f15 from '../assets/f15 (1).jpg';
import f16 from '../assets/f16 (1).jpg';

const Faculty = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const teachers = [
    { name: 'Dr. Saeed Ahmad Buzdar', role: 'Vice Chancellor', dept: 'Faculty of Physics', image: f1 },
    { name: 'Dr. Rizwan Paracha', role: 'Professor', dept: 'School of Management', image: f2 },
    { name: 'Dr. Kabeer Hassan', role: 'Associate Professor', dept: 'Department of Economics', image: f3 },
    { name: 'Dr. Khizar Hayat Cheena', role: 'Assistant Professor', dept: 'Computing & IT', image: f4 },
    { name: 'Dr. Usman Kalid', role: 'Registrar', dept: 'Administration', image: f5 },
    { name: 'Prof. Irum Jameel', role: 'Chair of Council', dept: 'Social Sciences', image: f7 },
    { name: 'Dr. Muhammad Shanawar', role: 'Director ORIC', dept: 'Research & Innovation', image: f8 },
    { name: 'Dr. Sarwar Azeem', role: 'Senior Lecturer', dept: 'Mathematics', image: f9 },
    { name: 'Dr. Ejaz Ahmad', role: 'Assistant Professor', dept: 'Engineering', image: f10 },
    { name: 'Dr. Shahid Kaleem', role: 'Lecturer', dept: 'Management Sciences', image: f11 },
    { name: 'Dr. Pervaeez Khan', role: 'Professor', dept: 'Chemistry', image: f12 },
    { name: 'Dr. Irfan Lohani', role: 'Senior Professor', dept: 'Life Sciences', image: f13 },
    { name: 'Dr. Zulfiqar Ahmad', role: 'Associate Professor', dept: 'Computer Science', image: f14 },
    { name: 'Dr. Faheem Khalid', role: 'Lecturer', dept: 'Social Sciences', image: f15 },
    { name: 'Dr. Khawar Cheena', role: 'Professor', dept: 'Linguistics', image: f16 },
  ];

  const filteredTeachers = teachers.filter(t =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.dept.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="inter min-h-screen bg-white">

      {/* ── Header (Inspired by Contact Page) ── */}
      <div className="bg-slate-950 px-6 md:px-16 pt-24 pb-12">
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap">
          <Link to="/" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
            <i className="ri-home-4-fill text-amber-500 text-xs" /> Home
          </Link>
          <span className="text-slate-700">›</span>
          <span className="text-slate-300">Faculty</span>
        </nav>
        <h1 className="cinzel text-white font-bold text-4xl md:text-5xl tracking-wide uppercase">
          Faculty <span className="text-amber-500">Directory</span>
        </h1>
        <div className="w-12 h-[3px] rounded-full bg-amber-500 mt-6" />
      </div>

      {/* ── Search & Filter Section ── */}
      <section className="pt-10 pb-2 px-6 md:px-16 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-4"
          >
            <div className="flex-1 w-full relative">
              <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, department, or title..."
                className="w-full h-12 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:border-amber-500 transition-all text-sm font-medium text-slate-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
              />
            </div>
            <button
              type="button"
              className="h-12 w-full md:w-auto px-10 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-amber-500 transition-all"
            >
              Filter Members
            </button>
          </form>
        </div>
      </section>

      {/* ── Faculty Grid Section ── */}
      <section className="pb-24 px-6 md:px-16 bg-slate-50 min-h-[600px]">
        <div className="max-w-7xl mx-auto py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredTeachers.map((teacher) => (
                <motion.div
                  key={teacher.name}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-amber-100 transition-all group"
                >
                  <div className="aspect-square rounded-xl overflow-hidden mb-4 bg-slate-50 border border-slate-50">
                    <img
                      src={teacher.image}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      alt={teacher.name}
                    />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-0.5 leading-tight group-hover:text-amber-600 transition-colors uppercase tracking-tight">{teacher.name}</h3>
                  <p className="text-amber-500 text-[9px] font-black uppercase tracking-widest mb-2">{teacher.role}</p>
                  <p className="text-slate-400 text-[10px] font-medium italic border-t border-slate-50 pt-2">Faculty of {teacher.dept}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredTeachers.length === 0 && (
            <div className="py-32 text-center">
              <i className="ri-user-search-line text-5xl text-slate-200 mb-4 block" />
              <p className="text-slate-400 font-medium text-sm">No faculty members found matching your search.</p>
            </div>
          )}
        </div>
      </section>

    </main>
  );
};

export default Faculty;