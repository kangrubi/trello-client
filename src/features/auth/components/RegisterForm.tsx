import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormData {
  username: string;
  email: string;
  password: string;
}

const RegisterForm = () => {
  const { signUp, error } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    signUp(data);
  };

  useEffect(() => {
    if (error) alert(error.errorCodes.message.join(" "));
  }, [error]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>user name</label>
        <input
          {...register("username", {
            required: true,
            pattern: {
              value: /^[a-zA-Z0-9_-]+$/,
              message:
                "사용자 아이디에는 문자, 숫자, 하이픈, 밑줄만 포함할 수 있습니다.",
            },
          })}
        />
        <p>{errors.username?.message}</p>
      </div>
      <div>
        <label>email</label>
        <input
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
        <label>password</label>
        <input
          type="password"
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
      <button type="submit">회원가입</button>
    </form>
  );
};

export default RegisterForm;
