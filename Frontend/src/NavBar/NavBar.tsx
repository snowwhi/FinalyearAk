import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import logo from '@/assets/university-logo.png';

const navLinks = [
  { label: 'Home',      to: '/' },
  { label: 'About',     to: '/about' },
  { label: 'Academics', to: '/academics' },
  { label: 'Faculty',   to: '/faculty' },
  { label: 'Results',   to: '/student/login' },
  { label: 'Contact',   to: '/contact' },
];

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Threshold for changing color (e.g., 50px)
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  return (
  <nav 
  className={`fixed top-0 left-0 right-0 z-50 transition-[padding,box-shadow] duration-500 will-change-auto ${
    scrolled 
      ? 'bg-slate-900 py-2 shadow-xl'
      : 'bg-slate-950/80 py-4'        
  }`}
>
      <div className="max-w-7xl mx-auto md:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 shrink-0 group">
          <img
            src={logo}
            alt="TUB Logo"
            className="w-10 h-10 group-hover:scale-105 transition-transform duration-300"
          />
          <div className="flex flex-col leading-none">
            <span className="text-amber-200 font-extrabold  text-md tracking-widest uppercase">
              Thal University
            </span>
            <span className="text-white text-[12px] font-bold tracking-[0.35em] uppercase mt-0.5">
              Bhakkar
            </span>
          </div>
        </Link>
        <div className={`hidden lg:flex items-center gap-1 px-3 py-2 rounded-full border transition-all duration-300 ${
          scrolled ? 'bg-slate-800/50 border-white/10' : 'bg-black/20 border-white/5'
        }`}>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-4 py-1.5 rounded-full text-md font-medium transition-colors duration-200 ${
                  isActive ? 'text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="activeBar"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3.5 h-0.5 bg-[#E9A319] rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/student/login"
          className="px-2 py-1 md:px-6 md:py-2 bg-amber-200 text-slate-950 font-bold rounded-lg 
           hover:bg-amber-300 hover:shadow-[0_0_25px_rgba(251,191,36,0.4)] 
           transition-all duration-300"
          >
            Portal Login
          </Link>


          <button
            className="lg:hidden text-white hover:text-amber-200 transition-colors"
            onClick={() => setMobileOpen(o => !o)}
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Always solid so links are readable */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-white/10 bg-slate-900 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="px-4 py-3 rounded-lg text-base font-medium text-slate-300 hover:text-white hover:bg-white/5"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;