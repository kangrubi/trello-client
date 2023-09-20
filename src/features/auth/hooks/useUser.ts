import { getProfile } from "@/features/user/api/profile";
import { useState } from "react";

interface Profile {
  id: number;
  username: string;
  email: string;
  profileImage?: string;
  createdAt: string;
}

export const useUser = () => {
  const [profile, setProfile] = useState<Profile>();

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
