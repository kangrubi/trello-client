import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "이메일 형식을 입력해주세요" }),
});

export default forgotPasswordSchema;
