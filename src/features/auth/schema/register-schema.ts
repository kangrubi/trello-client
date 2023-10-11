import { z } from "zod";

const registerSchema = z.object({
  username: z
    .string()
    .min(3, { message: "최소 3글자 이상 입력해주세요" })
    .regex(
      /^[a-zA-Z0-9]*$/,
      "영어 대소문자 또는 대소문자와 숫자를 입력해주세요"
    ),
  email: z.string().email({ message: "이메일 형식을 입력해주세요" }),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,128}$/,
      "패스워드 대소문자, 숫자, 특수문자 중 5가지 이상 조합하여 8~128자리 이내를 입력하세요"
    ),
});

export default registerSchema;
