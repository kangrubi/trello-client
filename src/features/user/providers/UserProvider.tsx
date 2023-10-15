import React, { createContext, useState } from "react";
import { ProfileResponse, UserProfile } from "../types";
import { IUserService } from "../service/user-service";
import useUserStore from "@/stores/user-store";
import { AxiosError } from "axios";
import { CustomError, PublicApiResponse } from "@/types";

interface UserContextProps {
  profile(): Promise<PublicApiResponse<ProfileResponse> | undefined>;
  userProfile: UserProfile | undefined;
  error: CustomError | undefined;
}

export const UserContext = createContext<UserContextProps | undefined>(
  undefined
);

interface UserProviderProps {
  children: React.ReactNode;
  userService: IUserService;
}

export const UserProvider = ({ children, userService }: UserProviderProps) => {
  const [error, setError] = useState<CustomError>();
  const userProfile = useUserStore((state) => state.userProfile);
  const setUserProfile = useUserStore((state) => state.setUserProfile);

  const profile = async () => {
    try {
      const response = await userService.profile();
      setUserProfile(response.data);

      return response;
    } catch (error: unknown) {
      const _error = error as AxiosError<CustomError>;
      if (!_error.response) return;
      setError(_error.response.data);
      throw error;
    }
  };

  return (
    <UserContext.Provider value={{ profile, userProfile, error }}>
      {children}
    </UserContext.Provider>
  );
};
