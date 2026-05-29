import { Link } from 'react-router-dom';
import logo from '@/assets/university-logo.png';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white overflow-hidden">
      {/* Main Footer Content */}
      <div className="container max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img src={logo} alt="TUB Logo" className="w-12 h-12" />
              <div>
                <p className="font-bold text-xl tracking-tight text-amber-200">Thal University</p>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Bhakkar</p>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-6 italic">
              "Excellence in Education, Empowerment for Tomorrow. Nurturing minds and building futures in the heart of Punjab."
            </p>
            
            {/* Remix Icons Social Grid */}
            <div className="flex gap-3">
              {[
                { icon: 'ri-facebook-circle-fill', url: 'https://www.facebook.com/tu.bhakkar/' },
                { icon: 'ri-twitter-x-fill', url: 'https://x.com/tu_bhakkar' },
                { icon: 'ri-linkedin-box-fill', url: 'https://www.linkedin.com/school/tubhakkar/' },
                { icon: 'ri-youtube-fill', url: 'https://www.youtube.com/@TheBhakkarNetwork' },
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.url} 
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-amber-200 hover:text-slate-950 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-amber-200/20"
                >
                  <i className={`${social.icon} text-xl`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-6 text-amber-200">Quick Links</h4>
            <div className="space-y-3">
              {[
                { label: 'About University', to: '/about' },
                { label: 'Academic Programs', to: '/academics' },
                { label: 'Faculty & Staff', to: '/faculty' },
                { label: 'Check Results', to: '/student/login' },
                { label: 'Contact Us', to: '/contact' },
              ].map(link => (
                <Link 
                  key={link.to} 
                  to={link.to} 
                  className="group flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-all duration-200"
                >
                  <span className="h-px w-0 group-hover:w-3 bg-amber-200 transition-all duration-300" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Portals Column */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-6 text-amber-200">Portals</h4>
            <div className="space-y-3">
              {[
                { label: 'Student Login', to: '/student/login' },
                { label: 'Register Account', to: '/student/signup' },
                { label: 'Faculty CMS', to: '/faculty/cms' },
                { label: 'Alumni Portal', to: '/alumni' },
              ].map(link => (
                <Link 
                  key={link.label} 
                  to={link.to} 
                  className="group flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-all duration-200"
                >
                  <span className="h-px w-0 group-hover:w-3 bg-amber-200 transition-all duration-300" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-6 text-amber-200">Contact Info</h4>
            <div className="space-y-4 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <i className="ri-map-pin-2-fill text-amber-200 text-lg mt-0.5"></i>
                <p>Main Jhang Road, Bhakkar,<br />Punjab, Pakistan</p>
              </div>
              <div className="flex items-center gap-3">
                <i className="ri-phone-fill text-amber-200 text-lg"></i>
                <p>+92-453-123-4567</p>
              </div>
              <div className="flex items-center gap-3">
                <i className="ri-mail-send-fill text-amber-200 text-lg"></i>
                <p>info@tub.edu.pk</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/5 bg-[#4A3F35]/20">
        <div className="container max-w-7xl mx-auto px-6 py-3  flex sm:flex-row items-center justify-center">
          <p className="text-[10px] uppercase tracking-widest text-slate-200">
            © 2026 Thal University Bhakkar. Developed as fyp By AK Corporation
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;