interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export const SectionTitle = ({ title, subtitle }: SectionTitleProps) => (
  <div className="mb-8 relative group">
    <div className="flex items-center gap-4 mb-1">
      <h2 className="text-slate-800 text-2xl md:text-3xl font-bold tracking-tight">
        {title}
      </h2>
      <div className="flex-1 h-px bg-slate-100" />
    </div>
    {subtitle && (
      <p className="text-slate-400 text-xs md:text-sm font-medium tracking-wide">
        {subtitle}
      </p>
    )}
    <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-slate-800 rounded-r-full shadow-sm hidden md:block" />
  </div>
);