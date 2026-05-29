interface PageHeaderProps {
  session: string;
  program: string;
  university: string;
}

export const PageHeader = ({ session, program, university }: PageHeaderProps) => (
  <div className="relative bg-[#0B1120] border-b border-slate-800 overflow-hidden">
    {/* Subtle grid pattern background for a professional structural vibe */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:32px_32px] opacity-10" />
    
    <div className="relative px-6 md:px-10 py-10 md:py-14 max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
      <div className="space-y-4 max-w-3xl">
        {/* Clean, non-pulsing session badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 border border-slate-700/50 rounded-md backdrop-blur-sm">
          <i className="ri-calendar-todo-fill text-amber-500 text-xs" />
          <p className="text-slate-300 text-[10px] font-bold uppercase tracking-[0.15em]">
            Academic Session: {session}
          </p>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
          Provisional Transcript
        </h1>
        
        {/* Structured program & university details */}
        <div className="flex flex-wrap items-center gap-4 text-slate-400 text-sm md:text-base font-medium">
          <div className="flex items-center gap-2">
            <i className="ri-graduation-cap-fill text-amber-500" />
            <span className="text-white font-semibold">{program}</span>
          </div>
          <span className="hidden md:block w-1 h-1 rounded-full bg-slate-600" />
          <div className="flex items-center gap-2">
            <i className="ri-building-4-fill text-slate-500" />
            <span>{university}</span>
          </div>
        </div>
      </div>
      
      {/* Professional academic watermark/badge */}
      <div className="hidden md:flex flex-col items-center justify-center w-20 h-20 rounded-full border border-slate-700/50 bg-slate-900/80 shadow-2xl shrink-0">
        <i className="ri-shield-check-fill text-2xl text-amber-500 mb-0.5" />
        <span className="text-[7px] text-slate-400 font-bold uppercase tracking-widest text-center leading-tight">
          Verified<br/>Record
        </span>
      </div>
    </div>
  </div>
);