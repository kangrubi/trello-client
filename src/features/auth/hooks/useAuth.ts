import { useEffect, useState } from "react";
import { UserResponse } from "..";
import { storage } from "../../../utils/storage";
import { RegisterRequestDTO, postRegister } from "../api/register";
import { AxiosError } from "axios";
import { LoginRequestDTO, postLogin } from "../api/login";

type Error = {
  statusCode: number;
  timestamp: string;
  path: string;
  error: string;
  message: string;
};

export const useAuth = () => {
  const [error, setError] = useState<Error>();
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const handleUserResponse = (request: UserResponse) => {
    const { user, accessToken, refreshToken } = request;
    storage.setToken({ accessToken, refreshToken });
    return user;
  };

  const signUp = async (request: RegisterRequestDTO) => {
    try {
      const response = await postRegister(request);
      return response;
    } catch (error: unknown) {
      const _error = error as AxiosError<Error>;
      setError(_error.response?.data);
    }
  };

  const login = async (request: LoginRequestDTO) => {
    try {
      const response = await postLogin(request);
      handleUserResponse(response.data);
    } catch (error: unknown) {
      const _error = error as AxiosError<Error>;
      setError(_error.response?.data);
    }
  };

  useEffect(() => {
    const token = storage.getToken();

    if (token.accessToken) {
      setIsLogin(true);

      // axios에서 header에 bearer토큰을 넣을 수 있도록 인터셉터를 작성해줘야 함
    }
  }, []);

  return { isLogin, error, signUp, login };
};
