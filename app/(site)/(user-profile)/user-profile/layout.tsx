import { Metadata } from "next";
import { FC, ReactNode } from "react";
import Sidebar from "./_components/Sidebar";
import Container from "../../_components/Container";
import Header from "./_components/Header";
import MobileSidebar from "./_components/MobileSidebar";

export const metadata: Metadata = {
  title: "User Profile",
  description: "User Profile edit",
  icons: [{ url: "/logo.png", href: "/logo.png" }],
};

const ProfileLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <section className="flex">
      <div className="hidden xl:flex">
        <Sidebar />
      </div>
      <div className="flex xl:hidden">
        <MobileSidebar />
      </div>
      <div className="w-full">
        <Header />
        <Container>{children}</Container>
      </div>
    </section>
  );
};

export default ProfileLayout;
