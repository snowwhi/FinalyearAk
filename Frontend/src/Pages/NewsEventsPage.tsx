import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import bannerImg from '../assets/banner.jpg';
import   { newsItems} from '../Data/Data';

const NewsEventsPage = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="relative h-300px md:h-450px w-full flex items-center overflow-hidden">
        <img src={bannerImg} className="absolute inset-0 w-full h-full object-cover" alt="Banner" />
        <div className="absolute inset-0 bg-linear-to-r from-slate-900/95 via-slate-900/50 to-transparent" />
        
        <div className="container max-w-7xl mx-auto px-6 relative z-10 text-white pt-12">
          <nav className="flex items-center gap-2 text-xs md:text-sm text-slate-300 mb-4 tracking-wide">
            <Link to="/" className="hover:text-amber-400 flex items-center gap-1.5 transition-colors">
              <i className="ri-home-4-fill text-amber-400"></i> Home
            </Link>
            <span className="opacity-40">›</span>
            <span className="hover:text-amber-400 transition-colors cursor-pointer">News & Events</span>
            <span className="opacity-40">›</span>
            <span className="text-white font-semibold">Content</span>
          </nav>
          
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight drop-shadow-md">News & Events</h1>
        </div>
        {/* Bottom Accent Line */}
        <div className="absolute bottom-0 left-0 w-full h-1.5 bg-amber-400" />
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="container max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="space-y-16 md:space-y-24">
          {newsItems.map((item) => (
            <div key={item.id} className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start group">
              
              <div className="w-full md:w-1/3 aspect-video md:aspect-4/3 overflow-hidden rounded-sm shadow-lg">
                <motion.img
                  loading="lazy"  
                  initial={{ scale: 1.25 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1.8, ease: "easeOut" }}
                  src={item.image}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  alt={item.label}
                />
              </div>

              {/* Title & Description (Left Side) */}
              <div className="flex-1 space-y-4">
                <h2 className="text-2xl md:text-4xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors duration-300 leading-tight">
                  {item.label}
                </h2>
                <p className="text-slate-600 leading-relaxed text-base md:text-lg max-w-2xl">
                  {item.desc}
                </p>
                <Link to={`/news/${item.id}`} className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 border-b-2 border-amber-300 hover:border-slate-950 transition-all pb-1 uppercase tracking-widest pt-2">
                  Read Full Story <i className="ri-arrow-right-line"></i>
                </Link>
              </div>

              {/* Date Block (Right Side on Desktop, Top on Mobile) */}
              <div className="w-full md:w-40 flex md:flex-col items-center md:items-end justify-start md:justify-center border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-10 shrink-0 order-first md:order-last">
                <span className="text-5xl md:text-7xl font-black text-slate-100 group-hover:text-amber-200 transition-colors duration-700 leading-none">
                  {item.day}
                </span>
                <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-[0.2em] ml-4 md:ml-0 md:mt-3 whitespace-nowrap">
                  {item.month}
                </span>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsEventsPage