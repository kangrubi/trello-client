import { z } from "zod";

const resetPasswordSchema = z.object({
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,128}$/,
      "패스워드 대소문자, 숫자, 특수문자 중 5가지 이상 조합하여 8~128자리 이내를 입력하세요"
    ),
});

export default resetPasswordSchema;
