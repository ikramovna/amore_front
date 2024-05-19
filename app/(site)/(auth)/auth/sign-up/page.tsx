"use client";

import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import CustomCard from "../_components/Card";
import { z } from "zod";
import { FormRegisterSchema } from "@/schema/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { twMerge } from "tailwind-merge";
import { setRegister } from "@/actinos";
import { useMutation } from "@tanstack/react-query";
import { IRegisterForm, IUser } from "@/interface";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";
import ActivateForm from "./_components/ActivateForm";
import Cookies from "js-cookie";
import { PhoneInput } from "@/components/ui/phone-input";
import { BiShow, BiHide } from "react-icons/bi";

export default function SignUp() {
  const [cookieData, setCookieData] = useState<boolean>(false);
  const [isActivate, setIsActivate] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [showEye, setShowEye] = useState<boolean>(false);

  const toggleIsActive = () => setIsActivate((prev: boolean) => !prev);

  const form = useForm<z.infer<typeof FormRegisterSchema>>({
    resolver: zodResolver(FormRegisterSchema),
    defaultValues: {
      full_name: "",
      email: "",
      username: "",
      password: "",
      phone: "+998",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["register_user"],
    mutationFn: (data: IRegisterForm) => setRegister(data),
    onSuccess: (res: { data: IUser }) => {
      if (cookieData && isActivate) {
        Cookies.set("currentUser", JSON.stringify(res.data));
        Cookies.set("role", res.data.is_admin ? "admin" : "user");
      }
      toast.success("Code sent to email address!");
      toggleIsActive();
    },
    onError() {
      toast.error("The data may contain errors!");
      form.reset();
    },
  });

  const onSubmit = (values: z.infer<typeof FormRegisterSchema>) => {
    mutate(values);
    setUserEmail(values.email);
  };

  const handleCookieData = () => setCookieData(true);

  return (
    <div className="flex flex-col items-center p-0 md:p-8">
      <CustomCard>
        {isActivate ? (
          <ActivateForm
            handleCookieData={handleCookieData}
            toggleIsActive={toggleIsActive}
            userEmail={userEmail}
          />
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-3"
            >
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-semibold">
                  Sign Up
                </CardTitle>
                <CardDescription>
                  Already have an account?{" "}
                  <Link
                    href={"/auth/sign-in"}
                    className="text-current underline"
                  >
                    Log In
                  </Link>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <FormField
                  control={form.control}
                  name="full_name"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className={twMerge(
                            "focus-visible:ring-offset-0 focus-visible:ring-current",
                            fieldState.error &&
                              "focus-visible:ring-red-600 focus-visible:border-none border-red-600"
                          )}
                          placeholder="Full Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Email Address"
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
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start">
                      <FormControl className="w-full">
                        <PhoneInput
                          {...field}
                          value={field.value}
                          onChange={field.onChange}
                          international={false}
                          defaultCountry="UZ"
                          placeholder="Enter a phone number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Username"
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
                  Create An Account
                </Button>
              </CardFooter>
            </form>
          </Form>
        )}
      </CustomCard>
    </div>
  );
}
