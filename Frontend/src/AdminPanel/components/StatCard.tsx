interface StatCardProps {
  label: string;
  value: string;
  icon: string;
  sub: string;
}

export const StatCard = ({ label, value, icon, sub }: StatCardProps) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg bg-slate-50 text-slate-600 border border-slate-200 group-hover:border-slate-300 group-hover:bg-slate-100 transition-colors">
          <i className={`${icon}`} />
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Status</p>
          <span className="text-xs font-semibold text-slate-600 mt-1 block">
            {sub}
          </span>
        </div>
      </div>
      
      <div>
        <h3 className="text-3xl font-black text-slate-800 tracking-tight">
          {value}
        </h3>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1 group-hover:text-slate-700 transition-colors">
          {label}
        </p>
      </div>
    </div>
  );
};