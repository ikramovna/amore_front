import { ReactNode } from "react";
import Header from "./_components/Header";
import Container from "../_components/Container";
import Footer from "./_components/Footer";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <Header />
      <Container>{children}</Container>
      <Footer />
    </main>
  );
}
