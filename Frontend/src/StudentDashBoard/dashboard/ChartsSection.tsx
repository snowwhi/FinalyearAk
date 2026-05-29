import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionTitle } from '../Shared/SectionTitle';
import { GPABarChart } from '../Shared/GPABarChart';
import { DonutChart } from '../Shared/DonutChart';
import type { Semester } from '../../Types/Dashboard.types';

interface ChartsSectionProps {
  semesters: Semester[];
  gradeDist: { label: string; count: number; color: string }[];
}

export const ChartsSection = ({ semesters, gradeDist }: ChartsSectionProps) => {
  const chartsRef = useRef<HTMLDivElement>(null);
  const chartsInView = useInView(chartsRef, { once: true, margin: '-80px' });

  const totalCount = gradeDist.reduce((s, x) => s + x.count, 0);

  return (
    <section>
      <SectionTitle>Performance Analytics</SectionTitle>
      <div ref={chartsRef} className="grid md:grid-cols-2 gap-5">
        {/* GPA Trend */}
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          animate={chartsInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm"
        >
          <div className="flex items-start justify-between mb-5">
            <div>
              <p className="text-[9px] uppercase tracking-[0.18em] font-semibold mb-1 text-slate-500 font-sans">
                Semester-wise
              </p>
              <p className="text-slate-800 text-base font-bold">GPA Trend</p>
            </div>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-amber-100">
              <i className="ri-bar-chart-2-line text-amber-600" />
            </div>
          </div>
          <GPABarChart semesters={semesters} />
        </motion.div>

        {/* Grade Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 28 }}
          animate={chartsInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm"
        >
          <div className="flex items-start justify-between mb-5">
            <div>
              <p className="text-[9px] uppercase tracking-[0.18em] font-semibold mb-1 text-slate-500 font-sans">
                All courses
              </p>
              <p className="text-slate-800 text-base font-bold">Grade Distribution</p>
            </div>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-amber-100">
              <i className="ri-pie-chart-2-line text-amber-600" />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <DonutChart data={gradeDist} />
            <div className="space-y-2.5 flex-1">
              {gradeDist.map(d => (
                <div key={d.label} className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: d.color }} />
                  <span className="text-xs font-medium text-slate-700 font-sans">Grade {d.label}</span>
                  <span className="ml-auto text-xs font-bold font-mono text-slate-800">{d.count}</span>
                  <div className="w-12 h-1 rounded-full overflow-hidden bg-slate-100">
                    <div className="h-full rounded-full"
                      style={{
                        width: `${(d.count / totalCount) * 100}%`,
                        backgroundColor: d.color,
                      }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};