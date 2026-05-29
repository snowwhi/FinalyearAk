import { getInitials } from '../../Utils/GradeHelpers';
interface TopBarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  studentName: string;
  rollNo: string;
  session: string;
  program: string;
  university: string;
  onPrint: () => void;
}

export const TopBar = ({ sidebarOpen, setSidebarOpen, studentName, rollNo, session, program, university, onPrint }: TopBarProps) => {
  const initials = getInitials(studentName);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 px-5 md:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0 no-print shadow-[0_1px_10px_rgba(0,0,0,0.02)]">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-10 h-10 flex items-center justify-center rounded-xl lg:hidden text-slate-500 hover:text-amber-600 hover:bg-amber-50 transition-colors duration-200 border border-transparent hover:border-amber-100"
        >
          <i className={`text-xl ${sidebarOpen ? 'ri-menu-fold-line' : 'ri-menu-unfold-line'}`} />
        </button>
        <div>
          <h1 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight leading-none mb-1">
            Provisional Transcript
          </h1>
          <p className="text-[11px] md:text-xs font-semibold text-slate-500 flex flex-wrap items-center gap-2">
            <span className="text-amber-600">{program}</span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span>Session {session}</span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span>{university}</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-full pl-1.5 pr-4 py-1.5 shadow-sm">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold font-mono bg-amber-100 text-amber-700 border border-amber-200">
            {initials}
          </div>
          <div className="leading-none">
            <p className="text-slate-800 text-xs font-bold">
              {studentName}
            </p>
            <p className="text-[10px] tracking-wider font-mono text-slate-500 mt-0.5">
              {rollNo}
            </p>
          </div>
        </div>

        <button
          onClick={onPrint}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all duration-200 bg-amber-500 text-white hover:bg-amber-600 shadow-sm hover:shadow-md border border-amber-600/20"
        >
          <i className="ri-printer-line text-sm" />
          <span className="hidden sm:inline">Print</span>
        </button>
      </div>
    </header>
  );
};