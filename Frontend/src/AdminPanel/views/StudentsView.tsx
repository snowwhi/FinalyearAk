import { useEffect, useState } from 'react';
import { SectionTitle, StatusPill, TableHead, ActionBtn } from '../components';

const API_URL = 'http://localhost:3000/api';

interface Student {
  id: number;
  name: string;
  rollNo: string;
  program: string;
  batch: string;
  cgpa: string;
  status: string;
}

interface Program {
  id: number;
  name: string;
}

export const StudentsView = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [batches, setBatches] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [filterProg, setFilterProg] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const fetchData = async () => {
      try {
        const [studentsRes, programsRes, batchesRes] = await Promise.all([
          fetch(`${API_URL}/admin/students`, { headers: { 'Authorization': `Bearer ${token}` } }),
          fetch(`${API_URL}/admin/programs`, { headers: { 'Authorization': `Bearer ${token}` } }),
          fetch(`${API_URL}/admin/batches`, { headers: { 'Authorization': `Bearer ${token}` } }),
        ]);

        const studentsData = await studentsRes.json();
        const programsData = await programsRes.json();
        const batchesData = await batchesRes.json();

        if (studentsData.success) setStudents(studentsData.data);
        if (programsData.success) setPrograms(programsData.data);
        if (batchesData.success) setBatches(batchesData.data);
      } catch (error) {
        console.error('Failed to fetch students:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filtered = students.filter(s =>
    (filterProg === 'All' || s.program === filterProg) &&
    (s.name.toLowerCase().includes(search.toLowerCase()) || s.rollNo.toLowerCase().includes(search.toLowerCase()))
  );

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<any>(null);
  const [newStudent, setNewStudent] = useState({
    name: '',
    rollNo: '',
    email: '',
    password: 'password123',
    programId: 1,
    batchId: 1
  });

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/admin/students`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newStudent)
      });
      const data = await res.json();
      if (data.success) {
        setShowAddModal(false);
        window.location.reload();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Failed to add student:', error);
    }
  };

  const handleUpdateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/admin/students/${editingStudent.id}`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editingStudent)
      });
      const data = await res.json();
      if (data.success) {
        setEditingStudent(null);
        window.location.reload();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Failed to update student:', error);
    }
  };

  const handleDeleteStudent = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this student? This will also remove their results and user account.')) return;
    
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/admin/students/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setStudents(prev => prev.filter(s => s.id !== id));
        alert('Student deleted successfully');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Failed to delete student:', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center py-12"><div className="w-8 h-8 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin" /></div>;
  }

  return (
    <div className="relative">
      <SectionTitle title="Students" subtitle="All enrolled students across programs & batches" />

      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative group">
          <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search name or roll no..."
            className="pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-400 outline-none transition-all text-xs w-64 shadow-inner"
          />
        </div>
        <select
          value={filterProg} onChange={e => setFilterProg(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm focus:outline-none focus:border-amber-400 transition-all"
        >
          <option value="All">All Programs</option>
          {programs.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
        </select>
        <button 
          onClick={() => setShowAddModal(true)}
          className="ml-auto flex items-center gap-2 px-6 py-2.5 rounded-xl btn-premium shadow-sm active:scale-95"
        >
          <i className="ri-user-add-line" /> Add Student
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <TableHead cols={['#', 'Student Name', 'Roll No', 'Program', 'Batch', 'CGPA', 'Status', 'Actions']} />
            <tbody>
              {filtered.map((s, i) => (
                <tr key={s.id} className="border-t border-slate-50 hover:bg-amber-50/20 transition-colors">
                  <td className="px-5 py-3.5 text-slate-400 text-xs font-mono">{i + 1}</td>
                  <td className="px-5 py-3.5 font-semibold text-slate-800">{s.name}</td>
                  <td className="px-5 py-3.5 font-mono text-xs text-slate-500">{s.rollNo}</td>
                  <td className="px-5 py-3.5"><span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200">{s.program}</span></td>
                  <td className="px-5 py-3.5 text-slate-500 text-xs">{s.batch}</td>
                  <td className="px-5 py-3.5 font-bold text-amber-600">{s.cgpa}</td>
                  <td className="px-5 py-3.5"><StatusPill status={s.status} /></td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-1">
                      <ActionBtn icon="ri-eye-line" label="View" color="blue" />
                      <ActionBtn icon="ri-edit-line" label="Edit" color="amber" onClick={() => {
                        const prog = programs.find(p => p.name === s.program);
                        const bat = batches.find(b => b.name === s.batch);
                        setEditingStudent({
                          id: s.id,
                          name: s.name,
                          rollNo: s.rollNo,
                          programId: prog?.id || 1,
                          batchId: bat?.id || 1
                        });
                      }} />
                      <ActionBtn icon="ri-delete-bin-line" label="Delete" color="red" onClick={() => handleDeleteStudent(s.id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <p className="text-[11px] text-slate-400">Showing {filtered.length} of {students.length} students</p>
          <div className="flex gap-1">
            {['1', '2', '3', '...', '16'].map(p => (
              <button key={p} className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${p === '1' ? 'bg-amber-500 text-white' : 'text-slate-400 hover:bg-slate-100'}`}>{p}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Add/Edit Student Modal */}
      {(showAddModal || editingStudent) && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-300">
            <div className="bg-amber-500 px-6 py-4 flex justify-between items-center">
              <h3 className="text-white font-bold">
                {showAddModal ? 'Register New Student' : 'Edit Student Details'}
              </h3>
              <button onClick={() => { setShowAddModal(false); setEditingStudent(null); }} className="text-white/80 hover:text-white transition-colors">
                <i className="ri-close-line text-2xl" />
              </button>
            </div>
            <form onSubmit={showAddModal ? handleAddStudent : handleUpdateStudent} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                <input required 
                  value={showAddModal ? newStudent.name : editingStudent.name} 
                  onChange={e => showAddModal ? setNewStudent({...newStudent, name: e.target.value}) : setEditingStudent({...editingStudent, name: e.target.value})} 
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-400 outline-none transition-all text-sm" 
                  placeholder="e.g. Ahmad Hassan" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Roll Number</label>
                <input required 
                  value={showAddModal ? newStudent.rollNo : editingStudent.rollNo} 
                  onChange={e => showAddModal ? setNewStudent({...newStudent, rollNo: e.target.value}) : setEditingStudent({...editingStudent, rollNo: e.target.value})} 
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-400 outline-none transition-all text-sm" 
                  placeholder="e.g. COMPF22BSR09" 
                />
              </div>
              {showAddModal && (
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</label>
                  <input required type="email" value={newStudent.email} onChange={e => setNewStudent({...newStudent, email: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-400 outline-none transition-all text-sm" placeholder="student@tub.edu.pk" />
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Program</label>
                  <select required 
                    value={showAddModal ? newStudent.programId : editingStudent.programId} 
                    onChange={e => showAddModal ? setNewStudent({...newStudent, programId: parseInt(e.target.value)}) : setEditingStudent({...editingStudent, programId: parseInt(e.target.value)})} 
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-400 outline-none transition-all text-sm"
                  >
                    {programs.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Batch</label>
                  <select required 
                    value={showAddModal ? newStudent.batchId : editingStudent.batchId} 
                    onChange={e => showAddModal ? setNewStudent({...newStudent, batchId: parseInt(e.target.value)}) : setEditingStudent({...editingStudent, batchId: parseInt(e.target.value)})} 
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-400 outline-none transition-all text-sm"
                  >
                    {batches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                 <button type="button" onClick={() => { setShowAddModal(false); setEditingStudent(null); }} className="py-3 rounded-xl border border-slate-200 text-slate-500 font-bold text-xs uppercase tracking-widest hover:bg-slate-50 transition-all">Cancel</button>
                 <button type="submit" className="py-3 rounded-xl btn-premium w-full shadow-lg">
                   {showAddModal ? 'Create Student' : 'Save Changes'}
                 </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};