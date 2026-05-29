import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { NavItem } from '../Shared/NavItem';
import logo from '@/assets/university-logo.png';
import { T } from '../Shared/theme';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-50 h-screen
          transition-all duration-300 ease-in-out
          flex flex-col shrink-0
          bg-[#0F172A] shadow-xl
          w-64 lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          overflow-hidden
        `}
      >
        {/* Logo Section */}
        <div className="px-5 py-5 flex items-center gap-3 border-b border-white/10 shrink-0">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-amber-500/10 border border-amber-500/30">
            <img src={logo} alt="TU" className="w-5 h-5 object-contain brightness-0 invert" />
          </div>
          <div className="whitespace-nowrap">
            <p className="text-white text-sm font-bold leading-tight truncate">
              Thal <span style={{ color: T.gold }}>RMS</span>
            </p>
            <p className="text-[9px] uppercase tracking-[0.2em] mt-0.5 truncate text-slate-400 font-sans">
              Student Portal
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto no-scrollbar">
          <p className="text-[9px] font-semibold uppercase tracking-[0.22em] px-4 pb-1 pt-2 text-amber-400/60 font-sans">
            Main
          </p>
          <div onClick={() => scrollToSection('overview-section')}>
            <NavItem icon="ri-dashboard-3-line" label="Overview" active sidebarOpen={true} />
          </div>
          <div onClick={() => scrollToSection('courses-section')}>
            <NavItem icon="ri-file-list-3-line" label="Results" sidebarOpen={true} />
          </div>
          <div onClick={() => scrollToSection('transcript-section')}>
            <NavItem icon="ri-award-line" label="Transcripts" sidebarOpen={true} />
          </div>
          <NavItem icon="ri-calendar-check-line" label="Schedule" sidebarOpen={true} />

          <p className="text-[9px] font-semibold uppercase tracking-[0.22em] px-4 pb-1 pt-5 text-amber-400/60 font-sans">
            Account
          </p>
          <NavItem icon="ri-user-3-line" label="Profile" sidebarOpen={true} />
          <NavItem icon="ri-settings-4-line" label="Settings" sidebarOpen={true} />
        </nav>

        {/* Sign Out */}
        <div className="px-3 pb-5 pt-4 border-t border-white/10 shrink-0">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:text-red-400 hover:bg-red-500/10 transition-colors duration-200 group"
          >
            <i className="ri-logout-box-r-line text-base" />
            <span className="text-[11px] font-semibold tracking-widest uppercase font-sans">
              Sign Out
            </span>
          </button>
        </div>
      </aside>
    </>
  );
};