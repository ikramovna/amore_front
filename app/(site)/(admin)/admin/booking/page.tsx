"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GoDotFill } from "react-icons/go";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import { getBooking } from "@/actinos";
import { HiOutlineEmojiSad } from "react-icons/hi";
import { IAdminMyBooking } from "@/interface";

export default function AdminBooking() {
  const { data: res } = useQuery({
    queryKey: ["get_booking"],
    queryFn: getBooking,
  });

  return (
    <div className="w-full px-1 md:px-2 xl:px-8">
      <h3 className="text-3xl sm:text-[42px] font-semibold mb-2 sm:mb-0 md:mt-4 xl:mt-0">
        Orders List
      </h3>
      {res?.data.length ? (
        <>
          <div className="w-full bg-current_bg_color p-4 mt-4 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Recent Purchases</h3>
            <Table className="overflow-hidden">
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <AiOutlineFieldNumber className="text-2xl" />
                  </TableHead>
                  <TableHead className="text-nowrap">Restaurant</TableHead>
                  <TableHead className="text-nowrap">Date</TableHead>
                  <TableHead className="text-nowrap">Time</TableHead>
                  <TableHead className="text-nowrap">Customer</TableHead>
                  <TableHead className="text-nowrap">Number</TableHead>
                  <TableHead className="text-nowrap">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {res.data.map((item: IAdminMyBooking, i: number) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{i + 1}</TableCell>
                    <TableCell className="font-medium text-nowrap">
                      {item.restaurant_name}
                    </TableCell>
                    <TableCell className="font-medium !text-nowrap">
                      {item.date}
                    </TableCell>
                    <TableCell className="font-medium flex gap-1 text-nowrap">
                      {item.time.map((c: string) => (
                        <span key={c}>{c},</span>
                      ))}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-nowrap">
                        <Avatar className="!w-[28px] !h-[28px]">
                          <AvatarImage
                            src={item.customer.image}
                            alt={item.customer.full_name}
                          />
                          <AvatarFallback>
                            {item.customer.full_name.slice(0, 1)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-nowrap">
                          {item.customer.full_name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-nowrap">
                      {item.customer.phone}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 !justify-start text-nowrap">
                        <GoDotFill
                          className={`${
                            item.status === "pending" && "text-blue-600"
                          } ${item.status === "approved" && "text-green-600"} ${
                            item.status === "rejected" && "text-red-600"
                          } text-xl`}
                        />
                        <span>{item.status}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter></TableFooter>
            </Table>
          </div>
        </>
      ) : (
        <div className="flex mt-6">
          <div className="flex items-center">
            <HiOutlineEmojiSad className="text-3xl" />
            <span className="text-2xl ">Booking not found!</span>
          </div>
        </div>
      )}
    </div>
  );
}
