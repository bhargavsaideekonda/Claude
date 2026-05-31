import { create } from 'zustand';

export interface SoldierProfile {
  id: string;
  name: string;
  phone: string;
  rank: string;
  branch?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  pendingPhone: string | null;
  user: SoldierProfile | null;
  requestOtp: (phone: string) => void;
  verifyOtp: (otp: string) => boolean;
  logout: () => void;
}

/**
 * Mock auth store. Swap requestOtp / verifyOtp with a real backend
 * (e.g. Firebase Phone Auth) when ready. For now any 6-digit code works.
 */
export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  pendingPhone: null,
  user: null,

  requestOtp(phone) {
    set({ pendingPhone: phone });
  },

  verifyOtp(otp) {
    if (!/^\d{6}$/.test(otp)) return false;
    const phone = get().pendingPhone ?? '';
    set({
      isAuthenticated: true,
      pendingPhone: null,
      user: {
        id: 'soldier-001',
        name: 'Bhargav Sai',
        phone,
        rank: 'Field Soldier',
        branch: 'HQ — Palnadu',
      },
    });
    return true;
  },

  logout() {
    set({ isAuthenticated: false, user: null, pendingPhone: null });
  },
}));
