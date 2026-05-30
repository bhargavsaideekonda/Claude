import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const navItems = [
  { to: '/',              label: 'Dashboard',     icon: 'M3 12l9-9 9 9M5 10v10h14V10' },
  { to: '/staff',         label: 'Staff',         icon: 'M16 11a4 4 0 10-8 0 4 4 0 008 0zM2 20a8 8 0 0116 0' },
  { to: '/attendance',    label: 'Attendance',    icon: 'M9 12l2 2 4-4M5 7h14v12H5z' },
  { to: '/leave',         label: 'Leave',         icon: 'M8 7V3m8 4V3M4 11h16M5 7h14v14H5z' },
  { to: '/announcements', label: 'Announcements', icon: 'M11 5L6 9H3v6h3l5 4V5zM15 9a4 4 0 010 6' }
];

export default function Layout() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/login', { replace: true }); };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
      isActive ? 'bg-brand-600 text-white' : 'text-slate-700 hover:bg-slate-100'
    }`;

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile top bar */}
      <header className="md:hidden flex items-center justify-between bg-brand-700 text-white px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">🎖️</span>
          <span className="font-semibold">Palnadu MACS</span>
        </div>
        <button onClick={() => setOpen(!open)} className="p-2 rounded hover:bg-brand-600" aria-label="menu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      {/* Sidebar */}
      <aside className={`${open ? 'block' : 'hidden'} md:block md:w-64 bg-white border-r border-slate-200 md:min-h-screen`}>
        <div className="hidden md:flex items-center gap-2 px-5 py-5 border-b border-slate-200">
          <span className="text-2xl">🎖️</span>
          <div>
            <div className="font-bold text-slate-900 leading-tight">Palnadu MACS</div>
            <div className="text-xs text-slate-500">Soldiers Portal</div>
          </div>
        </div>
        <nav className="p-3 space-y-1">
          {navItems.map(item => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} className={linkClass} onClick={() => setOpen(false)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d={item.icon} />
              </svg>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-slate-200 mt-2">
          <div className="px-3 py-2 text-xs text-slate-500">
            Signed in as
            <div className="text-sm font-semibold text-slate-800">{user?.name}</div>
            <span className={`badge mt-1 ${isAdmin ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}`}>
              {isAdmin ? 'Admin' : 'Staff'}
            </span>
          </div>
          <button onClick={handleLogout} className="btn-ghost w-full mt-2">Logout</button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}
