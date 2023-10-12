import { create } from "zustand";

type TProfile = {
  username: string;
  email: string;
  profileImage?: string;
};

interface UserStore {
  userProfile: TProfile | undefined;
  setProfile: (userProfile: TProfile) => void;
}

const useUserStore = create<UserStore>((set) => ({
  userProfile: undefined,
  setProfile: (userProfile) => set(() => ({ userProfile: userProfile })),
}));

export default useUserStore;
