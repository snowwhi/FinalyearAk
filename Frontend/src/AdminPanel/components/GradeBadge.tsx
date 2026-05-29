interface GradeBadgeProps {
  grade: string;
}

export const GradeBadge = ({ grade }: GradeBadgeProps) => {
  const map: Record<string, string> = {
    A: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    B: 'bg-amber-50 text-amber-700 border-amber-200',
    C: 'bg-orange-50 text-orange-700 border-orange-200',
    D: 'bg-red-50 text-red-600 border-red-200',
    F: 'bg-red-100 text-red-700 border-red-300',
  };
  return (
    <span className={`inline-flex items-center justify-center w-7 h-6 rounded text-[10px] font-black border ${map[grade] || 'bg-slate-100 text-slate-500 border-slate-200'}`}>
      {grade}
    </span>
  );
};