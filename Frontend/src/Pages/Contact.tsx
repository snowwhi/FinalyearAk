import { Link } from 'react-router-dom';
import ContactForm from '../Contact/ContactForm';
import InfoSidebar from '../Contact/InfoSidebar';
import MapSection from '../Contact/MapSection';

const ContactPage = () => {
   return (
      <main className="inter min-h-screen bg-white">

         {/* ── Header ── */}
         <div className="bg-slate-950 px-6 md:px-16 pt-24 pb-4">
            <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap">
               <Link to="/" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <i className="ri-home-4-fill text-amber-500 text-xs" /> Home
               </Link>
               <span className="text-slate-700">›</span>
               <span className="text-slate-300">Contact Us</span>
            </nav>
            <h1 className="cinzel text-white font-bold text-4xl md:text-5xl tracking-wide">
               Contact Us
            </h1>
            <div className="w-10 h-[3px] rounded-full bg-amber-500 mt-4" />
         </div>

         {/* ── Contact Section ── */}
         <section className="pt-10 pb-16 px-6 md:px-16 bg-slate-50">
            <div className="max-w-5xl mx-auto">
               <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_268px]">
                     <ContactForm />
                     <InfoSidebar />
                  </div>
               </div>
            </div>
         </section>

         {/* ── Map Section ── outside the card and grid ── */}
         <MapSection />

      </main>
   );
};

export default ContactPage;