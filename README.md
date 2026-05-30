# Palnadu MACS Soldiers — Staff Portal 🎖️

A modern, responsive staff management web app for Palnadu MACS (Mutually Aided Cooperative Society).

## ✨ Features

- 🔐 **Auth** — Admin & Staff roles with persisted session
- 📊 **Dashboard** — Live stats (total staff, present today, on leave, pending leave requests) + quick actions
- 👥 **Staff Directory** — Add / edit / delete / search staff members (admin), view (staff)
- 🕐 **Attendance** — Mark Present / Absent / Leave per day, per staff (admin); staff can view their own
- 🏖️ **Leave Management** — Staff apply for leave; admin approves or rejects
- 📢 **Announcements** — Admin posts notices, all staff see them

## 🧰 Tech Stack

- **React 18** + **Vite 5**
- **React Router 6**
- **Tailwind CSS 3**
- **localStorage** as the data layer (no backend needed) — easy to swap for an API later

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
# → open the URL printed in the terminal (default: http://localhost:5173)

# 3. Build for production
npm run build
npm run preview
```

## 🔑 Demo Accounts

| Role  | Username | Password   |
|-------|----------|------------|
| Admin | `admin`  | `admin123` |
| Staff | `staff`  | `staff123` |

The login screen has buttons that auto-fill these credentials.

## 📁 Project Structure

```
.
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx                    # entry point
    ├── App.jsx                     # routes
    ├── index.css                   # tailwind + base styles
    ├── lib/
    │   └── storage.js              # localStorage-backed "db"
    ├── context/
    │   └── AuthContext.jsx         # login/logout/session
    ├── components/
    │   ├── Layout.jsx              # sidebar + responsive shell
    │   └── ProtectedRoute.jsx      # auth guard
    └── pages/
        ├── Login.jsx
        ├── Dashboard.jsx
        ├── Staff.jsx
        ├── Attendance.jsx
        ├── Leave.jsx
        └── Announcements.jsx
```

## 🔮 Roadmap (next steps)

- Real backend (Node/Express + SQLite or Postgres)
- Per-staff login accounts (auto-create when a staff member is added)
- Salary / payroll module
- Photo uploads & document storage
- Telugu language support
- Export reports (CSV/PDF)
- Push notifications for announcements

## 📝 Notes

- All data is stored in your browser's `localStorage` under the key `pms_app_v1`. Clearing site data resets everything to seed values.
- The session is stored under `pms_session_v1`.
