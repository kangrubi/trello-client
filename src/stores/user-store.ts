import { create } from "zustand";

type TProfile = {
  username: string;
  email: string;
  profileImage?: string;
};

interface UserStore {
  profile: TProfile | undefined;
  setProfile: (profile: TProfile) => void;
}

const useUserStore = create<UserStore>((set) => ({
  profile: undefined,
  setProfile: (profile) => set(() => ({ profile: profile })),
}));

export default useUserStore;
