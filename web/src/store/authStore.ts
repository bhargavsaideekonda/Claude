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

/**
 * Seed accounts created on first launch so you and your dad can log in
 * immediately. The admin can add/remove soldiers later from the app.
 */
const SEED_SOLDIERS: Soldier[] = [
  {
    id: 'sol-admin',
    name: 'Bhargav Sai',
    phone: '9876543210',
    pin: '1234',
    rank: 'Captain (Admin)',
    role: 'admin',
    branch: 'HQ — Palnadu',
  },
  {
    id: 'sol-field-1',
    name: 'Field Soldier',
    phone: '9123456780',
    pin: '1111',
    rank: 'Field Soldier',
    role: 'soldier',
    branch: 'Palnadu',
  },
];

function loadSoldiers(): Soldier[] {
  const existing = loadJSON<Soldier[]>(SOLDIERS_KEY, []);
  if (existing.length === 0) {
    saveJSON(SOLDIERS_KEY, SEED_SOLDIERS);
    return SEED_SOLDIERS;
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
