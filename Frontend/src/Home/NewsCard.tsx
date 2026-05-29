import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { newsItems } from '../Data/Data';


export default function NewsSection() {
  const [activeCard, setActiveCard] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleLearnMore = (e) => {
    e.stopPropagation();
    navigate(`/news-events`);
  };

  return (
    <div className="w-screen min-h-screen bg-[#F8FAFC] flex items-center justify-center py-20">
      <div className="flex p-6 md:p-12 bg-white shadow-xl shadow-slate-200/50 rounded-[3rem] items-center h-fit w-[95%] md:w-auto max-w-7xl overflow-hidden justify-center flex-col border border-slate-100">

        <div className="w-full mb-12 flex flex-col md:flex-row justify-between items-center md:items-end px-4 gap-4">
          <div className="text-center md:text-left">
            <p className="text-amber-500 font-black uppercase tracking-[0.4em] text-[10px] mb-2">Stay Updated</p>
            <h2 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight uppercase">
              News & <span className="text-amber-500">Events</span>
            </h2>
          </div>
        </div>

        <ul className="flex flex-col md:flex-row gap-4 md:gap-5 w-full" role="list">
          {newsItems.map((item, index) => {
            const isHovered = activeCard === index;

            return (
              <motion.li
                layout
                key={item.id}
                onMouseEnter={() => !isMobile && setActiveCard(index)}
                onMouseLeave={() => !isMobile && setActiveCard(null)}
                onClick={() => isMobile && setActiveCard(isHovered ? null : index)}
                animate={{
                  width: isMobile ? "100%" : (isHovered ? 550 : 220),
                  height: isMobile ? (isHovered ? 350 : 120) : "auto",
                }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.22, 1, 0.36, 1] 
                }}
                className="flex flex-col gap-3 md:gap-4 cursor-pointer rounded-3xl"
              >
                <div className="relative overflow-hidden rounded-3xl h-80 md:h-80 w-full border border-neutral-100 shadow-md">
                  <motion.img
                    src={item.image}
                    alt={item.label}
                    className="w-full h-full object-cover"
                    animate={{ scale: isHovered ? 1.08 : 1 }}
                    transition={{ duration: 0.8 }}
                  />
                  <div className={`absolute inset-0 bg-black/10 transition-opacity ${isHovered ? 'opacity-0' : 'opacity-100'}`} />

                  {isMobile && !isHovered && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <span className="text-white font-bold tracking-widest uppercase">
                        {item.label}
                      </span>
                    </div>
                  )}
                </div>

                <div className={`flex w-full gap-2 h-12 items-center transition-all duration-300 ${isMobile && !isHovered ? 'opacity-0 h-0 scale-95' : 'opacity-100'}`}>
                  <button
                    onClick={(e) => handleLearnMore(e)}
                    className={`flex items-center relative transition-all duration-500 ease-out overflow-hidden h-full rounded-full cursor-pointer
                    ${isHovered ? 'flex-4 bg-slate-800 pl-4 pr-2' : 'w-12 bg-amber-200 justify-center'}`}
                  >
                    <span className={`text-[10px] font-bold text-white whitespace-nowrap overflow-hidden 
                      ${isHovered ? 'w-auto opacity-100 flex-1 text-left' : 'w-0 opacity-0'}`}>
                      LEARN MORE
                    </span>
                    <div className={`flex items-center justify-center rounded-full w-8 h-8 ${isHovered ? 'bg-white rotate-0' : 'bg-transparent -rotate-45'}`}>
                      <i className={`ri-arrow-right-line ${isHovered ? 'text-[#4A3F35]' : 'text-[#4A3F35]'} text-lg`}></i>
                    </div>
                  </button>

                  <div className="flex-1 h-full bg-neutral-100 border border-neutral-200 flex items-center justify-center rounded-full px-3 overflow-hidden">
                    <span className="text-[10px] md:text-[12px] font-bold text-[#4A3F35] tracking-widest whitespace-nowrap uppercase">
                      {item.label}
                    </span>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}