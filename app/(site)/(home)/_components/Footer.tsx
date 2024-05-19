"use client";

import Image from "next/image";
import Container from "../../_components/Container";
import Link from "next/link";
import { FaFacebook, FaTelegram, FaInstagram } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="p-8 bg-current">
      <Container>
        <div className="flex items-center justify-center ">
          <Image
            src={"/logo.png"}
            alt="Logo"
            width={80}
            height={80}
            className="brightness-0 invert"
          />
          <h3 className="text-white text-4xl font-bold ">ADORE</h3>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-end mt-6">
          <p className="text-white hidden md:block w-full text-center md:text-left md:w-1/3 mb-6 md:mb-0">
            Ullam exercitationem laboriosam pariatur voluptatum tenetur vero
            numquam quaerat.
          </p>
          <div className="flex flex-row-reverse md:flex-row w-full md:w-2/6 justify-between md:justify-end items-start md:items-end">
            <div className="hidden md:flex flex-col items-end">
              <p className="text-white text-md">Our call center</p>
              <p className="text-white">
                <a href="tel:+998999999999" className="hover:underline">
                  +998 99 999 99 99
                </a>
              </p>
              <p className="text-white">
                <a href="tel:+998998889999" className="hover:underline">
                  +998 99 888 99 99
                </a>
              </p>
            </div>
            <div className="flex flex-row justify-center w-full gap-4 md:hidden">
              <Link href="/">
                <FaFacebook className="text-white text-3xl" />
              </Link>
              <Link href="/">
                <FaInstagram className="text-white text-3xl" />
              </Link>
              <Link href="/">
                <FaTelegram className="text-white text-3xl" />
              </Link>
            </div>
          </div>
        </div>

        <Separator className="mt-4 bg-gray-300/40" />

        <div className="mt-8 flex flex-row-reverse justify-center md:justify-between items-center">
          <div className="hidden md:flex gap-3">
            <Link href="/">
              <FaFacebook className="text-white text-3xl" />
            </Link>
            <Link href="/">
              <FaInstagram className="text-white text-3xl" />
            </Link>
            <Link href="/">
              <FaTelegram className="text-white text-3xl" />
            </Link>
          </div>
          <p className="text-white">
            &copy; {new Date().getFullYear()} | All Rights Reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
