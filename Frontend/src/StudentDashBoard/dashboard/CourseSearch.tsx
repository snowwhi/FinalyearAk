interface CourseSearchProps {
  search: string;
  setSearch: (val: string) => void;
}

export const CourseSearch = ({ search, setSearch }: CourseSearchProps) => (
  <div className="relative mb-5">
    <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
    <input
      type="text"
      placeholder="Search by course name or code…"
      value={search}
      onChange={e => setSearch(e.target.value)}
      className="w-full pl-11 pr-4 py-3 rounded-xl text-slate-800 text-sm outline-none
        bg-white border border-slate-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 
        transition-all duration-200 placeholder-slate-400 font-sans"
    />
    {search && (
      <button
        onClick={() => setSearch('')}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-800 transition-colors">
        <i className="ri-close-line" />
      </button>
    )}
  </div>
);