"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { Edit, Plus, Trash } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteRestaurantReq, getMyRestaurants } from "@/actinos";
import { HiOutlineEmojiSad } from "react-icons/hi";
import { IMyRestaurant } from "@/interface";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AdminRestaurant() {
  const router = useRouter();

  const { data: res, refetch } = useQuery({
    queryKey: ["get_restaurant"],
    queryFn: getMyRestaurants,
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["delete_retaurant"],
    mutationFn: (id: number) => deleteRestaurantReq(id),
    onSuccess() {
      refetch();
      toast.success("Delete restaurant successfully!");
    },
  });

  const deleteRestaurant = (id: number) => {
    mutate(id);
  };
  const editRestaurant = (id: number) => {
    router.push(`/admin/edit-restaurant?restaurant_id=${id}`);
  };

  return (
    <div className="w-full px-1 md:px-2 xl:px-8">
      <div className="flex justify-between items-center mb-4 mt-0 md:mt-4 ">
        <h3 className="text-3xl sm:text-[42px] font-semibold xl:mt-0">
          Restaurants List
        </h3>
        <Button variant={"outline"}>
          <Link href={"/admin/add-restaurant"} className="flex">
            <Plus className="sm:mr-2 h-4 w-4" />
            <span className="hidden sm:block">Add Restaurant</span>
          </Link>
        </Button>
      </div>

      {res?.data.length ? (
        <div
          className={`w-full bg-current_bg_color p-4 rounded-xl ${
            isPending && "opacity-35 cursor-not-allowed"
          }`}
        >
          <Table className="overflow-hidden">
            <TableHeader>
              <TableRow>
                <TableHead>
                  <AiOutlineFieldNumber className="text-2xl" />
                </TableHead>
                <TableHead className="text-nowrap">Restaurant Name</TableHead>
                <TableHead className="text-nowrap">Price</TableHead>
                <TableHead className="text-nowrap">Size People</TableHead>
                <TableHead className="text-nowrap">Address</TableHead>
                <TableHead className="text-nowrap">Phone Number</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {res.data.map((item: IMyRestaurant, i: number) => (
                <TableRow key={i}>
                  <TableCell className="font-medium text-nowrap">
                    {i + 1}
                  </TableCell>
                  <TableCell className="font-medium text-nowrap">
                    {item.name}
                  </TableCell>
                  <TableCell className="font-medium text-nowrap">
                    {Number(item.price) / 1_000_000} mln
                  </TableCell>
                  <TableCell className="font-medium text-nowrap">
                    {item.size_people}
                  </TableCell>
                  <TableCell className="text-nowrap">
                    {item.address.region} {item.address.district}
                  </TableCell>
                  <TableCell className="text-nowrap">{item.phone}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 !justify-start text-nowrap">
                      <Edit
                        className="text-gray-700 cursor-pointer"
                        onClick={() => editRestaurant(item.id)}
                      />
                      <Trash
                        className="text-red-600 cursor-pointer"
                        onClick={() => deleteRestaurant(item.id)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex mt-6">
          <div className="flex items-center">
            <HiOutlineEmojiSad className="text-3xl" />
            <span className="text-2xl ">Restaurants not found</span>
          </div>
        </div>
      )}
    </div>
  );
}
