import { useParams, useNavigate } from 'react-router-dom';
import { newsItems } from '../Data/Data';
import { Link } from 'react-router-dom';

const NewsDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const story = newsItems.find((item) => item.id === Number(id));

  if (!story) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-center space-y-4 px-4">
        <p className="text-5xl">📰</p>
        <h2
          className="text-2xl font-bold text-white"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Story Not Found
        </h2>
        <p className="text-slate-400">This article does not exist or has been removed.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-6 py-2 rounded-full border border-amber-500/40 text-amber-400 text-sm hover:bg-amber-500/10 transition-all duration-300"
        >
          ← Go Back
        </button>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-white">

      {/* ── Gradient Strip ────────────────────────────────── */}
      <div className="bg-linear-to-r from-slate-950 via-slate-900 to-slate-800 px-5 md:px-12 pt-24 pb-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs md:text-sm text-slate-400 mb-5 tracking-wide flex-wrap">
          <Link to="/" className="hover:text-amber-400 flex items-center gap-1.5 transition-colors">
            <i className="ri-home-4-fill text-amber-400" /> Home
          </Link>
          <span className="opacity-40">›</span>
          <span
            onClick={() => navigate('/news-events')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            News & Events
          </span>
          <span className="opacity-40">›</span>
          <span className="text-white font-medium truncate max-w-160px sm:max-w-xs">
            {story.label}
          </span>
        </nav>

        {/* Date */}
        <p className="text-slate-500 text-sm mb-3">
          {story.month} {story.day}, 2026
        </p>

        {/* Headline */}
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight max-w-3xl"
          style={{ fontFamily: "'Cinzel', serif", letterSpacing: '0.01em' }}
        >
          {story.label}
        </h1>

        {/* Gold underline */}
        <div className="w-14 h-3px rounded-full bg-amber-500 mt-5" />

      </div>

      {/* ── White Article Body ────────────────────────────── */}
      <div className="bg-white">
        <div className="max-w-4xl mx-auto px-5 md:px-8 py-12 md:py-16">

          {/* Image */}
          <div className="mb-10 rounded-2xl overflow-hidden shadow-sm border border-slate-100">
            <img
              src={story.image}
              alt={story.label}
              className="w-full h-auto"
            />
          </div>

          {/* Body text */}
          <div className="space-y-5">
            {story.fullStory.split('\n\n').map((paragraph, index) => (
              <p
                key={index}
                className="text-slate-600 leading-relaxed text-base md:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Footer row */}
          <div className="mt-12 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                <span className="text-amber-700 text-xs font-bold">TU</span>
              </div>
              <div>
                <p className="text-slate-800 text-sm font-semibold">Thal University Bhakkar</p>
                <p className="text-slate-400 text-xs">Official News</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/news-events')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-amber-500 hover:text-slate-900 transition-all duration-300 shrink-0"
            >
              ← Back to News
            </button>
          </div>

        </div>
      </div>

    </main>
  );
};

export default NewsDetailPage;