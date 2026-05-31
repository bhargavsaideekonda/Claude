import { create } from 'zustand';
import { loadJSON, saveJSON, removeKey } from '@/lib/storage';

export type Role = 'admin' | 'soldier';

/** Full soldier record (includes PIN). Stored locally. */
export interface Soldier {
  id: string;
  name: string;
  phone: string;
  pin: string; // 4-digit
  rank: string;
  role: Role;
  branch?: string;
}

/** Public profile (no PIN) exposed to the UI. */
export type SoldierProfile = Omit<Soldier, 'pin'>;

const SOLDIERS_KEY = 'palnadu.soldiers';
const SESSION_KEY = 'palnadu.session';
const SEED_VERSION_KEY = 'palnadu.seedVersion';
// Bump this whenever SEED_SOLDIERS changes so existing devices refresh.
const SEED_VERSION = 2;

/**
 * Seed accounts. The three society admins are created on launch so they can
 * log in immediately. Admins can add/remove field soldiers from the app later.
 *
 * NOTE: PINs live in code only while this repo is public for the free demo
 * link. Before real launch we move accounts to a private database (Supabase)
 * so credentials are never exposed.
 */
const SEED_SOLDIERS: Soldier[] = [
  {
    id: 'admin-bhargav',
    name: 'Bhargav Sai',
    phone: '9121598185',
    pin: '1431',
    rank: 'Admin',
    role: 'admin',
    branch: 'HQ — Palnadu',
  },
  {
    id: 'admin-hari',
    name: 'Hari Sankar',
    phone: '9912042021',
    pin: '1314',
    rank: 'Founder',
    role: 'admin',
    branch: 'HQ — Palnadu',
  },
  {
    id: 'admin-uma',
    name: 'Uma Deekonda',
    phone: '9951199531',
    pin: '1413',
    rank: 'Chairperson',
    role: 'admin',
    branch: 'HQ — Palnadu',
  },
];

function loadSoldiers(): Soldier[] {
  const existing = loadJSON<Soldier[]>(SOLDIERS_KEY, []);
  const storedVersion = loadJSON<number>(SEED_VERSION_KEY, 0);

  // Fresh device, or the seed list changed: refresh seed accounts while
  // preserving any soldiers an admin added inside the app.
  if (existing.length === 0 || storedVersion < SEED_VERSION) {
    const seedIds = new Set(SEED_SOLDIERS.map((s) => s.id));
    const custom = existing.filter((s) => !seedIds.has(s.id));
    const merged = [...SEED_SOLDIERS, ...custom];
    saveJSON(SOLDIERS_KEY, merged);
    saveJSON(SEED_VERSION_KEY, SEED_VERSION);
    return merged;
  }
  return existing;
}

function toProfile(s: Soldier): SoldierProfile {
  const { pin: _pin, ...rest } = s;
  return rest;
}

function restoreSession(soldiers: Soldier[]): SoldierProfile | null {
  const id = loadJSON<string | null>(SESSION_KEY, null);
  if (!id) return null;
  const found = soldiers.find((s) => s.id === id);
  return found ? toProfile(found) : null;
}

interface AuthState {
  soldiers: Soldier[];
  user: SoldierProfile | null;
  isAuthenticated: boolean;
  pendingPhone: string | null;

  /** Step 1: remember the phone the user typed, returns whether it's registered. */
  setPendingPhone: (phone: string) => boolean;
  /** Step 2: validate PIN for the pending phone. */
  login: (pin: string) => boolean;
  logout: () => void;
}

const initialSoldiers = loadSoldiers();
const restored = restoreSession(initialSoldiers);

export const useAuthStore = create<AuthState>((set, get) => ({
  soldiers: initialSoldiers,
  user: restored,
  isAuthenticated: !!restored,
  pendingPhone: null,

  setPendingPhone(phone) {
    set({ pendingPhone: phone });
    return get().soldiers.some((s) => s.phone === phone);
  },

  login(pin) {
    const { pendingPhone, soldiers } = get();
    const soldier = soldiers.find((s) => s.phone === pendingPhone);
    if (!soldier || soldier.pin !== pin) return false;
    saveJSON(SESSION_KEY, soldier.id);
    set({ isAuthenticated: true, user: toProfile(soldier), pendingPhone: null });
    return true;
  },

  logout() {
    removeKey(SESSION_KEY);
    set({ isAuthenticated: false, user: null, pendingPhone: null });
  },
}));
