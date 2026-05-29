import { navItems,type Page } from '../../Data/mockData';
import logo from '@/assets/university-logo.png';

interface SidebarProps {
  sidebarOpen: boolean;
  currentPage: Page;
  onPageChange: (page: Page) => void;
  onLogout: () => void;
  adminName: string;
  adminEmail: string;
}

export const Sidebar = ({ sidebarOpen, currentPage, onPageChange, onLogout, adminName, adminEmail }: SidebarProps) => (
  <aside className={`fixed top-0 left-0 z-50 h-screen bg-[#0F172A] shadow-2xl border-r border-white/5
    transition-all duration-300 w-64 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
    
    {/* Logo Section */}
    <div className="px-6 py-8 flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 border border-white/10 shadow-lg">
        <img src={logo} alt="TU" className="w-6 h-6 object-contain brightness-0 invert" />
      </div>
      <div className="leading-none">
        <p className="text-white font-bold text-sm uppercase tracking-tight">
          THAL UNIVERSITY
          <span className="text-slate-500 block text-[9px] font-bold tracking-[0.2em] mt-1">ADMIN PORTAL</span>
        </p>
      </div>
    </div>

    {/* Navigation */}
    <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto no-scrollbar">
      {navItems.map(n => (
        <button
          key={n.page}
          onClick={() => onPageChange(n.page)}
          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left transition-all duration-300 group relative
            ${currentPage === n.page
              ? 'bg-amber-500/10 text-amber-400'
              : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
        >
          {currentPage === n.page && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-amber-500 rounded-r-full shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
          )}
          <i className={`${n.icon} text-lg shrink-0 ${currentPage === n.page ? 'text-amber-400' : 'text-slate-500 group-hover:text-amber-300'}`} />
          <span className={`text-[10px] font-black uppercase tracking-widest truncate ${currentPage === n.page ? 'font-black' : 'font-bold'}`}>
            {n.label}
          </span>
        </button>
      ))}
    </nav>

    {/* Admin Footer */}
    <div className="p-4 border-t border-white/5 bg-slate-900/50">
      <div className="flex items-center gap-3 p-2 rounded-xl bg-white/5 border border-white/5">
        <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-slate-700 to-slate-800 border border-white/10 flex items-center justify-center text-amber-500 text-[10px] font-black shadow-inner">
          {adminName.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0 flex-1 leading-none">
          <p className="text-white text-[10px] font-bold truncate tracking-tight">{adminName}</p>
          <p className="text-slate-500 text-[8px] uppercase font-black tracking-widest mt-0.5">Admin</p>
        </div>
      </div>
      <button onClick={onLogout}
        className="w-full mt-3 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-500/5 text-red-400 hover:bg-red-500 hover:text-white transition-all text-[9px] font-black uppercase tracking-[0.2em] border border-red-500/10">
        <i className="ri-logout-circle-line text-sm" /> Sign Out
      </button>
    </div>
  </aside>
);