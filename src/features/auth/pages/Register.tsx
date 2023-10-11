import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import registerSchema from "../schema/register-schema";

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

  useEffect(() => {
    if (error) {
      alert(error.message.message);
    }
  }, [error]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-80">
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
              <Button type="submit">회원가입</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Register;
