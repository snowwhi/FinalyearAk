import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { SectionTitle } from '../Shared/SectionTitle';
import { StatCard } from '../Shared/StatCard';
import { type Summary,type Semester } from '../../Types/Dashboard.types';
import { T } from '../Shared/theme';

interface StatsSectionProps {
  summary: Summary;
  semesters: Semester[];
}

export const StatsSection = ({ summary, semesters }: StatsSectionProps) => {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-80px' });

  return (
    <section>
      <SectionTitle>Academic Overview</SectionTitle>
      <div ref={statsRef} className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        <StatCard 
          label="CGPA" 
          value={summary.cgpa} 
          sub="out of 4.00" 
          icon="ri-award-fill" 
          color={T.gold} 
          delay={0} 
          inView={statsInView} 
        />
        <StatCard 
          label="Percentage" 
          value={`${summary.percentage}%`} 
          sub="overall score" 
          icon="ri-percent-fill" 
          color="#34d399" 
          delay={0.1} 
          inView={statsInView} 
        />
        <StatCard 
          label="Marks" 
          value={summary.marksObt} 
          sub={`of ${summary.marksTotal}`} 
          icon="ri-numbers-fill" 
          color="#60a5fa" 
          delay={0.2} 
          inView={statsInView} 
        />
        <StatCard 
          label="Semesters" 
          value={semesters.length} 
          sub="completed" 
          icon="ri-book-open-fill" 
          color="#a78bfa" 
          delay={0.3} 
          inView={statsInView} 
        />
      </div>
    </section>
  );
};