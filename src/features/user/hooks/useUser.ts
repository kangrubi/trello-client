import { useState } from "react";
import { getProfile } from "../api/profile";
import { useUserStore } from "../stores/userStore";
import { CustomError } from "../../auth/types";
import { AxiosError } from "axios";

export const useUser = () => {
  const [error, setError] = useState<CustomError>();

  const profile = useUserStore((state) => state.profile);
  const setProfile = useUserStore((state) => state.setProfile);

  const fetchProfile = async () => {
    try {
      const response = await getProfile();

      setProfile(response.data.data);
    } catch (error: unknown) {
      const _error = error as AxiosError<CustomError>;
      if (!_error.response) return;
      setError(_error.response.data);
      throw error;
    }
  };

  return { error, profile, fetchProfile };
};
