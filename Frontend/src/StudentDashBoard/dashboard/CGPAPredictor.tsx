import { motion } from 'framer-motion';
import { SectionTitle } from '../Shared/SectionTitle';

interface CGPAPredictorProps {
  predGPA: number;
  setPredGPA: (val: number) => void;
  predCredits: number;
  setPredCredits: (val: number) => void;
  predictedCGPA: string;
  cgpaUp: boolean;
  cgpaDelta: string;
  currentCGPA: string;
  totalCredits: number;
}

export const CGPAPredictor = ({
  predGPA, setPredGPA,
  predCredits, setPredCredits,
  predictedCGPA, cgpaUp, cgpaDelta,
  currentCGPA, totalCredits
}: CGPAPredictorProps) => (
  <section>
    <SectionTitle>CGPA Predictor</SectionTitle>
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm"
    >
      <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
        <div className="flex-1 space-y-6">
          {/* GPA Slider */}
          <div>
            <div className="flex justify-between items-center mb-2.5">
              <label className="text-sm font-medium text-slate-700 font-sans">Next Semester GPA</label>
              <span className="font-mono text-lg font-bold text-amber-600">{predGPA.toFixed(1)}</span>
            </div>
            <input 
              type="range" 
              min="0" max="4" step="0.1"
              value={predGPA} 
              onChange={e => setPredGPA(parseFloat(e.target.value))}
              className="w-full accent-amber-500"
            />
            <div className="flex justify-between mt-1.5">
              <span className="font-mono text-[10px] text-slate-400">0.0</span>
              <span className="font-mono text-[10px] text-slate-400">4.0</span>
            </div>
          </div>

          {/* Credits Slider */}
          <div>
            <div className="flex justify-between items-center mb-2.5">
              <label className="text-sm font-medium text-slate-700 font-sans">Credit Hours</label>
              <span className="font-mono text-lg font-bold text-amber-600">{predCredits}</span>
            </div>
            <input 
              type="range" 
              min="6" max="24" step="1"
              value={predCredits} 
              onChange={e => setPredCredits(parseInt(e.target.value))}
              className="w-full accent-amber-500"
            />
            <div className="flex justify-between mt-1.5">
              <span className="font-mono text-[10px] text-slate-400">6</span>
              <span className="font-mono text-[10px] text-slate-400">24</span>
            </div>
          </div>
        </div>

        {/* Result Box */}
        <div className="md:w-56 rounded-xl p-5 border-2 border-amber-200 bg-amber-50/50 text-center">
          <p className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-2 text-amber-600 font-sans">
            Projected CGPA
          </p>
          <p className={`text-4xl font-black leading-none ${cgpaUp ? 'text-emerald-600' : 'text-rose-600'}`}>
            {predictedCGPA}
          </p>
          <p className={`font-mono text-xs mt-2 font-bold ${cgpaUp ? 'text-emerald-600' : 'text-rose-600'}`}>
            {cgpaUp ? '↑' : '↓'} {cgpaUp ? '+' : ''}{cgpaDelta} vs current
          </p>
          <div className="border-t border-amber-200 mt-3 pt-3">
            <p className="text-[10px] text-slate-500 font-sans">
              Current: <span className="font-bold text-amber-600">{currentCGPA}</span>
              {' '}over <span className="font-bold text-slate-700">{totalCredits}</span> cr.hrs
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  </section>
);