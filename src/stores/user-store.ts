import { create } from "zustand";

type TProfile = {
  username: string;
  email: string;
  profileImage?: string;
};

interface UserStore {
  userProfile: TProfile | undefined;
  setUserProfile: (userProfile: TProfile) => void;
}

const useUserStore = create<UserStore>((set) => ({
  userProfile: undefined,
  setUserProfile: (userProfile) => set(() => ({ userProfile: userProfile })),
}));

export default useUserStore;
