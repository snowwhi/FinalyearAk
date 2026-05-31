import React, { useEffect, useState } from 'react';
import { SectionTitle, GradeBadge, ActionBtn } from '../components';

const API_URL = 'https://finalyearak-1.onrender.com/api';

interface Result {
  id: number;
  studentRollNo: string;
  studentName: string;
  subjectCode: string;
  subjectName: string;
  semester: number;
  marks: number;
  gradePoints: string;
  grade: string;
  updatedAt: string;
}

interface Program {
  id: number;
  name: string;
}

export const ResultsView = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [selectedSem, setSelectedSem] = useState('5');
  const [selectedProg, setSelectedProg] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const fetchData = async () => {
      try {
        let url = `${API_URL}/admin/results?semester=${selectedSem}&program=${selectedProg}`;
        if (searchQuery) {
          url += `&search=${searchQuery}`;
        }

        const [resultsRes, programsRes] = await Promise.all([
          fetch(url, {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch(`${API_URL}/admin/programs`, { headers: { 'Authorization': `Bearer ${token}` } }),
        ]);

        const resultsData = await resultsRes.json();
        const programsData = await programsRes.json();

        if (resultsData.success) setResults(resultsData.data);
        if (programsData.success) setPrograms(programsData.data);
      } catch (error) {
        console.error('Failed to fetch results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedSem, selectedProg, searchQuery]);

  const [formData, setFormData] = useState({
    rollNo: '',
    subjectCode: '',
    marks: '',
    semester: selectedSem
  });

  const handleSaveResult = async () => {
    if (!formData.rollNo || !formData.subjectCode || !formData.marks) {
      alert('Please fill all fields');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/admin/results`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...formData, semester: selectedSem })
      });
      const data = await res.json();
      if (data.success) {
        alert('Result saved successfully');
        window.location.reload(); // Simple refresh to show new data
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Failed to save result:', error);
    }
  };

  const handleDeleteResult = async (id: number) => {
    if (!window.confirm('Delete this result entry?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/admin/results/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setResults(prev => prev.filter(r => r.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete result:', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center py-12"><div className="w-8 h-8 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin" /></div>;
  }

  return (
    <div>
      <SectionTitle title="Result Management" subtitle="Enter and manage semester_results entries" />

      <div className="flex flex-wrap gap-3 mb-5">
        <select
          value={selectedProg} onChange={e => setSelectedProg(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm focus:outline-none focus:border-amber-400 transition-all"
        >
          <option value="All">All Programs</option>
          {programs.map(p => <option key={p.id}>{p.name}</option>)}
        </select>
        <select
          value={selectedSem} onChange={e => setSelectedSem(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm focus:outline-none focus:border-amber-400 transition-all"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <option key={n} value={n}>Semester {n}</option>)}
        </select>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
         <p className="text-sm font-bold text-slate-600 tracking-tight">
            {selectedProg} · Semester {selectedSem} Results
            <span className="ml-2 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-600 text-[10px] font-black uppercase">
              {results.length} total entries
            </span>
          </p>
          <div className="relative group">
            <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search Roll No or Name..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-11 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-400 outline-none transition-all text-xs w-64 shadow-inner"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50/50 border-b border-slate-100">
              <tr>
                <th className="px-5 py-3 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Student Information</th>
                <th className="px-5 py-3 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Subject Details</th>
                <th className="px-5 py-3 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Marks</th>
                <th className="px-5 py-3 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Grade</th>
                <th className="px-5 py-3 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {Object.entries(
                results.reduce((acc, r) => {
                  if (!acc[r.studentRollNo]) acc[r.studentRollNo] = { name: r.studentName, items: [] };
                  acc[r.studentRollNo].items.push(r);
                  return acc;
                }, {} as Record<string, { name: string, items: Result[] }>)
              )
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([rollNo, group]) => (
                <React.Fragment key={rollNo}>
                  <tr className="bg-amber-50/20">
                    <td colSpan={5} className="px-5 py-2">
                      <div className="flex items-center gap-3">
                        <span className="px-2 py-0.5 rounded bg-amber-500 text-white text-[10px] font-black font-mono">{rollNo}</span>
                        <span className="text-slate-800 font-bold text-xs uppercase tracking-tight">{group.name}</span>
                        <div className="flex-1 h-px bg-amber-100/50" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase">{group.items.length} Subjects</span>
                      </div>
                    </td>
                  </tr>
                  {group.items.map(r => (
                    <tr key={r.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-5 py-2.5">
                        {/* Empty spacer for student info col */}
                      </td>
                      <td className="px-5 py-2.5">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-700 text-xs tracking-tight">{r.subjectName}</span>
                          <span className="text-[10px] font-mono text-amber-600 font-bold">{r.subjectCode}</span>
                        </div>
                      </td>
                      <td className="px-5 py-2.5 text-center">
                        <span className="font-black text-slate-800">{r.marks}</span>
                        <span className="text-[10px] text-slate-400 ml-1 font-mono">/100</span>
                      </td>
                      <td className="px-5 py-2.5 text-center">
                        <GradeBadge grade={r.grade} />
                      </td>
                      <td className="px-5 py-2.5">
                        <div className="flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <ActionBtn icon="ri-edit-line" label="Edit" color="amber" onClick={() => {
                            setFormData({
                              rollNo: r.studentRollNo,
                              subjectCode: r.subjectCode,
                              marks: r.marks.toString(),
                              semester: r.semester.toString()
                            });
                            document.getElementById('quick-entry')?.scrollIntoView({ behavior: 'smooth' });
                          }} />
                          <ActionBtn icon="ri-delete-bin-line" label="Delete" color="red" onClick={() => handleDeleteResult(r.id)} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Entry Form */}
      <div id="quick-entry" className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 mt-8 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-amber-500" />
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
            <i className="ri-edit-box-line text-xl" />
          </div>
          <div>
            <h3 className="text-slate-800 font-bold tracking-tight">Quick Result Entry</h3>
            <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold">Add or Update subject marks</p>
          </div>
        </div>
        
        <form onSubmit={(e) => { e.preventDefault(); handleSaveResult(); }} className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 items-end">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">Student Roll No</label>
            <input required value={formData.rollNo} onChange={e => setFormData({...formData, rollNo: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-400 outline-none transition-all text-sm font-mono" placeholder="COMPF22BSR..." />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">Subject Code</label>
            <input required value={formData.subjectCode} onChange={e => setFormData({...formData, subjectCode: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-400 outline-none transition-all text-sm font-mono" placeholder="CS-101" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">Obtained Marks</label>
            <input required type="number" value={formData.marks} onChange={e => setFormData({...formData, marks: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-400 outline-none transition-all text-sm font-bold text-amber-600" placeholder="0-100" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">Semester</label>
            <select value={formData.semester} onChange={e => setFormData({...formData, semester: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-400 outline-none transition-all text-sm font-bold text-slate-700">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(s => <option key={s} value={s}>Semester {s}</option>)}
            </select>
          </div>
          <button type="submit" className="py-2.5 px-8 rounded-xl btn-premium shadow-lg active:scale-95">
            Save Result
          </button>
        </form>
      </div>
    </div>
  );
};