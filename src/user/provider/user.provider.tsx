import { createContext, useState } from "react";
import { IGetUserProfileResponse } from "../types/user.type";
import { UserService } from "../service/user.service";
import apiService from "../../app/lib/api";

interface IUserContext {
  user: IGetUserProfileResponse | undefined;
  getUserProfile: () => Promise<IGetUserProfileResponse>;
}

export const UserContext = createContext<IUserContext>({} as IUserContext);

const UserProvider = ({
  userService,
  children,
}: {
  userService: UserService;
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<IGetUserProfileResponse>();

  const getUserProfile = async () => {
    try {
      const response = await userService.getUserProfile();

      setUser(response);

      return response;
    } catch (error) {
      console.log(error);

      throw error;
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        getUserProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
