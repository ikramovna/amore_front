"use client";

import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ICheckDay,
  ICheckDayRes,
  IOrderOneDayRequest,
  ITime,
} from "@/interface";
import { useMutation } from "@tanstack/react-query";
import { checkDay, orederOneDay } from "@/actinos";
import { formatDate } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function DateComponent({ roomId }: { roomId: string }) {
  const router = useRouter();

  const [selectedDay, setSelectedDay] = useState<Date>();
  const [checkDayRes, setCheckRes] = useState<ICheckDayRes | null>(null);
  const [userSelect, setUserSelect] = useState<ITime>();
  const [morningDisNow, setMorningDisNow] = useState<boolean>(false);
  const [afternooDisNow, setAfternoonDisNow] = useState<boolean>(false);
  const [eveningDisNow, setEveningDisNow] = useState<boolean>(false);

  const { mutate, isPending } = useMutation({
    mutationKey: ["dayCheckingMutation"],
    mutationFn: (data: ICheckDay) => checkDay(data),
    onSuccess({ data }) {
      setCheckRes(data[0]);

      const { afternoon_time, evening_time, morning_time } = data[0];
      setUserSelect({
        afternoon_time,
        evening_time,
        morning_time,
      });
    },
  });

  const setSelectDate = (date: Date) => {
    const formattedDate = formatDate(date);

    setSelectedDay(date);
    mutate({
      date: formattedDate,
      restaurant_id: +roomId,
    });
  };

  const { mutate: mutateOrder, isPending: isPendingOrder } = useMutation({
    mutationKey: ["order_one_day"],
    mutationFn: (data: IOrderOneDayRequest) => orederOneDay(data),
    onSuccess({ data }) {
      if (data) {
        toast.success("The order has been received!");
        router.push("/");
      }
    },
    onError(error) {
      console.log(error);
      toast.error("There has been an error!");
    },
  });

  const selectedOneDayFunc = () => {
    if (selectedDay) {
      const date = formatDate(selectedDay);

      if (userSelect) {
        const data: IOrderOneDayRequest = {
          afternoon: userSelect.afternoon_time,
          evening: userSelect.evening_time,
          morning: userSelect.morning_time,
          date,
          restaurant: +roomId,
        };
        mutateOrder(data);
      }
    }
  };

  useEffect(() => {
    if (selectedDay) {
      const selectDay = selectedDay.getDate();
      const selectMonth = selectedDay.getMonth();
      const nowDay = new Date().getDate();
      const nowMonth = new Date().getMonth();

      if (selectDay === nowDay && selectMonth === nowMonth) {
        const nowHour = new Date().getHours();

        if (nowHour > 6) setMorningDisNow(true);
        if (nowHour > 10) setAfternoonDisNow(true);
        if (nowHour > 17) setEveningDisNow(true);
      } else {
        setMorningDisNow(false);
        setAfternoonDisNow(false);
        setEveningDisNow(false);
      }
    }
  }, [selectedDay]);

  return (
    <div className=" w-full xl:w-1/3 mb-4 xl:mb-0" id="booking">
      <h3 className="font-semibold text-2xl mb-6">Order The Wedding Day</h3>

      <div className="bg-zinc-100 rounded-md !h-[620px] mb-4 p-2">
        <DayPicker
          mode="single"
          disabled={{ before: new Date() }}
          selected={selectedDay}
          onSelect={(e: Date | undefined) => e && setSelectDate(e)}
          defaultMonth={
            new Date(
              new Date().getFullYear(),
              new Date().getMonth(),
              new Date().getDay()
            )
          }
          className={`${isPending && "opacity-40 cursor-not-allowed"}`}
        />

        <Separator className="my-8" />
        {checkDayRes && userSelect ? (
          <>
            {!isPending ? (
              <div className="px-3 pb-3 mb-4">
                <div className="flex justify-between items-end mb-6">
                  <div className="flex flex-col">
                    <span className="text-gray-600 text-sm">06:00 - 10:00</span>
                    <span className="text-xl font-medium">Morning</span>
                  </div>
                  {checkDayRes.morning_time && !morningDisNow ? (
                    <label
                      htmlFor="morning_check"
                      className="flex cursor-pointer items-center"
                    >
                      <span className="mr-3 text-green-600">Available</span>
                      <Checkbox
                        id="morning_check"
                        defaultChecked={!userSelect.morning_time}
                        onCheckedChange={(value: boolean) =>
                          setUserSelect({ ...userSelect, morning_time: value })
                        }
                      />
                    </label>
                  ) : (
                    <label htmlFor="check">
                      <span className="mr-3 text-red-600">Not available</span>
                    </label>
                  )}
                </div>
                <div className="flex justify-between items-end mb-6">
                  <div className="flex flex-col">
                    <span className="text-gray-600 text-sm">12:00 - 16:00</span>
                    <span className="text-xl font-medium">Afternoon</span>
                  </div>
                  {checkDayRes.afternoon_time && !afternooDisNow ? (
                    <label
                      htmlFor="afternoon_check"
                      className="flex cursor-pointer items-center"
                    >
                      <span className="mr-3 text-green-600">Available</span>
                      <Checkbox
                        id="afternoon_check"
                        defaultChecked={!checkDayRes.afternoon_time}
                        onCheckedChange={(value: boolean) =>
                          setUserSelect({
                            ...userSelect,
                            afternoon_time: value,
                          })
                        }
                      />
                    </label>
                  ) : (
                    <label htmlFor="check">
                      <span className="mr-3 text-red-600">Not available</span>
                    </label>
                  )}
                </div>
                <div className="flex justify-between items-end mb-6">
                  <div className="flex flex-col">
                    <span className="text-gray-600 text-sm">18:00 - 22:00</span>
                    <span className="text-xl font-medium">Night</span>
                  </div>
                  {checkDayRes.evening_time && !eveningDisNow ? (
                    <label
                      htmlFor="evening_check"
                      className="flex cursor-pointer items-center"
                    >
                      <span className="mr-3 text-green-600">Available</span>
                      <Checkbox
                        id="evening_check"
                        className="!text-white"
                        defaultChecked={!checkDayRes.evening_time}
                        onCheckedChange={(value: boolean) =>
                          setUserSelect({
                            ...userSelect,
                            evening_time: value,
                          })
                        }
                      />
                    </label>
                  ) : (
                    <label htmlFor="check">
                      <span className="mr-3 text-red-600">Not available</span>
                    </label>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex !h-1/3 w-full justify-center items-center">
                <Loader2 className="mr-2 h-8 w-8 animate-spin text-neutral-800" />
              </div>
            )}
          </>
        ) : (
          <div className="flex justify-center">
            <span className="">Select the day</span>
          </div>
        )}
      </div>
      <Button
        disabled={isPendingOrder}
        onClick={selectedOneDayFunc}
        className="bg-current w-full hover:bg-current/90 transition-colors"
      >
        Send the Booking
      </Button>
    </div>
  );
}
