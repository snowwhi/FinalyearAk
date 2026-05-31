import { useEffect, useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { SectionTitle } from '../components';

const API_URL = 'https://finalyearak-1.onrender.com/api';

interface SemesterSummary {
  studentName: string;
  rollNo: string;
  semester1: string;
  semester2: string;
  semester3: string;
  semester4: string;
  semester5: string;
  semester6: string;
  semester7: string;
  cgpa: string;
}

interface Program {
  id: number;
  name: string;
}

interface Batch {
  id: number;
  name: string;
}

export const ReportsView = () => {
  const [semesterData, setSemesterData] = useState<SemesterSummary[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [selectedProg, setSelectedProg] = useState('BSCS');
  const [selectedBatch, setSelectedBatch] = useState('2022');
  const [loading, setLoading] = useState(true);
  const reportRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: reportRef,
    documentTitle: `${selectedProg}_Batch_${selectedBatch}_Academic_Report`,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const [reportRes, progRes, batchRes] = await Promise.all([
          fetch(`${API_URL}/admin/semester-summary?program=${selectedProg}&batch=${selectedBatch}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch(`${API_URL}/admin/programs`, { headers: { 'Authorization': `Bearer ${token}` } }),
          fetch(`${API_URL}/admin/batches`, { headers: { 'Authorization': `Bearer ${token}` } }),
        ]);

        const reportData = await reportRes.json();
        const progData = await progRes.json();
        const batchData = await batchRes.json();

        if (reportData.success) setSemesterData(reportData.data);
        if (progData.success) setPrograms(progData.data);
        if (batchData.success) setBatches(batchData.data);
      } catch (error) {
        console.error('Failed to fetch reports:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedProg, selectedBatch]);

  return (
    <div className="space-y-6">
      <SectionTitle title="Academic Reports" subtitle="Detailed semester-wise GPA progression and CGPA summary" />

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Program</label>
          <select value={selectedProg} onChange={e => setSelectedProg(e.target.value)} className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 bg-slate-50 focus:bg-white outline-none transition-all">
            {programs.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Batch</label>
          <select value={selectedBatch} onChange={e => setSelectedBatch(e.target.value)} className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 bg-slate-50 focus:bg-white outline-none transition-all">
            {batches.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
          </select>
        </div>
        <button 
          onClick={() => handlePrint()}
          className="ml-auto flex items-center gap-2 px-8 py-2.5 rounded-xl btn-premium shadow-xl active:scale-95"
        >
          <i className="ri-file-pdf-2-line text-lg" /> Export PDF Report
        </button>
      </div>

      {/* Semester Summary Table */}
      <div ref={reportRef} className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden p-0 printable-area">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <p className="text-base font-bold text-slate-800 tracking-tight">
              {selectedProg} · Batch {selectedBatch}
            </p>
            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-0.5">Official Academic GPA Summary</p>
          </div>
          <span className="text-[10px] font-black px-3 py-1.5 bg-amber-50 text-amber-600 rounded-full border border-amber-100 uppercase tracking-tighter">
            {semesterData.length} Registered Students
          </span>
        </div>
        
        {loading ? (
          <div className="py-20 flex justify-center"><div className="w-8 h-8 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-5 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Student Name</th>
                  <th className="px-5 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Roll No</th>
                  {[1,2,3,4,5,6,7].map(n => (
                    <th key={n} className="px-4 py-4 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">S{n}</th>
                  ))}
                  <th className="px-5 py-4 text-center text-[10px] font-black text-amber-600 uppercase tracking-widest bg-amber-50/50">CGPA</th>
                </tr>
              </thead>
              <tbody>
                {semesterData.map(s => (
                  <tr key={s.rollNo} className="border-t border-slate-50 hover:bg-amber-50/10 transition-colors">
                    <td className="px-5 py-4 font-bold text-slate-700 text-xs">{s.studentName}</td>
                    <td className="px-5 py-4 font-mono text-[11px] text-slate-500 font-medium">{s.rollNo}</td>
                    {[s.semester1, s.semester2, s.semester3, s.semester4, s.semester5, s.semester6, s.semester7].map((gpa, i) => (
                      <td key={i} className={`px-4 py-4 text-center text-xs font-black ${gpa === '—' ? 'text-slate-200' : parseFloat(gpa) >= 3.5 ? 'text-emerald-600' : parseFloat(gpa) >= 3.0 ? 'text-amber-600' : 'text-red-500'}`}>
                        {gpa}
                      </td>
                    ))}
                    <td className="px-5 py-4 text-center font-black text-slate-900 bg-amber-50/20 border-l border-amber-100/50">{s.cgpa}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
