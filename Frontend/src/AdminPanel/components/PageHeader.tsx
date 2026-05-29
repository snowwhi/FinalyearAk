import type { Page } from '../../Data/mockData';

interface PageHeaderProps {
  title: Page;
}

const pageTitles: Record<Page, string> = {
  dashboard: 'Admin Dashboard',
  students: 'Student Management',
  results: 'Result Management',
  batches: 'Batch Management',
  subjects: 'Subject Management',
  users: 'User Management',
  reports: 'Reports & Analytics',
};

export const PageHeader = ({ title }: PageHeaderProps) => (
  <div className="px-6 py-7 bg-white border-b border-slate-200">
    <div className="flex items-center gap-3 mb-1.5">
       <div className="w-1.5 h-6 bg-slate-800 rounded-full" />
       <h1 className="text-slate-800 text-2xl font-black tracking-tight">
         {pageTitles[title]}
       </h1>
    </div>
    <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold ml-4">
      Thal University · Examination Management System
    </p>
  </div>
);