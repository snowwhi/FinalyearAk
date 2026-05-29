interface DonutData {
  label: string;
  count: number;
  color: string;
}

export const DonutChart = ({ data }: { data: DonutData[] }) => {
  const total = data.reduce((s, d) => s + d.count, 0);
  const R = 52; const CX = 68; const CY = 68;
  const CIRC = 2 * Math.PI * R;
  let cumulative = 0;

  return (
    <svg viewBox="0 0 136 136" width="136" height="136">
      <circle cx={CX} cy={CY} r={R} fill="none" stroke="#1E293B" strokeWidth="20" />

      {data.map((d, i) => {
        const pct = total > 0 ? d.count / total : 0;
        const dash = pct * CIRC;
        const offset = -cumulative;
        cumulative += dash;
        return (
          <circle key={i} cx={CX} cy={CY} r={R}
            fill="none" stroke={d.color} strokeWidth="20"
            strokeDasharray={`${dash - 1.5} ${CIRC - dash + 1.5}`}
            strokeDashoffset={offset}
            style={{ transform: 'rotate(-90deg)', transformOrigin: `${CX}px ${CY}px`, transition: 'stroke-dasharray 0.6s ease' }}
          />
        );
      })}

      <text x={CX} y={CY - 6} textAnchor="middle"
        className="text-[22px] font-black fill-white">
        {total}
      </text>
      <text x={CX} y={CY + 11} textAnchor="middle"
        className="text-[8px] fill-slate-500 font-sans uppercase tracking-[1.2px]">
        Courses
      </text>
    </svg>
  );
};