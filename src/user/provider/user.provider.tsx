import { createContext, useState } from "react";
import { IGetUserProfileResponse } from "../types/user.type";
import { UserService } from "../service/user.service";
import apiService from "../../app/lib/api";

interface IUserContext {
  user: IGetUserProfileResponse | undefined;
  getUserProfile: () => Promise<IGetUserProfileResponse>;
}

interface IUserDIContainer {
  userService: UserService;
}

export const UserContext = createContext<IUserContext>({} as IUserContext);

const UserDIContainer = (
  { userService }: IUserDIContainer = {
    userService: new UserService(apiService),
  }
) => {
  const UserProvider = ({ children }: { children: React.ReactNode }) => {
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

  return UserProvider;
};

const AuthProvider = UserDIContainer();

export default AuthProvider;
