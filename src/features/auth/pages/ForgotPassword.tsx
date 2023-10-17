import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import forgotPasswordSchema from "../schema/forgotPassword-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "../hooks/useAuth";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const { error, forgotPassword } = useAuth();
  const [successAlert, setSuccessAlert] = useState<string>("");

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof forgotPasswordSchema>) => {
    const response = await forgotPassword(data);

    if (!response) return;

    if (response.statusCode === 200) {
      setSuccessAlert("비밀번호 변경 링크를 다음 이메일 주소로 보냈습니다");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-96 rounded-lg border bg-card text-card-foreground shadow-sm p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      id="email"
                      placeholder="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-center">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    type="submit"
                    variant="outline"
                    className="w-full bg-black text-white"
                  >
                    비밀번호 변경 링크 보내기
                  </Button>
                </AlertDialogTrigger>
                {error?.path === "/api/v1/auth/forgot-password" && (
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>{error.message.error}</AlertDialogTitle>
                      <AlertDialogDescription>
                        {error.message.message}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                )}
                {successAlert && (
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Success</AlertDialogTitle>
                      <AlertDialogDescription>
                        {successAlert}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                )}
              </AlertDialog>
            </div>
            <div className="flex items-center justify-center text-sm">
              <Link to="/auth/login" className="hover:underline">
                로그인으로 돌아가기
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
