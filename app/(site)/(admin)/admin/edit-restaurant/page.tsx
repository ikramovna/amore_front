"use client";

import { useState, ChangeEvent, useEffect } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { EditRestaurant } from "@/schema/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  deleteRestaurantImage,
  getDistricts,
  getNeighborhood,
  getRegions,
  getRoomId,
  getServices,
  putImage,
  putRestaurant,
  restaurantImage,
} from "@/actinos";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  IDistrict,
  IEditRestaurantRequest,
  INeighborhood,
  IRegion,
  IServices,
} from "@/interface";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Check, Loader2, X } from "lucide-react";
import { CiImageOn } from "react-icons/ci";
import CustomImage from "@/app/(site)/_components/Image";
import { Button } from "@/components/ui/button";
import { twMerge } from "tailwind-merge";
import { useRouter, useSearchParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { MdChangeCircle } from "react-icons/md";
import toast from "react-hot-toast";

export default function AddRestaurantPage() {
  const router = useRouter();
  const { get } = useSearchParams();
  const query_params = get("restaurant_id");

  const [searchData, setSearchData] = useState<{
    region_id: string;
    district_id: string;
    neighborhood: string;
  }>({
    region_id: "",
    district_id: "",
    neighborhood: "",
  });
  const [districts, setDistricts] = useState<IDistrict[]>([]);
  const [neighborhood, setNeighborhood] = useState<INeighborhood[]>([]);

  const { data: reg } = useQuery({
    queryKey: ["region"],
    queryFn: getRegions,
  });

  const { mutate: selectRegionFunc } = useMutation({
    mutationKey: ["district"],
    mutationFn: (id: string) => getDistricts(+id),
    onSuccess({ data }) {
      setDistricts(data);
    },
    onError(error, variables) {
      console.log(error, variables);
    },
  });
  const { mutate: selectDistrict } = useMutation({
    mutationKey: ["district"],
    mutationFn: (id: string) => getNeighborhood(+id),
    onSuccess({ data }) {
      setNeighborhood(data);
    },
    onError(error, variables) {
      console.log(error, variables);
    },
  });

  const handelRegion = (value: string) => {
    setSearchData((prev) => ({ ...prev, region_id: value }));
    selectRegionFunc(value);
  };
  const handelDestrict = (value: string) => {
    setSearchData((prev) => ({ ...prev, district_id: value }));
    selectDistrict(value);
  };
  const handelNeighborhood = (value: string) => {
    setSearchData((prev) => ({ ...prev, neighborhood: value }));
  };

  const { data: res, refetch } = useQuery({
    queryKey: ["editRoom"],
    queryFn: () => {
      if (query_params) {
        return getRoomId(query_params);
      }
    },
  });

  const [imageError, setImageError] = useState<boolean>(false);
  const [images, setImages] = useState<File[]>([]);
  const [imagesRes, setImagesRes] = useState<{ id: number; image: string }[]>(
    []
  );

  const setImagesFunc = (imgs: any) =>
    imgs && setImages((prev) => [...prev, ...imgs]);
  const [servicesIdList, setServicesIdList] = useState<number[]>([]);

  const form = useForm<z.infer<typeof EditRestaurant>>({
    resolver: zodResolver(EditRestaurant),
    defaultValues: {
      name: "",
      price: "",
      description: "",
      phone: "",
      select_district: "",
      select_neighbourhood: "",
      street: "",
      house_number: "",
      people_size: "",
      select_afternoon: "",
      select_evening: "",
      select_morning: "",
    },
  });

  useEffect(() => {
    if (res?.data) {
      form.setValue("name", res.data.name);
      form.setValue("price", res.data.price.toString());
      form.setValue("description", res.data.description);
      form.setValue("phone", res.data.phone);
      form.setValue("people_size", res.data.size_people.toString());
      setServicesIdList(res.data.services);
      form.setValue("street", res.data.address.street);
      form.setValue("house_number", res.data.address.house);
      setImagesRes(res.data.images);
    }
  }, [res, form]);

  const { data: services } = useQuery({
    queryKey: ["service"],
    queryFn: getServices,
  });

  const { mutate: editRestaurantMutate, isPending: editLoading } = useMutation({
    mutationFn: ({ id, data }: { id: number; data: IEditRestaurantRequest }) =>
      putRestaurant(id, data),
    mutationKey: ["edit_restaurant"],
    onSuccess({ data }) {
      if (data) {
        toast.success("Restaurant information has been changed!");
        router.push("/admin/restaurant");
      }
    },
    onError() {
      toast.error("There is an error!");
    },
  });

  const onSubmit = ({
    description,
    house_number,
    name,
    people_size,
    phone,
    price,
    select_afternoon,
    select_evening,
    select_morning,
    street,
  }: z.infer<typeof EditRestaurant>) => {
    if (!images) {
      setImageError(true);
      return;
    }

    const data: IEditRestaurantRequest = {
      name,
      price,
      description,
      phone,
      size_people: +people_size,
      address: {
        mahalla: +searchData.neighborhood,
        street: street,
        house: house_number,
      },
      services: servicesIdList,
      working_time: {
        morning_time: select_morning,
        afternoon_time: select_afternoon,
        evening_time: select_evening,
      },
    };
    if (query_params) {
      editRestaurantMutate({ id: +query_params, data });
    }
  };

  const [changeItemId, setChangeItemId] = useState<number | null>(null);

  const { mutate, isPending: replaceImageLoading } = useMutation({
    mutationKey: ["put_image"],
    mutationFn: ({ id, data }: { id: number; data: FormData }) =>
      putImage(id, data),
    onSuccess() {
      toast.success("Image replace successfully!");
      refetch();
      setChangeItemId(null);
      setImages([]);
    },
  });

  const { mutate: saveImageMutate, isPending: saveImageLoading } = useMutation({
    mutationKey: ["post-image"],
    mutationFn: (data: FormData) => restaurantImage(data),
    onSuccess({ data }) {
      if (data) {
        toast.success("Created new image successfully");
        refetch();
        setImages([]);
      }
    },
  });

  const handleChangeImage = (imgId: number) => setChangeItemId(imgId);

  const putImageRes = () => {
    if (changeItemId) {
      if (query_params && changeItemId) {
        const fd = new FormData();
        console.log(images[0]);

        fd.append("restaurant", query_params.toString());
        for (let x = 0; x < images.length; x++) {
          fd.append("image", images[x]);
        }

        mutate({ id: changeItemId, data: fd });
      }
    } else {
      if (query_params) {
        const fd = new FormData();
        for (let x = 0; x < images.length; x++) {
          fd.append("images", images[x]);
        }
        fd.append("restaurant", query_params);

        saveImageMutate(fd);
      }
    }
  };

  const { mutate: deleteMutate, isPending: deletedImageLoading } = useMutation({
    mutationKey: ["delete_img"],
    mutationFn: (id: number) => deleteRestaurantImage(id),
    onSuccess() {
      toast.success("Delete image successfully");
      refetch();
    },
  });
  const deleteImage = (id: number) => deleteMutate(id);

  return (
    <div className="w-full px-1 md:px-2 xl:px-8">
      <h3 className="text-[42px] font-semibold mt-0 md:mt-4 xl:mt-0">
        Edit restaurant
      </h3>
      <Form {...form}>
        <form className="mt-4 mb-8" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-4 xl:gap-8">
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field, fieldState }) => (
                  <FormItem className="flex flex-col items-start">
                    <FormLabel className="text-left">Name</FormLabel>
                    <FormControl className="w-full">
                      <Input
                        className={twMerge(
                          `focus-visible:ring-offset-0 focus-visible:ring-current`,
                          fieldState.error &&
                            "focus-visible:ring-red-600 focus-visible:border-none border-red-600"
                        )}
                        id="name"
                        {...field}
                        placeholder="Write Name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field, fieldState }) => (
                  <FormItem className="flex flex-col items-start">
                    <FormLabel className="text-left">Price</FormLabel>
                    <FormControl className="w-full">
                      <Input
                        type="number"
                        className={twMerge(
                          `focus-visible:ring-offset-0 focus-visible:ring-current`,
                          fieldState.error &&
                            "focus-visible:ring-red-600 focus-visible:border-none border-red-600"
                        )}
                        id="price"
                        placeholder="Write Price"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field, fieldState }) => (
                  <FormItem className="flex flex-col items-start">
                    <FormLabel className="text-left">Description</FormLabel>
                    <FormControl className="w-full">
                      <Textarea
                        id="description"
                        className={twMerge(
                          `focus-visible:ring-offset-0 focus-visible:ring-current`,
                          fieldState.error &&
                            "focus-visible:ring-red-600 focus-visible:border-none border-red-600"
                        )}
                        placeholder="Write Description"
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
                render={({ field, fieldState }) => (
                  <FormItem className="flex flex-col items-start">
                    <FormLabel className="text-left">Phone Number</FormLabel>
                    <FormControl className="w-full">
                      <PhoneInput
                        id="phone"
                        placeholder="Enter a phone number"
                        className={twMerge(
                          `focus-visible:ring-offset-0 focus-visible:ring-current`,
                          fieldState.error &&
                            "focus-visible:ring-red-600 focus-visible:border-none border-red-600"
                        )}
                        {...field}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col gap-1">
                <FormField
                  control={form.control}
                  name="select_region"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange("select_region", value);
                          handelRegion(value);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Regions" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Select region</SelectLabel>
                            {reg ? (
                              reg?.data?.map((item: IRegion) => (
                                <SelectItem
                                  key={item.id}
                                  value={String(item.id)}
                                  className={twMerge(
                                    `focus-visible:ring-offset-0 focus-visible:ring-current`,
                                    fieldState.error &&
                                      "focus-visible:ring-red-600 focus-visible:border-none border-red-600"
                                  )}
                                >
                                  {item.name}
                                </SelectItem>
                              ))
                            ) : (
                              <div className="flex justify-center my-2">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              </div>
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="select_district"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={(value) => {
                          field.onChange("select_district", value);
                          handelDestrict(value);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full my-2">
                            <SelectValue placeholder="Districts" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Select district</SelectLabel>
                            {districts.length ? (
                              districts.map(({ id, name }: IDistrict) => (
                                <SelectItem key={id} value={String(id)}>
                                  {name}
                                </SelectItem>
                              ))
                            ) : (
                              <div className="flex justify-center my-2">
                                <span className="text-sm">
                                  Choose a region!
                                </span>
                              </div>
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="select_neighbourhood"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={(value) => {
                          field.onChange("select_neighbourhood", value);
                          handelNeighborhood(value);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Neighborhood" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Select Neighborhood</SelectLabel>
                            {neighborhood.length ? (
                              neighborhood.map((item: INeighborhood) => (
                                <SelectItem
                                  key={item.id}
                                  value={String(item.id)}
                                >
                                  {item.name}
                                </SelectItem>
                              ))
                            ) : (
                              <div className="flex justify-center my-2">
                                <span className="text-sm">
                                  Choose a district!
                                </span>
                              </div>
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="street"
                  render={({ field, fieldState }) => (
                    <FormItem className="flex flex-col items-start my-2">
                      <FormControl className="w-full">
                        <Input
                          id="street"
                          placeholder="Write Street"
                          className={twMerge(
                            `focus-visible:ring-offset-0 focus-visible:ring-current`,
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
                  name="house_number"
                  render={({ field, fieldState }) => (
                    <FormItem className="flex flex-col items-start">
                      <FormControl className="w-full">
                        <Input
                          id="house_number"
                          type="number"
                          placeholder="Write house number"
                          className={twMerge(
                            `focus-visible:ring-offset-0 focus-visible:ring-current`,
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
              </div>
              <div className="flex flex-col gap-1">
                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name="people_size"
                    render={({ field, fieldState }) => (
                      <FormItem className="flex flex-col items-start my-2">
                        <FormLabel className="text-left">People size</FormLabel>
                        <FormControl className="w-full">
                          <Input
                            type="number"
                            id="people_size"
                            placeholder="People size"
                            className={twMerge(
                              `focus-visible:ring-offset-0 focus-visible:ring-current`,
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
                    name="select_morning"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Morning</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Mording time" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="focus-visible:ring-offset-0 focus-visible:ring-current">
                            <SelectGroup>
                              <SelectLabel>Select Time</SelectLabel>
                              <SelectItem value={"06:00-10:10"}>
                                06:00 - 10:00
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="select_afternoon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Afternoon</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Afternoon time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="focus-visible:ring-offset-0 focus-visible:ring-current">
                          <SelectGroup>
                            <SelectLabel>Select Time</SelectLabel>
                            <SelectItem value={"11:00-16:100"}>
                              11:00 - 16:00
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="select_evening"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Night</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Night time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="focus-visible:ring-offset-0 focus-visible:ring-current">
                          <SelectGroup>
                            <SelectLabel>Select Time</SelectLabel>
                            <SelectItem value={"17:00-23:10"}>
                              17:00 - 23:00
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {services?.data && (
                <label>
                  <span className="text-xl">Choose Services</span>
                  <div className="flex flex-wrap gap-2">
                    {services.data.map((item: IServices, i: number) => (
                      <div
                        onClick={() =>
                          setServicesIdList((prev: number[]) => [
                            ...prev,
                            item.id,
                          ])
                        }
                        onDoubleClick={() =>
                          setServicesIdList(
                            servicesIdList.filter((n: number) => n !== item.id)
                          )
                        }
                        key={i}
                        className={`border-[1px] cursor-pointer border-neutral-600 rounded-3xl inline-flex gap-1 py-1 px-4 select-none ${
                          servicesIdList.includes(item.id) &&
                          "bg-current text-white border-transparent"
                        }`}
                      >
                        <div className="w-6 h-6 relative">
                          <CustomImage
                            imgUrl={item.image}
                            alt={item.name}
                            fill
                            className="object-contain mix-blend-multiply brightness-1 invert-0"
                          />
                        </div>
                        <span className="font-medium">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </label>
              )}

              <div className="flex flex-col gap-2 mt-4">
                <span className="text-xl">Product Gallery</span>
                <label
                  htmlFor="images"
                  className={`w-full h-36 border border-dashed flex justify-center items-center flex-col gap-2 ${
                    imageError && "border-red-600"
                  }`}
                >
                  <CiImageOn className="text-5xl text-current/60" />
                  <p>Drop your imager here, or browse</p>
                  <p>Jpeg, jpg and png are allowed</p>
                  <input
                    type="file"
                    id="images"
                    className="invisible"
                    accept="image/*"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setImagesFunc(e.target.files)
                    }
                  />
                </label>

                <div className="flex flex-col gap-2">
                  <Separator className="my-2" />
                  <div
                    className={`grid grid-cols-2 md:grid-cols-3 gap-2 w-full ${
                      deletedImageLoading && "opacity-40 cursor-not-allowed"
                    }`}
                  >
                    {imagesRes.length
                      ? imagesRes.map((item: { id: number; image: string }) => (
                          <div key={item.id} className="relative w-full h-32">
                            <CustomImage
                              alt={item.image}
                              imgUrl={item.image}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute right-0 flex gap-[0.5px]">
                              <X
                                className=" text-red-600 cursor-pointer  bg-white/80"
                                onClick={() => deleteImage(item.id)}
                              />
                              <label
                                htmlFor="images"
                                className="cursor-pointer bg-white/80 flex justify-center items-center"
                                onClick={() => handleChangeImage(item.id)}
                              >
                                <MdChangeCircle className="text-blue-600 text-xl" />
                              </label>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                  {images.length
                    ? images.map((imgFile, i: number) => (
                        <div
                          key={i}
                          className={`bg-gray-200 flex gap-2 rounded-md p-1 justify-between items-center ${
                            (replaceImageLoading || saveImageLoading) &&
                            "opacity-40 cursor-not-allowed"
                          }`}
                        >
                          <div className="flex gap-2 items-center">
                            <Avatar className="rounded-md">
                              <AvatarImage
                                src={URL.createObjectURL(imgFile)}
                                alt={imgFile.name}
                                className="object-cover"
                              />
                            </Avatar>
                            <span>{imgFile.name}</span>
                          </div>
                          <div className="flex">
                            <X
                              className="!text-red-600 cursor-pointer mr-2"
                              onClick={() =>
                                setImages(
                                  images.filter(
                                    (item) => item.name !== imgFile.name
                                  )
                                )
                              }
                            />
                            <Check
                              className="!text-green-600 cursor-pointer mr-2"
                              onClick={putImageRes}
                            />
                          </div>
                        </div>
                      ))
                    : null}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3 flex justify-end">
            <Button
              disabled={editLoading}
              type="submit"
              className="bg-current hover:bg-current/80 transition w-full md:w-min mt-2"
            >
              Changed save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
