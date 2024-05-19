import { Metadata } from "next";
import Sidebar from "./_components/Sidebar";
import Header from "./_components/Header";
import Container from "../../_components/Container";
import { FC, ReactNode } from "react";
import MobileSidebar from "./_components/MobileSidebar";

export const metadata: Metadata = {
  title: "User Profile",
  description: "User Profile edit",
  icons: [{ url: "/logo.png", href: "/logo.png" }],
};

const AdminLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <section className={`flex`}>
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

export default AdminLayout;
