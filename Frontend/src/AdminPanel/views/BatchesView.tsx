import { useEffect, useState } from 'react';
import { SectionTitle, StatusPill, ActionBtn } from '../components';

const API_URL = 'https://your-backend.onrender.com/api';

interface Batch {
  id: number;
  name: string;
  startYear: number;
  endYear: number;
  durationYears: number;
  status: string;
}

export const BatchesView = () => {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const fetchBatches = async () => {
      try {
        const response = await fetch(`${API_URL}/admin/batches`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (data.success) setBatches(data.data);
      } catch (error) {
        console.error('Failed to fetch batches:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBatches();
  }, []);

  if (loading) {
    return <div className="flex justify-center py-12"><div className="w-8 h-8 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin" /></div>;
  }

  return (
    <div>
      <SectionTitle title="Batch Management" subtitle="Manage university batches — active or graduated" />

      <div className="flex justify-end mb-5">
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 text-white text-sm font-bold hover:bg-amber-600 transition-all shadow-sm">
          <i className="ri-add-line" /> New Batch
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {batches.map(b => (
          <div key={b.id} className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 hover:border-amber-200 hover:shadow-md transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center">
                <i className="ri-group-line text-amber-600 text-xl" />
              </div>
              <StatusPill status={b.status} />
            </div>
            <p className="text-lg font-extrabold text-slate-800 mb-1">{b.name}</p>
            <p className="text-sm text-slate-400 mb-4">{b.startYear} – {b.endYear} · {b.durationYears} Years</p>
            <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
              <button className="flex-1 py-2 rounded-xl border border-slate-200 text-slate-500 text-xs font-bold hover:bg-amber-50 hover:border-amber-200 hover:text-amber-600 transition-all">
                View Students
              </button>
              <ActionBtn icon="ri-edit-line" label="Edit" color="amber" />
              <ActionBtn icon="ri-delete-bin-line" label="Delete" color="red" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};