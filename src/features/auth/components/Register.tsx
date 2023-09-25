import { SubmitHandler, useForm } from "react-hook-form";
import { postRegister } from "../api/register";
import { useNavigate } from "react-router-dom";

type RegisterRequest = {
  username: string;
  email: string;
  password: string;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RegisterRequest> = async (
    data: RegisterRequest
  ) => {
    await postRegister(data);

    navigate("/home");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">이름</label>
      <input
        type="text"
        placeholder="name"
        {...register("username", {
          required: true,
          pattern: {
            value: /^[a-zA-Z0-9_-]+$/,
            message:
              "사용자 아이디에는 문자, 숫자, 하이픈, 밑줄만 포함할 수 있습니다",
          },
        })}
      />
      <p>{errors.username?.message}</p>
      <label htmlFor="email">이메일</label>
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
      <button type="submit">회원가입</button>
    </form>
  );
};

export default Register;
