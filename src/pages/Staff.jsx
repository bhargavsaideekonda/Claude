import { useEffect, useMemo, useState } from 'react';
import { db } from '../lib/storage';
import { useAuth } from '../context/AuthContext';

const blank = { name: '', role: '', phone: '', email: '', branch: '', joinedAt: '' };

export default function Staff() {
  const { isAdmin } = useAuth();
  const [staff, setStaff] = useState([]);
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState(null); // null | 'new' | id
  const [form, setForm] = useState(blank);

  const refresh = () => setStaff(db.getAll('staff'));
  useEffect(refresh, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return staff;
    return staff.filter(s =>
      [s.name, s.role, s.branch, s.email, s.phone].some(v => (v || '').toLowerCase().includes(q))
    );
  }, [query, staff]);

  const startNew = () => { setEditing('new'); setForm(blank); };
  const startEdit = (s) => { setEditing(s.id); setForm({ ...blank, ...s }); };
  const cancel = () => { setEditing(null); setForm(blank); };

  const save = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    if (editing === 'new') db.addStaff(form);
    else db.updateStaff(editing, form);
    refresh(); cancel();
  };

  const remove = (id) => {
    if (!confirm('Remove this staff member?')) return;
    db.removeStaff(id); refresh();
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Staff</h1>
          <p className="text-slate-500 text-sm">{staff.length} member{staff.length === 1 ? '' : 's'} total</p>
        </div>
        <div className="flex gap-2">
          <input className="input md:w-64" placeholder="Search name, role, branch..." value={query} onChange={e => setQuery(e.target.value)} />
          {isAdmin && <button onClick={startNew} className="btn-primary whitespace-nowrap">+ Add Staff</button>}
        </div>
      </div>

      {editing && (
        <form onSubmit={save} className="card">
          <h2 className="font-semibold text-slate-900 mb-3">{editing === 'new' ? 'Add Staff' : 'Edit Staff'}</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <Field label="Name *">  <input className="input" value={form.name}     onChange={e => setForm({ ...form, name: e.target.value })} required /></Field>
            <Field label="Role">    <input className="input" value={form.role}     onChange={e => setForm({ ...form, role: e.target.value })} placeholder="e.g. Field Officer" /></Field>
            <Field label="Phone">   <input className="input" value={form.phone}    onChange={e => setForm({ ...form, phone: e.target.value })} /></Field>
            <Field label="Email">   <input className="input" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></Field>
            <Field label="Branch">  <input className="input" value={form.branch}   onChange={e => setForm({ ...form, branch: e.target.value })} /></Field>
            <Field label="Joined">  <input className="input" type="date" value={form.joinedAt} onChange={e => setForm({ ...form, joinedAt: e.target.value })} /></Field>
          </div>
          <div className="flex gap-2 mt-4">
            <button type="submit" className="btn-primary">Save</button>
            <button type="button" onClick={cancel} className="btn-ghost">Cancel</button>
          </div>
        </form>
      )}

      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <Th>Name</Th><Th>Role</Th><Th>Branch</Th><Th>Phone</Th><Th>Email</Th><Th>Joined</Th>
                {isAdmin && <Th className="text-right">Actions</Th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 && (
                <tr><td colSpan={isAdmin ? 7 : 6} className="px-4 py-6 text-center text-slate-500">No staff found.</td></tr>
              )}
              {filtered.map(s => (
                <tr key={s.id} className="hover:bg-slate-50">
                  <Td><div className="font-medium text-slate-900">{s.name}</div></Td>
                  <Td>{s.role || '—'}</Td>
                  <Td>{s.branch || '—'}</Td>
                  <Td>{s.phone || '—'}</Td>
                  <Td>{s.email || '—'}</Td>
                  <Td>{s.joinedAt || '—'}</Td>
                  {isAdmin && (
                    <Td className="text-right whitespace-nowrap">
                      <button onClick={() => startEdit(s)} className="text-brand-600 hover:underline mr-3">Edit</button>
                      <button onClick={() => remove(s.id)} className="text-red-600 hover:underline">Delete</button>
                    </Td>
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

const Field = ({ label, children }) => (
  <label className="block">
    <span className="block text-sm font-medium text-slate-700 mb-1">{label}</span>
    {children}
  </label>
);
const Th = ({ children, className = '' }) => <th className={`px-4 py-3 text-left font-medium ${className}`}>{children}</th>;
const Td = ({ children, className = '' }) => <td className={`px-4 py-3 ${className}`}>{children}</td>;
