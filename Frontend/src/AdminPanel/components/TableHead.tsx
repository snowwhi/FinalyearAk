interface TableHeadProps {
  cols: string[];
}

export const TableHead = ({ cols }: TableHeadProps) => (
  <thead className="bg-[#f8fafc] border-b border-slate-200">
    <tr>
      {cols.map(c => (
        <th key={c} className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] whitespace-nowrap">
          {c}
        </th>
      ))}
    </tr>
  </thead>
);