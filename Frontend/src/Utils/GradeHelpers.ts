export interface GradeChip {
  bg: string;
  text: string;
  border: string;
}
export const getInitials = (name: string): string =>
  name.trim().split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase();

export const gradeChip = (grade: string): GradeChip => {
  const g = (grade ?? '').toUpperCase();
  if (g.startsWith('A')) return { bg: '#dcfce7', text: '#15803d', border: '#86efac' };
  if (g.startsWith('B')) return { bg: '#fef9c3', text: '#a16207', border: '#fde047' };
  if (g.startsWith('C')) return { bg: '#ffedd5', text: '#c2410c', border: '#fed7aa' };
  return { bg: '#fee2e2', text: '#b91c1c', border: '#fca5a5' };
};

export const GRADE_COLORS: Record<string, string> = {
  A: '#22c55e', B: '#f59e0b', C: '#f97316', D: '#ef4444', F: '#dc2626',
};