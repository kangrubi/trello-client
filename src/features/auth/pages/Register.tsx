import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import registerSchema from "../schema/register-schema";
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

const Register = () => {
  const { register, error } = useAuth();

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    const response = await register(data);

    if (response?.statusCode === 201) {
      navigate("/auth/login");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="w-96 rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <FormControl>
                      <Input id="username" placeholder="username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                  <AlertDialogTrigger className="w-full">
                    <Button type="submit" className="w-full">
                      Sign Up
                    </Button>
                  </AlertDialogTrigger>
                  {error && (
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          {error.message.error}
                        </AlertDialogTitle>
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
              <div className="flex items-center justify-center text-sm">
                <Link to="/auth/login">이미 계정이 있습니까? 로그인</Link>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;
