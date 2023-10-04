import { create } from "zustand";

interface AuthState {
  isLogin: boolean;
  signIn: () => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLogin: false,
  signIn: () => set(() => ({ isLogin: true })),
  signOut: () => set(() => ({ isLogin: false })),
}));
