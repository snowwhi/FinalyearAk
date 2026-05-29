export const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-8">
    <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
      {children}
    </h2>
    <div className="flex gap-2 mt-3">
      <div className="w-12 h-0.5 rounded-full bg-amber-500" />
      <div className="w-3 h-0.5 rounded-full bg-amber-300" />
      <div className="flex-1 h-0.5 rounded-full bg-amber-100" />
    </div>
  </div>
);