import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { user, login, ready } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (ready && user) return <Navigate to="/" replace />;

  const submit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const res = login(username, password);
    setLoading(false);
    if (!res.ok) setError(res.error);
    else navigate('/', { replace: true });
  };

  const fill = (u, p) => { setUsername(u); setPassword(p); };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-700 via-brand-600 to-brand-900 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6 text-white">
          <div className="text-5xl mb-2">🎖️</div>
          <h1 className="text-2xl font-bold">Palnadu MACS Soldiers</h1>
          <p className="text-brand-100 text-sm">Staff Portal</p>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-slate-900 mb-1">Sign in</h2>
          <p className="text-sm text-slate-500 mb-4">Use your staff credentials to continue.</p>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
              <input className="input" value={username} onChange={e => setUsername(e.target.value)} autoFocus required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>

            {error && <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">{error}</div>}

            <button type="submit" className="btn-primary w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="mt-5 pt-4 border-t border-slate-200">
            <p className="text-xs text-slate-500 mb-2">Demo accounts (click to fill):</p>
            <div className="flex flex-col gap-2">
              <button type="button" onClick={() => fill('admin', 'admin123')} className="btn-ghost justify-between">
                <span><b>admin</b> / admin123</span>
                <span className="badge bg-amber-100 text-amber-800">Admin</span>
              </button>
              <button type="button" onClick={() => fill('staff', 'staff123')} className="btn-ghost justify-between">
                <span><b>staff</b> / staff123</span>
                <span className="badge bg-blue-100 text-blue-800">Staff</span>
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-brand-100 mt-4">© {new Date().getFullYear()} Palnadu MACS Soldiers</p>
      </div>
    </div>
  );
}
