import { create } from 'zustand';

export interface SoldierProfile {
  id: string;
  name: string;
  phone: string;
  rank: string; // e.g. "Field Soldier", "Cashier", "Captain"
  branch?: string;
  avatarUrl?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  pendingPhone: string | null;
  user: SoldierProfile | null;
  /** Step 1 — request OTP for the given phone (mocked locally). */
  requestOtp: (phone: string) => Promise<void>;
  /** Step 2 — verify OTP and create the session. Mock: any 6-digit code works. */
  verifyOtp: (otp: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  pendingPhone: null,
  user: null,

  async requestOtp(phone) {
    // TODO: wire to Firebase Phone Auth or your backend.
    set({ pendingPhone: phone });
  },

  async verifyOtp(otp) {
    if (!/^\d{6}$/.test(otp)) return false;
    const phone = get().pendingPhone ?? '';
    set({
      isAuthenticated: true,
      user: {
        id: 'soldier-001',
        name: 'Bhargav Sai',
        phone,
        rank: 'Field Soldier',
        branch: 'HQ — Palnadu',
      },
      pendingPhone: null,
    });
    return true;
  },

  logout() {
    set({ isAuthenticated: false, user: null, pendingPhone: null });
  },
}));
