"use client";

import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import CustomCard from "../_components/Card";
import { useForm } from "react-hook-form";
import { FormLoginSchema } from "@/schema/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ILoginForm } from "@/interface";
import toast from "react-hot-toast";
import { setLogin } from "@/actinos";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { twMerge } from "tailwind-merge";
import { Loader2 } from "lucide-react";
import { setToken } from "@/helpers/persistaneStorage";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";

export default function SignIn() {
  const router = useRouter();
  const [showEye, setShowEye] = useState<boolean>(false);

  const form = useForm<z.infer<typeof FormLoginSchema>>({
    resolver: zodResolver(FormLoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["login_user"],
    mutationFn: (data: ILoginForm) => setLogin(data),
    onSuccess: (res) => {
      if (res.data) {
        setToken(res?.data);
        toast.success("The information is confirmed!");
        router.push("/");
      }
      form.reset();
    },
    onError() {
      toast.error("Data not available!");
      form.reset();
    },
  });

  const onSubmit = (values: z.infer<typeof FormLoginSchema>) => mutate(values);

  return (
    <div className="flex flex-col items-center p-8 h-full">
      <CustomCard>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-semibold">Sign In</CardTitle>
              <CardDescription>
                Don`t have an account?{" "}
                <Link href={"/auth/sign-up"} className="text-current underline">
                  Sign Up
                </Link>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <FormField
                control={form.control}
                name="username"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className={twMerge(
                          "focus-visible:ring-offset-0 focus-visible:ring-current",
                          fieldState.error &&
                            "focus-visible:ring-red-600 focus-visible:border-none border-red-600"
                        )}
                        placeholder="Username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="relative w-full">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type={!showEye ? "password" : "text"}
                          placeholder="Password"
                          className={twMerge(
                            "focus-visible:ring-offset-0 focus-visible:ring-current",
                            fieldState.error &&
                              "focus-visible:ring-red-600 focus-visible:border-none border-red-600"
                          )}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  className="absolute right-0 top-0 bg-transparent text-black hover:bg-transparent"
                  onClick={() => setShowEye((prev: boolean) => !prev)}
                >
                  {showEye ? (
                    <BiShow className="text-xl text-neutral-600" />
                  ) : (
                    <BiHide className="text-xl text-neutral-600" />
                  )}
                </Button>
              </div>
              <CardDescription className="flex justify-end">
                <Link
                  href={"/auth/reset-password"}
                  className="text-current underline"
                >
                  Forgot your password?
                </Link>
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Button
                disabled={isPending}
                type="submit"
                className="bg-current hover:bg-current/80 transition w-full"
              >
                <>
                  {isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                </>
                Log In
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CustomCard>
    </div>
  );
}
