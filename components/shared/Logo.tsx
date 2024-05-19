"use client";

import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href={"/"}
      className="text-current/80 text-3xl uppercase font-bold flex items-center pt-2"
    >
      <Image
        src={"/logo.png"}
        width={60}
        height={60}
        className="object-cover"
        alt="Logo"
      />
      Adore
    </Link>
  );
}
