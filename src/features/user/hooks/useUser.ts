import { useEffect, useState } from "react";
import { getProfile } from "../api/profile";
import { AxiosError } from "axios";
import { CustomError } from "../../auth/types";
import { useUserStore } from "../../../stores/userStore";

const useUser = () => {
  const [error, setError] = useState<CustomError>();
  const profile = useUserStore((state) => state.profile);
  const setProfile = useUserStore((state) => state.setProfile);

  const fetchGetProfile = async () => {
    try {
      const response = await getProfile();

      if (response.status === 200) {
        setProfile(response.data.data);
      }
    } catch (error: unknown) {
      const _error = error as AxiosError<CustomError>;

      if (!_error.response) return;

      setError(_error.response.data);
    }
  };

  useEffect(() => {
    console.log(profile);
  }, [profile]);

  return { error, profile, fetchGetProfile };
};

export default useUser;
