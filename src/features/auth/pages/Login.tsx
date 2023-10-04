import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginRequest } from "../types";
import useAuth from "../hooks/useAuth";
import { storage } from "../../../utils/storage";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { error, isLogin, fetchLogin } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();

  const onSubmit: SubmitHandler<LoginRequest> = async (data: LoginRequest) => {
    const response = await fetchLogin(data);

    if (response?.status === 200) {
      storage.setToken(response.data.data.accessToken);
    }
  };

  useEffect(() => {
    if (isLogin) {
      navigate("/board/list");
    }
  }, [isLogin]);

  useEffect(() => {
    if (error) {
      alert(error.message.message);
    }
  }, [error]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          type="text"
          placeholder="email"
          {...register("email", {
            required: true,
            pattern: {
              value:
                /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
              message: "이메일 형식이 맞지않습니다.",
            },
          })}
        />
        <p>{errors.email?.message}</p>
      </div>
      <div>
        <input
          type="password"
          placeholder="password"
          {...register("password", {
            required: true,
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,128}$/,
              message:
                "패스워드 대소문자, 숫자, 특수문자 중 5가지 이상 조합하여 8~128자리 이내를 입력하세요",
            },
          })}
        />
        <p>{errors.password?.message}</p>
      </div>
      <button type="submit">로그인</button>
    </form>
  );
};

export default Login;
