import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

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
    <div className="flex items-center justify-center h-screen">
      <form
        className="grid w-full max-w-sm items-center gap-1.5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-2">
          <Label htmlFor="username" className="block mb-1">
            user name
          </Label>
          <Input
            id="username"
            placeholder="Name"
            {...register("username", {
              required: true,
              pattern: {
                value: /^[a-zA-Z0-9_-]+$/,
                message:
                  "사용자 아이디에는 문자, 숫자, 하이픈, 밑줄만 포함할 수 있습니다.",
              },
            })}
          />
          <p className="mt-1 text-sm text-red-600">
            {errors.username?.message}
          </p>
        </div>
        <div className="mb-2">
          <Label htmlFor="email" className="block mb-1">
            email
          </Label>
          <Input
            id="email"
            placeholder="Email"
            {...register("email", {
              required: true,
              pattern: {
                value:
                  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                message: "이메일 형식이 맞지않습니다.",
              },
            })}
          />
          <p className="mt-1 text-sm text-red-600">{errors.email?.message}</p>
        </div>
        <div className="mb-6">
          <Label htmlFor="password" className="block mb-1">
            password
          </Label>
          <Input
            id="password"
            placeholder="Password"
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
          <p className="mt-1 text-sm text-red-600">
            {errors.password?.message}
          </p>
        </div>
        <Button type="submit">SignUp</Button>
      </form>
    </div>
  );
};

export default RegisterForm;
