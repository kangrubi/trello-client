import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { storage } from "../../../utils/storage";

type LoginForm = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const { error, fetchLogin } = useAuth();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginForm> = async (data: LoginForm) => {
    const response = await fetchLogin(data);

    if (response?.status === 200) {
      navigate("/home");

      storage.setToken(response.data.data.accessToken);
    }
  };

  useEffect(() => {
    if (error) alert(error.message.message);
  }, [error]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">이메일</label>
      <input
        type="text"
        {...register("email", {
          pattern: {
            value:
              /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
            message: "이메일 형식이 맞지않습니다.",
          },
        })}
      />
      <p>{errors.email?.message}</p>
      <label htmlFor="password">패스워드</label>
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
      <button type="submit">로그인</button>
    </form>
  );
};

export default Login;
