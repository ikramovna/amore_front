"use client";

import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { useDrawer } from "@/hooks/use-drawer";
import { useUser } from "@/hooks/use-user";
import { ISidebarItem } from "@/interface";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaRegUser, FaListUl } from "react-icons/fa";
import { IoExitOutline } from "react-icons/io5";
import { LuLayoutList } from "react-icons/lu";
import Cookies from "js-cookie";

export default function Sidebar() {
  const router = usePathname();
  const { onClose } = useDrawer();
  const { removeUser } = useUser();

  const logoutProfile = () => {
    removeUser();
    Cookies.remove("currentUser");
    Cookies.remove("role");
  };

  const links: ISidebarItem[] = [
    {
      icon: (
        <FaRegUser
          className={`w-[22px] h-[22px] ${
            router === "/admin" && "text-current"
          }`}
        />
      ),
      label: "Profile",
      route: "/admin",
    },
    {
      icon: (
        <FaListUl
          className={`w-[22px] h-[22px] ${
            router === "/admin/booking" && "text-current"
          }`}
        />
      ),
      label: "My Bookings",
      route: "/admin/booking",
    },
    {
      icon: (
        <LuLayoutList
          className={`w-[22px] h-[22px] ${
            router === "/admin/restaurant" && "text-current"
          }`}
        />
      ),
      label: "Restaurants",
      route: "/admin/restaurant",
    },
  ];

  return (
    <div className="w-full !sticky !top-0 xl:!w-[285px] h-screen bg-current_bg_color py-4 md:py-10 xl:py-[52px] px-3 flex flex-col justify-between items-center">
      <div className="flex flex-col items-center w-full">
        <Logo />

        <ul className="flex flex-col gap-[13px] w-full mt-12">
          {links.map((item: ISidebarItem, i: number) => (
            <Link
              key={i}
              onClick={onClose}
              href={item.route}
              className={`flex gap-3 w-full cursor-pointer border-[1px] border-transparent ${
                router === item.route && "bg-current/10 !border-current/80 "
              } rounded p-3`}
            >
              {item.icon}
              <span
                className={`font-medium ${
                  router === item.route && "text-current"
                }`}
              >
                {item.label}
              </span>
            </Link>
          ))}
        </ul>
      </div>

      <Button
        className="w-full border-gray-900 bg-transparent hover:bg-red-400 hover:border-red-400 border-[1px] group flex justify-start !p-3"
        variant={"outline"}
        onClick={logoutProfile}
      >
        <IoExitOutline className="w-[22px] h-[22px] mr-3 group-hover:text-white" />
        <span className="group-hover:text-white font-medium">Logout</span>
      </Button>
    </div>
  );
}
