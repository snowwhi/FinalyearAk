import { useEffect, useState } from 'react';
import { SectionTitle, TableHead, ActionBtn } from '../components';

const API_URL = 'http://localhost:3000/api';

interface Subject {
  id: number;
  code: string;
  title: string;
  program: string;
  semester: number;
  creditHours: number;
}

interface Program {
  id: number;
  name: string;
}

export const SubjectsView = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [filterProg, setFilterProg] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const fetchData = async () => {
      try {
        const [subjectsRes, programsRes] = await Promise.all([
          fetch(`${API_URL}/admin/subjects`, { headers: { 'Authorization': `Bearer ${token}` } }),
          fetch(`${API_URL}/admin/programs`, { headers: { 'Authorization': `Bearer ${token}` } }),
        ]);

        const subjectsData = await subjectsRes.json();
        const programsData = await programsRes.json();

        if (subjectsData.success) setSubjects(subjectsData.data);
        if (programsData.success) setPrograms(programsData.data);
      } catch (error) {
        console.error('Failed to fetch subjects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filtered = filterProg === 'All' ? subjects : subjects.filter(s => s.program === filterProg);

  if (loading) {
    return <div className="flex justify-center py-12"><div className="w-8 h-8 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin" /></div>;
  }

  return (
    <div>
      <SectionTitle title="Subjects" subtitle="Manage subjects per program — linked to semester_results" />

      <div className="flex flex-wrap gap-3 mb-5">
        <select
          value={filterProg} onChange={e => setFilterProg(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm focus:outline-none focus:border-amber-400 transition-all"
        >
          <option value="All">All Programs</option>
          {programs.map(p => <option key={p.id}>{p.name}</option>)}
        </select>
        <button className="ml-auto flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 text-white text-sm font-bold hover:bg-amber-600 transition-all shadow-sm">
          <i className="ri-add-line" /> Add Subject
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <TableHead cols={['ID', 'Code', 'Title', 'Program', 'Semester', 'Credit Hrs', 'Actions']} />
            <tbody>
              {filtered.map(s => (
                <tr key={s.id} className="border-t border-slate-50 hover:bg-amber-50/20 transition-colors">
                  <td className="px-5 py-3.5 font-mono text-xs text-slate-400">{s.id}</td>
                  <td className="px-5 py-3.5 font-bold text-amber-600 font-mono text-xs">{s.code}</td>
                  <td className="px-5 py-3.5 font-semibold text-slate-700">{s.title}</td>
                  <td className="px-5 py-3.5"><span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-xs font-bold">{s.program}</span></td>
                  <td className="px-5 py-3.5 text-center text-slate-500">{s.semester}</td>
                  <td className="px-5 py-3.5 text-center font-bold text-slate-700">{s.creditHours}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-1">
                      <ActionBtn icon="ri-edit-line" label="Edit" color="amber" />
                      <ActionBtn icon="ri-delete-bin-line" label="Delete" color="red" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 bg-slate-50/50 border-t border-slate-100">
          <p className="text-[11px] text-slate-400">Showing {filtered.length} subjects</p>
        </div>
      </div>
    </div>
  );
};