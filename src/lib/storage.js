// Tiny localStorage-backed "database" for the Palnadu MACS Soldiers app.
// Data is namespaced under a single root key so it can be reset easily.

const ROOT_KEY = 'pms_app_v1';

const seedData = () => ({
  users: [
    { id: 'u-admin', username: 'admin', password: 'admin123', role: 'admin', name: 'Administrator' },
    { id: 'u-staff', username: 'staff',  password: 'staff123', role: 'staff', name: 'Demo Staff', staffId: 's-1' }
  ],
  staff: [
    { id: 's-1', name: 'Demo Staff',   role: 'Field Officer', phone: '9000000001', email: 'staff@palnadu.macs', branch: 'Narasaraopet', joinedAt: '2024-01-15' },
    { id: 's-2', name: 'Ravi Kumar',   role: 'Accountant',    phone: '9000000002', email: 'ravi@palnadu.macs',  branch: 'Sattenapalle', joinedAt: '2023-06-10' },
    { id: 's-3', name: 'Lakshmi Devi', role: 'Branch Manager',phone: '9000000003', email: 'lakshmi@palnadu.macs',branch: 'Narasaraopet', joinedAt: '2022-03-01' }
  ],
  attendance: [],          // { id, staffId, date: 'YYYY-MM-DD', status: 'present'|'absent'|'leave' }
  leaves: [],              // { id, staffId, fromDate, toDate, reason, status: 'pending'|'approved'|'rejected', createdAt }
  announcements: [
    { id: 'a-1', title: 'Welcome!', body: 'Welcome to the Palnadu MACS Soldiers staff portal.', createdAt: new Date().toISOString(), author: 'Administrator' }
  ]
});

const load = () => {
  try {
    const raw = localStorage.getItem(ROOT_KEY);
    if (!raw) {
      const data = seedData();
      localStorage.setItem(ROOT_KEY, JSON.stringify(data));
      return data;
    }
    return JSON.parse(raw);
  } catch {
    const data = seedData();
    localStorage.setItem(ROOT_KEY, JSON.stringify(data));
    return data;
  }
};

const save = (data) => localStorage.setItem(ROOT_KEY, JSON.stringify(data));

const uid = (prefix = 'id') => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

export const db = {
  // Generic
  getAll: (collection) => load()[collection] || [],
  setAll: (collection, items) => {
    const data = load();
    data[collection] = items;
    save(data);
  },

  // Users
  findUser: (username, password) =>
    load().users.find(u => u.username === username && u.password === password) || null,

  // Staff
  addStaff: (staff) => {
    const data = load();
    const item = { ...staff, id: uid('s') };
    data.staff.push(item);
    save(data);
    return item;
  },
  updateStaff: (id, patch) => {
    const data = load();
    data.staff = data.staff.map(s => (s.id === id ? { ...s, ...patch } : s));
    save(data);
  },
  removeStaff: (id) => {
    const data = load();
    data.staff = data.staff.filter(s => s.id !== id);
    save(data);
  },

  // Attendance
  setAttendance: (staffId, date, status) => {
    const data = load();
    const idx = data.attendance.findIndex(a => a.staffId === staffId && a.date === date);
    if (idx >= 0) data.attendance[idx].status = status;
    else data.attendance.push({ id: uid('att'), staffId, date, status });
    save(data);
  },

  // Leaves
  addLeave: (leave) => {
    const data = load();
    const item = { ...leave, id: uid('lv'), status: 'pending', createdAt: new Date().toISOString() };
    data.leaves.push(item);
    save(data);
    return item;
  },
  updateLeaveStatus: (id, status) => {
    const data = load();
    data.leaves = data.leaves.map(l => (l.id === id ? { ...l, status } : l));
    save(data);
  },

  // Announcements
  addAnnouncement: (a) => {
    const data = load();
    const item = { ...a, id: uid('a'), createdAt: new Date().toISOString() };
    data.announcements.unshift(item);
    save(data);
    return item;
  },
  removeAnnouncement: (id) => {
    const data = load();
    data.announcements = data.announcements.filter(a => a.id !== id);
    save(data);
  }
};

export const todayStr = () => new Date().toISOString().slice(0, 10);
