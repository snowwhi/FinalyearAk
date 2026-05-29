import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AcademicCalendar = () => {
  const handlePrint = () => {
    window.print();
  };

  const events = [
    { 
      season: 'Spring Semester 2026', 
      items: [
        { date: 'Feb 01', day: 'SUN', event: 'Admissions Open for Spring Intake', type: 'Academic', details: 'Online portal opens for new applications.' },
        { date: 'Feb 15', day: 'SUN', event: 'Orientation & Registration', type: 'Academic', details: 'Mandatory session for all new students.' },
        { date: 'Feb 16', day: 'MON', event: 'Commencement of Classes', type: 'Academic', details: 'Spring semester lectures begin.' },
        { date: 'Mar 02', day: 'MON', event: 'Annual Spring Festival', type: 'Event', details: 'Week-long cultural and traditional performances.' },
        { date: 'Mar 23', day: 'MON', event: 'Pakistan Day Holiday', type: 'Holiday', details: 'University closed for national day.' },
        { date: 'Apr 10', day: 'FRI', event: 'Mid-Term Examinations', type: 'Exam', details: 'Mid-semester assessment period.' },
        { date: 'May 05', day: 'TUE', event: 'Eid-ul-Fitr Holidays', type: 'Holiday', details: 'Religious festivities break.' },
      ]
    },
    { 
      season: 'Fall Semester 2026', 
      items: [
        { date: 'Aug 15', day: 'SAT', event: 'Fall Admission Deadline', type: 'Academic', details: 'Final date for document submission.' },
        { date: 'Sep 01', day: 'TUE', event: 'Fall Semester Kickoff', type: 'Academic', details: 'New academic cycle commencement.' },
        { date: 'Oct 20', day: 'TUE', event: 'Sports Gala Week', type: 'Event', details: 'Inter-departmental athletics competitions.' },
        { date: 'Nov 12', day: 'THU', event: 'Fall Mid-Term Exams', type: 'Exam', details: 'Standardized testing period.' },
        { date: 'Dec 25', day: 'FRI', event: 'Winter Break', type: 'Holiday', details: 'Campus closed for winter holidays.' },
      ]
    }
  ];

  const getTypeStyle = (type: string) => {
    switch(type) {
      case 'Academic': return 'text-blue-600';
      case 'Event': return 'text-amber-600';
      case 'Exam': return 'text-red-600';
      case 'Holiday': return 'text-green-600';
      default: return 'text-slate-600';
    }
  };

  return (
    <main className="inter min-h-screen bg-white">
      {/* ── Professional Print Styles ── */}
      <style>{`
        @media print {
          @page { margin: 20mm; }
          nav, footer, .no-print { display: none !important; }
          body { background: white; color: black; font-size: 10pt; }
          .print-header { display: flex !important; flex-direction: column; align-items: center; margin-bottom: 30px; border-bottom: 2px solid #000; padding-bottom: 20px; }
          .print-footer { display: block !important; margin-top: 50px; border-top: 1px solid #eee; pt: 20px; text-align: center; font-size: 8pt; color: #666; }
          .timeline-item { break-inside: avoid; border-bottom: 1px solid #eee !important; padding: 10px 0 !important; }
          .date-box { background: #f8fafc !important; color: black !important; border: 1px solid #eee !important; -webkit-print-color-adjust: exact; }
          .bg-slate-950, .bg-slate-50 { background: white !important; color: black !important; padding: 0 !important; }
          h1, h2 { color: black !important; }
          .season-title { border-left: 4px solid #f59e0b !important; padding-left: 10px !important; margin: 30px 0 15px 0 !important; }
        }
        .print-header, .print-footer { display: none; }
      `}</style>

      {/* ── Print Header (Letterhead) ── */}
      <div className="print-header no-screen">
         <h1 className="text-2xl font-black uppercase tracking-widest text-slate-900">Thal University Bhakkar</h1>
         <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 mt-2">Office of the Registrar • Academic Division</p>
         <div className="w-full h-1px bg-slate-900 mt-6" />
         <h2 className="text-xl font-black mt-6 uppercase tracking-tighter">Official Academic Calendar 2026</h2>
      </div>

      {/* ── Header ── */}
      <div className="bg-slate-950 px-6 md:px-16 pt-24 pb-12 relative overflow-hidden no-print">
        <div className="max-w-7xl mx-auto relative z-10">
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 mb-8 flex-wrap">
            <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span className="text-slate-800">/</span>
            <Link to="/academics" className="hover:text-amber-400">Academics</Link>
            <span className="text-slate-800">/</span>
            <span className="text-white/40">Calendar</span>
          </nav>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="text-amber-500 font-black uppercase tracking-[0.4em] text-[9px]">Session 2026-2027</span>
              <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase leading-tight">Academic <span className="text-amber-500">Timeline</span></h1>
            </div>
            <button 
              onClick={handlePrint}
              className="px-8 py-4 bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-amber-500 transition-all flex items-center gap-3"
            >
               <i className="ri-printer-line text-lg text-amber-500" /> Download Official PDF
            </button>
          </div>
        </div>
      </div>

      {/* ── Compact Timeline ── */}
      <section className="py-16 px-6 md:px-16 bg-white">
        <div className="max-w-4xl mx-auto">
          {events.map((session, i) => (
            <div key={i} className="mb-16 last:mb-0">
               <h2 className="season-title text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] mb-8 border-l-4 border-amber-500 pl-5">
                 {session.season}
               </h2>
               
               <div className="space-y-1">
                  {session.items.map((item, j) => (
                    <motion.div 
                      key={j}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="timeline-item flex items-center gap-6 md:gap-10 py-5 border-b border-slate-50 group hover:bg-slate-50 transition-colors px-4 rounded-xl"
                    >
                       {/* Date Marker (Compact) */}
                       <div className="date-box flex flex-col items-center justify-center w-14 h-14 bg-slate-50 rounded-xl border border-slate-100 shrink-0 group-hover:bg-slate-900 group-hover:text-white transition-all duration-500">
                          <span className="font-black text-lg leading-none">{item.date.split(' ')[1]}</span>
                          <span className="text-[8px] font-black uppercase tracking-widest mt-0.5">{item.date.split(' ')[0]}</span>
                       </div>
                       
                       <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-2">
                          <div>
                             <div className="flex items-center gap-2 mb-1">
                                <span className={`text-[8px] font-black uppercase tracking-widest ${getTypeStyle(item.type)}`}>
                                   {item.type}
                                </span>
                                <div className="w-1 h-1 rounded-full bg-slate-200" />
                                <span className="text-slate-300 text-[8px] font-bold uppercase tracking-widest">{item.day}</span>
                             </div>
                             <h3 className="text-sm md:text-base font-bold text-slate-900 uppercase tracking-tight">{item.event}</h3>
                          </div>
                          <p className="text-slate-400 font-medium text-[11px] leading-tight max-w-200px md:text-right">{item.details}</p>
                       </div>

                       <div className="no-print">
                          <i className="ri-arrow-right-s-line text-slate-200 group-hover:text-amber-500 transition-colors" />
                       </div>
                    </motion.div>
                  ))}
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Print Footer ── */}
      <div className="print-footer no-screen">
         <div className="flex justify-between items-end px-12 mt-12">
            <div className="text-left space-y-8">
               <div className="w-32 h-1px bg-slate-300" />
               <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Registrar Office Signature</p>
            </div>
            <div className="text-right">
               <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-2">Issued on: May 05, 2026</p>
               <p className="text-[8px] font-bold text-slate-300 italic">Thal University Official Document ID: TU-AC-2026-001</p>
            </div>
         </div>
      </div>
    </main>
  );
};

export default AcademicCalendar;
