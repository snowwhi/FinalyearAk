import type { Semester } from '../../Types/Dashboard.types';
import { T } from './theme';

export const GPABarChart = ({ semesters }: { semesters: Semester[] }) => {
  const MAX = 4.0;
  const BAR_W = 34;
  const GAP = 14;
  const H = 90;
  const PAD_L = 28;
  const totalW = PAD_L + semesters.length * (BAR_W + GAP) + 10;

  return (
    <svg viewBox={`0 0 ${totalW} ${H + 36}`} width="100%" preserveAspectRatio="xMidYMid meet">
      {[1, 2, 3, 4].map(v => (
        <g key={v}>
          <line x1={PAD_L} y1={H - (v / MAX) * H} x2={totalW - 4} y2={H - (v / MAX) * H}
            stroke="#1E293B" strokeWidth="1" />
          <text x={PAD_L - 4} y={H - (v / MAX) * H + 3} textAnchor="end"
            className="text-[8px] fill-slate-600 font-mono">
            {v}
          </text>
        </g>
      ))}

      {semesters.map((sem, i) => {
        const gpa = parseFloat(sem.gpa) || 0;
        const barH = (gpa / MAX) * H;
        const x = PAD_L + i * (BAR_W + GAP);
        const y = H - barH;
        const label = sem.id?.replace(/semester\s*/i, 'S') ?? `S${i + 1}`;

        return (
          <g key={i}>
            <rect x={x} y={0} width={BAR_W} height={H} rx="4" fill="#1E293B" />
            <rect x={x} y={y} width={BAR_W} height={barH} rx="4" fill={T.gold} opacity={0.9} />
            <text x={x + BAR_W / 2} y={y - 5} textAnchor="middle"
              className="text-[8.5px] font-bold fill-slate-300 font-mono">
              {gpa.toFixed(2)}
            </text>
            <text x={x + BAR_W / 2} y={H + 14} textAnchor="middle"
              className="text-[8px] fill-slate-500 font-sans">
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};