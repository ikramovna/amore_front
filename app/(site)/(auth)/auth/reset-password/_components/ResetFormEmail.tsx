"use client";

import { resetEmail } from "@/actinos";
import { Button } from "@/components/ui/button";
import {
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
import { EmailSchema } from "@/schema/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export const ResetFormEmail: FC<{
  changeEmail: (email: string) => void;
  resetNextForm: () => void;
}> = ({ changeEmail, resetNextForm }) => {
  const [email, setEmail] = useState<string>("");
  const form = useForm<z.infer<typeof EmailSchema>>({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["confrim_email"],
    mutationFn: (email: string) => resetEmail(email),
    onSuccess: async (res) => {
      toast.success(res.data.detail);
      changeEmail(email);
      resetNextForm();
    },
    onError() {
      toast.error("There is an error!");
    },
  });

  const onSubmit = ({ email }: z.infer<typeof EmailSchema>) => {
    mutate(email);
    setEmail(email);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-semibold">
            Reset Password
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className={twMerge(
                      "focus-visible:ring-offset-0 focus-visible:ring-current",
                      fieldState.error &&
                        "focus-visible:ring-red-600 focus-visible:border-none border-red-600"
                    )}
                    placeholder="Email"
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
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            </>
            Reset Password
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
};
