import { gradeChip } from '../../Utils/GradeHelpers';

export const GradeChip = ({ grade }: { grade: string }) => {
  const chip = gradeChip(grade);
  return (
    <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono inline-block"
      style={{ background: chip.bg, color: chip.text, border: `1px solid ${chip.border}` }}>
      {grade}
    </span>
  );
};