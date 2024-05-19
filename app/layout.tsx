import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Providers from "./providers";

const fontSans = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800"],
});
export const metadata: Metadata = {
  title: "ADORE",
  description: "ADORE - Restaurant Application",
  icons: [{ url: "/logo.ico", href: "/logo.ico" }],
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fontSans.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
