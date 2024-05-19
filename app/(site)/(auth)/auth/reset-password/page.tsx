"use client";

import { useRouter } from "next/navigation";
import { confirmPassword } from "@/actinos";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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
import { IResetPassword } from "@/interface";
import { ResetPasswordSchema } from "@/schema/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { ResetFormEmail } from "./_components/ResetFormEmail";

export default function Reset() {
  const router = useRouter();
  const [resetPasswordActive, setResetPasswordActive] = useState<boolean>(true);
  const [activateEmail, setActivateEmail] = useState<string>("");

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      activation_code: "",
      confirm_password: "",
      new_password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["confrim_password"],
    mutationFn: (data: IResetPassword) => confirmPassword(data),
    onSuccess: async (res) => {
      toast.success(res.data.detail);
      router.push("/auth/sign-in");
      form.reset();
    },
    onError(error) {
      toast.error("There is an error!");
    },
  });

  const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
    mutate({
      ...values,
      email: activateEmail,
      activation_code: +values.activation_code,
    });
  };

  const resetNextForm = () => setResetPasswordActive(false);
  const changeEmail = (email: string) => setActivateEmail(email);

  return (
    <div className="flex justify-center flex-col items-center p-8">
      <Card
        className={`sm:w-[540px] ${
          resetPasswordActive ? "translate-y-3/4" : "translate-y-2/4"
        } md:translate-y-0 translate-y-0 !min-w-full p-0 md:p-8`}
      >
        {resetPasswordActive ? (
          <ResetFormEmail
            changeEmail={changeEmail}
            resetNextForm={resetNextForm}
          />
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-3"
            >
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-semibold">
                  Confrim Password
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <FormField
                  control={form.control}
                  name="activation_code"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className={twMerge(
                            "focus-visible:ring-offset-0 focus-visible:ring-current",
                            fieldState.error &&
                              "focus-visible:ring-red-600 focus-visible:border-none border-red-600"
                          )}
                          placeholder="Activate Code"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="new_password"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="New Password"
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
                  name="confirm_password"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm Password"
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
                  Save changes
                </Button>
              </CardFooter>
            </form>
          </Form>
        )}
      </Card>
    </div>
  );
}
