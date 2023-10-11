import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import loginSchema from "../schema/login-schema";
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
import { Button } from "@/components/ui/button";
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
import storage from "@/storage";

const Login = () => {
  const { login, error, isLogin, signIn } = useAuth();

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    const response = await login(data);

    if (response?.statusCode === 200) {
      signIn();

      storage.setItem(response.data.accessToken);
    }
  };

  useEffect(() => {
    if (isLogin) {
      navigate("/board/boards");
    }
  }, [isLogin]);

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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      id="password"
                      placeholder="password"
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
                    Login
                  </Button>
                </AlertDialogTrigger>
                {error && (
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
              </AlertDialog>
            </div>
            <div className="flex items-center justify-center gap-4 text-sm">
              <Link to="/auth/register">계정 만들기</Link>
              <Link to="/auth/resetpassword">비밀번호 찾기</Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
