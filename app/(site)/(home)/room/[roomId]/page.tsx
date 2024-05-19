"use client";

import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-day-picker/dist/style.css";
import { FaPeopleGroup, FaLocationDot } from "react-icons/fa6";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { IRoomId, IServices } from "@/interface";
import { responsive } from "@/constants";
import CustomImage from "@/app/(site)/_components/Image";
import { useQuery } from "@tanstack/react-query";
import { getRoomId, getServices } from "@/actinos";
import PageSkeleton from "./_components/PageSkeleton";
import DateComponent from "./_components/DateComponent";
import Comments from "./_components/Comments";
import ServiceCard from "./_components/ServiceCard";
import toast from "react-hot-toast";

export default function AboutRoomPage({
  params,
}: {
  params: { roomId: string };
}) {
  const [room, setRoom] = useState<IRoomId | null>(null);

  const { data: res, refetch } = useQuery({
    queryKey: ["get_room_id"],
    queryFn: () => getRoomId(params.roomId),
  });

  const { data: services } = useQuery({
    queryKey: ["services"],
    queryFn: getServices,
  });

  useEffect(() => {
    res?.data && setRoom(res?.data);
  }, [res?.data]);

  const bookingFunc = () =>
    document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });

  const refetchFunc = () => refetch();

  const copyNumber = () => {
    res?.data &&
      navigator.clipboard
        .writeText(res?.data.phone.toString())
        .then(() => toast.success("Copy number successfully!"));
  };
  return (
    <>
      {room ? (
        <>
          <div className="flex flex-col xl:flex-row gap-8 py-4">
            <div className="w-full xl:w-4/6">
              {room.images.length ? (
                <>
                  <Carousel
                    swipeable={false}
                    draggable={false}
                    responsive={responsive}
                    infinite
                    autoPlay
                    autoPlaySpeed={2000}
                    customTransition="all .5"
                    transitionDuration={500}
                    showDots
                  >
                    {room.images.map((img: { image: string; id: number }) => (
                      <div
                        key={img.id}
                        className="w-full !h-[300px] md:!h-[540px] relative"
                      >
                        <CustomImage
                          imgUrl={img.image}
                          alt="Fon 1"
                          fill
                          className="!h-[300px] md:!h-[540px] !w-full object-cover rounded-md"
                        />
                      </div>
                    ))}
                  </Carousel>
                </>
              ) : (
                <div className="w-full !h-[540px] relative border-[1px] border-gray-100">
                  <CustomImage
                    imgUrl={
                      "https://c8.alamy.com/compfr/2rf6dgj/vecteur-d-icone-d-image-signe-et-symbole-de-galerie-de-photos-icone-image-2rf6dgj.jpg"
                    }
                    alt="Fon 1"
                    fill
                    className="!h-[540px] !w-full object-cover rounded-md"
                  />
                </div>
              )}
            </div>
            <div className="w-full xl:w-4/12">
              <div className="flex justify-between items-start">
                <h3 className="text-current text-4xl font-semibold">
                  {room.name}
                </h3>
                <div className="flex items-center gap-0">
                  <span className="text-current text-2xl font-semibold">
                    {room.price / 1_000_000} mln
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 mt-4">
                <span className="text-current text-2xl font-semibold">
                  {room.size_people}
                </span>
                <FaPeopleGroup className="text-current text-2xl font-semibold -mt-1 w-8 h-8" />
              </div>
              <p className="text-gray-500 text-md font-medium !line-clamp-3 mt-2">
                {room.description}
              </p>
              <div className="block md:flex justify-between xl:block">
                <div className="flex items-center gap-2 mt-4">
                  <FaLocationDot className="text-2xl font-semibold -mt-1 w-8 h-8" />
                  <span className="text-[18px] w-4/5 font-medium">
                    {room.address.mahalla} {room.address.street}{" "}
                    {room.address.house}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <Avatar>
                    <AvatarImage
                      src={room.user.image}
                      alt={room.user.full_name}
                    />
                    <AvatarFallback>
                      {room.user.full_name.slice(0, 1)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-[18px] w-4/5 font-medium">
                    {room.user.full_name}
                  </span>
                </div>
              </div>
              <div className="flex xl:w-full xl:flex-col mt-8 gap-2">
                <a
                  href={`tel:${room.phone}`}
                  className="w-full md:w-60 xl:w-full block md:hidden"
                >
                  <Button className="bg-current hover:bg-current/90 transition-colors w-full md:w-60 xl:w-full">
                    Call Now
                  </Button>
                </a>

                <Button
                  onClick={copyNumber}
                  className="bg-current hover:bg-current/90 transition-colors w-full md:w-60 xl:w-full hidden md:block"
                >
                  Call Now
                </Button>
                <Button
                  onClick={bookingFunc}
                  className="bg-current hover:bg-current/90 transition-colors w-full md:w-60 xl:w-full"
                >
                  Booking
                </Button>
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Cards */}
          {services?.data && (
            <div className="hidden sm:grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-8 mb-8">
              {services.data.map((item: IServices) => (
                <ServiceCard key={item.id} item={item} />
              ))}
            </div>
          )}

          <div className="w-full block sm:hidden mb-8 px-8 sm:px-0">
            {services?.data && (
              <>
                <h3 className="font-semibold text-2xl mb-6">All Services</h3>
                <Carousel
                  swipeable={false}
                  draggable={false}
                  responsive={responsive}
                  ssr={true}
                  infinite={true}
                  autoPlay={true}
                  autoPlaySpeed={2000}
                  customTransition="all .5"
                  transitionDuration={1000}
                >
                  {services?.data.map((item: IServices) => (
                    <ServiceCard key={item.id} item={item} />
                  ))}
                </Carousel>
              </>
            )}
          </div>
          {/* Cards */}

          <div className="flex flex-col-reverse gap-6 xl:gap-0 xl:flex-row mb-8">
            <Comments
              roomId={params.roomId}
              room={room}
              refetchFunc={refetchFunc}
            />

            <DateComponent roomId={params.roomId} />
          </div>
        </>
      ) : (
        <PageSkeleton />
      )}
    </>
  );
}
