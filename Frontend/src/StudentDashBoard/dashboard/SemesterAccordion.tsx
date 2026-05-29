import { motion, AnimatePresence } from 'framer-motion';
import { GradeChip } from '../Shared/GradeChip';
import type { Semester } from '../../Types/Dashboard.types';

interface SemesterAccordionProps {
  semester: Semester;
  index: number;
  expandedSem: string | null;
  setExpandedSem: (id: string | null) => void;
}

export const SemesterAccordion = ({ semester, index, expandedSem, setExpandedSem }: SemesterAccordionProps) => {
  const isOpen = expandedSem === semester.id;
  const gpaNum = parseFloat(semester.gpa) || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-xl md:rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      {/* Accordion Header */}
      <button
        onClick={() => setExpandedSem(isOpen ? null : semester.id)}
        className="w-full flex items-center gap-3 md:gap-4 px-4 md:px-5 py-3 md:py-4 hover:bg-amber-50/30 transition-colors duration-200"
      >
        {/* Semester badge */}
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center shrink-0 text-xs md:text-sm font-bold bg-amber-100 text-amber-700 border border-amber-200">
          {index + 1}
        </div>

        {/* Title */}
        <div className="flex-1 text-left min-w-0">
          <p className="text-slate-800 text-sm md:text-base font-bold truncate">
            {semester.id}
          </p>
          <p className="text-[10px] md:text-[11px] mt-0.5 font-mono text-slate-500">
            {semester.courses?.length ?? 0} courses · {semester.totalCr} cr.hrs
          </p>
        </div>

        {/* GPA - Mobile friendly */}
        <div className="flex items-center gap-2 md:gap-3">
          <div className="hidden sm:block w-16 md:w-28 h-1.5 rounded-full overflow-hidden bg-slate-100">
            <motion.div
              className="h-full rounded-full bg-slate-900"
              initial={{ width: 0 }}
              whileInView={{ width: `${(gpaNum / 4) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.08 }}
            />
          </div>
          <div className="text-right">
            <p className="text-[9px] md:hidden text-slate-400">GPA</p>
            <span className="font-mono text-sm md:text-base font-bold text-amber-600">{semester.gpa}</span>
          </div>
        </div>

        {/* Arrow */}
        <i className={`ri-arrow-down-s-line text-lg md:text-xl text-slate-400 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Expandable Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="border-t border-slate-100">
              {/* Mobile: Card View */}
              <div className="block md:hidden p-4 space-y-3">
                {semester.courses?.map((course, ci) => (
                  <div key={ci} className="bg-slate-50 rounded-lg p-3 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-mono text-xs font-semibold text-amber-700">{course.code}</p>
                        <p className="text-sm font-medium text-slate-800 mt-0.5">{course.title}</p>
                      </div>
                      <GradeChip grade={course.grade} />
                    </div>
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200">
                      <div className="text-center">
                        <p className="text-[9px] text-slate-400">Cr.Hrs</p>
                        <p className="text-sm font-semibold text-slate-700">{course.cr}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[9px] text-slate-400">Marks</p>
                        <p className="text-sm font-semibold text-slate-800">{course.marks}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[9px] text-slate-400">Grade Pts</p>
                        <p className="text-sm font-semibold text-amber-600">{course.gp}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop: Table View */}
              <div className="hidden md:block">
                {/* Table Headers */}
                <div className="grid px-5 py-3 gap-3 text-[10px] uppercase tracking-[0.16em] font-semibold bg-slate-50 text-slate-500 font-sans"
                  style={{ gridTemplateColumns: '76px 1fr 54px 62px 66px 52px' }}>
                  <span>Code</span>
                  <span>Course Title</span>
                  <span className="text-center">Cr.Hrs</span>
                  <span className="text-center">Marks</span>
                  <span className="text-center">Grd.Pts</span>
                  <span className="text-center">Grade</span>
                </div>

                {/* Course Rows */}
                {semester.courses?.map((course, ci) => (
                  <div key={ci}
                    className="grid px-5 py-3 gap-3 border-t border-slate-50 hover:bg-amber-50/20 transition-colors duration-200 items-center"
                    style={{ gridTemplateColumns: '76px 1fr 54px 62px 66px 52px' }}>
                    <span className="font-mono text-xs font-semibold text-amber-700">{course.code}</span>
                    <span className="text-sm font-medium text-slate-700 font-sans">{course.title}</span>
                    <span className="font-mono text-sm text-center text-slate-600">{course.cr}</span>
                    <span className="font-mono text-sm text-center font-semibold text-slate-800">{course.marks}</span>
                    <span className="font-mono text-sm text-center font-semibold text-amber-600">{course.gp}</span>
                    <div className="flex justify-center"><GradeChip grade={course.grade} /></div>
                  </div>
                ))}
              </div>

              {/* Footer Summary - Responsive */}
              <div className="flex flex-col sm:flex-row justify-between px-4 md:px-5 py-3 border-t border-slate-100 bg-slate-50/50 gap-2 sm:gap-0">
                <span className="font-mono text-xs text-slate-600 text-center sm:text-left">
                  Total Credit Hours: <strong className="text-slate-800">{semester.totalCr}</strong>
                </span>
                <span className="font-mono text-xs text-slate-600 text-center sm:text-right">
                  Semester GPA: <strong className="text-amber-600">{semester.gpa}</strong>
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};