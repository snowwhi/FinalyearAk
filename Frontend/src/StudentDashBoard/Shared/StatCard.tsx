import { motion } from 'framer-motion';
interface StatCardProps {
  label: string;
  value: string | number;
  sub: string;
  icon: string;
  color: string;
  delay: number;
  inView: boolean;
}

export const StatCard = ({ label, value, sub, icon, delay, inView }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ delay, duration: 0.4 }}
    className="group relative overflow-hidden rounded-xl md:rounded-2xl bg-white p-3 md:p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100"
  >
    {/* Icon */}
    <div className="flex items-center justify-between mb-2 md:mb-3">
      <div className="w-7 h-7 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-amber-50 flex items-center justify-center">
        <i className={`${icon} text-base md:text-xl text-amber-600`} />
      </div>
      <span className="text-[9px] md:text-[10px] font-mono text-amber-500 bg-amber-50 px-1.5 md:px-2 py-0.5 rounded-full">
        {label}
      </span>
    </div>
    
    {/* Value */}
    <p className="text-xl md:text-3xl font-bold text-slate-800 tracking-tight mb-0.5 md:mb-1">
      {value}
    </p>
    
    {/* Subtitle */}
    <p className="text-[9px] md:text-[11px] text-slate-400 font-medium">
      {sub}
    </p>
    
    {/* Bottom gold line on hover */}
    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-amber-400 via-amber-500 to-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
  </motion.div>
);