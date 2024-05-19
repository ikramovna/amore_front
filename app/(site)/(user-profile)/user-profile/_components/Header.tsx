"use client";

import ProfileMenu from "@/components/shared/ProfileMenu";
import { RiMenu4Fill } from "react-icons/ri";
import { useDrawer } from "@/hooks/use-drawer";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@/hooks/use-user";
import { getUser } from "@/actinos";

export default function Header() {
  const { onOpen } = useDrawer();
  const { setUser } = useUser();
  const { data: res } = useQuery({ queryKey: ["getUser"], queryFn: getUser });

  useEffect(() => {
    setUser(res?.data);
  }, [setUser, res]);

  return (
    <nav className="py-4 px-6 flex justify-between !w-full">
      <RiMenu4Fill
        onClick={onOpen}
        className="text-2xl visited:visible xl:invisible cursor-pointer"
      />
      <ProfileMenu />
    </nav>
  );
}
