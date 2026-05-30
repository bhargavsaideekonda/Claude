import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { db, todayStr } from '../lib/storage';
import { useAuth } from '../context/AuthContext';

function StatCard({ label, value, color = 'brand' }) {
  return (
    <div className="card">
      <div className="text-sm text-slate-500">{label}</div>
      <div className={`mt-1 text-3xl font-bold text-${color}-600`}>{value}</div>
    </div>
  );
}

export default function Dashboard() {
  const { user, isAdmin } = useAuth();

  const stats = useMemo(() => {
    const staff = db.getAll('staff');
    const today = todayStr();
    const att = db.getAll('attendance').filter(a => a.date === today);
    const present = att.filter(a => a.status === 'present').length;
    const onLeave = att.filter(a => a.status === 'leave').length;
    const pendingLeaves = db.getAll('leaves').filter(l => l.status === 'pending').length;
    return { total: staff.length, present, onLeave, pendingLeaves };
  }, []);

  const recentAnnouncements = db.getAll('announcements').slice(0, 3);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Welcome, {user?.name} 👋</h1>
        <p className="text-slate-500 text-sm">Here's what's happening at Palnadu MACS today.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Staff"      value={stats.total} />
        <StatCard label="Present Today"    value={stats.present}      color="green" />
        <StatCard label="On Leave Today"   value={stats.onLeave}      color="amber" />
        <StatCard label="Pending Leaves"   value={stats.pendingLeaves} color="red" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-slate-900">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Link to="/attendance"    className="btn-ghost justify-start">📋 Mark Attendance</Link>
            <Link to="/leave"         className="btn-ghost justify-start">🏖️ {isAdmin ? 'Review Leaves' : 'Apply Leave'}</Link>
            <Link to="/staff"         className="btn-ghost justify-start">👥 View Staff</Link>
            <Link to="/announcements" className="btn-ghost justify-start">📢 Announcements</Link>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-slate-900">Recent Announcements</h2>
            <Link to="/announcements" className="text-sm text-brand-600 hover:underline">View all →</Link>
          </div>
          {recentAnnouncements.length === 0 ? (
            <p className="text-sm text-slate-500">No announcements yet.</p>
          ) : (
            <ul className="space-y-3">
              {recentAnnouncements.map(a => (
                <li key={a.id} className="border-l-4 border-brand-500 pl-3">
                  <div className="font-medium text-slate-900">{a.title}</div>
                  <div className="text-sm text-slate-600 line-clamp-2">{a.body}</div>
                  <div className="text-xs text-slate-400 mt-1">{new Date(a.createdAt).toLocaleString()}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
