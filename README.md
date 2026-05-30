# Palnadu MACS Soldiers

A staff mobile app for **Palnadu Mutually Aided Co-operative Society Ltd.** —
where every employee is a **soldier** serving the society's members.

> Built with love by [Bhargav Sai](https://github.com/bhargavsaideekonda) for his dad,
> a retired soldier and the founder of Palnadu MACS. 🫡

## Features (v0 mission build)

- 🔐 **Auth** — phone + OTP flow (mocked locally; ready to wire to Firebase Auth)
- 🏠 **Dashboard** — greeting, 4 stat tiles, quick actions, recent activity
- 👥 **Members** — placeholder screen, themed (real CRUD coming next)
- 💰 **Collections** — daily deposit recording (placeholder)
- 💼 **Loans** — application + EMI tracking (placeholder)
- 📊 **Reports**, 📢 **Announcements**, ✅ **Attendance** — placeholders
- 👤 **Profile** — working **language toggle (English ↔ తెలుగు)** + logout
- 🎨 **Fantasy theme** — pink/blue/orange gradient backgrounds, animated soldier
  badge, glass-morphism cards, glowing CTA buttons, floating glass tab bar

## Tech stack

| Layer | Tool |
|---|---|
| Mobile framework | **Expo SDK 51** (React Native + TypeScript) |
| Navigation | React Navigation v6 (native-stack + bottom-tabs) |
| UI kit | React Native Paper (MD3 dark theme) |
| Animations | react-native-reanimated v3 |
| Visuals | expo-linear-gradient, expo-blur |
| State | Zustand |
| i18n | i18next + react-i18next (English + Telugu) |
| Persistence | AsyncStorage |
| Fonts | Poppins (via @expo-google-fonts/poppins) |

## Project structure

```
app/
├── App.tsx                     ← entry point, theme + nav providers
├── app.json                    ← Expo config (name, icon, splash, package id)
├── package.json
├── babel.config.js             ← reanimated + module-resolver (@/* alias)
├── tsconfig.json
├── assets/                     ← logo.png, icon.png, splash.png go here
└── src/
    ├── theme/                  ← colors, gradients, typography, Paper theme
    ├── i18n/                   ← en.json, te.json, language persistence
    ├── store/                  ← Zustand stores (auth, settings)
    ├── types/                  ← Domain types (Member, Loan, Collection, …)
    ├── components/             ← GradientBackground, GlassCard, GlowButton,
    │                             SoldierBadge, StatCard, ScreenHeader, ComingSoon
    ├── navigation/             ← RootNavigator, AuthStack, AppTabs, MoreStack
    └── screens/
        ├── auth/               ← Splash, Login, Otp
        ├── DashboardScreen.tsx
        ├── MembersScreen.tsx
        ├── CollectionsScreen.tsx
        ├── LoansScreen.tsx
        ├── ReportsScreen.tsx
        ├── AnnouncementsScreen.tsx
        ├── AttendanceScreen.tsx
        ├── MoreHomeScreen.tsx
        └── ProfileScreen.tsx
```

## Run it on your machine

You'll need **Node.js 18+** and either an **Android device** with the
[Expo Go](https://expo.dev/client) app, or an Android/iOS emulator.

```bash
cd app
npm install
npm start          # then scan the QR with Expo Go
```

Other useful commands:

```bash
npm run android    # opens on a connected Android device/emulator
npm run ios        # opens on iOS simulator (macOS only)
npm run web        # opens in the browser (rough preview only)
```

### Adding the society logo

The animated **Soldier Badge** automatically loads `app/assets/logo.png`.
Until you add it, a stylised "P · MACS" monogram is shown as a fallback.

1. Save the Palnadu Co-operative Society logo as `app/assets/logo.png`
   (recommended 512×512 square).
2. Reload the app — the badge now shows your real logo.

See `app/assets/README.md` for the full list of recommended assets.

### Building an installable APK

```bash
npm install -g eas-cli
cd app
eas login
eas build:configure
npm run build:android   # uses the "preview" profile from eas.json
```

EAS will produce a downloadable `.apk` URL you can share with your dad's staff.

## Demo login (no backend yet)

- Enter any valid 10-digit Indian mobile number (starting 6/7/8/9).
- Enter any 6-digit OTP — the mock auth store accepts it and signs you in.

When you're ready to plug in real auth, replace the `requestOtp` /
`verifyOtp` implementations in `src/store/authStore.ts` with Firebase Phone
Auth or a custom backend.

## Roadmap

- [ ] Firebase Auth (real phone OTP)
- [ ] Firestore schema + data layer (members, collections, loans)
- [ ] Members CRUD screens
- [ ] Daily collections form + offline queue
- [ ] Loan workflow (apply → approve → disburse → EMI)
- [ ] Reports with charts
- [ ] Announcements feed + push notifications
- [ ] Geo-tagged attendance check-in
- [ ] Role-based access (Admin / Captain / Field Soldier)

---

**Motto:** *Serving members. Strengthening community.*
