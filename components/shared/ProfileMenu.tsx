"use client";

import Link from "next/link";
import { LogOut, User, LucideList, LayoutDashboard } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/hooks/use-user";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const menuItems = [
  {
    label: "Profile",
    route: "/",
    icon: <User className="mr-2 h-4 w-4" />,
  },
  {
    label: "Booking",
    route: "/booking",
    icon: <LucideList className="mr-2 h-4 w-4" />,
  },
];

export default function ProfileMenu() {
  const { user, removeUser } = useUser();
  const router = useRouter();

  const logoutProfile = () => {
    removeUser();
    Cookies.remove("currentUser");
    Cookies.remove("role");
    router.push("/");
  };

  return (
    <>
      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              {user.image && (
                <AvatarImage
                  src={user.image}
                  alt="Rofiyev Dilshod"
                  className="cursor-pointer"
                />
              )}
              <AvatarFallback className="cursor-pointer">
                {user.username.slice(0, 1).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 absolute right-0">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {menuItems.map((item, i) => (
                <Link
                  key={i}
                  className="cursor-pointer"
                  href={
                    user.is_admin
                      ? `/admin/${item.route}`
                      : `/user-profile${item.route}`
                  }
                >
                  <DropdownMenuItem>
                    {item.icon}
                    <span>{item.label}</span>
                  </DropdownMenuItem>
                </Link>
              ))}
              {user.is_admin && (
                <Link className="cursor-pointer" href={`/admin/restaurant`}>
                  <DropdownMenuItem>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Restaurant</span>
                  </DropdownMenuItem>
                </Link>
              )}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="hover:!bg-red-400 group cursor-pointer"
              onClick={logoutProfile}
            >
              <LogOut className="mr-2 h-4 w-4 group-hover:text-white" />
              <span className="group-hover:text-white">Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
