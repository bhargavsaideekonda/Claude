import { useEffect, useMemo, useState } from 'react';
import { db, todayStr } from '../lib/storage';
import { useAuth } from '../context/AuthContext';

const STATUS_STYLE = {
  pending:  'bg-amber-100 text-amber-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800'
};

export default function Leave() {
  const { user, isAdmin } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [staff, setStaff] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ fromDate: todayStr(), toDate: todayStr(), reason: '' });

  const refresh = () => {
    setLeaves(db.getAll('leaves'));
    setStaff(db.getAll('staff'));
  };
  useEffect(refresh, []);

  const staffName = (id) => staff.find(s => s.id === id)?.name || 'Unknown';

  const visible = useMemo(() => {
    const sorted = [...leaves].sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
    if (isAdmin) return sorted;
    return sorted.filter(l => l.staffId === user?.staffId);
  }, [leaves, isAdmin, user]);

  const apply = (e) => {
    e.preventDefault();
    if (!user?.staffId) { alert('Your account is not linked to a staff record.'); return; }
    if (!form.reason.trim()) return;
    db.addLeave({ staffId: user.staffId, fromDate: form.fromDate, toDate: form.toDate, reason: form.reason.trim() });
    setShowForm(false);
    setForm({ fromDate: todayStr(), toDate: todayStr(), reason: '' });
    refresh();
  };

  const decide = (id, status) => { db.updateLeaveStatus(id, status); refresh(); };

  return (
    <div className="space-y-5">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Leave</h1>
          <p className="text-slate-500 text-sm">{isAdmin ? 'Review and decide on leave requests.' : 'Apply for leave and track your requests.'}</p>
        </div>
        {!isAdmin && (
          <button onClick={() => setShowForm(s => !s)} className="btn-primary">
            {showForm ? 'Close' : '+ Apply Leave'}
          </button>
        )}
      </div>

      {!isAdmin && showForm && (
        <form onSubmit={apply} className="card">
          <h2 className="font-semibold text-slate-900 mb-3">Apply for Leave</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <label className="block">
              <span className="block text-sm font-medium text-slate-700 mb-1">From</span>
              <input type="date" className="input" value={form.fromDate} onChange={e => setForm({ ...form, fromDate: e.target.value })} required />
            </label>
            <label className="block">
              <span className="block text-sm font-medium text-slate-700 mb-1">To</span>
              <input type="date" className="input" value={form.toDate} onChange={e => setForm({ ...form, toDate: e.target.value })} required />
            </label>
            <label className="block md:col-span-2">
              <span className="block text-sm font-medium text-slate-700 mb-1">Reason</span>
              <textarea className="input" rows={3} value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })} required />
            </label>
          </div>
          <div className="flex gap-2 mt-4">
            <button type="submit" className="btn-primary">Submit</button>
            <button type="button" onClick={() => setShowForm(false)} className="btn-ghost">Cancel</button>
          </div>
        </form>
      )}

      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                {isAdmin && <th className="px-4 py-3 text-left font-medium">Staff</th>}
                <th className="px-4 py-3 text-left font-medium">From</th>
                <th className="px-4 py-3 text-left font-medium">To</th>
                <th className="px-4 py-3 text-left font-medium">Reason</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                {isAdmin && <th className="px-4 py-3 text-right font-medium">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {visible.length === 0 && (
                <tr><td colSpan={isAdmin ? 6 : 4} className="px-4 py-6 text-center text-slate-500">No leave requests.</td></tr>
              )}
              {visible.map(l => (
                <tr key={l.id} className="hover:bg-slate-50">
                  {isAdmin && <td className="px-4 py-3 font-medium text-slate-900">{staffName(l.staffId)}</td>}
                  <td className="px-4 py-3">{l.fromDate}</td>
                  <td className="px-4 py-3">{l.toDate}</td>
                  <td className="px-4 py-3 text-slate-600 max-w-xs">{l.reason}</td>
                  <td className="px-4 py-3"><span className={`badge ${STATUS_STYLE[l.status]}`}>{l.status}</span></td>
                  {isAdmin && (
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      {l.status === 'pending' ? (
                        <>
                          <button onClick={() => decide(l.id, 'approved')} className="text-green-600 hover:underline mr-3">Approve</button>
                          <button onClick={() => decide(l.id, 'rejected')} className="text-red-600 hover:underline">Reject</button>
                        </>
                      ) : (
                        <span className="text-slate-400 text-xs">Decided</span>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
