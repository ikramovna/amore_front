"use client";

import { FC, Fragment } from "react";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { z } from "zod";
import { ActivateRegisterSchema } from "@/schema/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { activateRegisterCode } from "@/actinos";
import { useMutation } from "@tanstack/react-query";
import { IActivateCode } from "@/interface";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { setToken } from "@/helpers/persistaneStorage";

const ActivateForm: FC<{
  handleCookieData: () => void;
  userEmail: string;
  toggleIsActive: () => void;
}> = ({ toggleIsActive, userEmail, handleCookieData }) => {
  const router = useRouter();

  const activateForm = useForm<z.infer<typeof ActivateRegisterSchema>>({
    resolver: zodResolver(ActivateRegisterSchema),
    defaultValues: {
      email: userEmail,
      activate_code: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["register_user", "activate_code"],
    mutationFn: (data: IActivateCode) => activateRegisterCode(data),
    onSuccess: ({ data }) => {
      toast.success(data.message);
      const token = {
        access: data.access,
        refresh: data.refresh,
      };
      setToken(token);
      handleCookieData();
      router.push("/");
      toggleIsActive();
    },
    onError() {
      toast.error("There is an error in the email or code!");
      activateForm.reset({ email: userEmail, activate_code: "" });
    },
  });

  const confirmCodeSubmit = (
    values: z.infer<typeof ActivateRegisterSchema>
  ) => {
    console.log(values);
    mutate({ ...values, activate_code: +values.activate_code });
  };

  return (
    <Form {...activateForm}>
      <form onSubmit={activateForm.handleSubmit(confirmCodeSubmit)}>
        <div className="flex flex-col gap-3">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-semibold">
              Code activation
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <FormField
              control={activateForm.control}
              name="activate_code"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                      {...field}
                    >
                      <InputOTPGroup className="gap-2 md:gap-0">
                        {[...Array(6)].map((_, i: number) => (
                          <Fragment key={i}>
                            <InputOTPSlot index={i} />
                            {i + 1 !== 6 && (
                              <InputOTPSeparator className="hidden md:block" />
                            )}
                          </Fragment>
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="w-full justify-center p-2">
            <Button
              disabled={isPending}
              type="submit"
              className="bg-current hover:bg-current/80 transition w-full"
            >
              <>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              </>
              Confirm Code
            </Button>
          </CardFooter>
        </div>
      </form>
    </Form>
  );
};
export default ActivateForm;
