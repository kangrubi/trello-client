import { UserResponse } from "..";
import { storage } from "../../../utils/storage";
import {
  RegisterRequestDTO,
  registerWithEmailAndPassword,
} from "../api/register";

export const useAuth = () => {
  const handleUserResponse = (request: UserResponse) => {
    const { user, access_token } = request;
    storage.setToken(access_token);
    return user;
  };

  const register = async (request: RegisterRequestDTO) => {
    const response = await registerWithEmailAndPassword(request);
    const user = await handleUserResponse(response);
    return user;
  };

  return { register };
};
