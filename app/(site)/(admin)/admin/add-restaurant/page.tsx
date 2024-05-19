"use client";

import { useState, ChangeEvent } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AddRestaurant } from "@/schema/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  getDistricts,
  getNeighborhood,
  getRegions,
  getServices,
  restaurantCreate,
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
  IAddress,
  IDistrict,
  INeighborhood,
  IRegion,
  IRestaurantRequest,
  IServices,
} from "@/interface";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2, X } from "lucide-react";
import { CiImageOn } from "react-icons/ci";
import CustomImage from "@/app/(site)/_components/Image";
import { Button } from "@/components/ui/button";
import { twMerge } from "tailwind-merge";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AddRestaurantPage() {
  const router = useRouter();
  const [servicesIdList, setServicesIdList] = useState<number[]>([]);
  const [districts, setDistricts] = useState<IDistrict[]>([]);
  const [neighborhood, setNeighborhood] = useState<INeighborhood[]>([]);

  const form = useForm<z.infer<typeof AddRestaurant>>({
    resolver: zodResolver(AddRestaurant),
    defaultValues: {
      name: "",
      price: "",
      description: "",
      phone: "",
      select_region: "",
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

  const [searchData, setSearchData] = useState<{
    region_id: string;
    district_id: string;
    neighborhood: string;
  }>({
    region_id: "",
    district_id: "",
    neighborhood: "",
  });

  const { data: reg } = useQuery({
    queryKey: ["region"],
    queryFn: getRegions,
  });
  const { data: services } = useQuery({
    queryKey: ["service"],
    queryFn: getServices,
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

  const [imageError, setImageError] = useState<boolean>(false);
  const [images, setImages] = useState<File[]>([]);
  const setImagesFunc = (imgs: any) =>
    imgs && setImages((prev) => [...prev, ...imgs]);

  const { mutate: postImageMutate } = useMutation({
    mutationKey: ["create_image_restaurant"],
    mutationFn: (data: FormData) => restaurantImage(data),
    async onSuccess({ data }) {
      if (data) {
        form.reset();
        setImages([]);
        setSearchData({ region_id: "", district_id: "", neighborhood: "" });
        setServicesIdList([]);
        await toast.success("Create restaurant successfully!");
        router.push("/admin/restaurant");
      }
    },
  });

  const { mutate: createRestaurantMutate } = useMutation({
    mutationFn: (data: IRestaurantRequest) => restaurantCreate(data),
    mutationKey: ["restaurant_post"],
    onSuccess({ data }) {
      const formData = new FormData();
      for (let x = 0; x < images.length; x++) {
        formData.append("images", images[x]);
      }
      formData.append("restaurant", data.id);

      postImageMutate(formData);
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
    select_neighbourhood,
  }: z.infer<typeof AddRestaurant>) => {
    const [district] = districts.filter(
      (c: IDistrict) => c.id === +searchData.district_id
    );
    const [mahalla] = neighborhood.filter(
      (item: INeighborhood) => item.id === +searchData.neighborhood
    );
    if (reg) {
      const [region] = reg.data.filter(
        (item: IRegion) => item.id === +searchData.region_id
      );

      if (mahalla && district) {
        if (images.length) {
          const data: IRestaurantRequest = {
            name,
            price,
            description,
            phone,
            size_people: +people_size,
            address: {
              mahalla: mahalla.id,
              street: district.name,
              house: house_number,
              region: region.name,
            },
            services: servicesIdList,
            working_time: {
              morning_time: select_morning,
              afternoon_time: select_afternoon,
              evening_time: select_evening,
            },
          };

          createRestaurantMutate(data);
          setImageError(false);
        } else setImageError(true);
      }
    }
  };

  return (
    <div className="w-full px-1 md:px-2 xl:px-8">
      <h3 className="text-[42px] font-semibold mt-0 md:mt-4 xl:mt-0">
        Add restaurant
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
            </div>
            <div className="flex flex-col gap-2">
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
                  className={`w-full h-40 border border-dashed flex justify-center items-center flex-col gap-2 ${
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
                    multiple
                    accept="image/*"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setImagesFunc(e.target.files)
                    }
                  />
                </label>

                <div className="flex flex-col gap-2">
                  {images.length
                    ? images.map((imgFile, i: number) => (
                        <div
                          key={i}
                          className="bg-gray-200 flex gap-2 rounded-md p-1 justify-between items-center"
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
                        </div>
                      ))
                    : null}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <Button className="bg-current hover:bg-current/80 transition w-full md:w-min mt-2">
              Create Restaurant
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
