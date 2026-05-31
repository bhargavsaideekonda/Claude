# Palnadu MACS Soldiers — Web App

A fast, reliable **web app** version of the Palnadu MACS Soldiers staff app,
built with Vite + React + TypeScript. It runs in any browser, installs on
phones as a PWA, and has none of the native-build headaches of the React
Native version.

> Same fantasy design (pink + blue + orange aurora), same screens, English +
> Telugu — but it loads in seconds and reloads instantly while developing.

## Run it (Codespaces or any computer)

```bash
cd web
npm install
npm run dev
```

Then open the forwarded URL (Codespaces shows a popup for **port 5173**, or
check the **Ports** tab). On your own machine it's http://localhost:5173.

## Demo login

1. Splash screen → **Continue**
2. Enter any 10-digit Indian mobile number (starts with 6/7/8/9) → **Send OTP**
3. Enter **any 6 digits** → **Verify & enter**
4. You're in! Explore the dashboard, tabs, and the **Profile → Language**
   toggle (English ↔ తెలుగు).

## What's inside

- ⚡ **Vite + React 18 + TypeScript**
- 🧭 **react-router-dom** for navigation (auth flow + 5-tab shell)
- 🗃 **Zustand** for auth + settings state
- 🌐 **i18next** with English + Telugu (choice persists in the browser)
- 🎨 Hand-built **fantasy theme** in `src/theme/theme.css` — gradient
  backgrounds, glass cards, glowing buttons, an animated soldier badge, and a
  floating glass tab bar
- 🧩 Inline **SVG icon set** (`src/components/Icon.tsx`) — zero icon deps

## Structure

```
web/
├── index.html              ← loads Poppins + Noto Sans Telugu fonts
├── package.json
├── vite.config.ts          ← @ alias -> src
├── public/
│   ├── manifest.webmanifest ← PWA (Add to Home Screen)
│   └── favicon.svg
└── src/
    ├── main.tsx            ← entry (BrowserRouter)
    ├── App.tsx             ← routes + auth guard
    ├── theme/theme.css     ← the entire fantasy design system
    ├── i18n/               ← index.ts + en.json + te.json
    ├── store/              ← authStore.ts, settingsStore.ts
    ├── components/         ← GradientBackground, GlassCard, GlowButton,
    │                          SoldierBadge, StatCard, ScreenHeader,
    │                          ComingSoon, Icon
    └── screens/
        ├── auth/           ← Splash, Login, Otp
        ├── AppShell.tsx    ← bottom tab bar + <Outlet/>
        ├── DashboardScreen.tsx
        ├── MembersScreen.tsx
        ├── CollectionsScreen.tsx
        ├── LoansScreen.tsx
        ├── MoreScreen.tsx
        ├── ReportsScreen.tsx
        ├── AnnouncementsScreen.tsx
        ├── AttendanceScreen.tsx
        └── ProfileScreen.tsx
```

## Install on a phone (PWA)

1. Deploy (or run `npm run dev -- --host` and open the LAN URL on your phone).
2. In the phone browser menu choose **"Add to Home Screen"**.
3. It launches full-screen like a native app — perfect for the society's staff.

## Add the real society logo

The soldier badge currently shows a "P · MACS" monogram. To use the real logo:

1. Save the logo as `web/public/logo.png`.
2. In `src/components/SoldierBadge.tsx`, replace the monogram block with
   `<img src="/logo.png" alt="Palnadu MACS" />`.

## Roadmap

- [ ] Real backend (Firebase / Supabase) for auth + data
- [ ] Members CRUD + passbook
- [ ] Daily collections form
- [ ] Loan workflow (apply → approve → EMI)
- [ ] Reports with charts
- [ ] Announcements feed + notifications
- [ ] Attendance check-in
- [ ] Role-based access (Admin / Captain / Field Soldier)
- [ ] Wrap as Android APK later (Capacitor) once the design is finalised
```

**Motto:** *Serving members. Strengthening community.*
