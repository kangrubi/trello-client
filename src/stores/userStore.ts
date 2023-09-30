import { create } from "zustand";

type UserProfile = {
  username: string;
  email: string;
  profileImage?: string;
};

interface UserStore {
  profile: UserProfile | undefined;
  setProfile: (profile: UserProfile) => void;
}

export const useUserStore = create<UserStore>()((set) => ({
  profile: undefined,
  setProfile: (profile) => set(() => ({ profile: profile })),
}));
