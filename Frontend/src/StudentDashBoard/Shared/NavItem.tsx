interface NavItemProps {
  icon: string;
  label: string;
  active?: boolean;
  sidebarOpen?: boolean;  // ← Add this
}

export const NavItem = ({ icon, label, active = false, sidebarOpen = true }: NavItemProps) => (
  <button
    className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all duration-200 group
      ${active 
        ? 'bg-amber-500/15 text-amber-400 shadow-inner border-l-2 border-amber-400' 
        : 'text-slate-300 hover:bg-white/5 hover:text-white'
      }
      ${!sidebarOpen && 'md:justify-center'}`}
  >
    <i className={`${icon} text-xl ${active ? 'text-amber-400' : 'text-slate-400 group-hover:text-amber-400'} transition-colors`} />
    <span className={`text-sm font-semibold tracking-wide transition-opacity duration-300 ${!sidebarOpen && 'md:hidden'}`}>
      {label}
    </span>
    {active && sidebarOpen && (
      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
    )}
  </button>
);