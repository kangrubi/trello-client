import { create } from "zustand";

type TProfile = {
  username: string;
  email: string;
  profileImage?: string;
};

interface UserState {
  profile: TProfile | undefined;
  setProfile: (profile: TProfile) => void;
}

export const useUserStore = create<UserState>((set) => ({
  profile: undefined,
  setProfile: (profile) => set(() => ({ profile: profile })),
}));
