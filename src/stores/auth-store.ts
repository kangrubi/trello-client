import { create } from "zustand";

interface AuthStore {
  isLogin: boolean;
  signIn: () => void;
  signOut: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  isLogin: false,
  signIn: () => set(() => ({ isLogin: true })),
  signOut: () => set(() => ({ isLogin: false })),
}));

export default useAuthStore;
