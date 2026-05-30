import { useEffect, useState } from 'react';
import { db } from '../lib/storage';
import { useAuth } from '../context/AuthContext';

export default function Announcements() {
  const { user, isAdmin } = useAuth();
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', body: '' });

  const refresh = () => setItems(db.getAll('announcements'));
  useEffect(refresh, []);

  const submit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.body.trim()) return;
    db.addAnnouncement({ title: form.title.trim(), body: form.body.trim(), author: user?.name || 'Admin' });
    setForm({ title: '', body: '' });
    setShowForm(false);
    refresh();
  };

  const remove = (id) => {
    if (!confirm('Delete this announcement?')) return;
    db.removeAnnouncement(id); refresh();
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Announcements</h1>
          <p className="text-slate-500 text-sm">{items.length} post{items.length === 1 ? '' : 's'}</p>
        </div>
        {isAdmin && (
          <button onClick={() => setShowForm(s => !s)} className="btn-primary">
            {showForm ? 'Close' : '+ New Announcement'}
          </button>
        )}
      </div>

      {isAdmin && showForm && (
        <form onSubmit={submit} className="card">
          <h2 className="font-semibold text-slate-900 mb-3">New Announcement</h2>
          <div className="space-y-3">
            <label className="block">
              <span className="block text-sm font-medium text-slate-700 mb-1">Title</span>
              <input className="input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
            </label>
            <label className="block">
              <span className="block text-sm font-medium text-slate-700 mb-1">Message</span>
              <textarea className="input" rows={4} value={form.body} onChange={e => setForm({ ...form, body: e.target.value })} required />
            </label>
          </div>
          <div className="flex gap-2 mt-4">
            <button type="submit" className="btn-primary">Post</button>
            <button type="button" onClick={() => setShowForm(false)} className="btn-ghost">Cancel</button>
          </div>
        </form>
      )}

      {items.length === 0 ? (
        <div className="card text-center text-slate-500">No announcements yet.</div>
      ) : (
        <div className="space-y-3">
          {items.map(a => (
            <article key={a.id} className="card">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-slate-900">{a.title}</h3>
                  <div className="text-xs text-slate-400 mt-0.5">
                    By {a.author || 'Admin'} • {new Date(a.createdAt).toLocaleString()}
                  </div>
                </div>
                {isAdmin && (
                  <button onClick={() => remove(a.id)} className="text-red-600 text-sm hover:underline">Delete</button>
                )}
              </div>
              <p className="mt-2 text-slate-700 whitespace-pre-wrap">{a.body}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
