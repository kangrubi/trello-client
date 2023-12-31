import React from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import resetPasswordSchema from "../schema/resetPassword-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ResetPassword = () => {
  const { token } = useParams();

  // console.log(token);

  const { resetPasswordError, resetPassword } = useAuth();

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof resetPasswordSchema>) => {
    if (!token) return;
    const decoded = atob(token);

    console.log(decoded);
    await resetPassword({ token: decoded, password: data.password });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-96 rounded-lg border bg-card text-card-foreground shadow-sm p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                    비밀번호 변경
                  </Button>
                </AlertDialogTrigger>
                {resetPasswordError && (
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogDescription>
                        {resetPasswordError.message}
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

export default ResetPassword;
