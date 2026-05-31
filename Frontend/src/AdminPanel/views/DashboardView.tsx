import { useEffect, useState } from 'react';
import { StatCard, SectionTitle, StatusPill, TableHead } from '../components';

const API_URL = 'https://finalyearak-1.onrender.com/api';

interface DashboardStats {
  totalStudents: number;
  activeBatches: number;
  totalSubjects: number;
  resultsEntered: number;
  programsCount: number;
}

interface RecentStudent {
  id: number;
  name: string;
  rollNo: string;
  program: string;
  cgpa: string;
  status: string;
}

interface Batch {
  id: number;
  name: string;
  startYear: number;
  endYear: number;
  status: string;
}

interface LoginAttempt {
  email: string;
  attempts: number;
  lastAttempt: string;
}

interface GradeDistribution {
  grade: string;
  count: number;
  percentage: number;
}

export const DashboardView = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentStudents, setRecentStudents] = useState<RecentStudent[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [loginAttempts, setLoginAttempts] = useState<LoginAttempt[]>([]);
  const [gradeDist, setGradeDist] = useState<GradeDistribution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const fetchDashboardData = async () => {
      try {
        const [statsRes, studentsRes, batchesRes, loginRes, gradeRes] = await Promise.all([
          fetch(`${API_URL}/admin/stats`, { headers: { 'Authorization': `Bearer ${token}` } }),
          fetch(`${API_URL}/admin/recent-students`, { headers: { 'Authorization': `Bearer ${token}` } }),
          fetch(`${API_URL}/admin/batches`, { headers: { 'Authorization': `Bearer ${token}` } }),
          fetch(`${API_URL}/admin/login-attempts`, { headers: { 'Authorization': `Bearer ${token}` } }),
          fetch(`${API_URL}/admin/grade-distribution?semester=5`, { headers: { 'Authorization': `Bearer ${token}` } }),
        ]);

        const statsData = await statsRes.json();
        const studentsData = await studentsRes.json();
        const batchesData = await batchesRes.json();
        const loginData = await loginRes.json();
        const gradeData = await gradeRes.json();

        if (statsData.success) setStats(statsData.data);
        if (studentsData.success) setRecentStudents(studentsData.data);
        if (batchesData.success) setBatches(batchesData.data);
        if (loginData.success) setLoginAttempts(loginData.data);
        if (gradeData.success) setGradeDist(gradeData.data);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-10 h-10 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin" />
      </div>
    );
  }

  const statCards = [
    { label: 'Total Students', value: stats?.totalStudents?.toLocaleString() || '0', icon: 'ri-user-3-line', sub: `${stats?.programsCount || 0} programs` },
    { label: 'Active Batches', value: stats?.activeBatches?.toString() || '0', icon: 'ri-group-line', sub: 'BSCS · BSIT · BSSE' },
    { label: 'Total Subjects', value: stats?.totalSubjects?.toLocaleString() || '0', icon: 'ri-book-open-line', sub: 'Across all programs' },
    { label: 'Results Entered', value: stats?.resultsEntered?.toLocaleString() || '0', icon: 'ri-file-chart-line', sub: 'result entries' },
  ];

  const gradeColors: Record<string, string> = {
    A: 'bg-emerald-500',
    B: 'bg-amber-400',
    C: 'bg-orange-400',
    D: 'bg-red-400',
    F: 'bg-red-600',
  };

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(s => <StatCard key={s.label} {...s} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Students */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <p className="font-bold text-slate-700 text-sm">Recent Students</p>
            <span className="text-amber-500 text-xs font-bold">{stats?.totalStudents || 0} total</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <TableHead cols={['Name', 'Roll No', 'Program', 'CGPA', 'Status']} />
              <tbody>
                {recentStudents.map(s => (
                  <tr key={s.id} className="border-t border-slate-50 hover:bg-amber-50/30 transition-colors">
                    <td className="px-5 py-3.5 font-semibold text-slate-800">{s.name}</td>
                    <td className="px-5 py-3.5 font-mono text-xs text-slate-500">{s.rollNo}</td>
                    <td className="px-5 py-3.5"><span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-xs font-bold">{s.program}</span></td>
                    <td className="px-5 py-3.5 font-bold text-amber-600">{s.cgpa}</td>
                    <td className="px-5 py-3.5"><StatusPill status={s.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Batches + Login Alerts */}
        <div className="space-y-4">
          {/* Active Batches */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <p className="font-bold text-slate-700 text-sm">Active Batches</p>
            </div>
            <div className="p-4 space-y-3">
              {batches.map(b => (
                <div key={b.id} className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div>
                    <p className="text-sm font-bold text-slate-700">{b.name}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{b.startYear} – {b.endYear}</p>
                  </div>
                  <StatusPill status={b.status} />
                </div>
              ))}
            </div>
          </div>

          {/* Login Alerts */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
              <i className="ri-shield-flash-line text-amber-500" />
              <p className="font-bold text-slate-700 text-sm">Login Alerts</p>
            </div>
            <div className="p-4 space-y-3">
              {loginAttempts.map((l, i) => (
                <div key={i} className={`flex items-start gap-3 px-3 py-2.5 rounded-xl ${l.attempts >= 4 ? 'bg-red-50 border border-red-100' : 'bg-slate-50 border border-slate-100'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[10px] font-black mt-0.5 ${l.attempts >= 4 ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
                    {l.attempts}
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-slate-700 truncate max-w-160px">{l.email}</p>
                    <p className="text-[10px] text-slate-400">{l.lastAttempt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grade Distribution */}
      <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-sm p-8">
        <SectionTitle title="Academic Performance" subtitle="Grade Distribution Analysis — Semester 5" />
        <div className="flex items-end justify-between gap-6 h-64 px-4">
          {gradeDist.map(g => (
            <div key={g.grade} className="flex-1 flex flex-col items-center group">
              <div className="relative w-full flex flex-col items-center justify-end h-48 mb-4">
                {/* Bar */}
                <div 
                  className={`w-12 md:w-16 ${gradeColors[g.grade]} rounded-t-2xl transition-all duration-700 ease-out shadow-lg group-hover:brightness-110 relative`}
                  style={{ height: `${g.percentage}%` }}
                >
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[10px] font-black px-2 py-1 rounded-lg">
                    {g.percentage}%
                  </div>
                </div>
              </div>
              <p className="text-xl font-black text-slate-800 tracking-tighter">{g.count}</p>
              <div className="mt-2 flex flex-col items-center">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Grade</span>
                <span className={`text-sm font-black ${g.grade === 'F' ? 'text-red-500' : 'text-amber-500'}`}>{g.grade}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};