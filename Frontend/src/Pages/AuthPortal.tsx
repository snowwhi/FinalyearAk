import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import logo from '@/assets/university-logo.png';

const API_URL = 'https://your-backend.onrender.com/api';

const AuthPortal = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

 const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  const formData = new FormData(e.currentTarget);
  const rollNo = formData.get('rollNo') as string;
  const password = formData.get('password') as string;

  try {
    // Choose endpoint based on isAdmin toggle
    const endpoint = isAdmin ? `${API_URL}/auth/admin-login` : `${API_URL}/auth/login`;
    const body = isAdmin 
      ? { username: rollNo, password }  // Admin uses username
      : { rollNo, password };           // Student uses rollNo

    console.log('🔐 Attempting login for:', rollNo);
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    
    console.log('📡 Response status:', response.status);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    // Store token and user data
    localStorage.setItem('token', data.data.token);
    localStorage.setItem('user', JSON.stringify(data.data.user));

    // Navigate based on role
    if (data.data.user.role === 'admin' || data.data.user.role === 'super_admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/student/dashboard');
    }

  } catch (err: any) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#FDFBF7] p-4 md:p-6 font-sans relative overflow-hidden">
      
      {/* Background Glows - Updated to gold/amber tones */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute -top-24 -right-24 w-96 h-96 rounded-full blur-[120px] transition-colors duration-1000 ${isAdmin ? 'bg-slate-800' : 'bg-amber-500/20'}`} />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-100/40 rounded-full blur-[100px]" />
      </div>

      <motion.div 
        layout
        className="w-full max-w-950px min-h-580px bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden relative border border-amber-100"
      >
        
        {/* --- BRANDING PANEL --- */}
        <motion.div 
          animate={{ 
            backgroundColor: isAdmin ? '#0F172A' : '#0A1C2E',
          }}
          className="w-full md:w-[40%] p-10 md:p-14 flex flex-col justify-center relative transition-colors duration-700"
        >
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="w-full h-full bg-[radial-gradient(circle_at_30%_20%,#C5A059_1px,transparent_1px)] [bg-size:24px_24px]" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={isAdmin ? 'admin' : 'student'}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="z-10"
            >
              <div className="bg-amber-500/10 w-16 h-16 rounded-2xl flex items-center justify-center backdrop-blur-md mb-8 border border-amber-500/30">
                <img src={logo} alt="Logo" className="w-10 h-10 drop-shadow-lg brightness-0 invert" />
              </div>
              
              <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-tight mb-4 text-white font-['Cinzel']">
                {isAdmin ? "ADMIN" : "STUDENT"} 
                <br />
                <span className="text-amber-400">PORTAL</span>
              </h1>
              
              <div className="h-0.5 w-16 mb-6 rounded-full bg-amber-500" />
              
              <p className="text-[13px] leading-relaxed text-slate-300 max-w-280px">
                {isAdmin 
                  ? "Authorized system management terminal. Credentials required for infrastructure access." 
                  : "Welcome to Thal University. Access your grades, attendance, and semester records."}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="hidden md:block absolute bottom-10 left-10 text-[9px] font-bold text-amber-400/30 uppercase tracking-[0.4em] font-mono">
            Thal University Bhakkar
          </div>
        </motion.div>

        {/* --- FORM PANEL --- */}
        <div className="flex-1 p-8 md:p-16 lg:p-20 flex flex-col justify-center relative bg-white">
          
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight font-['Cinzel']">Welcome Back</h2>
            <p className="text-sm text-slate-500 mt-1">Please login to your account</p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-center gap-2"
            >
              <i className="ri-error-warning-line text-lg" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Roll Number</label>
              <div className="relative group">
                <i className="ri-user-3-line absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
                <input 
                  name="rollNo"
                  type="text"
                  placeholder="e.g. COMPF22BSR09"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all text-sm font-medium text-slate-700"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Password</label>
              <div className="relative group">
                <i className="ri-shield-keyhole-line absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
                <input 
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all text-sm font-medium text-slate-700"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold text-[11px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 mt-4 active:scale-[0.98] shadow-md ${
                isAdmin 
                  ? 'bg-slate-800 text-white hover:bg-slate-700 shadow-slate-800/20' 
                  : 'bg-linear-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 shadow-amber-500/20'
              } disabled:opacity-70 disabled:cursor-not-allowed`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Login</span>
                  <i className="ri-arrow-right-line text-lg" />
                </>
              )}
            </button>
          </form>

          {/* System Toggle Button */}
          <button 
            onClick={() => setIsAdmin(!isAdmin)}
            className="absolute bottom-6 right-6 p-3 text-slate-400 hover:text-amber-500 transition-all duration-500 opacity-60 hover:opacity-100 group"
            title="Toggle Admin Mode"
          >
            <i className="ri-fingerprint-line text-2xl group-hover:scale-110 transition-transform" />
          </button>
        </div>

      </motion.div>
    </div>
  );
};

export default AuthPortal;