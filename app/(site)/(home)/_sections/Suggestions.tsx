"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { MdOutlineBorderColor } from "react-icons/md";
import { FaRegMoneyBill1, FaPeopleGroup } from "react-icons/fa6";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { cn } from "@/lib/utils";
import { responsive } from "@/constants";
import CustomImage from "../../_components/Image";
import CardSkeleton from "../_components/CardSkeleton";
import { useRestaurant } from "@/hooks/use-restaurant";
import { useQuery } from "@tanstack/react-query";
import { IRestaurant } from "@/interface";
import { getAllRestaurant } from "@/actinos";
import { useUser } from "@/hooks/use-user";
import toast from "react-hot-toast";

const SuggestionsSection = () => {
  const { setRestaurants, restaurants, loading, stopLoading } = useRestaurant();
  const { user } = useUser();
  const [pageCount, setPageCount] = useState<number>(1);

  const { data: res, refetch } = useQuery({
    queryKey: ["restaurants"],
    queryFn: () => getAllRestaurant({ page: pageCount, page_size: 6 }),
  });
  useEffect(() => {
    refetch();
  }, [pageCount, refetch]);

  useEffect(() => {
    if (res?.data) {
      stopLoading();
      setRestaurants(res.data);
    }
  }, [res, setRestaurants, stopLoading]);

  const router = useRouter();

  const openRoomIdFunc = (route: string) => {
    user ? router.push(route) : toast.error("You are required to register!");
  };

  const prevPage = () => pageCount > 1 && setPageCount(pageCount - 1);
  const nextPage = () => setPageCount((prev: number) => prev + 1);

  return (
    <section className="mb-8 mt-16">
      <h3 className="text-3xl md:text-5xl font-semibold mb-8">
        Wedding places
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {restaurants ? (
          <>
            {restaurants.results.length ? (
              <>
                {restaurants.results.map((item: IRestaurant) => (
                  <Card
                    key={item.id}
                    className="w-full overflow-hidden p-3 shadow-none rounded-2xl border-[1px] border-gray-100"
                  >
                    <CardContent className="flex flex-col gap-3 !p-0">
                      <div className="flex flex-col  gap-2">
                        <div className="relative w-full h-[296px] ">
                          {item.images.length ? (
                            <>
                              {/* <CustomImage
                                imgUrl={item.images[0]?.image}
                                alt="Image"
                                className="inset-0 object-cover rounded-md"
                                fill={true}
                              /> */}
                              <Carousel
                                swipeable={false}
                                draggable={false}
                                responsive={responsive}
                                ssr={true}
                                infinite={true}
                                autoPlay={true}
                                autoPlaySpeed={2000}
                                customTransition="all .5"
                                transitionDuration={500}
                              >
                                {item.images.map((imgUrl) => (
                                  <div
                                    key={imgUrl.id}
                                    className="h-80 xl:h-86 !w-full relative"
                                  >
                                    <CustomImage
                                      imgUrl={imgUrl.image}
                                      alt={`Fon ${imgUrl.id}`}
                                      fill={true}
                                      className={`inset-0 object-cover rounded-md`}
                                    />
                                  </div>
                                ))}
                              </Carousel>
                            </>
                          ) : (
                            <CustomImage
                              imgUrl={
                                "https://c8.alamy.com/compfr/2rf6dgj/vecteur-d-icone-d-image-signe-et-symbole-de-galerie-de-photos-icone-image-2rf6dgj.jpg"
                              }
                              alt="Image"
                              className="inset-0 object-cover border-[1px] border-gray-100 rounded-md"
                              fill={true}
                            />
                          )}
                        </div>
                        <div className="flex xl:flex-col gap-2 items-stretch">
                          <div className="w-2/4 xl:w-[200px] !overflow-hidden">
                            {/* {item.images.length ? (
                              <Carousel
                                swipeable={false}
                                draggable={false}
                                responsive={responsive}
                                ssr={true}
                                infinite={true}
                                autoPlay={true}
                                autoPlaySpeed={2000}
                                customTransition="all .5"
                                transitionDuration={500}
                              >
                                {item.images.map((imgUrl) => (
                                  <div
                                    key={imgUrl.id}
                                    className="h-40 xl:h-36 !w-full relative"
                                  >
                                    <CustomImage
                                      imgUrl={imgUrl.image}
                                      alt={`Fon ${imgUrl.id}`}
                                      fill={true}
                                      className={`inset-0 object-cover rounded-md`}
                                    />
                                  </div>
                                ))}
                              </Carousel>
                            ) : (
                              <div className="grid grid-cols-6 md:grid-cols-12 gap-3">
                                {[...Array(2)].map((_, i: number) => (
                                  <div
                                    key={i}
                                    className="h-40 xl:h-36 !w-full relative"
                                  >
                                    <div className="!w-full h-full border-[1px] border-gray-100 justify-center items-center flex">
                                      {i + 1}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )} */}
                          </div>
                          <div className="w-2/4 xl:w-[200px] !overflow-hidden">
                            {/* <Carousel
                              swipeable={false}
                              draggable={false}
                              responsive={responsive}
                              ssr={true}
                              infinite={true}
                              autoPlay={true}
                              autoPlaySpeed={2000}
                              customTransition="all .5"
                              transitionDuration={500}
                            >
                              {item.images.reverse().map((imgUrl) => (
                                <div
                                  key={imgUrl.id}
                                  className="h-40 xl:h-36 !w-full relative"
                                >
                                  <CustomImage
                                    imgUrl={imgUrl.image}
                                    alt={`Fon ${imgUrl.id}`}
                                    fill={true}
                                    className={`inset-0 object-cover rounded-md`}
                                  />
                                </div>
                              ))}
                            </Carousel> */}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="mt-4 !pb-0 !px-0 flex flex-col">
                      <div className="flex items-center justify-between w-full">
                        <CardTitle className="text-current text-xl xl:text-2xl">
                          {item.name}
                        </CardTitle>
                        <div className="flex items-center gap-1">
                          <span className="text-current text-xl xl:text-2xl font-semibold">
                            {Number(item.price) / 1_000_000} mln
                          </span>
                          <FaRegMoneyBill1 className="text-current text-xl xl:text-2xl font-semibold -mt-1 w-8 h-8" />
                        </div>
                      </div>
                      <div className="flex flex-col w-full !h-full">
                        <div className="">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-gray-900 text-base xl:text-xl font-medium !line-clamp-2">
                              {item.address.region} {item.address.district}
                              <br />
                              {item.address.mahalla} {item.address.street}{" "}
                              {item.address.house}
                            </CardTitle>
                            <div className="flex items-center gap-1">
                              <span className="text-current text-xl xl:text-2xl font-semibold">
                                {item.size_people}
                              </span>
                              <FaPeopleGroup className="text-current text-xl xl:text-2xl font-semibold -mt-1 w-8 h-8" />
                            </div>
                          </div>
                        </div>
                        <div className="">
                          <div className="w-full flex flex-col xl:flex-row justify-between items-end gap-4 mt-2">
                            <CardDescription className="text-md text-neutral-700 !line-clamp-3 w-full xl:w-3/4">
                              {item.description}
                            </CardDescription>
                          </div>
                          <Button
                            onClick={() => openRoomIdFunc(`/room/${item.id}`)}
                            className="w-full mt-4 h-11 bg-current hover:bg-current/80 !rounded-md"
                          >
                            <MdOutlineBorderColor className="mr-2 h-4 w-4" />
                            <span>Booking</span>
                          </Button>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </>
            ) : (
              <h3 className="text-xl md:text-3xl font-semibold mt-4">
                Not Found!
              </h3>
            )}
          </>
        ) : (
          <>
            {[...Array(4)].map((_, i: number) => (
              <CardSkeleton key={i} />
            ))}
          </>
        )}
      </div>

      {!loading && restaurants?.results && restaurants?.results?.length > 6 && (
        <div className="mt-6 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <Button
                  onClick={prevPage}
                  className={cn(
                    "border-transparent cursor-pointer flex gap-1 !px-2 !py-1 md:px-4 md:py-2",
                    !restaurants?.previous
                      ? "cursor-not-allowed hover:bg-transparent opacity-60 "
                      : "cursor-pointer"
                  )}
                  variant={"outline"}
                >
                  <IoIosArrowBack />
                  <span className="text-neutral-800 hidden md:block">
                    Previous
                  </span>
                </Button>
              </PaginationItem>
              {pageCount > 3 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                {pageCount > 2 && (
                  <PaginationLink className="cursor-pointer h-8 w-8 md:h-10 md:w-10">
                    {pageCount - 2}
                  </PaginationLink>
                )}
              </PaginationItem>
              <PaginationItem>
                {pageCount > 1 && (
                  <PaginationLink className="cursor-pointer h-8 w-8 md:h-10 md:w-10">
                    {pageCount - 1}
                  </PaginationLink>
                )}
              </PaginationItem>
              {[...Array(3)].map((_, i: number) => (
                <PaginationItem key={i + 1}>
                  <PaginationLink
                    className={cn(
                      "h-8 w-8 md:h-10 md:w-10 cursor-default",
                      i + 1 * pageCount === pageCount &&
                        "bg-current text-white hover:bg-current/90 hover:text-white transition-colors"
                    )}
                    isActive={i + 1 * pageCount === pageCount}
                  >
                    {i + 1 * pageCount}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <Button
                  onClick={nextPage}
                  variant={"outline"}
                  className={cn(
                    "border-transparent cursor-pointer flex gap-1 !px-2 !py-1 md:px-4 md:py-2",
                    !restaurants?.next
                      ? "cursor-not-allowed hover:bg-transparent opacity-60 "
                      : "cursor-pointer"
                  )}
                >
                  <span className="text-neutral-800 hidden md:block">Next</span>
                  <IoIosArrowForward />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </section>
  );
};

export default SuggestionsSection;
