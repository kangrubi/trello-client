import { getProfile } from "@/features/user/api/profile";
import { useUserStore } from "@/stores/userStore";

export const useUser = () => {
  const profile = useUserStore((state) => state.profile);
  const setProfile = useUserStore((state) => state.setProfile);

  const userProfile = async () => {
    try {
      const response = await getProfile();

      setProfile(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return { profile, userProfile };
};
