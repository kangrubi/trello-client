import { create } from "zustand";

type UserProfile = {
  id: number;
  username: string;
  email: string;
  profileImage?: string;
  createdAt: string;
};

interface UserState {
  profile: UserProfile;
  setProfile: (profile: UserProfile) => void;
}

export const useUserStore = create<UserState>()((set) => ({
  profile: { id: -1, username: "", email: "", profileImage: "", createdAt: "" },
  setProfile: (profile) => set(() => ({ profile: profile })),
}));
