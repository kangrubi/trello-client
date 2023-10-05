import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";

interface ForgotPasswordRequest {
  email: string;
}

const ForgotPassword = () => {
  const { error, fetchForgotPassword } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordRequest>();

  const onSubmit: SubmitHandler<ForgotPasswordRequest> = async (
    data: ForgotPasswordRequest
  ) => {
    const response = await fetchForgotPassword(data.email);

    if (response?.status === 200) {
      alert("인증한 이메일의 메일함을 확인해주세요");
    }
  };

  useEffect(() => {
    if (error) {
      alert(error.message.message);
    }
  }, [error]);

  return (
    <>
      <h2>비밀번호 찾기</h2>
      <p>이메일 인증</p>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <button type="submit">비밀번호변경</button>
      </form>
    </>
  );
};

export default ForgotPassword;
