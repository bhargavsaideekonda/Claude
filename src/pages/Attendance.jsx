import { useEffect, useMemo, useState } from 'react';
import { db, todayStr } from '../lib/storage';
import { useAuth } from '../context/AuthContext';

const STATUSES = [
  { key: 'present', label: 'Present', color: 'bg-green-100 text-green-800' },
  { key: 'absent',  label: 'Absent',  color: 'bg-red-100 text-red-800' },
  { key: 'leave',   label: 'Leave',   color: 'bg-amber-100 text-amber-800' }
];

export default function Attendance() {
  const { isAdmin, user } = useAuth();
  const [date, setDate] = useState(todayStr());
  const [staff, setStaff] = useState([]);
  const [records, setRecords] = useState([]);

  const refresh = () => {
    setStaff(db.getAll('staff'));
    setRecords(db.getAll('attendance'));
  };
  useEffect(refresh, []);

  const visibleStaff = useMemo(() => {
    if (isAdmin) return staff;
    return staff.filter(s => s.id === user?.staffId);
  }, [staff, isAdmin, user]);

  const statusFor = (staffId) =>
    records.find(r => r.staffId === staffId && r.date === date)?.status || null;

  const setStatus = (staffId, status) => {
    db.setAttendance(staffId, date, status);
    refresh();
  };

  const summary = useMemo(() => {
    const dayRecords = records.filter(r => r.date === date);
    return {
      present: dayRecords.filter(r => r.status === 'present').length,
      absent:  dayRecords.filter(r => r.status === 'absent').length,
      leave:   dayRecords.filter(r => r.status === 'leave').length
    };
  }, [records, date]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Attendance</h1>
          <p className="text-slate-500 text-sm">{isAdmin ? 'Mark attendance for any staff member.' : 'View your attendance.'}</p>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-slate-700">Date</label>
          <input type="date" className="input md:w-44" value={date} onChange={e => setDate(e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="card"><div className="text-sm text-slate-500">Present</div><div className="text-2xl font-bold text-green-600">{summary.present}</div></div>
        <div className="card"><div className="text-sm text-slate-500">Absent</div> <div className="text-2xl font-bold text-red-600">{summary.absent}</div></div>
        <div className="card"><div className="text-sm text-slate-500">Leave</div>  <div className="text-2xl font-bold text-amber-600">{summary.leave}</div></div>
      </div>

      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Staff</th>
                <th className="px-4 py-3 text-left font-medium">Role</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                {isAdmin && <th className="px-4 py-3 text-right font-medium">Mark</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {visibleStaff.length === 0 && (
                <tr><td colSpan={isAdmin ? 4 : 3} className="px-4 py-6 text-center text-slate-500">No staff to show.</td></tr>
              )}
              {visibleStaff.map(s => {
                const status = statusFor(s.id);
                const meta = STATUSES.find(x => x.key === status);
                return (
                  <tr key={s.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900">{s.name}</td>
                    <td className="px-4 py-3 text-slate-600">{s.role || '—'}</td>
                    <td className="px-4 py-3">
                      {meta ? <span className={`badge ${meta.color}`}>{meta.label}</span>
                            : <span className="text-slate-400 text-xs">Not marked</span>}
                    </td>
                    {isAdmin && (
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        {STATUSES.map(st => (
                          <button
                            key={st.key}
                            onClick={() => setStatus(s.id, st.key)}
                            className={`text-xs px-2 py-1 rounded mr-1 border ${
                              status === st.key ? 'bg-brand-600 text-white border-brand-600' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            {st.label}
                          </button>
                        ))}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
