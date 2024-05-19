"use client";

import { useLayoutEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Search, X } from "lucide-react";
import { useDrawer } from "@/hooks/use-drawer";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getDistricts, getRegions, getSearchData } from "@/actinos";
import { IDistrict, IRegion, ISearchParams } from "@/interface";
import { useRestaurant } from "@/hooks/use-restaurant";
import toast from "react-hot-toast";
import CustomImage from "../../_components/Image";
import bg from "../../../../assets/imagetoyxona.png";
import image from "./images/imagetoyxona.png"
// import Image from "next/image";

const HomeSection = () => {
  const [searchData, setSearchData] = useState<{
    region_id: string;
    district_id: string;
  }>({
    region_id: "",
    district_id: "",
  });
  const [districts, setDistricts] = useState<IDistrict[]>([]);

  const { setRestaurants } = useRestaurant();
  const { onClose } = useDrawer();
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
  });

  const { mutate: filterDataFunc, isPending: isSearching } = useMutation({
    mutationKey: ["search_data"],
    mutationFn: (searchItem: ISearchParams) => getSearchData(searchItem),
    onSuccess({ data }) {
      setRestaurants({
        results: data,
        count: data.length,
        next: null,
        previous: null,
      });
    },
  });

  const searchFilter = () => {
    if (searchData.district_id && searchData.region_id) {
      filterDataFunc({
        region_id: +searchData.region_id,
        district_id: +searchData.district_id,
      });
      setSearchData({ district_id: "", region_id: "" });
    }
  };

  const handelRegion = (value: string) => {
    setSearchData((prev) => ({ ...prev, region_id: value }));
    selectRegionFunc(value);
  };
  const handelDestrict = (value: string) => {
    setSearchData((prev) => ({ ...prev, district_id: value }));
  };

  useLayoutEffect(onClose, [onClose]);

  return (
    <section className="p-2 relative h-[70vh] xl:h-[90vh]">
      <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1 ">
          <h1 style={{fontSize:"48px",marginTop:"150px"}}>Your Love Story, Our Masterpiece</h1>
          <p style={{width:"600px"}}>Dream Day is your trusted partner in turning your wedding dreams into reality. With our expertise in wedding planning, we ensure every detail is taken care of, so you can relax and enjoy your special day.</p>
        </div>
        <div className="col-span-1">
         
        </div>
      </div>
      </div>
      {/* <div className="absolute inset-0 !h-full !w-full overflow-hidden rounded-xl bg-gray-500">
        <div>
          <h2>
          Your Love Story, Our Masterpiece
          </h2>
        </div>    
        <CustomImage
          imgUrl={bg.src}
          alt="Background"
          fill
          className="object-cover w-full h-full"
        />
      </div> */}
      <div className="absolute -bottom-5 left-2/4 -translate-x-2/4 z-10">
        <div className="bg-white py-2 px-4 sm:py-6 sm:px-16 border-2 border-gray-200 rounded-xl flex flex-row gap-2 md:gap-6">
          <Select onValueChange={handelRegion}>
            <SelectTrigger className="w-[140px] sm:w-[180px] md:w-[240px]">
              <SelectValue placeholder="Regions" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select region</SelectLabel>
                {reg ? (
                  reg?.data?.map((item: IRegion) => (
                    <SelectItem key={item.id} value={String(item.id)}>
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
          <Select onValueChange={handelDestrict}>
            <SelectTrigger className="w-[140px] sm:w-[180px] md:w-[240px]">
              <SelectValue placeholder="Districts" />
            </SelectTrigger>
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
                    <span className="text-sm">Choose a region!</span>
                  </div>
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="flex gap-1">
            <Button
              disabled={isSearching}
              onClick={searchFilter}
              variant={"outline"}
              className="!p-2 md:p-4"
            >
              <Search />
            </Button>
            {/* <Button variant={"outline"} className="!p-2 md:p-4">
              <X />
            </Button> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
