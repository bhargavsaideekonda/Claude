import { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../lib/storage';

const AuthContext = createContext(null);
const SESSION_KEY = 'pms_session_v1';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch { /* ignore */ }
    setReady(true);
  }, []);

  const login = (username, password) => {
    const found = db.findUser(username.trim(), password);
    if (!found) return { ok: false, error: 'Invalid username or password' };
    const safe = { id: found.id, username: found.username, role: found.role, name: found.name, staffId: found.staffId || null };
    setUser(safe);
    localStorage.setItem(SESSION_KEY, JSON.stringify(safe));
    return { ok: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, ready, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
