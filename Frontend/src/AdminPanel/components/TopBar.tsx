interface TopBarProps {
  pageTitle: string;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  adminName: string;
  adminEmail: string;
}

export const TopBar = ({ pageTitle, sidebarOpen, onToggleSidebar, adminName, adminEmail }: TopBarProps) => (
  <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-[0_1px_15px_rgba(0,0,0,0.02)]">
    <div className="flex items-center gap-4">
      <button 
        onClick={onToggleSidebar}
        className="p-2.5 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-2xl transition-all duration-300 group border border-transparent hover:border-amber-100 md:hidden"
        title={sidebarOpen ? "Close Sidebar" : "Open Sidebar"}
      >
        <i className={`text-xl transition-transform duration-500 ${sidebarOpen ? 'ri-menu-2-line' : 'ri-menu-3-line'}`} />
      </button>
      <div className="ml-1">
        <h1 className="text-slate-900 font-bold text-lg md:text-xl capitalize tracking-tight leading-none">
          {pageTitle}
        </h1>
        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-[0.2em] mt-2 flex items-center gap-2">
          Management <i className="ri-arrow-right-s-line" /> {pageTitle}
        </p>
      </div>
    </div>
    
    <div className="flex items-center gap-5">
      <button className="hidden md:flex p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-2xl transition-all relative border border-transparent hover:border-slate-100">
        <i className="ri-notification-3-line text-xl" />
        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
      </button>
      
      <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl pl-1.5 pr-5 py-1.5 shadow-sm hover:border-slate-300 transition-all cursor-pointer group">
        <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-white text-xs font-black shadow-lg group-hover:bg-slate-900 transition-all">
          {adminName.charAt(0).toUpperCase()}
        </div>
        <div className="hidden sm:block leading-none">
          <p className="text-slate-900 text-[11px] font-bold tracking-wide">{adminName}</p>
          <p className="text-slate-400 text-[9px] font-bold mt-1 uppercase tracking-tighter">Super Admin</p>
        </div>
      </div>
    </div>
  </header>
);