import React from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import animationData from '../assets/404.json';

const NotFound: React.FC = () => {
  const cleanData = (animationData as any).default || animationData;

  const LottiePlayer = (Lottie as any).default || Lottie;

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-[#FDFBF7]">
      {/* Premium Slate Monochromatic Lottie */}
      <div className="w-full max-w-75 md:max-w-100 lg:max-w-w" style={{ filter: 'grayscale(1) contrast(1.2) brightness(0.9) opacity(0.85)' }}>
        {LottiePlayer ? (
          <LottiePlayer
            animationData={cleanData}
            loop={true}
            className="w-full h-auto"
          />
        ) : (
          <div className="text-slate-400 animate-pulse text-center">Loading...</div>
        )}
      </div>
      <div className="text-center mt-6 space-y-4">

        <div className="">
          <Link
            to="/"
            className="inline-block px-10 py-3 btn-premium rounded-xl shadow-xl active:scale-95"
          >
            Return to Campus
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;